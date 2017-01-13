var quotes = [
  {quote: "I don't know why we are here, but I'm pretty sure that it is not in order to enjoy ourselves",
   author: "Ludwig Wittgenstein"}
];

function loadQuote() {
  $.ajax({
    headers:{
      "X-Mashape-Key":'FqijuuCXU5mshfIAleZAkKqbqFrnp1ruFFujsn2osuYKELy3Lu'
    },
    url:'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      quotes.push({quote: r.quote, author: r.author});
    }
  });
}

function newQuoteRequest() {
    quotes.shift();
    loadQuote();  
    setQuote();  
}


function setQuote() {
    var currentQuote = quotes[0];
    setQuoteElement(".quote-text", currentQuote.quote);
    setQuoteElement(".quote-author", currentQuote.author);    
}

function tweetQuoteInfo() {
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' 
              + encodeURIComponent('"' + quotes[0].quote + '" -' + quotes[0].author));
}

$(document).ready(function() {
  loadQuote();
  $('#new-quote').click(newQuoteRequest);
  $('#tweet-quote').click(tweetQuoteInfo);
});


function setQuoteElement(quoteText, quote) {
  $(quoteText).animate({
    opacity: 0
  }, 500, function() {
    $(this).animate({
      opacity: 1
    }, 500);
    $(quoteText).text(quote);
  });
}