# events/views.py

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer
from .utils import send_email, get_directions

@permission_classes([IsAuthenticated])
class EventList(APIView):
    def get(self, request):
        user = request.user
        events = Event.objects.filter(host=user)
        serializer = EventSerializer(events, many=True)
        return Response({"result": serializer.data})

    def post(self, request):
        user = request.user
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            event = serializer.save(host=user)
            return Response({"result": f"Event {event.id} created"}, status=201)

@permission_classes([IsAuthenticated])
class EventDetail(APIView):
    def get(self, request, pk):
        user = request.user
        event = get_object_or_404(Event.objects.filter(host=user), pk=pk)
        serializer = EventSerializer(event)
        return Response({"result": serializer.data})

    def put(self, request, pk):
        user = request.user
        event = get_object_or_404(Event.objects.filter(host=user), pk=pk)
        serializer = EventSerializer(instance=event, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"result": f"Event {pk} updated"}, status=200)

    def delete(self, request, pk):
        user = request.user
        event = get_object_or_404(Event.objects.filter(host=user), pk=pk)
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


class DirectionsAPIView(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        origin = event.location
        destination = request.GET.get('destination')

        if not destination:
            return Response({"error": "Destination not provided."}, status=400)

        directions = get_directions(origin, destination)
        
        if directions is None:
            return Response({"error": "Failed to retrieve directions."}, status=500)
        
        return Response({"directions": directions}, status=200)