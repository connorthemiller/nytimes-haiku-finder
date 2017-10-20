var config = require('./config');
var syllable = require('syllable');

var Client = require('node-rest-client').Client;
 
var client = new Client();

function assembleHaiku(arr) {
  var stanza1 = "";
  var stanza2 = "";
  var stanza3 = "";
  
  var i = 0;
  while (syllable(stanza1)<5) {
    stanza1 += arr[i] + " ";
    i++
  }
  
  while (syllable(stanza2)<7) {
    stanza2 += arr[i] + " ";
    i++
  }
  
  while (syllable(stanza3)<5) {
     stanza3 += arr[i] + " ";
      i++
  }
  var haikuString = "HAIKU: " + stanza1 + "/ " + stanza2 + "/ " + stanza3;
  console.log(haikuString);
}

client.get(`https://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/30.json?api-key=${config.key}`, function (data, response) {
    // parsed response body as js object
    //console.log(data.results);
    for (i=0; i<data.results.length; i++) {
      var input = data.results[i].title;
      var string = "";
      if (syllable(input) === 17) {
       var arr1 = input.split(" ");
       console.log(arr1);
       // assemble haiku
       assembleHaiku(arr1);
      }
    }
    
});