// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions'

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
  console.log('Hello Console!')
  response.send("Hello from another planet!")
})


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
export const addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({ original: original }).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString())
  })
})
