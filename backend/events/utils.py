import googlemaps
from django.conf import settings
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings
from views import SendEmailAPIView





def get_directions(origin, destination):
    # Initialize the Google Maps client with your API key.
    gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)
    
    try:
        # Request directions between the origin and destination.
        directions = gmaps.directions(origin, destination)
        
        # Optionally, you can add more parameters to customize the directions.
        # directions = gmaps.directions(origin, destination, mode="driving", departure_time="now")
        
        return directions
    except Exception as e:
        # Log the error or handle it appropriately.
        print(f"Failed to retrieve directions: {e}")
        return None











def send_email(to_email, subject, content):
    # Create a Mail object with sender, recipient, subject, and content
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=to_email,
        subject=subject,
        html_content=content
    )
    
    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)  # Initialize SendGrid client
    
    response = sg.send(message)  # Send the email using the initialized client
    
    # Check the response status code directly
    if response.status_code == 200:
        return True  # Email sent successfully
    else:
        print(f"Failed to send email. Status code: {response.status_code}")
        return False  # Email failed to send
