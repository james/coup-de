console.info();
Nav = $.klass({
  initialize: function() {
    this.setDefaultCurrent();
    this.hideAllButCurrent();
  },
  onclick: $.delegate({
    'a': function(link) {
      this.element.find('.current').removeClass('current');
      link.addClass('current');
      this.hideAllButCurrent();
      return false;
    }
  }),
  setDefaultCurrent: function() {
    if(!this.element.find('.current')[0]) {
      this.element.find('a:first').addClass('current');
    }
  },
  hideAllButCurrent: function() {
    $('.section[id!='+this.current()+']').hide();
    $('#'+this.current()).show();
  },
  current: function() {
    return this.element.find('.current').attr("href").slice(1,1000);
  }
});

jQuery(function($) {
  $('ul.menu').attach(Nav);
  $('body').addClass('javascripted');
});