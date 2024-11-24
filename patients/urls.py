from django.urls import path
from . import views
app_name = 'patients' 

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.register, name='add_patient'), 
    path('list/', views.patients_list, name='patients_list'),
]