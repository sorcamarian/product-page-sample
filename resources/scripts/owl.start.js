$(document).ready(function() {

/* 
http://www.owlcarousel.owlgraphic.com/
*/

/*
---------
Picture Carousel
---------
*/

    var pictureCarousel = $("#picture-carousel"),
        pictures        = pictureCarousel.find("#pc-body");
  
    // start carousel
    pictures.owlCarousel({
       margin    : 0,
       autoWidth : true,
       items     : 2,
       mouseDrag : false  
    });

    var madeChangeForLastItem = false;
    pictures.on('change.owl.carousel', function(event) {
      // make the last item appear in full size
      // asume the carousel has 5 items, each one has size: 320x250
      if(!madeChangeForLastItem) {
          event.relatedTarget._coordinates[2] = -740;
          madeChangeForLastItem = true;
      }    
    });


    // custom next and prev buttons
    pictureCarousel.find(".next").on("click", function(){
        pictures.trigger('next.owl.carousel');
    });

    pictureCarousel.find(".prev").on("click", function(){
        pictures.trigger('prev.owl.carousel');    
    });
 



/*
---------
Icon Carousel
---------
*/


    var iconCarousel = $("#icon-carousel"),
        icons        = iconCarousel.find("#ic-icons");

    icons.owlCarousel({
        margin    : 0,
        autoWidth : true,
        items     : 1,
        mouseDrag : false  
    });



    var more = icons.find(".more"),
        prev = icons.find(".previous"),
        owlNext = icons.find(".owl-next"),
        owlPrev = icons.find(".owl-prev");

    more.on("click", function() {
        owlNext.trigger("click")
    });

    prev.on("click", function() {
        owlPrev.trigger("click")
    });



/*
---------
Options - Sort & Show lists
---------
(The code is for presentation purpose)
*/ 

    /*
    ---------
    Hide/Show .list
    ---------
    */ 

    // add event listeners on triggers/default options
    iconCarousel.find("button.toggle-list").on("click", toggleList);

    function toggleList(event) {

        var triggerButton = $(event.target), 
            container     = triggerButton.parent(),
            list          = container.find(".list"),
            listName      = container.find("span:first");
  

        if( list.hasClass("inactive") ){
          // list is hidden, show her
            listName.addClass("active");

            list.slideDown(300, function() { 
                list.removeClass("inactive");
                $(document).on("click", hideList);                
            });
            


        } else {
          // list is visible, hide her
            hideList();      
        }

    }



    /*
    ---------
      Hide list
    ---------
    */ 
    


    function hideList() {
        // console.log("hideList()");
        /// gets called twice, bubling?

        var list     = $("#ic-options .list").not(".inactive"),
            listName = list.parent().find("span:first");

        listName.removeClass("active"); 
        list.hide(100, function() {
            list.addClass("inactive");
            $(document).off("click", hideList);
        });        
        
    }

   

    /*
    ---------
      on List Click
    ---------
    */ 

    // add event listeners on the hidden list
    iconCarousel.find(".list").on("click", onListClick);


    function onListClick(event) {
        var target = $(event.target);
         
        if( target.is("li") ) {
            var list          = target.parent(),
                defaultOption = list.parent().find("button.toggle-list");


            // useful values
            //
            console.log("list type: " + list.attr("data-type") );
            console.log("value of clicked element:" + target.attr("data-value"));


            // switch default option with target(clicked) element
            // switch innerText and data-value
            var defaultOptionClone = defaultOption.clone();

            defaultOption.text( target.text() );
            defaultOption.attr("data-value", target.attr("data-value") );

            target.text( defaultOptionClone.text() );
            target.attr("data-value", defaultOptionClone.attr("data-value") );

        } // End of if( target.is("li") )

    } // End of onListClick()




}); // end of document.ready