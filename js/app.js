function getWikipediaArticles() {
    //https://www.mediawiki.org/wiki/Extension:TextExtracts
    var searchString = "A";
    var apiSearchURL = "https://en.wikipedia.org/w/api.php" + 
                                        "?format=json" +
                                        "&action=query" +
                                        "&generator=search" +
                                        "&gsrnamespace=0" + // default (no namespace)
                                        "&gsrlimit=10" +
                                        "&prop=pageimages|extracts" +
                                        "&pilimit=max" + // page images generated
                                        "&exintro" + // returns only content before the first section
                                        "&explaintext" + // returns plaintext instead of HTML
                                        "&exsentences=1" +
                                        "&exlimit=max" +
                                        "&gsrsearch=" + searchString; 
    console.log(apiSearchURL);

}

getWikipediaArticles();

$(document).ready(function() {
    $('.wiki-button').click(function(e) {
        console.log('search');
    });

});