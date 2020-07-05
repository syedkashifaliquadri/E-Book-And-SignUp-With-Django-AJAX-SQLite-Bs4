from django.shortcuts import render
from django.http import HttpResponse
from .models import Book, BookSerializer, User
import json

# Create your views here.


def index(request):
    return render(request, 'index.html')


def saveBook(request):
    name = request.GET['name']
    prize = request.GET['prize']
    pages = request.GET['pages']
    book = Book(name=name,prize=prize,pages=pages)
    try:
        book.save()
        return HttpResponse('true')
    except:
        return HttpResponse('false')



def getAllBooks(request):
    l = list()
    books = Book.objects.all()
    for bk in books:
        ser = BookSerializer(bk)
        print(ser.data)
        l.append(ser.data)
    print(l)
    return HttpResponse(json.dumps(l))


def deleteBook(request):
    try:
        print(request.GET['id'])
        book = Book.objects.get(id=request.GET['id'])
        book.delete()
        return HttpResponse('true')
    except:
        return HttpResponse('false')


def showSignupPage(request):
    return render(request, 'signup.html')


def signup(request):
    name = request.GET['name']
    email = request.GET['email']
    password = request.GET['password']
    user = User(email = email, name = name, password = password)
    user.save()
    print(name,email,password)
    return HttpResponse('true')


def checkEmail(request):
    em = request.GET['email']
    try:
        user = User.objects.get(email = em)
        return HttpResponse('true')
    except:
        return HttpResponse('false')
