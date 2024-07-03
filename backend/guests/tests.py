from django.test import TestCase

# Create your tests here.



from events.models import Event

class GuestModelTestCase(TestCase):
    def setUp(self):
        # Create a test Event
        self.test_event = Event.objects.create(
            name="Test Event",
            date="2024-06-30",
            location="Test Location"
        )

        # Create a test Guest linked to the Event
        self.test_guest = Guest.objects.create(
            name="John Doe",
            email="john.doe@example.com",
            event=self.test_event
        )

    def test_guest_creation(self):
        """
        Test the creation of a Guest and its relation to an Event.
        """
        self.assertEqual(self.test_guest.name, "John Doe")
        self.assertEqual(self.test_guest.email, "john.doe@example.com")
        self.assertEqual(self.test_guest.event, self.test_event)

    def test_guest_string_representation(self):
        """
        Test the string representation of the Guest model.
        """
        self.assertEqual(str(self.test_guest), "John Doe")

    def test_event_guests_relation(self):
        """
        Test the relationship between Event and Guest.
        """
        self.assertIn(self.test_guest, self.test_event.guests.all())