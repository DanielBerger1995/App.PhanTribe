"use strict";

let _trials = [];


const _trialRef = _db.collection("user");

_trialRef.onSnapshot(function (snapshotData) {
    _trials = [];
    snapshotData.forEach(function (doc) {
        let trial = doc.data();
        trial.id = doc.id;
        _trials.push(trial);
    });
    appendTrials(_trials);
});



// append events to the DOM
function appendTrials(trials) {
    let htmlTemplate = "";
    for (let trial of trials) {


        console.log(trial);
        htmlTemplate += `
        <article>
        
                <h2>${trial.NewTrial}</h2>
                
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




















