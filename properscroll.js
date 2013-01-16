// ## <span style="color:#BBB;">Function:</span> ProperScroll
// Fixes the elastic scrolling issue for iOS devices when you want to include
// overflow scroll elements within the application.
// #### <span style="color:#BBB">Arguments</span>
// - scrollerSelector: a valid CSS3 selector for the element with overflow scroll
function ProperScroll(scrollers) {
    var that = this;

    //  All registered scroll areas
    this.scrollers  = scrollers;
    //  Currently active scroll area
    this.scroller   = null;
    //  Where the user initiated the scroll
    this.startY     = 1;
    //  Should the document allow default scroll behavior
    this.scroll     = false;
    //  The maximum scroll for the current scroll area
    this.maxY       = 0;

    document.addEventListener('touchmove', function(e) {
        //  Don't scroll if we're at the top or bottom
        if(!that.scroll) e.preventDefault();
    });

    this.onTouchStart = function() {
        ProperScroll.prototype.onTouchStart.apply(that, arguments);
    }

    this.onTouchMove = function() {
        ProperScroll.prototype.onTouchMove.apply(that, arguments);
    }

    window.addEventListener('touchstart', this.onTouchStart, true);
    window.addEventListener('touchmove', this.onTouchMove, true);
}

ProperScroll.prototype = {
    // ### <span style="color:#bbb">Method:</span> onTouchStart
    // Match the scroll event to its registered element, and set the startY
    // and maxY properties.
    onTouchStart: function(e) {
        var selector = '';

        if(e.target.getAttribute('id')) {
            selector = '#' + e.target.id;
        }
        else if(e.target.getAttribute('class')) {
            selector =  '.' + e.target.getAttribute('class').split(/\s+/).join('.');
        }
        else {
            selector = e.target.nodeName.toLowerCase();
        }
        
        for(var i = 0; i < this.scrollers.length; i++) {
            var scroller = document.querySelector(this.scrollers[i]);

            if(!scroller) continue;

            //  If the event's target element matches this scroller, or if the target
            //  contains a scroller, set the element to the active scroll area
            if(e.target === scroller || scroller.querySelector(selector)) {
                this.scroller = scroller;
                break;
            }
        }

        if(!this.scroller) return;

        this.startY     = e.touches[0].clientY;
        this.maxY       = this.scroller.scrollHeight - this.scroller.offsetHeight;
    },

    // ### <span style="color:#bbb">Method:</span> onTouchMove
    // Checks where the currently active scroller area is, disable scrolling if
    // we're beyond the area's bounds. 
    onTouchMove: function(e) {
        var deltaY = e.changedTouches[0].clientY - this.startY;
        
        if(this.scroller.scrollTop <= 0 && deltaY > 0 || this.scroller.scrollTop >= this.maxY && deltaY < 0) {
                this.scroll = false;
        }
        else {
            this.scroll = true;
        }
    }
}