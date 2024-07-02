# events/views.py

from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer
from .utils import send_email

class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response({"result": serializer.data})

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            event = serializer.save()
            return Response({"result": f"Event {event.id} created"}, status=201)

class EventDetail(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event.objects.all(), pk=pk)
        serializer = EventSerializer(event)
        return Response({"result": serializer.data})

    def put(self, request, pk):
        event = get_object_or_404(Event.objects.all(), pk=pk)
        serializer = EventSerializer(instance=event, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"result": f"Event {pk} updated"}, status=200)

    def delete(self, request, pk):
        event = get_object_or_404(Event.objects.all(), pk=pk)
        event.delete()
        return Response({"result": f"Event {pk} deleted"}, status=204)
    

class SendEmailAPIView(APIView):
    def post(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        guests = event.guests.all()
        host_email = event.host.email
        
        if not guests:
            return Response({"error": "No guests found for this event."}, status=400)
        
        for guest in guests:
            subject = f"Invitation to {event.title}"
            content = f"Dear {guest.name},<br><br>You are invited to {event.title} on {event.date}.<br>Location: {event.location}.<br><br>Best regards,<br>{event.host.username}"
            send_email(guest.email, subject, content, from_email=host_email)
        
        return Response({"message": "Emails sent successfully to all guests."}, status=200)
