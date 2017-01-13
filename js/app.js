var quotes = [
  {quote: "When you do the common things in life in an uncommon way, you will command the attention of the world.",
   author: "Joe Turnham"}
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

function newQuoteRequest(e) {
    e.preventDefault();
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

$(document).ready(function() {
  loadQuote();
  $('#new-quote').click(newQuoteRequest);
  $('#tweet-quote').click(tweetQuoteInfo);
});