$('.comment-btn').click(() => {
    var commentText = $(this).siblings('textarea').text();

    $.ajax({
        url: "",
        dataType: "json",
        method: "post",
        data: {

        },

        success: () => {
            
        }
    })
})