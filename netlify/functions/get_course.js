let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let courseData = []                                   //creates empty array

  let querySnapshot = await db.collection('course').get() //grabs courses from firestore
  console.log(`Number of courses in collection: ${querySnapshot.size}`)
  let courses = querySnapshot.docs                       // the course documents themselves
  // loop through course docs
  for (i=0; i < courses.length; i++) {
    let courseId = courses[i].id
    let courseData = courses[i].data()
    console.log(courseData)

    //adds new object to courseData array
    courseData.push({
      id: courseId,
      name: courseData.name,
      imageUrl: courseData.imageUrl
    })
  }
  return {
    statusCode: 200,
    body: JSON.stringify(courseData)
  }
}