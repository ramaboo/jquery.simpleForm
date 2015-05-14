;(function($, window, document, undefined) {
  // Name
  var pluginName = 'flash';

  // Constructor
  var Flash = function(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = options;
    this.init();
  };

  Flash.prototype = {
    defaults: {
      flashTemplate: HandlebarsTemplates['flash']
    },
    events: {
      clear: function(event) {
        this.$element.empty();
      },
      success: function(event, message) {
        this.addMessage(message, 'success')
      },
      notice: function(event, message) {
        this.addMessage(message, 'notice')
      },
      warning: function(event, message) {
        this.addMessage(message, 'warning')
      },
      alert: function(event, message) {
        this.addMessage(message, 'alert')
      }
    },
    init: function() {
      this.settings = $.extend({}, this.defaults, this.options);
      this.bindEvents();
    },
    bindEvents: function() {
      var _this = this

      $.each(this.events, function(name, value) {
        _this.$element.on('flash:' + name, $.proxy(_this.events[name], _this));
      });
    },
    addMessage: function(message, type) {
      this.$element.append(this.settings.flashTemplate({
        message: message,
        type: type
      }));
    }
  };

  // Plugin Wrapper
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Flash(this, options));
      }
    });
  };

  window.Flash = Flash;
})(jQuery, window, document);
