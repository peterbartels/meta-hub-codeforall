require('dotenv').config()
console.log('qqqqqqqqqqqqqqqq', process.env.FIRESTORE_CLIENT_EMAIL)

const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.js");

const serverless = require('serverless-http');
const Koa = require('koa'); 
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

//firebase-adminsdk-45qby@hacker-hub.iam.gserviceaccount.com
if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hacker-hub.firebaseio.com"
  });
}

const db = admin.firestore()
const app = new Koa();
const router = new Router();

const getUserDocByEmail = async (email) => {
  const usersRef = db.collection('users')

  const allUsersSnapshot = await usersRef
    .where('email', '==', email)
    .get()

  const [ user ] = allUsersSnapshot.docs;
  return user
}

const getAllUsers = async () => {
  const usersRef = db.collection('users')

  const allUsersSnapshot = await usersRef.get()

  //remove email (due to privacy reasons it should not be included in the frontend)
  return allUsersSnapshot.docs.map(user => ({
    ...user.data(),
    email: undefined
  }))
}

router
  .get('/.netlify/functions/api/account/me', async (ctx, next) => {
    ctx.body = (await getUserDocByEmail(ctx.request.query.email)).data()
  })
  .get('/.netlify/functions/api/users/', async (ctx, next) => {
    ctx.body = await getAllUsers()
  })
  .post('/.netlify/functions/api/users/', async (ctx, next) => {
    await db.collection('users').add(ctx.request.body)
    ctx.body = {
      status: 'success',
      json: ctx.request.body.json
    }
  })
  .put('/.netlify/functions/api/users/', async (ctx, next) => {
    const userDoc = await getUserDocByEmail(ctx.request.query.email)
    await db.collection("users").doc(userDoc.id).update(ctx.request.body)
    ctx.body = {
      status: 'success'
    }
  })

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

module.exports.handler = serverless(app);

/*  TODO: see if this is useful:
   const handler = serverless(app);

   module.exports.handler = async (event, context, callback) => {

   // you can do other things here
   const result = await handler(event, context);
   // and here
   return result;
   };
 */
