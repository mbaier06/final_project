
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
    
    //Get Request filter
    
    // let requestResponse = await fetch(`/.netlify/functions/get_requests`)
    // let requests = await requestResponse.json()
    // console.log(requests)
    // for (let i=0; i < requests.length; i++) {
    //   let request = requests[i]
    //   renderRequest(request.requestorName, request.courseName, request.holeNumber, request.requestTime)
      
    // }
  
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
      allFilter.classList.remove('bg-gray-500')
      }
      allRequestsFilter.classList.add('bg-gray-500')

      let requestResponse = await fetch(`/.netlify/functions/get_requests`)
      let requests = await requestResponse.json()
      console.log(requests)
      for (let i=0; i < requests.length; i++) {
        let request = requests[i]
        renderRequest(request.requestorName, request.courseName, request.holeNumber, request.requestTime)
        
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
        let user = request.requestorName
        if (user == firebase.auth().currentUser.displayName) {
          userArray.push(request)
        }       
      }

      for (a=0; a<userArray.length; a++) {
        let selectedUser = userArray[a]

        renderRequest(selectedUser.requestorName, selectedUser.courseName, selectedUser.holeNumber, selectedUser.requestTime)
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
        if (course== 'Augusta National') {
          augustaArray.push(request)
        }
      }
      for (a=0; a<augustaArray.length; a++) {
        let selectedCourse = augustaArray[a]
      
      console.log(augustaArray)
      renderRequest(selectedCourse.requestorName, selectedCourse.courseName, selectedCourse.holeNumber, selectedCourse.requestTime)
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
      for (a=0; a<pebbleArray.length; a++) {
        let selectedCourse = pebbleArray[a]
      
        renderRequest(selectedCourse.requestorName, selectedCourse.courseName, selectedCourse.holeNumber, selectedCourse.requestTime)
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
      for (a=0; a<pineArray.length; a++) {
        let selectedCourse = pineArray[a]
      
        renderRequest(selectedCourse.requestorName, selectedCourse.courseName, selectedCourse.holeNumber, selectedCourse.requestTime)
      }
    })
  }
 
// render courses function to be called above
async function renderRequest(requestorName, courseName, holeNumber, requestTime) {
  document.querySelector('.requests').insertAdjacentHTML('beforeend', `
    <div class="border-4 p-4 my-4 text-left">
      <h2 class="text-2xl py-1">${requestorName}</h2>
      <p class="text-lg">${courseName}</p>
      <p class="text-lg">Hole ${holeNumber}</p>
      <p class="text-md">${requestTime}</p>
    </div>
  `)
}

  