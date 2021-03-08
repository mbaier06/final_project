let firebase = require('./firebase')

exports.handler = async function(event) {
    let db = firebase.firestore()
  
    let request = JSON.parse(event.body)
    let userId = request.userId
    let requestUser = request.requestorName
    let courseName = request.courseName
    let holeNumber = request.holeNumber
    
    let newRequest = {
        userId: userId,
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