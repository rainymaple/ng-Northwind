(function () {
    angular.module('common', []);
})();

/*  -- Service localStorage --   */

(function (common) {

    common.factory('localStorage', ['$window', localStorage]);

    common.directive('numberOnly', numberOnly );


    // functions of Services and Directives

    function localStorage($window) {
        var store = $window.localStorage;

        return {
            add: add,
            get: get,
            remove: remove
        };

        // service functions

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        }

        function get(key) {
            var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        function remove(key) {
            store.removeItem(key);
        }
    }

    function numberOnly(){
        return {
            restrict: 'EA',
            require: 'ngModel',

            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    var splitArray = String(newValue).split("");
                    if (splitArray.length === 0) return;
                    if (splitArray.length === 1
                        && (splitArray[0] == '-'
                        || splitArray[0] === '.' )) return;
                    if (splitArray.length === 2
                        && newValue === '-.') return;
                    if (splitArray.indexOf('.') > 0) {
                        var decimal = attrs['numberOnly'];
                        if (['0', '1', '2', '3', '4', '5'].indexOf(decimal) >= 0) {
                            decimal = parseInt(decimal);
                            if (splitArray.length - splitArray.indexOf('.') > decimal + 1) {
                                ngModel.$setViewValue(oldValue);
                                ngModel.$render();
                            }
                        }
                    }

                    /*Check it is number or not.*/
                    if (isNaN(newValue)) {
                        ngModel.$setViewValue(oldValue);
                        ngModel.$render();
                    }
                });
            }
        };
    }

})(angular.module('common'));