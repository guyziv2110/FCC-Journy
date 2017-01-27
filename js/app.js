function getWikipediaArticles(searchString) {
    //https://www.mediawiki.org/wiki/Extension:TextExtracts
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
                                        
    return $.ajax({
        url: apiSearchURL,
        dataType: "jsonp"
    });
    console.log(apiSearchURL);

}

$(document).ready(function() {
    var isFirstLoadMode = true;
    $('.wiki-search-button').click(function(e) {
        if(isFirstLoadMode && hasSearchInput()) {
            $('.after-search-mode').css('opacity', '1');
            $('.first-load-mode').css({'opacity':'0', display: 'none'});
            var wikiSearchInput = $('.wiki-search').val();
            loadWikipediaArticles(wikiSearchInput);            
            isFirstLoadMode = false;
        }
    });

    $('.wiki-search').keyup(function() {
        $('.wiki-search').val($(this).val());;
    })
});



function hasSearchInput() {
    var wikiSearchInput = $('.wiki-search').val();
    return wikiSearchInput !== undefined && wikiSearchInput.length > 0;
}

function loadWikipediaArticles(wikiSearchInput) {
    var promise = getWikipediaArticles(wikiSearchInput);
    promise.done(function(result) 
    {
        appendWikipediaArticles(result.query.pages);
    });    
}

function appendWikipediaArticles(wikipediaArticles) {
    console.log(wikipediaArticles);
    if(wikipediaArticles.length === 0) return;
    
    $('.wikipedia-search-results').append("<ul class='wikipedia-search-items'></ul>")
    
    Object.keys(wikipediaArticles).forEach(function(obj) {
        $('.wikipedia-search-items').append(("\
            <a href='#' class='wikipedia-search-item-link'>\
                <li class='wikipedia-search-item'>\
                    <div class='wikipedia-search-item-header'>\
                        {title}\
                    </div>\
                    <div class='wikipedia-search-item-description'>\
                        {extract}\
                    </div>\
                </li>\
            </a>\
        ").replace(/\{([a-z|A-Z]+)\}/g, function (m, n) { 
            return wikipediaArticles[obj][n] 
        }));
    });

    
}