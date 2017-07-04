

function lastCharacters(length, characters, string) {
      var result = characters === string.slice(-length);
      return result
 }

var gridUrl = lastCharacters(12, "16columngrid", window.location.search )
  if ( gridUrl ) {
  	  // show 16 columng grid option
      $("#column-grid-16").show();
}



var image = $("#column-grid-16-image");


$("#column-grid-16 .start").on("click", function() {
	$(this).next().slideDown();
	document.body.style.position = "relative";
    
    image.toggleClass("off");
	updateOpacity(0.5);
	$(this).off("click");
});
   

$("#column-grid-16 select").on("change", function(event) {
    var val = event.target.value;
    updateOpacity(val);

});

function updateOpacity(value) {
  image.css("opacity", value);
}


$("#column-grid-16 .on-off").on("click", toggleGrid);

function toggleGrid() {
	image.toggleClass("off");
}

