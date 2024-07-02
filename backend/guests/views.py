# guests/views.py

from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Guest
from .serializers import GuestSerializer
from events.models import Event
from events.utils import send_email

class GuestList(APIView):
    def get(self, request):
        guests = Guest.objects.all()
        serializer = GuestSerializer(guests, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        serializer = GuestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            guest = serializer.save()
            # Send email after guest is created
            event = get_object_or_404(Event, id=guest.event.id)
            host_email = event.host.email
            to_email = guest.email
            subject = f"Invitation to {event.title}"
            content = f"Dear {guest.name},<br><br>You are invited to {event.title} on {event.date}.<br>Location: {event.location}.<br><br>Best regards,<br>{event.host.username}"
            send_email(to_email, subject, content, from_email=host_email)
            return Response({"result": f"Guest {guest.id} created and email sent"}, status=201)
        return Response(serializer.errors, status=400)

class GuestDetail(APIView):
    def get(self, request, pk):
        guest = get_object_or_404(Guest.objects.all(), pk=pk)
        serializer = GuestSerializer(guest)
        return Response({"result": serializer.data})
    
    def put(self, request, pk):
        guest = get_object_or_404(Guest.objects.all(), pk=pk)
        serializer = GuestSerializer(instance=guest, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            guest = serializer.save()
            return Response({"result": f"Guest {guest.id} updated"})
    
    def delete(self, request, pk):
        guest = get_object_or_404(Guest.objects.all(), pk=pk)
        guest.delete()
        return Response({"result": f"Guest {pk} deleted"}, status=204)
