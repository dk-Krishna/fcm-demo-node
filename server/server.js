const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();
const port = 2000;

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require("./fir-app-bcd5c-firebase-adminsdk-kdhqh-4a3500cd2f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json());

app.post("api/register", (req, res) => {
  const { token } = req.body;
  console.log("Received token:", token);

  res.status(200).send('Token received successfully');
});

app.post("api/send-notification", (req, res) => {
  // Handle the received token and send push notification
  const { token, message } = req.body;

  admin
    .messaging()
    .send({
      token,
      notification: {
        title: "Notification Title",
        body: message,
      },
    })
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending notification");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
