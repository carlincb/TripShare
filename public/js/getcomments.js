$.ajax({
    url: window.location.href + 'api/comments',
    dataType: 'json',
    type: 'GET',

    success: function(result){
        console.log(result);
        result.forEach(comment => {

        });
    },

    error: function(){
        alert("Failed to load comments.");
    }
})