
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

    //Ensures filter button selected looks "active"
    filterActive()

    //Fulfilling (aka deleting) a golfer request
    // let requestResponse = await fetch(`/.netlify/functions/get_requests`)
    // let requests = await requestResponse.json()
    //   for (let i=0; i < requests.length; i++) {
    //     let request = requests[i]
    //     let requestId = request.id
    //     document.querySelector(`.requests`).insertadjacentHTML('beforeend', `
    //     <p class="text-md inline">Fulfilled?</p>
    //     <a href = "#" class="fulfilled inline p-1 text-sm bg-green-500 text-white">✓</a>
    //     `)
    //     document.querySelector(`.request-${requestId} .fulfilled`).addEventListener('click', async function(event) {
    //     event.preventDefault()
    //     document.querySelector('.fulfilled').classList.add('opactiy-20')
    //     await db.collection('requests').doc(requestId).delete()
    //     })
    //   }
  
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
  //filter active function which also calls user request arrays via renderRequest function & filtering logic
  async function filterActive() {
    let allFilters = document.querySelectorAll('.filter-button')
    let allRequestsFilter = document.querySelector('#all-filter')
    let userFilter = document.querySelector('#user-specific-filter')
    let augustaFilter = document.querySelector('#augusta-national-filter')
    let pebbleFilter = document.querySelector('#pebble-beach-filter')
    let pineFilter = document.querySelector('#pine-valley-filter')
    
    allRequestsFilter.addEventListener('click', async function(event){
      event.preventDefault()
      document.querySelector('.requests').innerHTML = ''
      console.log('All requests filter was clicked!')
      for (i=0; i < allFilters.length; i++) {
      let allFilter = allFilters[i]
      //Ensures dark/active background is removed from all buttons
      allFilter.classList.remove('bg-gray-500')
      }
      //adds dark/active background to only the selected filter button
      allRequestsFilter.classList.add('bg-gray-500')

      let requestResponse = await fetch(`/.netlify/functions/get_requests`)
      let requests = await requestResponse.json()
      console.log(requests)
      for (let i=0; i < requests.length; i++) {
        let request = requests[i]
        // Convert firestore timestamp to date
        let fireBaseTime = new Date(request.requestTime.seconds*1000 + request.requestTime.nanoseconds/1000000)
        let date = fireBaseTime.toDateString()
        let atTime = fireBaseTime.toLocaleTimeString()
        let requestDate = `${date} at ${atTime}`
        renderRequest(request.requestId, request.requestorName, request.courseName, request.holeNumber, requestDate)
      }
    })
    userFilter.addEventListener('click', async function(event){
      event.preventDefault()
      document.querySelector('.requests').innerHTML = ''
      console.log('User specific filter was clicked!')
      for (i=0; i < allFilters.length; i++) {
      let allFilter = allFilters[i]
      allFilter.classList.remove('bg-gray-500')
      }
      userFilter.classList.add('bg-gray-500')

      let requestResponse = await fetch(`/.netlify/functions/get_requests`)
      let requests = await requestResponse.json()
      console.log(requests)
      let userArray = []
      for (let i=0; i < requests.length; i++) {
        let request = requests[i]
        let user = request.userId
        if (user == firebase.auth().currentUser.uid) {
          userArray.push(request)
        }
      }
      console.log(userArray) 
      for (let a=0; a<userArray.length; a++) {
        let selectedUser = userArray[a]
        console.log(selectedUser)
          // Convert firestore timestamp to date
          let fireBaseTime = new Date(selectedUser.requestTime.seconds*1000 + selectedUser.requestTime.nanoseconds/1000000)
          let date = fireBaseTime.toDateString()
          let atTime = fireBaseTime.toLocaleTimeString()
          let requestDate = `${date} at ${atTime}`
          console.log(requestDate)
           
        renderRequest(selectedUser.requestId, selectedUser.requestorName, selectedUser.courseName, selectedUser.holeNumber, requestDate)
      }
      
    })
    augustaFilter.addEventListener('click', async function(event){
      event.preventDefault()
      document.querySelector('.requests').innerHTML = ''
      console.log(`Augusta National filter was clicked`)
      for (i=0; i < allFilters.length; i++) {
      let allFilter = allFilters[i]
      allFilter.classList.remove('bg-gray-500')
      }
      augustaFilter.classList.add('bg-gray-500')

      let requestResponse = await fetch(`/.netlify/functions/get_requests`)
      let requests = await requestResponse.json()
     
      let augustaArray = []
      for (let i=0; i < requests.length; i++) {
        let request = requests[i]
        let course = request.courseName
        if (course == 'Augusta National') {
          augustaArray.push(request)
        }
      }
      for (let a=0; a<augustaArray.length; a++) {
        let selectedCourse = augustaArray[a]
         // Convert firestore timestamp to date
         let fireBaseTime = new Date(selectedCourse.requestTime.seconds*1000 + selectedCourse.requestTime.nanoseconds/1000000)
         let date = fireBaseTime.toDateString()
         let atTime = fireBaseTime.toLocaleTimeString()
         let requestDate = `${date} at ${atTime}`
      
        console.log(augustaArray)
        renderRequest(selectedCourse.requestId, selectedCourse.requestorName, selectedCourse.courseName, selectedCourse.holeNumber, requestDate)
      }
    })
    pebbleFilter.addEventListener('click', async function(event){
      event.preventDefault()
      document.querySelector('.requests').innerHTML = ''
      console.log(`Pebble Beach filter was clicked`)
      for (i=0; i < allFilters.length; i++) {
      let allFilter = allFilters[i]
      allFilter.classList.remove('bg-gray-500')
      }
      pebbleFilter.classList.add('bg-gray-500')

      let requestResponse = await fetch(`/.netlify/functions/get_requests`)
      let requests = await requestResponse.json()
     
      let pebbleArray = []
      for (let i=0; i < requests.length; i++) {
        let request = requests[i]
        let course = request.courseName
        if (course== 'Pebble Beach') {
          pebbleArray.push(request)
        }
      }
      for (let a=0; a<pebbleArray.length; a++) {
        let selectedCourse = pebbleArray[a]
         // Convert firestore timestamp to date
         let fireBaseTime = new Date(selectedCourse.requestTime.seconds*1000 + selectedCourse.requestTime.nanoseconds/1000000)
         let date = fireBaseTime.toDateString()
         let atTime = fireBaseTime.toLocaleTimeString()
         let requestDate = `${date} at ${atTime}`
      
        renderRequest(selectedCourse.requestId, selectedCourse.requestorName, selectedCourse.courseName, selectedCourse.holeNumber, requestDate)
      }
    })
    pineFilter.addEventListener('click', async function(event){
      event.preventDefault()
      document.querySelector('.requests').innerHTML = ''
      console.log(`Pine Valley filter was clicked`)
      for (i=0; i < allFilters.length; i++) {
      let allFilter = allFilters[i]
      allFilter.classList.remove('bg-gray-500')
      }
      pineFilter.classList.add('bg-gray-500')

      let requestResponse = await fetch(`/.netlify/functions/get_requests`)
      let requests = await requestResponse.json()
     
      let pineArray = []
      for (let i=0; i < requests.length; i++) {
        let request = requests[i]
        let course = request.courseName
        if (course== 'Pine Valley') {
          pineArray.push(request)
        }
      }
      for (let a=0; a<pineArray.length; a++) {
        let selectedCourse = pineArray[a]
         // Convert firestore timestamp to date
         let fireBaseTime = new Date(selectedCourse.requestTime.seconds*1000 + selectedCourse.requestTime.nanoseconds/1000000)
         let date = fireBaseTime.toDateString()
         let atTime = fireBaseTime.toLocaleTimeString()
         let requestDate = `${date} at ${atTime}`
      
        renderRequest(selectedCourse.requestId, selectedCourse.requestorName, selectedCourse.courseName, selectedCourse.holeNumber, requestDate)
      }
    })
  }
 
