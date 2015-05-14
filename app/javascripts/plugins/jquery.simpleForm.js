;(function($, window, document, undefined) {
  // Name
  var pluginName = 'simpleForm';

  // Constructor
  var SimpleForm = function(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = options;
    this.init();
  };

  SimpleForm.prototype = {
    defaults: {
      notice: 'Form has been saved!',
      prefix: true,
      flash: '#flash',
      errorMessagesTemplate: HandlebarsTemplates['simple_form/error_messages']
    },
    init: function() {
      this.settings = $.extend({}, this.defaults, this.options);
      this.$flash = $(this.settings.flash)
      this.guessPrefix();
      this.bindEvents();
    },
    guessPrefix: function() {
      this.prefix = this.settings.prefix

      if (this.prefix === true) {
        this.prefix = this.$element.attr('id').replace(/^new_|^edit_|_\d$|-form$/g, '') + '_';
      }
    },
    bindEvents: function() {
      var _this = this;

      this.$element.on('ajax:before', function(event) {
        _this.$flash.trigger('flash:clear')
        _this.clearErrors();
      });

      this.$element.on('ajax:success', function(event, data, status, xhr) {
        var url = xhr.getResponseHeader('Location');

        if (url !== null) {
          window.location.replace(url);
        } else {
          _this.$flash.trigger('flash:notice', _this.settings.notice);
        }
      });

      this.$element.on('ajax:error', function(event, xhr, status, error) {
        _this.$element.prepend(_this.settings.errorMessagesTemplate({
          response: xhr.responseJSON
        }));

        $.each(xhr.responseJSON.errors, function(key, value) {
          var msg = value[0];
          var id = '#' + _this.prefix + key;
          $(id)
            .after('<span class="error">' + msg + '</span>')
            .parent('.input').addClass('field-with-errors');
        });
      });
    },
    clearErrors: function() {
      this.$element.find('.error-messages').remove();
      this.$element.find('span.error').remove();
      this.$element.find('.input').removeClass('field-with-errors');
    }
  };

  // Plugin Wrapper
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new SimpleForm(this, options));
      }
    });
  };

  window.SimpleForm = SimpleForm;
})(jQuery, window, document);
