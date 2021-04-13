$(document).ready(function() {
    $.ajax({
        url: "wikiart.php?request=asian-artists-list"
    }).then(function(data) {
        var artists = $.parseJSON(data);
        console.log(artists.Artists);

        $.each(artists, function(key, value) {
            $.each(value, function(k,v) {
                console.log(k);    
                console.log(v.title);

                if(k%3==0) {
                    $("#artists").append("<div class='columns'>");
                }

                $("#artists").append("<div class='column is-one-third'>"+v.title+"</div>");

                if(k%3==0) {
                    $("#artists").append("</div>");
                }  
            })
        });
    });
});