from django.shortcuts import render, HttpResponse
from .models import User

# Create your views here.
def index(request):
    return render(request, 'index.html')

def register(request):
    # if request.method == 'GET': # Cuando el usuario visita la página para registrarse
    #     estado = 'metodo get jeje'
    #     nombre = 'vacio'

    # if request.method == 'POST': # Cuando el usuario envía el formulario de registro
    #     estado = 'metodo.post'
    #     nombre = request.POST['nombre']
    #     print('se envió método post ojito!!!!!!!!!!!!!!!!', nombre)
    
    # return render(request, 'register.html', {'estado': estado + ' ' + nombre})
    return render(request, 'register.html')


def users_list(request):
    users = User.objects.all()
    return render(request, 'users_list.html', {'users': users} )



