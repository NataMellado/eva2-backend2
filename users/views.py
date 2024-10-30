from django.shortcuts import render, HttpResponse
from .models import User
from django.contrib import messages
import json

# Vista de la página principal
def index(request):
    return render(request, 'index.html')

# Vista de la página de registro
def register(request):
    
    if request.method == 'POST': 
        
        new_user_name = request.POST['name']
        new_user_last_name = request.POST['last_name']
        new_user_speciality = request.POST['speciality']
        new_user_email = request.POST['email']
        new_user_address = request.POST['address']
        new_user_phone = request.POST['phone']
        
        new_user = User(name=new_user_name,
                        last_name=new_user_last_name,
                        speciality=new_user_speciality,
                        email=new_user_email,
                        address=new_user_address,
                        phone=new_user_phone,
                        picture=1)
        
        new_user.save()
        print("Usuario guardado jejejeje")
    
    return render(request, 'register.html')

# Vista de la lista de usuarios
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
