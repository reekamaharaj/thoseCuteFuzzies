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

$(".addNote").click(function () {
    let id = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            title: "Add this for testing",
            body: "Testing if this works",
        }
    }).then(function (data) {
        console.log(data);
    });
});

// $(".note").click(function () {
//     let id = $(this).attr("data-id");
//     console.log(id);

//     $.ajax({
//         method: "GET",
//         url: "/articles/" + id
//     }).then(function (data) {
        
//         console.log(data);
//     });
// });
