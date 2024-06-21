from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer

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
            event = serializer.save()
            return Response({"result": f"Event {event.id} updated"})

    def delete(self, request, pk):
        event = get_object_or_404(Event.objects.all(), pk=pk)
        event.delete()
        return Response({"result": f"Event {pk} deleted"}, status=204)
