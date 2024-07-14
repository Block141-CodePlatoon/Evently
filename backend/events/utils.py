# events/utils.py

import os
import logging
from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

def send_email(to_email, subject, content, from_email=settings.DEFAULT_FROM_EMAIL):
    try:
        send_mail(
            subject,
            content,
            from_email,
            [to_email],
            fail_silently=False,
            html_message=content, 
        )
        logger.info(f"Email sent to {to_email}")
    except Exception as e:
        logger.error(f"Error sending email to {to_email}: {e}")