from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Guest
from .serializers import GuestSerializer

class GuestList(APIView):
    def get(self, request):
        guests = Guest.objects.all()
        serializer = GuestSerializer(guests, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        serializer = GuestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            guest = serializer.save()
            return Response({"result": f"Guest {guest.id} created"}, status=201)
    

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