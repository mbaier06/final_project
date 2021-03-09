let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let requestsData = []                               //creates empty array

  let requestQuery = await db.collection('requests').orderBy('requestTime').get()
  let requests = requestQuery.docs

  for (let i=0; i < requests.length; i++) {
    let requestId = requests[i].id
    console.log(requestId)
    let requestData = requests[i].data()

    console.log(requestData)
  
    requestsData.push({
    userId: requestData.userId,
    requestorName: requestData.requestorName,
    courseName: requestData.courseName,
    holeNumber: requestData.holeNumber,
    requestTime: requestData.requestTime,
    requestId: requestId
    })
  }
  return {
    statusCode: 200,
    body: JSON.stringify(requestsData)
  }
}