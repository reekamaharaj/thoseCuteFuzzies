$(".fa-star").click(function() {
    $(this).toggleClass("fas far");
    
    let id = $(this).attr("data-id");
    console.log(id);
    
    let state = $(this).attr("data-state");
    if (state === "false"){
        $(this).attr("data-state", "true");
        state = "true";
        console.log("true");
        $.ajax("/save/" + id, {
            type: "POST",
            saved: state
        }).then(
            function() {
                // location.reload();
            });
    } else {
        $(this).attr("data-state", "false");
        state = "false";
        console.log("false");
        $.ajax("/save/" + id, {
            type: "DELETE",
            saved: state
        }).then(
            function() {
                // location.reload();
            });
    }
});