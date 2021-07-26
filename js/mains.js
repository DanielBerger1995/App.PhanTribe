"use strict";

let _trials = [];






function init() {
    _userRef.doc(_currentUser.uid).onSnapshot({
        includeMetadataChanges: true

    }, function (userData) {
        if (!userData.metadata.hasPendingWrites && userData.data()) {
            _currentUser = {
                ...firebase.auth().currentUser,
                ...userData.data()
            };
            console.log(_currentUser.NewTrial);

        }
        appendTrials(_currentUser.NewTrial);
    }

    );

}




// append events to the DOM
function appendTrials(trials) {
    let htmlTemplate = "";
    for (let trial of trials) {



        console.log(trial);
        htmlTemplate += `
        <article>
        
                <h2>${trial.name}</h2>
                
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
    _userRef.doc(_currentUser.uid).set({
        NewTrial: firebase.firestore.FieldValue.arrayUnion(newEvent)
    }, {
        merge: true
    });

    navigateTo("home");

}




















