
firebase.auth().onAuthStateChanged(async function(user) {
  let db = firebase.firestore()
  if (user) {
    // Signed in
    console.log('signed in')
    
  
    //Sign out Button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <button class="text-green-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

  
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




// render cousres function to be called above
async function renderCourse(courseName, courseImage) {
  document.querySelector('.course').insertAdjacentHTML('beforeend', `
    <div class="${courseName} md:w-1/3 p-6">
      <image src="${courseImage}" class="w-full rounded-lg">
      <a href="#" class="course-button block mx-auto font-bold text-xl bg-green-600 my-4 text-center rounded">${courseName}</a>
    </div>
  `)
}

  // event listner for course selection to highlight the clicked course - Could not figure out not to implement this code
  // document.querySelector(`.${courseName} .course-button`).addEventListener('click', async function(event) {
  //   event.preventDefault()
  //   document.querySelector(`.${courseName} .course-button`).classList.add('outline-black')
  // })