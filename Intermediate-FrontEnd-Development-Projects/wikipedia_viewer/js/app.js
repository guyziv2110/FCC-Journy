var lastSearch;
var isAfterSearchMode = false;

$(document).ready(function() {
    $('.first-load-mode .wiki-search').focus();

    $('.wiki-search-button').click(function(e) {
        searchRequest();
    });

    $('.wiki-search-link').click(function(e) {
        searchRequest();
    });

    $('.wiki-search').keyup(function(e) {
        if (e.keyCode == 13) {
            searchRequest();
        }        
    });
});

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
}

function searchRequest() {    
    if(!isAfterSearchMode) {
        var wikiSearchInput = $('.first-load-mode .wiki-search').val();
        if(hasSearchInput(wikiSearchInput)) {
            $('.after-search-mode .wiki-search').val($('.first-load-mode .wiki-search').val());
            $('.after-search-mode').css('opacity', '1');
            $('.first-load-mode').css({'opacity':'0', display: 'none'});
            isAfterSearchMode = true;
            $('.after-search-mode .wiki-search').focus();
        }
    }

    if (isAfterSearchMode) {
        var wikiSearchInput = $('.after-search-mode .wiki-search').val();
        if(hasSearchInput(wikiSearchInput)) {
            if(wikiSearchInput !== lastSearch) {
                loadWikipediaArticles(wikiSearchInput);            
                lastSearch = wikiSearchInput;
            }
        }
    }    
}

function hasSearchInput(searchInput) {
    return searchInput !== undefined && searchInput.length > 0;
}

function clearWikipediaArticles() {
    $('.wikipedia-search-results').empty();
}

function analyzeWikipediaArticles(resultQuery) {
    if(resultQuery === undefined || resultQuery.pages.length === 0) {
        $('.wikipedia-search-results').append("<div class='text-center no-matches'>No matches found.</div>")
    }
    else {
        appendWikipediaArticles(resultQuery.pages);
    }
}

function loadWikipediaArticles(wikiSearchInput) {
    var promise = getWikipediaArticles(wikiSearchInput);
    promise.done(function(result) 
    {
        $('.wikipedia-search-results').fadeOut(70, function(){
            clearWikipediaArticles();
            analyzeWikipediaArticles(result.query);
        }).fadeIn();

    });    
}

function appendWikipediaArticles(wikipediaArticles) {
    $('.wikipedia-search-results').append("<ul class='wikipedia-search-items'></ul>")
    
    Object.keys(wikipediaArticles).forEach(function(obj) {
        $('.wikipedia-search-items').append(("\
            <a href='https://en.wikipedia.org/?curid={pageid}' target='_blank' class='wikipedia-search-item-link'>\
                <li class='wikipedia-search-item'>\
                    <div class='wikipedia-search-item-header'>\
                        {title}\
                    </div>\
                    <div class='wikipedia-search-item-description dot-ellipsis'>\
                        {extract}\
                    </div>\
                </li>\
            </a>\
        ").replace(/\{([a-z|A-Z]+)\}/g, function (m, n) { 
            return wikipediaArticles[obj][n] 
        }));
    });
}