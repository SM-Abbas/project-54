# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Ensure the file exists before copying
RUN test -f requirements.txt || (echo "requirements.txt not found!" && exit 1)

# Copy the requirements file
COPY requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 8080

# Set environment variable
ENV PORT=8080

# Run the application
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
