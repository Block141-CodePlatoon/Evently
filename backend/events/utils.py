# events/utils.py

import os
import logging
import googlemaps
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings

logger = logging.getLogger(__name__)

def send_email(to_email, subject, content, from_email):
    try:
        sg = SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=content
        )
        response = sg.send(message)
        logger.info(f"Email sent to {to_email}, response status: {response.status_code}")
        return response.status_code
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        return None

def get_directions(origin, destination):
    gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)
    try:
        directions = gmaps.directions(origin, destination)
        return directions
    except Exception as e:
        print(f"Failed to retrieve directions: {e}")
        return None
