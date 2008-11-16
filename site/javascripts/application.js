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
  initialize: function(user_id, api_key) {
    var element = jQuery('<ul></ul>');
    this.element.replaceWith(element);
    $.getJSON("http://lastfm-api-ext.appspot.com/2.0/?method=user.getevents&user="+user_id+"&api_key="+api_key+"&outtype=js&callback=?", function(data){ 
      $.each(data.events, function(i, item) { 
        element.append("<li>"+item.title+"</li>");
      });
    });
  }
});

Flickr = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul></ul>');
    this.element.replaceWith(element);
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id="+user_id+"&format=json&jsoncallback=?", function(data){ 
      $.each(data.items, function(i, item) { 
        element.append(
          '<li>'+
            '<a href="'+item.link+'">'+
              '<img src="'+item.media.m.replace(/_m.jpg$/, "_s.jpg")+'" alt="'+item.title+' />'+
            '</a>'+
          '</li>'
        );
      });
    });
  }
});

jQuery(function($) {
  $('a.twitter').attach(Twitter, 'coupde');
  $('a.github').attach(GitHub, 'james');
  $('a.gigs').attach(LastFmEvents, 'Abscond', 'ef5f6b42e168116f913ed26eeacb7e34');
  $('a.photos').attach(Flickr, '82586441@N00');
});