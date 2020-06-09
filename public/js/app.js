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

$("#saveNote").click(function () {
    let id = $(this).attr("data-id");
    console.log(id);

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    }).then(function () {
        $(".modal").empty();
        console.log("note saved");
        location.reload();
    });
    $("#titleInput").val("");
    $("#bodyInput").val("");
});

var modal = document.querySelector(".modal");
var modalbtn = document.querySelector(".modalbtn");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    $("#id").empty();
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