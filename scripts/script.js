$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});




// Globals
var prefixes         = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var $container       = $('.container');
var $timeline        = $('.timeline');
var $timelineItem    = $('.timeline-item');
var $timelineContent = $('.timeline-content');
var $dropDown        = $('.dropdown');
var $hasHovered      = true;
var hideOnExit       = false;

window.addEventListener("load", (event) => {
  $('.selected').find($timelineContent).addClass('animated fadeIn');
});

// mouseenter event handler
$timelineItem.on('mouseenter', function(e) {
  
  var isSelected = $(this).hasClass('selected');
  
  if ( isSelected === false ) {
  
    var leftPos = $(this).position().left,
        left    = leftPos - 88,
        $that   = $(this);

    $timelineItem.removeClass('selected');
    $(this).addClass('selected');

    if ( $hasHovered === false ) {
      // Show Bounce

        // Set Flag
        $hasHovered = true;

        // Show DD Bounce
        showBounce(left);

        // Show DD content Bounce
        showContentBounce($that);

    } else {
      // Follow

        // Change pos of DD to follow
        dropDownFollow(left);

        // Hide previous dd content
        $timelineContent.removeClass('animated fadeIn bounceIn');

        // Show hovered dd content
        $that.find($timelineContent).addClass('animated fadeIn');
    }
  }
  
});

// mouseleave event handler
$timeline.on('mouseleave', function(e) {
  
  if (hideOnExit) {
   
    //   Set Flag
    $hasHovered = false;

    // Hide DD
    hideDropDown();

    // Hide DD content
    $timelineContent.removeClass('animated fadeIn');
    
  }
  
});

// Animation end event listener
$dropDown.on(prefixes, function(e) {
  
  if ( e.originalEvent.animationName === 'fadeOut' ) {
    $dropDown.removeAttr('style');
  }
  
});

/**
* Private functions that do showing/hiding/animating
*/
function showContentBounce(that) {
  $hasBounced = true;
  that.find('.timeline-content').addClass('animated bounceIn');
}

function showBounce(pos) {
  $dropDown.css('left', pos + 'px').removeClass('fadeOut').addClass('animated bounceIn');
}

function dropDownFollow(pos) {
  $dropDown.css('left', pos + 'px');
}

function hideDropDown() {
  $timelineItem.removeClass('selected');
  $dropDown.removeClass('bounceIn').addClass('fadeOut');
}

//Portfolio Popup

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('proj-info')){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.toggle('open');
}

document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector('.work-img').src;
    document.querySelector('.portfolio-popup-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
}


// card scroll part


const carousel = document.querySelector(".project-gal");
const ul = carousel.querySelector("ul");
const originalItems = [...ul.children];

// Clone items on both sides
originalItems.forEach(item => ul.appendChild(item.cloneNode(true))); // right
originalItems.slice().reverse().forEach(item => ul.insertBefore(item.cloneNode(true), ul.firstChild)); // left

// Calculate exact width of one original set
let originalWidth = 0;
originalItems.forEach(item => {
  const style = getComputedStyle(item);
  originalWidth += item.offsetWidth + parseInt(style.marginRight);
});

// Start in middle
carousel.scrollLeft = originalWidth;

// Infinite wrap
carousel.addEventListener("scroll", () => {
  if (carousel.scrollLeft <= 0) {
    // Too far left → jump forward
    carousel.scrollLeft += originalWidth;
  } else if (carousel.scrollLeft >= originalWidth * 2) {
    // Too far right → jump backward
    carousel.scrollLeft -= originalWidth;
  }
});

// Mouse wheel triggers horizontal scroll
carousel.addEventListener("wheel", e => {
  e.preventDefault();
  carousel.scrollLeft += e.deltaY;
});

// Drag/swipe
let isDragging = false;
let startX, scrollStart;

carousel.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.pageX;
  scrollStart = carousel.scrollLeft;
  carousel.style.cursor = "grabbing";
});

carousel.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const dx = e.pageX - startX;
  carousel.scrollLeft = scrollStart - dx;
});

carousel.addEventListener("mouseup", () => {
  isDragging = false;
  carousel.style.cursor = "grab";
});

carousel.addEventListener("mouseleave", () => {
  isDragging = false;
  carousel.style.cursor = "grab";
});

// Touch support
carousel.addEventListener("touchstart", e => {
  isDragging = true;
  startX = e.touches[0].pageX;
  scrollStart = carousel.scrollLeft;
});

carousel.addEventListener("touchmove", e => {
  if (!isDragging) return;
  const dx = e.touches[0].pageX - startX;
  carousel.scrollLeft = scrollStart - dx;
});

carousel.addEventListener("touchend", () => isDragging = false);

