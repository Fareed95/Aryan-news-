from django.urls import path
from . import views
urlpatterns = [
    path('',views.pre_login_homepage, name = "pre_login_homepage"),
    path('signup/',views.SignupPage,name='signup'),
    path('login/',views.LoginPage,name='login'),
    path('home/',views.HomePage,name='home'),
    path('logout/',views.LogoutPage,name='logout'),
]