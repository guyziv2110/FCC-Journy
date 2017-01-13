var lastQuote = "I don't know why we are here, but I'm pretty sure that it is not in order to enjoy ourselves";
var lastAuthor = "Ludwig Wittgenstein";

function getQuote() {
  $.ajax({
    headers:{
      "X-Mashape-Key":'FqijuuCXU5mshfIAleZAkKqbqFrnp1ruFFujsn2osuYKELy3Lu'
    },
    url:'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      lastQuote = r.quote;
      lastAuthor = r.author;
      setQuoteElement(".quote-text", r.quote);
      setQuoteElement(".quote-author", r.author);
    }
  });
}

function tweetQuoteInfo() {
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + lastQuote + '" -' + lastAuthor));
}

$(document).ready(function() {
  $('#new-quote').click(getQuote);
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