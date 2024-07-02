# events/utils.py

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

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
