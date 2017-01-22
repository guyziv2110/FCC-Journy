function getWikipediaArticles() {
var apiBase = "https://en.wikipedia.org/w/api.php" + 
                                    "?format=json" +
                                    "&action=query" +
                                    "&generator=search" +
                                    "&gsrnamespace=0" + // default (no namespace)
                                    "&gsrlimit=5" +
                                    "&prop=pageimages|extracts" +
                                    "&pilimit=max" // page images generated;
var format = "json";
var action = "query";
var generator = "search";

}