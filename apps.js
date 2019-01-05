var gifTastic = {
    //Array of topics
        topics: [ "cats","gym fails","food","outer space","exotic cars","cooking"],
    //Plays or pauses the gif when clicked on
        playGif: function(gifSelected){
            var dataType = gifSelected.getAttribute("data-type");
            if(dataType === "still"){
                gifSelected.setAttribute("src",gifSelected.getAttribute("data-animate"));
                gifSelected.setAttribute("data-type","animate");
            }
            else{
                gifSelected.setAttribute("src",gifSelected.getAttribute("data-still"));
                gifSelected.setAttribute("data-type","still");
            }
        },
    //Calls the Giphy API and searches for gifs based on the topic button selected
        generateGif: function(topic){
            var $gifs =  $("#gifs");
            $gifs.empty();
            topic = topic.value.replace(/\s/g, "+");
            $.ajax(this.href, {
                url: "https://api.giphy.com/v1/gifs/search?" + "q=" + topic + "&apikey=C5d75scOHxPnli61nvl3JPjObqAnq7Ub" + "&limit=10",
                method: "GET"
            }).done(function(response) {
                for(i = 0; i < response.data.length; i++){
                    var $figure = $("<figure>");
                    $figure.addClass("mx-2 d-inline-block");
                    var $figCaption = $("<figcaption>");
                    $figCaption.addClass("figure-caption text-white"); 
                    $figCaption.html("<strong>Rating: " + response.data[i].rating.toUpperCase() + "</strong");
                    $figure.append($figCaption);       
                    var $img = $("<img>");
                    $img.addClass("figure-img img-fluid rounded");
                    $img.attr(
                        {"onclick":"gifTastic.playGif(this)",
                        "src":response.data[i].images.fixed_height_still.url,
                        "data-still":response.data[i].images.fixed_height_still.url,
                        "data-animate":response.data[i].images.fixed_height.url,
                        "data-type":"still"}
                    );
                    $figure.append($img);  
                    $gifs.append($figure);
                }
            });
        },
    //Creates a topic button when entered in the input form
        addTopic: function(){
            var $input = ($("input"));
            var newTopic = $input.val().trim().toLowerCase();
            var $topics =  $("#topics");
            $topics.empty();
            if(newTopic !== ""){
                this.topics.push(newTopic);
            }
            for(i = 0; i < this.topics.length; i++){
                var $button = $("<button>");
                $button.addClass("topics btn btn-sm btn-info m-1");
                $button.val(this.topics[i]);
                $button.text(this.topics[i]);
                $button.attr("onclick","gifTastic.generateGif(this)");
                $topics.append($button);
            }
            $input.val("");
        }
    }
    //Gets current topics when page first loads
    gifTastic.addTopic();