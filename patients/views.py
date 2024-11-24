from django.shortcuts import render, HttpResponse, redirect
from .models import Patient as User
from django.contrib import messages
import json

# Vista de la página principal
def index(request):
    return render(request, 'index.html')

# Crear un usuario
def register(request):
    
    if request.method == 'POST': 
        
        new_user_name = request.POST.get('name')
        new_user_last_name = request.POST.get('last_name')
        new_user_email = request.POST.get('email')
        new_user_address = request.POST.get('address')
        new_user_phone = request.POST.get('phone')
        
        new_user = User(name=new_user_name,
                        last_name=new_user_last_name,
                        email=new_user_email,
                        address=new_user_address,
                        phone=new_user_phone)
        
        new_user.save()
        print("Usuario registrado")
        messages.success(request, 'Usuario registrado exitosamente!')
        return redirect('patients:patients_list')

        
    
    return render(request, 'add_patient.html')

# Vista de la lista de usuarios
def patients_list(request):

        
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
                new_user_email = request.POST.get('email')
                new_user_address = request.POST.get('address')
                new_user_phone = request.POST.get('phone')

                print("Info obtenida:")
                print(new_user_id)
                print(new_user_name)
                print(new_user_last_name)
                print(new_user_email)
                print(new_user_address)
                print(new_user_phone)
                
                user = User.objects.get(id=new_user_id)
                user.name = new_user_name
                user.last_name = new_user_last_name
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
    
    return render(request, 'patients_list.html', {'users': users, 'users_to_json': users_to_json})
