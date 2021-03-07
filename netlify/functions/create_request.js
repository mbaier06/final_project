let firebase = require('./firebase')

exports.handler = async function(event) {
    let db = firebase.firestore()
  
    let request = JSON.parse(event.body)
    let requestUser = request.requestorName
    let courseName = courseName
    let holeNumber = holeNumber
    
    let newRequest = {
        requestorName: requestUser,
        courseName: courseName,
        holeNumber: holeNumber,
        requestTime: firebase.firestore.FieldValue.serverTimestamp()
    }

    let docRef = await db.collection('requests').add(newRequest)
    console.log(docRef)
    newRequest.id = docRef.id
    
  
    return {
      statusCode: 200,
      body: JSON.stringify(newRequest)
    }
  
  }