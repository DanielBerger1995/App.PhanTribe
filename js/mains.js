"use strict";

const _eventRef = _db.collection("Events");
let _selectedImgFile = "";
let _events = [];
let _selectedEventId = "";
let _firebaseUI;

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // if user exists and is authenticated
        userAuthenticated(user);
    } else { // if user is not logged in
        userNotAuthenticated();
    }
});

function userAuthenticated(user) {
    appendUserData(user);
    hideTabbar(false);
    showLoader(false);
}

function userNotAuthenticated() {
    hideTabbar(true);
    showPage("login");

    // Firebase UI configuration
    const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '#home'
    };
    // Init Firebase UI Authentication
    if (!_firebaseUI) {
        _firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
    }
    _firebaseUI.start('#firebaseui-auth-container', uiConfig);
    showLoader(false);
}

// show and hide tabbar
function hideTabbar(hide) {
    let tabbar = document.querySelector('#tabbar');
    if (hide) {
        tabbar.classList.add("hide");
    } else {
        tabbar.classList.remove("hide");
    }
}


// sign out user
function logout() {
    firebase.auth().signOut();
}

function appendUserData(user) {
    console.log(user);
    document.querySelector('#user-data').innerHTML = `
    <img class="profile-img" src="${user.photoURL || "img/placeholder.jpg"}">
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}





_eventRef.onSnapshot(function (snapshotData) {
    _events = [];
    snapshotData.forEach(function (doc) {
        let event = doc.data();
        event.id = doc.id;
        _events.push(event);
    });
    appendEvents(_events);
});





// append events to the DOM
function appendEvents(events) {
    let htmlTemplate = "";
    for (let event of events) {
        console.log(event);
        htmlTemplate += `
        <article>
        
          
                <h2>${event.name}</h2>
                
        </article>
        `;
    }

    document.querySelector('#event-container').innerHTML = htmlTemplate;

}














// ========== CREATE ==========
// add a new user to firestore (database)
function create() {
    // references to the input fields
    let nameInput = document.querySelector('#name');

    let newEvent = {
        name: nameInput.value,

    };

    _eventRef.add(newEvent);
    navigateTo("home");

}

