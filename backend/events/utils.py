# events/utils.py

import os
import googlemaps
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings

def send_email(to_email, subject, content, from_email):
    sg = SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=subject,
        html_content=content
    )
    response = sg.send(message)
    return response.status_code


def get_directions(origin, destination):
    gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)
    try:
        directions = gmaps.directions(origin, destination)
        return directions
    except Exception as e:
        print(f"Failed to retrieve directions: {e}")
        return None