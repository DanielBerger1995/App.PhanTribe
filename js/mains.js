"use strict";

const _eventRef = _db.collection("Events");
let _selectedImgFile = "";
let _events = [];
let _selectedEventId = "";







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

