Twitter = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul class="tweets" id="tweets_from_'+user_id+'"></ul>');
    this.element.before(element);
    element.before('<h4>Recent twitter updates:</h4>');
    $.getJSON("http://twitter.com/status/user_timeline/"+user_id+".json?count=3&callback=?", function(data){ 
      $.each(data, function(i, item) { 
        element.append("<li>"+item.text+"</li>");
      });
    });
  }
});

GitHub = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul class="github_repositories" id="github_repositories_from_'+user_id+'"></ul>');
    this.element.before(element);
    element.before('<h4>My github projects:</h4>');
    $.getJSON("http://github.com/api/v1/json/"+user_id+"?callback=?", function(data){ 
      $.each(data.user.repositories, function(i, item) { 
        element.append(
          '<li>'+
             '<a href="'+item.url+'">'+
               item.name+
             '</a>'+
           '</li>'
        );
      });
    });
  }
});

LastFmEvents = $.klass({
  initialize: function(user_id, api_key) {
    var element = jQuery('<ul class="lastfm_events" id="lastfm_events_for_'+user_id+'"></ul>');
    $.getJSON("http://lastfm-api-ext.appspot.com/2.0/?method=user.getevents&user="+user_id+"&api_key="+api_key+"&outtype=js&callback=?", function(data){ 
      if (data.events.size > 0) {
      this.element.replaceWith(element);
        element.before('<h4>Gigs I\'ll be going to soon:</h4>');
        $.each(data.events, function(i, item) { 
          element.append(
            '<li>'+
              '<a href="'+item.url+'">'+
                item.title+
              '</a>'+
            '</li>'
          );
        });
      }
    });
  }
});

Flickr = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul class="flickr_photos" id="flickr_photos_from_'+user_id+'"></ul>');
    this.element.before(element);
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id="+user_id+"&format=json&jsoncallback=?", function(data){ 
      $.each(data.items.slice(0,18), function(i, item) { 
        element.append(
          '<li>'+
            '<a href="'+item.link+'">'+
              '<img src="'+item.media.m.replace(/_m.jpg$/, "_s.jpg")+'" alt="'+item.title+'" />'+
            '</a>'+
          '</li>'
        );
      });
    });
  }
});

Delicious = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul class="delicious_bookmarks" id="delicious_bookmarks_from_'+user_id+'"></ul>');
    this.element.before(element);
    element.before("<h4>My Latest bookmarks:</h4>");
    $.getJSON("http://feeds.delicious.com/v2/json/"+user_id+"?count=15&callback=?", function(data){ 
      $.each(data, function(i, item) { 
        element.append(
          '<li>'+
            '<a href="'+item.u+'">'+
              item.d+
            '</a>'+
          '</li>'
        );
      });
    });
  }
});

Tumblr = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul class="delicious_bookmarks" id="delicious_bookmarks_from_'+user_id+'"></ul>');
    this.element.before(element);
    element.before('<h4>Latest tumblog posts:</h4>');
    $.getJSON("http://"+user_id+"/api/read/json?callback=?", function(data){ 
      $.each(data.posts.slice(0,3), function(i, item) { 
        if(item["regular-title"]) {
           element.append(
             '<li>'+
               '<a href="'+item.url+'">'+
                 item["regular-title"]+
               '</a>'+
             '</li>'
           );
        }
      });
    });
  }
});

PeoplesMusicStore = $.klass({
  initialize: function(user_id) {
    var element = jQuery('<ul class="delicious_bookmarks" id="delicious_bookmarks_from_'+user_id+'"></ul>');
    this.element.before(element);
    element.before("<h4>Latest additions to my store:</h4>");
    $.getJSON("http://peoplesmusicstore.com/"+user_id+".json?callback=?", function(data){ 
      $.each(data.collections, function(i, collection) { 
        $.each(collection.collection_items, function(i, item) { 
          element.append(
            '<li>'+
              '<a href="'+item.url+'">'+
                item.artist + ": " + item.title +
              '</a>'+
            '</li>'
          );
        });
      });
    });
  }
});


jQuery(function($) {
  $('.twitter').attach(Twitter, 'coupde');
  $('.github').attach(GitHub, 'james');
  $('.gigs').attach(LastFmEvents, 'Abscond', 'ef5f6b42e168116f913ed26eeacb7e34');
  $('.photos').attach(Flickr, '82586441@N00');
  $('.links').attach(Delicious, 'coupde');
  $('.tumble').attach(Tumblr, 'tumble.coupde.com');
  $('.tunes').attach(PeoplesMusicStore, 'coupde');
});