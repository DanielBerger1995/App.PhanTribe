"use strict";







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
        appendDetails(_currentUser.NewTrial);
    }

    );

}




// append events to the DOM
function appendDetails(details) {
    let htmlTemplate = "";
    for (let detail of details) {



        console.log(detail);
        htmlTemplate += `
        <article>
        
                <h2 class="eventT">${detail.name}</h2>
                <h2>Starts on: ${detail.date}</h2>
                <p>${detail.description}</p>
                
                <h2>${detail.category} Event</h2>
<p>What next?</p>
<p>Share the codes below to the 10 lucky individuals.
<br>   Download the App on google play or the app store and have a blast! 
<br>Goodluck and Let the best team win!</p>

 <div class="codewrap">

      <div class="codein">
        <div>U4FNL</div>
        <div>X98JQ</div>
        <div>55Y8P</div>
        <div>MYA3L</div>
        <div>BB62S</div>
      </div>
      <div class="codein">
        <div>P96YT</div>
        <div>HWL21</div>
        <div>32LLK</div>
        <div>7SZXU</div>
        <div>QWB54</div>
      </div>
    </div>
               <a href="#home"> <button class="button1">Finish</button></a>
        </article>
        `;
    }

    document.querySelector('#event-container').innerHTML = htmlTemplate;


}


// append events to the DOM
function appendTrials(trials) {
    let htmlTemplate = "";
    for (let trial of trials) {



        console.log(trial);
        htmlTemplate += `
        <article>
        
                <h2>${trial.name}</h2>
                
                <h2>${trial.date}</h2>
                

                
        </article>
        `;
    }


    document.querySelector('#eventz-container').innerHTML = htmlTemplate;

}
// ========== CREATE ==========
// add a new user to firestore (database)
function create() {
    // references to the input fields
    let nameInput = document.querySelector('#name');
    let descriptionInput = document.querySelector('#description');
    let dateInput = document.querySelector('#date');
    let categoriesInput = document.querySelector('#categories');



    let newEvent = {
        name: nameInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
        category: categoriesInput.value,

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
    $('#tored').css('background-color', '#D75D4D');
    $('#oneChange').text('0');
} else {
    $('#createEvento').css('opacity', '1');
    $('#tored').css('background-color', '#239F4D');
    $('#oneChange').text('1 Free Event Trial');
}

$('#changeHome').click(function () {
    if (!applied) {
        $('#createEvento').css('opacity', '0');
        $('#tored').css('background-color', '#D75D4D');
        $('#oneChange').text('0');
        applied = true;
    } else {
        $('#createEvento').css('opacity', '1');
        $('#tored').css('background-color', '#239F4D');
        $('#oneChange').text('1 Free Event Trial');
        applied = false;
    }
    localStorage.setItem("applied", applied);
});

$(".div").on("click", function (e) {
    $("select").val($(this).data("value"));
});

$('#a').click(function () {
    $('#a').addClass("border");
    $('#b').removeClass("border");
    $('#c').removeClass("border");
});

$('#b').click(function () {
    $('#a').removeClass("border");
    $('#b').addClass("border");
    $('#c').removeClass("border");
});

$('#c').click(function () {
    $('#a').removeClass("border");
    $('#b').removeClass("border");
    $('#c').addClass("border");
});

$('#start_date').change(function () {
    $('#end_date').val(Add7Days());
});



