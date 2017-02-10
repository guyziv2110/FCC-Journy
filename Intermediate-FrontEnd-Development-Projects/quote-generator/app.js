var quotes = [
  {quote: "When you do the common things in life in an uncommon way, you will command the attention of the world.",
   author: "Joe Turnham"},
  {quote:"I have come to believe that the whole world is an enigma, a harmless enigma that is made terrible by our own mad attempt to interpret it as though it had an underlying truth.",
    author:"Umberto Eco"}
];

function loadQuote(callback) {
  $.ajax({
    headers:{
      "X-Mashape-Key":'FqijuuCXU5mshfIAleZAkKqbqFrnp1ruFFujsn2osuYKELy3Lu'
    },
    url:'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      quotes.push({quote: r.quote, author: r.author});
      callback();
    }
  });
}

function newQuoteRequest(e) {
    e.preventDefault();
    quotes.shift();

    if(quotes[0] !== undefined) {
      setQuote();  
    }

    $("#new-quote").addClass("disabled");
    loadQuote(function() {$("#new-quote").removeClass("disabled")});
}

function setQuote() {
    var currentQuote = quotes[0];
    setQuoteElement(".quote-text", currentQuote.quote);
    setQuoteElement(".quote-author", currentQuote.author);    
}

function tweetQuoteInfo() {
  if(quotes[0] !== undefined) {
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' 
                + encodeURIComponent('"' + quotes[0].quote + '" -' + quotes[0].author));
  }
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
