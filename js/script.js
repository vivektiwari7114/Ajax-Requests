
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $wikiHead = $('#wikipedia-header');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $street = $('#street').val();
    var $city = $('#city').val();
    var combinedURL = '&location=' +$street +', '+$city;
    var size = 'size=600x300';
    var completeURL = 'http://maps.googleapis.com/maps/api/streetview?' + size + combinedURL;
$body.append(' <img class="bgimg" alt="google images" src = "' + completeURL + '" >' );
    
     // NYT Jquery
   
    var NYTurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    NYTurl = NYTurl + '?api-key:"80a5fecd060b47749e7af9d117207794"';
    
    $.getJSON(NYTurl, function(data){
       var contents = data.response.docs;
        for(var i=0; i < contents.length; i++){
           
            var data = '<li><a href ="' + contents[i].web_url + '"> <p> '+contents[i].snippet+'</p> </li>';
            $nytElem.append(data);
            
        }
        
        
        
       
    }).error(function(e){
       $nytHeaderElem.text("Not able to Load the data");
        
    });
    

    // YOUR CODE GOES HERE!
    
    // NYT Jquery
    var clearTimeoutVariable = setTimeout(function(){
        $wikiElem.text("Not able to Load");
         $wikiHead.text("Not able to Load");
    }, 4000);
    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city + '&format=json&callback=wikiCallback';
   $.ajax({
       url: wikiURL,
       dataType:"jsonp",
       success : function(data){
           console.log(data);
           var content = data[3];
           var link = data[1];
           for(var i=0; i < content.length; i++){
           
            var data = '<li><a href ="' + content[i] + '"> <p> '+link[i]+'</p> </li>';
            $wikiElem.append(data);
            
        }
           clearTimeout(clearTimeoutVariable);
           
       }
       
       
       
   });
    

   return false;
};

$('#form-container').submit(loadData);
