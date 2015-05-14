# jQuery Simple Form

This plugin assumes you are already using [Simple Form](https://github.com/plataformatec/simple_form).

## Include Files

Your `app/javascripts/application.js` should look something like this:

```js
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require handlebars
//= require_tree ./helpers
//= require_tree ./templates
//= require plugins/jquery.flash
//= require plugins/jquery.simpleForm

$(document).on('page:change', function() {
  $('#flash').flash();
});
```

## Make a Form Asynchronous

```js
$('#form_id').simpleForm({ /* Options */ });
```

That's it! It should now work like a normal form including error messages, inline errors, and after save redirection. All though Ajax!

## Requirements

By default jQuery Simple Form uses `#flash` for messages. If you use another ID then you will have to manually pass that ID in the options.

If you want your normal forms to match your asynchronous forms then you will need to
extend Simple Form to support `f.error_messages` see `lib/simple_form_extensions.rb`.

**Warning!** This plugin was written for a single project so it contains some Simple Form class names that may be different in your project depending on how you have Simple Form configured. I believe that it's best to have people fork this project and adjust it to suit their needs rather than attempting to build a generic solution which would require a configuration file of equal complexity to that of Simple Form.
