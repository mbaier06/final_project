
firebase.auth().onAuthStateChanged(async function(user) {
  let db = firebase.firestore()
  if (user) {
    // Signed in
    console.log('signed in')
    
  
    document.querySelector('.home-link').innerHTML = `
      <a href="index.html" id="index" class="pl-6 inline-block ml-auto text-sm text-blue-500 underline p-4 text-left">Home</a>
    `

    //Sign out Button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <button class="text-green-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    // Get request to pull golf coursename from back-end to populate the non-All & User-specific filter buttons
    let response = await fetch('/.netlify/functions/get_course')
    let courses = await response.json()
    console.log(courses)
    
    //render course names on filter buttons on page using renderCourseName function written at bottom of this page
    for (let i=0; i<courses.length; i++) {
      let course = courses[i]
      // let courseId = course.id
      let courseName = course.name
      // let courseImage = course.imageUrl
      renderCourseName(courseName)
    }

    //Making selected filter button "active"
    document.querySelector(`.filters .filter-button`).addEventListener('click', async function(event) {
      event.preventDefault()
      console.log(`${courseName} was clicked!`)
      let courseButtons = document.querySelectorAll(`.course-button`)
      console.log(courseButtons.length)
      // document.querySelectorAll(`.course-button`).remove('outline-black', 'bg-green-600')
      for (j = 0; j < courseButtons.length; j++) {
        let courseButton = courseButtons[j]
        courseButton.classList.remove('outline-black', 'bg-green-600')
      }
      document.querySelector(`.course-${courseId} .course-button`).classList.add('outline-black', 'bg-green-600')
    })

    let requestResponse = await fetch('/.netlify/functions/get_requests')
    let requests = await requestResponse.json()
    for (let i=0; i < request.length; i++) {
      let request = requests[i]
      renderRequest(request.requestorName, request.courseName, request.holeNumber, request.requestTime)
    }
  
  } else {
    // Signed out
    console.log('signed out')

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


//render course name function for filter buttons
async function renderCourseName(courseName) {
  document.querySelector('.filters').insertAdjacentHTML('beforeend', `
    <div class="text-center"><a href="#" id="course-filter" class="filter-button inline-block border-2 border-green-500 rounded px-4 py-2">${courseName}</a>
  `)}

// render cousres function to be called above
async function renderRequest(requestorName, courseName, holeNumber, requestTime) {
  document.querySelector('.requests').insertAdjacentHTML('beforeend', `
    <div class="border-4 p-4 my-4 text-left">
      <h2 class="text-2xl py-1>${requestorName}</h2>
      <p class="text-lg">${courseName}</p>
      <p class="text-lg>Hole ${holeNumber}</p>
      <p>Request time ${requestTime}</p>
    </div>
  `)
}

  // event listner for course selection to highlight the clicked course - Could not figure out not to implement this code
  // document.querySelector(`.${courseName} .course-button`).addEventListener('click', async function(event) {
  //   event.preventDefault()
  //   document.querySelector(`.${courseName} .course-button`).classList.add('outline-black')
  // })