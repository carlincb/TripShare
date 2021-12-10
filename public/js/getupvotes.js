$.ajax({
    url: window.location.href + 'api/upvotes',
    dataType: 'json',
    type: 'GET',

    success: function(result){
        console.log(result);
        result.forEach(upvotes => {
            $('.blog-block').each(function(){
                console.log($(this).parent().attr('blog-id'));
                if($(this).parent().attr('blog-id') == upvotes.blog_id){
                    $(this).children('.upvote-container .like-btn').text(upvotes.upvotes);
                    $(this).children('.upvote-container .dislike-btn').text(upvotes.downvotes);
                }
            })
        });
    },

    error: function(){
       // alert("Failed to load comments.");
    }
})