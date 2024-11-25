from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages

# Create your views here.
# Vista de la página principal
def home(request):
    return render(request, 'home.html')

def login(request):
    return render(request, 'login.html')

def register(request):
    return render(request, 'register.html')