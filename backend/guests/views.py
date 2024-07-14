from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Guest
from .serializers import GuestSerializer
from events.models import Event
from events.utils import send_email 
import logging
import os
from datetime import datetime

logger = logging.getLogger(__name__)

@permission_classes([IsAuthenticated])
class GuestList(APIView):
    def get(self, request):
        guests = Guest.objects.all()
        serializer = GuestSerializer(guests, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        logger.debug("Guest POST request received")
        serializer = GuestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            logger.debug("Guest data is valid")
            guest = serializer.save()
            event = get_object_or_404(Event, id=guest.event.id)
            host_email = event.host.email
            to_email = guest.email
            subject = f"Invitation to {event.title}"

            # Format date and time
            event_date = event.date.strftime("%B %d, %Y")
            event_time = event.date.strftime("%I:%M %p")

            # Create email content
            content = (f"Dear {guest.first_name} {guest.last_name},<br><br>"
                       f"You are invited to {event.title} on {event_date} at {event_time}.<br>"
                       f"Location: {event.location}.<br><br>"
                       f"Best regards,<br>"
                       f"{event.host.first_name} {event.host.last_name}")

            logger.debug(f"Sending email to {to_email} from {host_email} with subject: {subject}")
            logger.debug(f"Email content: {content}")

            # Debug environment variables
            email_host_user = os.getenv('EMAIL_HOST_USER')
            email_host_password = os.getenv('EMAIL_HOST_PASSWORD')
            logger.debug(f"EMAIL_HOST_USER from env: {email_host_user}")
            logger.debug(f"EMAIL_HOST_PASSWORD from env: {email_host_password}")

            try:
                send_email(to_email, subject, content, from_email=host_email)
                logger.info(f"Invitation email sent to {to_email}")
            except Exception as e:
                logger.error(f"Error sending email to {to_email}: {e}")
                # Continue without raising an error

            return Response({"result": f"Guest {guest.id} created"}, status=201)
        else:
            logger.debug("Guest data is invalid")
            logger.debug(f"Errors: {serializer.errors}")
        return Response(serializer.errors, status=400)


@permission_classes([IsAuthenticated])
class GuestDetail(APIView):
    def get(self, request, pk):
        guest = get_object_or_404(Guest.objects.all(), pk=pk)
        serializer = GuestSerializer(guest)
        return Response({"result": serializer.data})
    
    def put(self, request, pk):
        guest = get_object_or_404(Guest.objects.all(), pk=pk)
        serializer = GuestSerializer(instance=guest, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            try:
                guest = serializer.save()
                return Response({"result": f"Guest {guest.id} updated"})
            except Exception as e:
                logger.error("Error updating guest: %s", e)
                return Response({"error": str(e)}, status=500)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk):
        guest = get_object_or_404(Guest.objects.all(), pk=pk)
        try:
            guest.delete()
            return Response({"result": f"Guest {pk} deleted"}, status=204)
        except Exception as e:
            logger.error("Error deleting guest: %s", e)
            return Response({"error": str(e)}, status=500)

@permission_classes([IsAuthenticated])
class EventGuestList(APIView):
    def get(self, request, event_id):
        try:
            event = get_object_or_404(Event, id=event_id)
            guests = event.guests.all()  
            serializer = GuestSerializer(guests, many=True)
            return Response({"result": serializer.data})
        except Exception as e:
            logger.error("Error fetching guests for event %s: %s", event_id, e)
            return Response({"error": str(e)}, status=500)
