
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
  
    //Sign out Button
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <button class="text-green-500 underline sign-out">Sign Out</button>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    // Get request to pull golf course data from back-end
    let response = await fetch('/.netlify/functions/get_course')
    let courses = await response.json()
    console.log(course)

    for (let i=0; i<courses.length; i++) {
      let course = courses[i]
      let courseId = course.id
      let courseName = course.name 
      let courseImage = course.imageUrl

      //render golf course name and image below
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