// render courses function to be called above
async function renderRequest(requestId, requestorName, courseName, holeNumber, requestDate) {
  document.querySelector('.requests').insertAdjacentHTML('beforeend', `
    <div class="request-${requestId} border-4 p-4 my-4 text-left">
      <h2 class="text-2xl py-1">${requestorName}</h2>
      <p class="text-lg">${courseName}</p>
      <p class="text-lg">Hole ${holeNumber}</p>
      <p class="text-md">${requestDate}</p>
    </div>
  `)
}


//Fulfilling (aka deleting) a golfer request - would need to turn it into another fetch post
    // let requestResponse = await fetch(`/.netlify/functions/get_requests`)
    // let requests = await requestResponse.json()
    //   for (let i=0; i < requests.length; i++) {
    //     let request = requests[i]
    //     let requestId = request.id
    //     document.querySelector(`.requests`).insertadjacentHTML('beforeend', `
    //     <p class="text-md inline">Fulfilled?</p>
    //     <a href = "#" class="fulfilled inline p-1 text-sm bg-green-500 text-white">✓</a>
    //     `)
    //     document.querySelector(`.request-${requestId} .fulfilled`).addEventListener('click', async function(event) {
    //     event.preventDefault()
    //     document.querySelector('.fulfilled').classList.add('opactiy-20')
    //     await db.collection('requests').doc(requestId).delete()
    //     })
    //   }
