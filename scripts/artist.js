var requestUrl = "wikiart.php?request=artist&artistUrl="+getUrlVars()["artistUrl"];

console.log(requestUrl);

$(document).ready(function() {
    $.ajax({
        url: requestUrl
    }).then(function(data) {
        var artistDetail = $.parseJSON(data);
        console.log(artistDetail);

        $("#artist-name").empty().append(artistDetail.artistName);
        $("#artist-photo").empty().append("<img src='"+artistDetail.image+"' />");
        $("#artist-data").empty().append("<p>Born: "+artistDetail.birthDayAsString+"<br />Died: "+artistDetail.deathDayAsString);
        $("#artist-biodata").empty().append(artistDetail.biography+"<br /><br /><a href='"+artistDetail.story+"'>"+artistDetail.story+"</a>");
    });
});

var requestArt = "wikiart.php?request=artwork&artistId="+getUrlVars()["artistId"];

console.log(requestArt);

$(document).ready(function() {
    $.ajax({
        url: requestArt
    }).then(function(data) {
        var artworks = $.parseJSON(data);
        //console.log(artworks);

        $.each(artworks.data, function(k, v) {
            console.log(v.image);
            console.log(v.title);

            if(k%3==0) {
                $("#artist-artwork").append("<div id='col-"+k+"' class='columns'></div>");
                a = k;
            }

            $("#col-"+a).append("<div class='artistListItem column is-one-third'><a href='styletransfer.html'><img src='"+v.image+"' /><br />"+v.title+"</a></div>");

        });

    });
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}