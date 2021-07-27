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
                <h2>${trial.description}</h2>
                <h2>${trial.date}</h2>
                
        </article>
        `;
    }

    document.querySelector('#event-container').innerHTML = htmlTemplate;
    document.querySelector('#eventz-container').innerHTML = htmlTemplate;

}



// ========== CREATE ==========
// add a new user to firestore (database)
function create() {
    // references to the input fields
    let nameInput = document.querySelector('#name');
    let descriptionInput = document.querySelector('#description');
    let dateInput = document.querySelector('#date');


    let newEvent = {
        name: nameInput.value,
        description: descriptionInput.value,
        date: dateInput.value,

    };
    _userRef.doc(_currentUser.uid).set({
        NewTrial: firebase.firestore.FieldValue.arrayUnion(newEvent)
    }, {
        merge: true
    });

    navigateTo("about");

}








var applied = localStorage.getItem("applied") == "true";
if (applied) {
    $('#createEvento').css('opacity', '0');
} else {
    $('#createEvento').css('opacity', '1');
}

$('#changeHome').click(function () {
    if (!applied) {
        $('#createEvento').css('opacity', '0');
        applied = true;
    } else {
        $('#createEvento').css('opacity', '1');
        applied = false;
    }
    localStorage.setItem("applied", applied);
});









