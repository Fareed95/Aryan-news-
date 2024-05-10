from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required

# Create your views here.
def pre_login_homepage(request):
    return render(request,'prelogin_homepage.html')

@login_required(login_url='login')
def HomePage(request):
    user = request.user
    # Pass the username to the template context
    context = {'username': user.username}
    return render(request, 'homepage.html', context)

def SignupPage(request):
    if request.method=='POST':
        uname=request.POST.get('username')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')
        print(uname ,email,pass1,pass2)

        if pass1!=pass2:
            return HttpResponse("Your password and confrom password are not Same!!")
        else:

            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
            return redirect('login')
        



    return render (request,'login.html')

def LoginPage(request):
    if request.method=='POST':
        username=request.POST.get('login_username')
        pass1=request.POST.get('login_password')
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            return HttpResponse ("Username or Password is incorrect!!!")

    return render (request,'login.html')

def LogoutPage(request):
    logout(request)
    return redirect('login')