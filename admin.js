const admin = require('firebase-admin');
const serviceAccount=require('./serviceAccountKey.json');
module.exports = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://app2pcon2k20.firebaseio.com"
  });