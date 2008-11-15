Twitter = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul></ul>');
    this.element.replaceWith(element);
    $.getJSON("http://twitter.com/status/user_timeline/"+user_id+".json?count=3."+Math.random()+"&callback=?", function(data){ 
      $.each(data, function(i, item) { 
        element.append("<li>"+item.text+"</li>");
      });
    });
  }
});

GitHub = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul></ul>');
    this.element.replaceWith(element);
    $.getJSON("http://github.com/api/v1/json/"+user_id+"?callback=?", function(data){ 
      $.each(data.user.repositories, function(i, item) { 
        element.append("<li>"+item.name+"</li>");
      });
    });
  }
});

LastFmEvents = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul></ul>');
    this.element.replaceWith(element);
    $.getJSON("http://lastfm-api-ext.appspot.com/2.0/?method=user.getevents&user="+user_id+"&api_key=ef5f6b42e168116f913ed26eeacb7e34&outtype=js&callback=?", function(data){ 
      $.each(data.events, function(i, item) { 
        element.append("<li>"+item.title+"</li>");
      });
    });
  }
});


jQuery(function($) {
  $('a.twitter').attach(Twitter, 'coupde');
  $('a.github').attach(GitHub, 'james');
  $('a.gigs').attach(LastFmEvents, 'Abscond');
});