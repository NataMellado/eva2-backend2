from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')

def register(request):
    return render(request, 'register.html')

def update(request):
    return render(request, 'update.html')

def users_list(request):
    return render(request, 'users_list.html')



