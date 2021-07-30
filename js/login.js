"use strict";

// ========== GLOBAL VARIABLES ========== //
const _userRef = _db.collection("user")
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
    hideTabbar(false);
    init();
    showLoader(false);

}


//=== New user authentication through email and FB ===/
function userNotAuthenticated() {
    _currentUser = null; // reset _currentUser
    hideTabbar(true);
    showPage("login");
    // Firebase UI configuration
    const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,

        ],
        signInSuccessUrl: '#home'
    };
    // Init Firebase UI Authentication
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    showLoader(false);
}

//=== sign out user ===//
function logout() {
    firebase.auth().signOut();
}





// ===== TABBAR NAVIGATION ====//

//=== show and hide tabbar ===//
function hideTabbar(hide) {
    let tabbar = document.querySelector('#tabbar');
    if (hide) {
        tabbar.classList.add("hide");
    } else {
        tabbar.classList.remove("hide");
    }
}



