from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages

# Create your views here.
# Vista de la página principal
def home(request):
    return render(request, 'home.html')