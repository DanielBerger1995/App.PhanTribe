"use strict";

// ========== GLOBAL VARIABLES ========== //

let _currentUser;


// ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // if user exists and is authenticated
        userAuthenticated(user);
    } else { // if user is not logged in
        userNotAuthenticated();
    }
});

// === Authenticated user SPA behaviour ==== //
function userAuthenticated(user) {
    _currentUser = user;
    console.log(user);


    // Appending currentUser name ans surname to HTML
    document.getElementById("hello").innerHTML += user.displayName;

    document.getElementById("name").innerHTML =
        `<h2>${user.displayName}</h2>`;

}


//=== New user authentication through email and FB ===/
function userNotAuthenticated() {
    _currentUser = null; // reset _currentUser
    // Firebase UI configuration
    const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        signInSuccessUrl: '../index.html'
    };
    // Init Firebase UI Authentication
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
}

//=== sign out user ===//
function logout() {
    firebase.auth().signOut();
    navigateToLogin("login");

}

// navigate to a new view/page by changing href
function navigateToLogin(pageId) {
    location.href = "../subpages/login.html"
}

//=== Init function for whole SPA ===//
function init() {
    // init user data
    _userRef.doc(_currentUser.uid).onSnapshot({
        includeMetadataChanges: true
    }, function (userData) {
        if (!userData.metadata.hasPendingWrites && userData.data()) {
            _currentUser = {
                ...firebase.auth().currentUser,
                ...userData.data()
            }; //concating two objects: authUser object and userData objec from the db
        }
    });
}
