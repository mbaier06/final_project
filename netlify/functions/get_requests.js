let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let requestData = []                               //creates empty array

  
  return {
    statusCode: 200,
    body: JSON.stringify(requestData)
  }
}