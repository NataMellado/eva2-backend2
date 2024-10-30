from django.shortcuts import render, HttpResponse, redirect
from .models import User
from django.contrib import messages
import json

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

    
    if request.method == 'POST': 
        
        new_user_name = request.POST.get('name')
        new_user_last_name = request.POST.get('last_name')
        new_user_speciality = request.POST.get('speciality')
        new_user_email = request.POST.get('email')
        new_user_address = request.POST.get('address')
        new_user_phone = request.POST.get('phone')
        
        new_user = User(name=new_user_name,
                        last_name=new_user_last_name,
                        speciality=new_user_speciality,
                        email=new_user_email,
                        address=new_user_address,
                        phone=new_user_phone,
                        picture=1)
        
        new_user.save()
        print("Usuario registrado")
        messages.success(request, 'Usuario registrado exitosamente!')
        redirect('users_list')
        
    
    return render(request, 'register.html')


def users_list(request):
    if request.method == 'POST': 
        try:
            eliminar = request.POST.get('deleteUser')
            if eliminar:
                user = User.objects.get(id=eliminar)
                user.delete()
                print("Usuario eliminado")
                messages.success(request, 'Usuario eliminado exitosamente!')
                
            else:
            
                new_user_id = request.POST.get('userId')
                new_user_name = request.POST.get('name')
                new_user_last_name = request.POST.get('last_name')
                new_user_speciality = request.POST.get('speciality')
                new_user_email = request.POST.get('email')
                new_user_address = request.POST.get('address')
                new_user_phone = request.POST.get('phone')

                print("Info obtenida:")
                print(new_user_id)
                print(new_user_name)
                print(new_user_last_name)
                print(new_user_speciality)
                print(new_user_email)
                print(new_user_address)
                print(new_user_phone)
                
                user = User.objects.get(id=new_user_id)
                user.name = new_user_name
                user.last_name = new_user_last_name
                user.speciality = new_user_speciality
                user.email = new_user_email
                user.address = new_user_address
                user.phone = new_user_phone
                user.save()
                messages.success(request, 'Usuario modificado exitosamente!')
        except Exception as e:
            print(e)
            messages.error(request, 'Hubo un error!')
        
    users = User.objects.all()
    users_to_json = json.dumps(list(users.values()))
    print(users_to_json)
    return render(request, 'users_list.html', {'users': users, 'users_to_json': users_to_json})

def update(request):
    return render(request, 'update.html')