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
                upvoteArea = $(this).children('.upvote-container').children('.likecount');
                upvoteCount = parseInt(upvoteArea.text());
                dislikeArea = $(this).children('.upvote-container').children('.dislikecount');
                dislikeCount = parseInt(dislikeArea.text());
                console.log(dislikeCount);
                console.log($(this));

                //Adds to the count if the data comes back as true
                if($(this).parent().attr('blog-id') == upvotes.post_id && upvotes.upvotes){
                    upvoteCount++;
                    upvoteArea.text(upvoteCount);
                }

                if($(this).parent().attr('blog-id') == upvotes.post_id && upvotes.downvotes){
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