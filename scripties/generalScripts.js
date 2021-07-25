var artis = null;
var UserList = Backbone.Router.extend({
    routes: {//List of URL routes with the corresponding function name which will get called when user will visit a page having URL containing this route
        "sp":                "sp",    // localhost:8080/#list
        "": "sp",
        "artifact":        "artifact",  // localhost:8080/#search/saurav
        "other": "other",  // localhost:8080/#search/kiwis/p7
        "profile/:userId":     "profile" // localhost:8080/#profile/92
    },
    sp: function() {
        resetButtons();
        document.getElementById('sp').classList.add("active");
        document.getElementById('spOptimizer').style.display = "block";
        document.getElementById('spOptimizer').classList.add("active");
        for (let element of document.getElementsByClassName("spTopChoices")){
            element.style.display="block";
         }
         for (let element of document.getElementsByClassName("artifactTopChoices")){
            element.style.display="none";
         }
    },
    artifact: function() {
        resetButtons();
        document.getElementById('artifact').classList.add("active");
        document.getElementById('artifactOptimizer').style.display = "block";
        document.getElementById('artifactOptimizer').classList.add("active");
        for (let element of document.getElementsByClassName("artifactTopChoices")){
            element.style.display="block";
         }
         for (let element of document.getElementsByClassName("spTopChoices")){
            element.style.display="none";
         }
         artifactViewToggle();
    },
    other: function(){
        resetButtons();
    },
 });
 function resetButtons(){
    var items = document.getElementsByClassName("sheetNavigationButton");
    Array.prototype.forEach.call(items, function(el) {
        el.classList.remove('active');
    });
    var sheets = document.getElementsByClassName("sheet");
    Array.prototype.forEach.call(sheets, function(el) {
        el.classList.remove('active');
        el.style.display = "none";
    });
}
jQuery(document).ready(function() {
    // When the document is ready we instantiate the router
    var userList = new UserList();
    // And tell Backbone to start routing
    Backbone.history.start();
  });

function addScientific(numberOne, numberTwo){
    var one = String(numberOne).toLowerCase();
    var two = String(numberTwo).toLowerCase();
    var oneParts = one.split("e");
    var twoParts = two.split("e");
    var difference = Number(twoParts[1]) - Number(oneParts[1]);
    var amtToAdd = Number(oneParts[0])/(Math.pow(10,difference));
    var newTotal = Number(twoParts[0]) + amtToAdd;
    var addThisManyE = newTotal > 0 ? Math.floor(Math.log10(newTotal)) : (-1*Math.floor(Math.log10(Math.abs(newTotal))));
    var newExpo = Number(twoParts[1]) + addThisManyE;
    var finalConst = addThisManyE > 0 ? (newTotal/(Math.pow(10, addThisManyE))).toFixed(20) : newTotal.toFixed(20);
    return finalConst+'e'+newExpo;
}

function divideScientific(numberOne, numberTwo){
    var one = String(numberOne).toLowerCase();
    var two = String(numberTwo).toLowerCase();
    var oneParts = one.split("e");
    var twoParts = two.split("e");
    var difference = Number(twoParts[1]) - Number(oneParts[1]);
    var denom = Math.pow(10, difference)*Number(twoParts[0]);
    return Number(oneParts[0])/denom;
}
function printBigScientific(number){
    var str = String(number);
    var parts = str.split("e");
    var num = Number(parts[0]).toFixed(2);
    return num == 0 ? 0 : num + "e" + parts[1];
    return num + "e" + parts[1];
}
function percentScientific(bigNum, smallNum){
    return divideScientific(smallNum, bigNum);
    //var total = smallNum/(bigNum + otherSpends);
}