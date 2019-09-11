# Ebay Alets

## Requirements

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Running the project

To run this project, clone and run the docker-compose command:
```
git clone https://github.com/DiegoTeles/ebay-alerts
cd ebay-alerts
cp back/.env.example back/.env

************************************
ADD YOUR OWN EBAY KEYS TO THE ENV
EBAY_APP_KEY=key
EBAY_DEV_KEY=key
EBAY_CERT_KEY=key
EBAY_ENDPOINT=key
************************************

docker-compose -f docker-compose.yml up
```

After that, the API will be available at [http://localhost:3001](http://localhost:3001) and the web interface will be available at [http://localhost:3000](http://localhost:3000)

PS.: For any reason the `MongoDB` container is taking way too long to start, if that happens, please restart the `ebay-alert-back` container

## What I used

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for container managment
- [Node.js](https://nodejs.org/en/) for backend
  - [Express](http://expressjs.com/pt-br/) as router
  - [Node Mailer](https://nodemailer.com/about/) for sending emails
  - [Node Cron](https://github.com/merencia/node-cron) for the cron scheduling
- [React](https://reactjs.org/) for the frontend
  - [Create React App](https://github.com/facebook/create-react-app) as boilerplate
  - [Redux-Saga](https://redux-saga.js.org/) as state container
- [MongoDB](https://docs.mongodb.com/) as database
- [Mailtrap](https://mailtrap.io/) as SMTP server
- [Redis](https://redis.io/) as cache

Unfortunatelly I was unable to create any test, due to the deadline

Create auth interface and automate tests ;/

# How to check the e-mails

1. Create on account in [Mailtrap](https://mailtrap.io/)
2. Go to link **Demo Inbox** 
3. In menu **Integrations** select **node.js**
4. Copy your keys and paste in *.env* file in back project


You can check the running process as well by tailing the log via:
```
docker logs ebay-alert-back -f
```

