$.ajax({
    url: window.location.href + 'api/upvotes',
    dataType: 'json',
    type: 'GET',

    success: function(result){
        console.log(result);
        result.forEach(upvotes => {
            //Sets up the upvote counts for each block
            $('.blog-block').each(function(){
                console.log($(this).parent().attr('blog-id'));
                upvoteArea = $(this).children('.upvote-container .like-btn')
                upvoteCount = parseInt(upvoteArea.text());
                dislikeArea = $(this).children('.upvote-container .dislike-btn');
                dislikeCount = parseInt(dislikeArea.text());

                //Adds to the count if the data comes back as true
                if($(this).parent().attr('blog-id') == upvotes.blog_id && upvotes.upvotes){
                    upvoteCount++;
                    upvoteArea.text(upvoteCount);
                }

                if($(this).parent().attr('blog-id') == upvotes.blog_id && upvotes.downvotes){
                    dislikeCount++;
                    dislikeArea.text(dislikeCount);
                }
            });
        });
    },

    error: function(){
       // alert("Failed to load comments.");
    }
})