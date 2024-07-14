# events/views.py

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer

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