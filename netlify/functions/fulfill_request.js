let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()

  let body = JSON.parse(event.body)
  let requestId = body.requestId

  await db.collection('requests').doc(requestId).delete()
  console.log(`deleted request with ID ${requestId}`)

  return {
    statusCode: 200,
    body: JSON.stringify({success: true})
  }

}