var events = (function(){
  var registeredEvents = {};
  var hOP = registeredEvents.hasOwnProperty;

  return {
    removeAll: function() {
        for (var key in registeredEvents) {
            delete[key];
        }
        
        registeredEvents = {};
    },
    subscribe: function(eventName, listener) {
      // Create the topic's object if not yet created
      if(!hOP.call(registeredEvents, eventName)) registeredEvents[eventName] = [];

      // Add the listener to queue
      var index = registeredEvents[eventName].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete registeredEvents[eventName][index];
        }
      };
    },
    publish: function(eventName, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(registeredEvents, eventName)) return;

      // Cycle through topics queue, fire!
      registeredEvents[eventName].forEach(function(item) {
      		item(info != undefined ? info : {});
      });
    }
  };
})();