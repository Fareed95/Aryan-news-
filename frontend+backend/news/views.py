from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from .models import News_Article
from math import ceil 
# Create your views here.
def pre_login_homepage(request):
    return render(request,'prelogin_homepage.html')

@login_required(login_url='login')
def HomePage(request):
    user = request.user
    
    # Retrieve the specific article based on subcategory
    try:
        featured_article = News_Article.objects.get(article_subcategory='HOME_MAIN_PAGE_DISPLAY')
    except News_Article.DoesNotExist:
        featured_article = None  # Handle case where article is not found
    try:
        section_new1_page = News_Article.objects.get(article_subcategory='New 1')
    except News_Article.DoesNotExist:
        section_new1_page = None  # Handle case where article is not found
    try:
        section_new2_page = News_Article.objects.get(article_subcategory='New 2')
    except News_Article.DoesNotExist:
        section_new1_page = None  # Handle case where article is not found
    try:
        section_new3_page = News_Article.objects.get(article_subcategory='New 3')
    except News_Article.DoesNotExist:
        section_new1_page = None  # Handle case where article is not found
    products= News_Article.objects.all()
    
    allProds=[]
    catprods= News_Article.objects.values('article_category', 'id')
    cats= {item["article_category"] for item in catprods}
    for cat in cats:
        prod=News_Article.objects.filter(article_category=cat)
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))          #no. of slides logic 
        allProds.append([prod, range(1, nSlides), nSlides])

    context = {
        'username': user.username,
        'featured_article': featured_article,
        'section_new1_page': section_new1_page, 
        'section_new2_page': section_new2_page,
        'section_new3_page': section_new3_page,
        'allProds':allProds,
        }
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