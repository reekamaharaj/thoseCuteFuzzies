$(".fa-star").click(function () {
    $(this).toggleClass("fas far");

    let id = $(this).attr("data-id");

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

    }
});

$("#saveNote").click(function () {
    let id = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    }).then(function () {
        $(".modal").empty();

        location.reload();
    });
    $("#titleInput").val("");
    $("#bodyInput").val("");
    $(".title").val("");
});

$(".modalbtn").click(function(){
    let id = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + id,

    }).then(function (data) {
        if (data){
            let title = `<p>Notes</p>`;
            $(".note").append(title);

            for (let i =0; i < data.note.length; i++){
                let note = `<div class="shadow-md"> <div class="tab w-full overflow-hidden border-t"> <input class="absolute opacity-0" id="tab-single-${[i]}" type="radio" name="tabs2"> <label class="block p-5 leading-normal cursor-pointer text-sm" for="tab-single-${[i]}">${data.note[i].title}</label> <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-blue-500 leading-normal text-xs"> <p class="p-2">${data.note[i].body}</p> </div> </div> </div>`;
                $(".notes").append(note);
            }
            dropDown();
        }
        else {
            $(".notes").append("There are no notes! You should add something.");
        }
        $(".title").text(data.title)
        $(".save").attr("data-id", data._id);
    })
    toggleModal();
});

$(".close-button").click(function(){
    toggleModal();
});


let modal = document.querySelector(".modal");
function toggleModal() {
    $("#id").empty();
    $(".notes").empty();
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function dropDown(){
    var myRadios = document.getElementsByName('tabs2');
    var setCheck;
    var x = 0;
    for (x = 0; x < myRadios.length; x++) {
        myRadios[x].onclick = function () {
            if (setCheck != this) {
                setCheck = this;
            } else {
                this.checked = false;
                setCheck = null;
            }
        };
    }
}
