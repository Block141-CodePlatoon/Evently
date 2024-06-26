from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings

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
