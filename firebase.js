import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import config from './messenger-test-5c22f-firebase-adminsdk-ut5yp-9a60cf718c.json'


initializeApp(
  {credential: credential.cert(config)}
)

const validateIdToken = (idToken) => {
  getAuth().verifyIdToken(idToken).then(res => {
    console.log(res)
    return res
  }).catch(e => console.error(e))
}
module.exports = { validateIdToken }