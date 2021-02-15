$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

// Elements animation on scrolling
//   $(document).ready(function() {
//     $('#about').waypoint(function() {
//         alert('Top of header hit top of viewport.');
//     });
//     });

// ---------------FOR ANIMATIONS 
  $(document).ready(function() {
    $('.js-wp-1').waypoint(function(direction) {
        $('.js-wp-1').addClass('animate__animated animate__bounce');
    })
    });

 
  // Add active class to the current button (highlight it)
  var header = document.getElementById("nav-bar");
  var btns = header.getElementsByClassName("nav-link");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("current");
      current[0].className = current[0].className.replace(" current", "");
      this.className += " current";
    });
  }

  // Sizing the video without border
  $(document).ready(function () {
    sizeTheVideo();
    $(window).resize(function () {
      sizeTheVideo();
    });
  });

  function sizeTheVideo() {
    // - 1.78 is the aspect ratio of the video
    // - This will work if your video is 1920 x 1080
    // - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
    var aspectRatio = 1.78;

    var video = $("#video iframe");
    var videoHeight = video.outerHeight();
    var newWidth = videoHeight * aspectRatio;
    var halfNewWidth = newWidth / 2;

    //Define the new width and centrally align the iframe
    video.css({
      width: newWidth + "px",
      left: "50%",
      "margin-left": "-" + halfNewWidth + "px",
    });
  }


