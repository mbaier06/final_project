let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let requestData = []                               //creates empty array

  let requestQuery = await db.collection('requests').orderby('requestTime').get()
  let requests = requestQuery.docs


// not sure if this is needed
  // for (let i=0, i<requests.length, i++) {
  //   let requestId = requests[i].id 
  //   let requestData = requests[i].data()
  // }
  
  return {
    statusCode: 200,
    body: JSON.stringify(requestData)
  }
}