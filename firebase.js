import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import config from './messenger-test-5c22f-firebase-adminsdk-ut5yp-9a60cf718c.json'


initializeApp(
  {credential: credential.cert(config)}
)

const validateIdToken = async (idToken) => {
  const decodeToken = await getAuth().verifyIdToken(idToken)
  return decodeToken
}
module.exports = { validateIdToken }