$(".fa-star").click(function () {
    $(this).toggleClass("fas far");

    let id = $(this).attr("data-id");
    console.log(id);

    let state = $(this).attr("data-state");
    if (state === "false") {
        $(this).attr("data-state", "true");
        state = "true";
        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
            data: {
                saved: true,
            },
        }).then(function () {
            location.reload();
        });
        console.log("true");
    } else {
        $(this).attr("data-state", "false");
        state = "false";
        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
            data: {
                saved: false,
            },
        }).then(function () {
            location.reload();
        });
        console.log("false");
    }
});

var modal = document.querySelector(".modal");
var modalbtn = document.querySelector(".modalbtn");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

modalbtn.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);






// $(".note").click(function () {
//     console.log("clicked");
//     let id = $(this).attr("id");
//     var modal = document.querySelector(".modal");
//         var note = document.querySelector(".note");
//         var closeButton = document.querySelector(".close-button");

//         function toggleModal() {
//             modal.classList.toggle("show-modal");
//         }

//         function windowOnClick(event) {
//             if (event.target === modal) {
//                 toggleModal();
//             }
//         }

//         note.addEventListener("click", toggleModal);
//         closeButton.addEventListener("click", toggleModal);
//         window.addEventListener("click", windowOnClick);
    
// });

// $.ajax({
//     method: "GET",
//     url: "/articles/" + id,
// }).then(function (data) {

//     console.log(data);

//     if (data.note) {
//         console.log("There is a note");
        
//     } else {
//         console.log("No notes");
//     }
// });