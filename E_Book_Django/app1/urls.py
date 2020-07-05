from django.urls import path,include
from app1 import views

urlpatterns = [
    path('',views.index, name='index'),
    path('save_book/',views.saveBook, name='savebook'),
    path('getAllBooks/',views.getAllBooks, name='getAll'),
    path('deletebook/',views.deleteBook, name='delete'),
    path('signuppage/',views.showSignupPage, name='showSignupPage'),
    path('signup/',views.signup, name='signup'),
    path('checkemail/',views.checkEmail, name='checkEmail'),


]