$(document).ready(function() {
    $.ajax({
        url: "https://www.wikiart.org/en/app/Search/ArtistAdvancedSearch/?isAjax=true&layout=new&dictIdsJson=%5B%2257726b50edc2cb3880ad7290%22,%2257726b50edc2cb3880ad7318%22,%2257726b50edc2cb3880ad7310%22,%2257726b50edc2cb3880ad7378%22,%2257726b50edc2cb3880ad7420%22%5D&layout=new&maxYear=1890&minYear=-50000&page=1&resultType=masonry"
    }).then(function(data) {
        $.each(data, function(key,value) {
            console.log(key+": "+value);
        }); 
    });
});