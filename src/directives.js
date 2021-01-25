// mostly taken from http://www.codinginsight.com/angularjs-and-pickadate/
/*jshint unused: false*/

angular.module('angular-datepicker', [])
.directive('pickADate', [ '$document', function($document) {
  return {
    restrict: "A",
    scope: {
      pickADate: '=',
      pickADateOptions: '='
    },
    link: function(scope, element, attrs) {
      var options = scope.pickADateOptions || {};

      var userOnSet = options.onSet;

      function onSet(e) {
        if (typeof userOnSet === 'function') {
          userOnSet.apply(this, arguments);
        }

        // we are coming from $watch or link setup
        if (scope.$$phase || scope.$root.$$phase) {
          return;
        }
        var select = element.pickadate('picker').get('select'); // selected date

        if (select) {
          scope.$apply(function() {
            if (e.hasOwnProperty('clear')) {
              scope.pickADate = null;
              return;
            }
            if (!scope.pickADate || typeof scope.pickADate === 'string') {
              scope.pickADate = new Date(0);
            }
            scope.pickADate.setYear(select.obj.getFullYear());
            scope.pickADate.setDate(select.obj.getDate());
            scope.pickADate.setMonth(select.obj.getMonth());
          });
        }
      }

      var userOnOpen = options.onOpen;

      function onOpen(e) {
        if (typeof userOnOpen === 'function') {
          userOnOpen.apply(this, arguments);
        }
      }

      var userOnClose = options.onClose;

      function onClose(e) {
        if (typeof userOnClose === 'function') {
          userOnClose.apply(this, arguments);
        }
      }

      element.bind('click', function(event) {
        event.stopPropagation();
      });

      $document.bind('click', function(){
        element.pickadate('picker').close();
      });

      element.pickadate(angular.extend(options, {
        onOpen: onOpen,
        onSet: onSet,
        onClose: onClose,
        container: $document.body
      }));

      setTimeout(function() {
        if (scope.pickADate) {
          element.pickadate('picker').set('select', scope.pickADate);
        }
      }, 1000);
    }
  };
}])
.directive('pickATime', ['$document', function($document) {
  return {
    restrict: "A",
    scope: {
      pickATime: '=',
      pickATimeOptions: '='
    },
    link: function(scope, element, attrs) {
      var options = scope.pickATimeOptions || {};

      var userOnSet = options.onSet;

      function onSet(e) {
        if (typeof userOnSet === 'function') {
          userOnSet.apply(this, arguments);
        }

        // we are coming from $watch or link setup
        if (scope.$$phase || scope.$root.$$phase) {
          return;
        }
        var select = element.pickatime('picker').get('select'); // selected date

        if (select) {
          scope.$apply(function() {
            if (e.hasOwnProperty('clear')) {
              scope.pickATime = null;
              return;
            }
            if (!scope.pickATime || typeof scope.pickATime === 'string') {
              scope.pickATime = new Date();
            }
            scope.pickATime.setHours(select.hour);
            scope.pickATime.setMinutes(select.mins);
            scope.pickATime.setSeconds(0);
            scope.pickATime.setMilliseconds(0);
          });
        }
      }

      var userOnClose = options.onClose;

      function onClose(e) {
        if (typeof userOnClose === 'function') {
          userOnClose.apply(this, arguments);
        }
      }

      element.bind('click', function(event) {
        event.stopPropagation();
      });

      $document.bind('click', function(){
        element.pickatime('picker').close();
      });

      element.pickatime(angular.extend(options, {
        onSet: onSet,
        onClose: onClose,
        container: $document.body
      }));

      setTimeout(function() {
        if (scope.pickATime) {
          element.pickatime('picker').set('select', scope.pickATime);
        }
      }, 1000);
    }
  };
}]);
