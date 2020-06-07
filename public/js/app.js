$(".fa-star").click(function () {
    $(this).toggleClass("fas far");

    let id = $(this).attr("data-id");
    console.log(id);

    let state = $(this).attr("data-state");
    if (state === "false") {
        $(this).attr("data-state", "true");
        state = "true";
        console.log("true");
    } else {
        $(this).attr("data-state", "false");
        state = "false";
        console.log("false");
    }
});

$(".notes").click(function () {
    let id = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            title: "Add this for testing",
            body: "Testing if this works"
        }
    })
        .then(function(data) {
            console.log(data);
        });
});
