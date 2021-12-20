
firebase.auth().onAuthStateChanged(async function(user) {
  let db = firebase.firestore()
  if (user) {
    // Signed in
    console.log('signed in')
    
    //Ensure signed-in user is in Firestore Users collection
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

    //Requests Link Webpage Navigation
    document.querySelector('.request-link').innerHTML = `
      <a href="requests.html" id="requests" class="pl-6 inline-block ml-auto text-sm text-green-500 underline p-4 text-left">Requests</a>
    `

    //Sign out Button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <div class="font-bold text-green-500 text-base text-center">Signed in as ${user.displayName}</div>
    <button class="text-green-500 underline sign-out text-center">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    // Get request to pull golf course data from back-end
    let response = await fetch('/.netlify/functions/get_course')
    let courses = await response.json()
    console.log(courses)
    
    //render courses on page using render course function written at bottom of this page
    for (let i=0; i<courses.length; i++) {
      let course = courses[i]
      let courseId = course.id
      let courseName = course.name
      let courseImage = course.imageUrl
      renderCourse(courseId, courseName, courseImage)
    }

    // Listen for form submit and create new request
  document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault()
    let requestUser = user.displayName
    let requestCourse = document.querySelector('#course-name').value 
    let requestHole = document.querySelector('#hole-location').value
    alert("Location has been submitted!"); 

    let response = await fetch('/.netlify/functions/create_request', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.uid,
        requestorName: requestUser,
        courseName: requestCourse,
        holeNumber: requestHole
      })
    })
    console.log(response)
    console.log(requestUser)
    console.log(requestCourse)
    console.log(requestHole)

  })
  
  } else {
    // Signed out
    console.log('signed out')

    // Hide the form and app blurb when signed-out
    document.querySelector('form').classList.add('hidden')
    document.querySelector('.blurb').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})


// calls course name and image from back-end and renders on web page
async function renderCourse(courseId, courseName, courseImage) {
  document.querySelector('.course').insertAdjacentHTML('beforeend', `
    <div class="course-${courseId} md:w-1/3 p-4">
      <image src="${courseImage}" class="w-full rounded-lg">
      <a class="block mx-auto font-bold text-xl bg-green-300 my-2 text-center rounded">${courseName}</a>
    </div>
  `)
}
