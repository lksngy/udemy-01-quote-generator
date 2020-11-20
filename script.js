const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}

// Show new quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        quoteAuthor.textContent = 'Unknown';
    } else {
        quoteAuthor.textContent = quote.author;
    }
//Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quote from API
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log('whoops, no quote', error);
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');

}

// Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On load
getQuotes();