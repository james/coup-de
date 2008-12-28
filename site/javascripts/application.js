console.info();
Nav = $.klass({
  initialize: function() {
    // Set the first item as current if not already set
    if(!this.element.find('.current')[0]) {
      this.setCurrent(this.element.find('a:first'));
    }
    
    // Hide all non-current sections
    $('.section[id!='+this.currentSection()+']').hide();
  },
  
  onclick: $.delegate({
    'a': function(link) {
      this.setCurrent(link);
      if(this.last.position().top > link.position().top) {
        this.sectionForLink(this.last).hide("slide", { direction: "right" }, 500);
        this.sectionForLink(link).show("slide", { direction: "left" }, 500);
      } else {
        this.sectionForLink(this.last).hide("slide", { direction: "left" }, 500);
        this.sectionForLink(link).show("slide", { direction: "right" }, 500);
      }
      return false;
    }
  }),
  
  currentLink: function() {
    if(this.element.find('.current').size() > 0) {
      return this.element.find('.current');
    } else {
      return false
    }
  },
  currentSection: function() {
    if(this.currentLink()) {
      return this.currentLink().attr("href").slice(1,1000);
    } else {
      return false
    }
  },
  setCurrent: function(link) {
    if(this.currentLink()) {this.last = this.currentLink();}
    this.element.find('.current').removeClass('current');
    link.addClass('current');
  },
  sectionForLink: function(link) {
    return $(link.attr("href"))
  }
});

jQuery(function($) {
  $('ul.menu').attach(Nav);
  $('body').addClass('javascripted');
});