(function () {
    angular.module("rainForm", []);
})();

/*  -- directive formInput -- */

(function (module) {

    var watcherFor = function (form, name) {
        return function () {
            if (name && form[name]) {
                if (!form[name].$dirty) {
                    return false;
                }
                return form[name].$invalid;
            }
        };
    };

    var updaterFor = function (element) {
        return function (hasError) {
            if (hasError) {
                element.addClass("has-error");
                element.find('.help-block').show();
                //.removeClass("has-success");
            } else {
                element.removeClass("has-error");
                element.find('.help-block').hide();
                //.addClass("has-success");
            }
        };
    };

    var setupDom = function (element, $compile, scope) {

        if (!element.hasClass('form-group') && element.find('.form-group').length === 0) {
            var html = element.html();
            var newHtml = '<div class="form-group form-group-sm">' + html + '</div>'
            element.html($compile(newHtml)(scope));
        }


        var label = element[0].querySelector("label");
        if (label) {
            label.classList.add("control-label");
        }

        var input = element[0].querySelector("input, textarea, select");
        if (input) {
            var type = input.getAttribute("type");
            var name = input.getAttribute("name");
            if (type !== "checkbox" && type !== "radio") {
                input.classList.add("form-control");
            }
            return name;
        }
    };

    var addMessages = function (form, element, name, $compile, scope) {
        var messages = "<span class='help-block' ng-messages='" +
            form.$name + "." + name + ".$error" +
            "' ng-messages-include='error-messages'>" +
            //"<div ng-message='minlength'>length must be larger than 3</div>" +
            "<span>";
        element.append($compile(messages)(scope));
    };

    var link = function ($compile) {
        return function (scope, element, attributes, form) {
            var name = setupDom(element, $compile, scope);
            if (name) {
                addMessages(form, element, name, $compile, scope);
            }
            scope.$watch(watcherFor(form, name), updaterFor(element));
        }
    };

    var formInput = function ($compile) {

        return {
            restrict: "A",
            require: "^form",
            link: link($compile)
        };

    };

    module.directive("formInput", formInput);

}(angular.module("rainForm")));

(function (app) {

    app.directive('showErrors', function ($timeout) {

        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {

                // find the text box element, which has the 'name' attribute
                var inputEl = el[0].querySelector("[name]");

                // convert the native text box element to an angular element
                var inputNgEl = angular.element(inputEl);

                // get the name on the text box so we know the property to check
                // on the form controller
                var inputName = inputNgEl.attr('name');

                //var helpText = angular.element(el[0].querySelector(".help-block"));

                // only apply the has-error class after the user leaves the text box
                inputNgEl.bind('keypress', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                    //helpText.toggleClass('hide', formCtrl[inputName].$valid);
                });

                scope.$on('show-errors-event', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                });

                scope.$on('hide-errors-event', function () {
                    $timeout(function () {
                        el.removeClass('has-error');
                    }, 0, false);
                });


            }
        }

    });
})(angular.module('rainForm'));