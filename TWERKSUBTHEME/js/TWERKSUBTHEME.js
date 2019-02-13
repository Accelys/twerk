(function ($) {

  'use strict';

  Drupal.behaviors.dumbDemo = {
    attach: function (context) {

      $('.example-dom-element', context).once('dumbDemo').each(function() {
        // Do something
      });

    }
  };

})(jQuery);
