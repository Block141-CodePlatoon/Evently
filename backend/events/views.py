import googlemaps
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer
from .utils import send_email, get_directions

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

class DirectionsAPIView(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event.objects.all(), pk=pk)
        origin = request.query_params.get('origin')
        destination = request.query_params.get('destination')
        if not origin or not destination:
            return Response({"error": "Both origin and destination parameters are required."}, status=400)
        
        directions = get_directions(origin, destination)
        return Response(directions)

class SendEmailAPIView(APIView):
    def post(self, request, pk):
        event = get_object_or_404(Event.objects.all(), pk=pk)
        to_email = request.data.get('to_email')
        subject = request.data.get('subject')
        content = request.data.get('content')
        
        if not to_email or not subject or not content:
            return Response({"error": "to_email, subject, and content are required fields."}, status=400)
        
        success = send_email(to_email, subject, content)
        if success:
            return Response({"message": "Email sent successfully."}, status=200)
        else:
            return Response({"error": "Failed to send email."}, status=500)
