# Use an official Ubuntu Xenial as a parent image
FROM ubuntu:16.04

# Install Node.js 8 and npm 5
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y build-essential
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container
ADD . /app

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 8080 available outside this container
EXPOSE 8080

# Run `npm start` when the container launches
#CMD ["npm", "start"]
