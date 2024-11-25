from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('public.urls', namespace='public')),
    # path('doctors/', include('doctors.urls', 'doctors')),
    path('patients/', include('patients.urls', namespace='patients')),
]
