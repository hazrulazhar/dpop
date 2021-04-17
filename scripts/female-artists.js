$(document).ready(function() {
    $.ajax({
        url: "wikiart.php?request=female-artists-list"
    }).then(function(data) {
        var artists = $.parseJSON(data);
        console.log(artists.Artists);

        $.each(artists, function(key, value) {
            var a = 0;
            $.each(value, function(k,v) {
                console.log(k);    
                console.log(v.title);
                
                if(k%3==0) {
                    $("#artists").append("<div id='col-"+k+"' class='columns'></div>");
                    a = k;
                }

                $("#col-"+a).append("<div class='artistListItem column is-one-third'><a href='artist.html?artistUrl="+v.artistUrl+"&artistId="+v.id+"'><img src='"+v.image+"' /><br />"+v.title+"</a></div>");

            })
        });
    });
});