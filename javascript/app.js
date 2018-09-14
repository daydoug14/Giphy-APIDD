
// )// DOUG CHECK BONUS-Responsive

var topic = [ 
    "golf", "tennis", "baseball", "swimming", "water polo", "football", "soccer",
    "lacrosse", "racquetball", "cycling"
];
    
function start() {

  renderButtons();

  $("#submitBtn").on("click", function(event){
      event.preventDefault();
   
      var input = document.getElementById("addSport").value;
      console.log(input);

      
        topic.push(input);

      renderButtons();

  }); 
  
  
  function renderButtons() {

    var sportBtn = $("#sportBtn");
   
    sportBtn.empty();

    for( var i=0; i<topic.length; i++) {
      var a = $("<button>");
     
      a.addClass("sport");
    
      a.attr("data-name", topic[i]);
     
      a.text(topic[i]);
      
      sportBtn.append(a);

    }

    $(".sport").on("click", function(event) {
        event.preventDefault();
        var sport = $(this).attr("data-name");
       
        console.log(sport);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=BGYmJXgqS7tCDL91XMwztQYZhV7Goeik&limit=10";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(response);
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var sportImage = $("<img>");
              sportImage.addClass("gif");
              
              sportImage.attr("src", results[i].images.fixed_height_still.url);
              sportImage.attr("data-still", results[i].images.fixed_height_still.url);
              sportImage.attr("data-animate", results[i].images.fixed_height.url);
              sportImage.attr("data-state", "still");

              gifDiv.prepend(p);
              gifDiv.prepend(sportImage);

              $("#sports").prepend(gifDiv);
            }

            $(".gif").on("click", function() {
              
              var state = $(this).attr("data-state");
              console.log("state: " + state);
              
              if(state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
              
            });
          });

          
    });

    

  }
}

$(document).ready(function() {
  // when document is ready, call the start method
  start(); 

})