// Makes a selection of anchor links to section work as an accordian inspired
// slidey thing that works with bookmarkable URLs
UnobtrusiveAnchorNav = $.klass({
  initialize: function() {
    // Set the current location is set in the URL hash
    if (location.hash) {
      this.setCurrent($("a[href="+location.hash+"]"));
      // Scroll to top to prevent hash link from working. Is this bad?
      $(window).scrollTop(0);
    } else {
      this.setCurrent(this.element.find('a:first'));
    }
    
    $('#coup_de_what').val(".com");
    
    // Hide all non-current sections
    $('.section[id!='+this.currentSection()+']').hide();
  },
  
  onclick: $.delegate({
    'a': function(link) {
      // Do nothing if we're already there
      if(!link.hasClass("current")) {
        // Set the URL now while the section is hidden to stop the anchor working
        // We return false at the end.
        window.location = link.attr('href');
        
        this.setCurrent(link);
        if(this.last.position().top > link.position().top) {
          // If we're moving up the list
          this.sectionForLink(this.last).hide("slide", { direction: "right" }, 500);
          this.sectionForLink(link).show("slide", { direction: "left" }, 500);
        } else {
          // If we're moving down the list
          this.sectionForLink(this.last).hide("slide", { direction: "left" }, 500);
          this.sectionForLink(link).show("slide", { direction: "right" }, 500);
        }
        
        $('#coup_de_what').val(this.currentLink().html());
      }
      return false;
    }
  }),
  
  currentLink: function() {
    if(this.element.find('.current').size() > 0) {
      return this.element.find('.current');
    } else {
      return false;
    }
  },
  currentSection: function() {
    if(this.currentLink()) {
      return this.currentLink().attr("href").slice(1,1000);
    } else {
      return false;
    }
  },
  setCurrent: function(link) {
    if(this.currentLink()) {this.last = this.currentLink();}
    this.element.find('.current').removeClass('current');
    link.addClass('current');
  },
  sectionForLink: function(link) {
    return $(link.attr("href"));
  }
});

jQuery(function($) {
  $('ul.menu').attach(UnobtrusiveAnchorNav);
  $('body').addClass('javascripted');
});