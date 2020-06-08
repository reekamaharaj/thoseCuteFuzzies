$(".fa-star").click(function () {
    $(this).toggleClass("fas far");

    let id = $(this).attr("data-id");
    console.log(id);

    let state = $(this).attr("data-state");
    if (state === "false") {
        $(this).attr("data-state", "true");
        state = "true";
        $.ajax({
            method: "POST",
            url: "/saved/" + id,
            data: {
                saved: true,
            },
        }).then(function (data) {
            console.log(data);
        });
        console.log("true");
    } else {
        $(this).attr("data-state", "false");
        state = "false";
        $.ajax({
            method: "POST",
            url: "/saved/" + id,
            data: {
                saved: false,
            },
        }).then(function (data) {
            console.log(data);
        });
        console.log("false");
    }
});

// $(".notes").click(function () {
//     let id = $(this).attr("data-id");

//     $.ajax({
//         method: "POST",
//         url: "/articles/" + id,
//         data: {
//             title: "Add this for testing",
//             body: "Testing if this works",
//         },
//     }).then(function (data) {
//         console.log(data);
//     });
// });
