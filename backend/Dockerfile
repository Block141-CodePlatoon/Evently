# Use an official Python runtime as a parent image
FROM python:3.11-buster

# Set environment variables to prevent Python from writing .pyc files and buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /src

# Copy the current directory contents into the container at /code
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Define the command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "evently.wsgi:application"]
