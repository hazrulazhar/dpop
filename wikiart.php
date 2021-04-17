<?php

if ($_GET["request"]=="asian-artists-list") {
   $url = "https://www.wikiart.org/en/app/Search/ArtistAdvancedSearch/?isAjax=true&layout=new&dictIdsJson=%5B%2257726b50edc2cb3880ad7290%22,%2257726b50edc2cb3880ad7318%22,%2257726b50edc2cb3880ad7310%22,%2257726b50edc2cb3880ad7378%22,%2257726b50edc2cb3880ad7420%22%5D&layout=new&maxYear=1890&minYear=-50000&page=1&resultType=masonry";
   $get_data = callAPI('GET', $url, false);
   //$response = json_decode($get_data, true);
   echo $get_data;
}

if ($_GET["request"]=="female-artists-list") {
   $url = "https://www.wikiart.org/en/App/Search/female-artists?json=3&layout=new&page=1&resultType=masonry";
   $get_data = callAPI('GET', $url, false);
   //$response = json_decode($get_data, true);
   echo $get_data;
}

if ($_GET["request"]=="artist") {
   $url = "https://www.wikiart.org/".$_GET["artistUrl"]."?json=2";
   $get_data = callAPI('GET', $url, false);
   //$response = json_decode($get_data, true);
   echo $get_data;
}

if ($_GET["request"]=="artwork") {
   $url = "https://www.wikiart.org/en/api/2/PaintingsByArtist?id=".$_GET["artistId"];
   $get_data = callAPI('GET', $url, false);
   //$response = json_decode($get_data, true);
   echo $get_data;
}

function callAPI($method, $url, $data){
    $curl = curl_init();
    switch ($method){
       case "POST":
          curl_setopt($curl, CURLOPT_POST, 1);
          if ($data)
             curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          break;
       case "PUT":
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
          if ($data)
             curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
          break;
       default:
          if ($data)
             $url = sprintf("%s?%s", $url, http_build_query($data));
    }
    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
       'APIKEY: 111111111111111111111',
       'Content-Type: application/json',
    ));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    if(!$result){die("Connection Failure");}
    curl_close($curl);
    return $result;
 }

?>