'use strict';

angular.module('mean').config(function ($provide) {

  $provide.decorator('datepickerPopupDirective', function ($delegate) {
    var directive = $delegate[0];
    var link = directive.link;

    directive.compile = function () {
      return function (scope, element, attrs) {
        link.apply(this, arguments);
        element.mask("99/99/9999");
      };
    };

    return $delegate;
  });

});
