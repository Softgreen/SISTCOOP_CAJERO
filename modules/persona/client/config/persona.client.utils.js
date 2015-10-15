'use strict';

angular.module('persona').filter('si_no', function () {
    return function (input, mode) {
        var defaultResult = ['Si', 'No'];
        var modeOneResult = ['Activo', 'Inactivo'];
        var modeTwoResult = ['Abierto', 'Cerrado'];
        var modeTreeResult = ['Descongelado', 'Congelado'];

        var result = defaultResult;
        if (mode) {
            if (mode.toLowerCase() === 'si') {
                result = defaultResult;
            } else if (mode.toLowerCase() === 'activo') {
                result = modeOneResult;
            } else if (mode.toLowerCase() === 'abierto') {
                result = modeTwoResult;
            } else if (mode.toLowerCase() === 'congelado') {
                result = modeTreeResult;
            } else {
                result = defaultResult;
            }
        }

        if (input) {
            return result[0];
        }
        return result[1];
    };
});

angular.module('persona').directive('sgMaxDate', function () {
    return {
        require: 'ngModel',
        link: function ($scope, elem, attrs, ngModel) {
            ngModel.$validators.sgmaxdate = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return $scope.maxDate >= value;
            };
        }
    };
});


angular.module('persona').service('SGDialog', ['$modal', function ($modal) {
    var dialog = {};

    var openDialog = function (title, message, btns) {
        var controller = function ($scope, $modalInstance, title, message, btns) {
            $scope.title = title;
            $scope.message = message;
            $scope.btns = btns;

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        controller.$inject = ['$scope', '$modalInstance', 'title', 'message', 'btns'];

        return $modal.open({
            template: '' +
            "<div class=\"modal-header\">\n" +
            "<button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
            "<span class=\"pficon pficon-close\"></span>\n" +
            "</button>\n" +
            "<h4 class=\"modal-title\">{{title}}</h4>\n" +
            "</div>\n" +
            "<div class=\"modal-body\">{{message}}</div>\n" +
            "<div class=\"modal-footer\">\n" +
            "<button type=\"button\" data-ng-class=\"btns.cancel.cssClass\" ng-click=\"cancel()\">{{btns.cancel.label}}</button>\n" +
            "<button type=\"button\" data-ng-class=\"btns.ok.cssClass\" ng-click=\"ok()\">{{btns.ok.label}}</button>\n" +
            "</div>\n" +
            "",
            controller: controller,
            resolve: {
                title: function () {
                    return title;
                },
                message: function () {
                    return message;
                },
                btns: function () {
                    return btns;
                }
            }
        }).result;
    };

    var escapeHtml = function (str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    dialog.confirmDelete = function (name, type, success) {
        var title = 'Eliminar ' + escapeHtml(type.charAt(0).toUpperCase() + type.slice(1));
        var msg = '?Estas seguro de querer eliminar permanentemente el/la ' + type + ' ' + name + '?';
        var btns = {
            ok: {
                label: 'Eliminar',
                cssClass: 'btn btn-danger'
            },
            cancel: {
                label: 'Cancelar',
                cssClass: 'btn btn-default'
            }
        };

        openDialog(title, msg, btns).then(success);
    };

    dialog.confirmGenerateKeys = function (name, type, success) {
        var title = 'Generate new keys for realm';
        var msg = 'Are you sure you want to permanently generate new keys for ' + name + '?';
        var btns = {
            ok: {
                label: 'Generate Keys',
                cssClass: 'btn btn-danger'
            },
            cancel: {
                label: 'Cancel',
                cssClass: 'btn btn-default'
            }
        };

        openDialog(title, msg, btns).then(success);
    };

    dialog.confirm = function (title, message, success, cancel) {
        var btns = {
            ok: {
                label: title,
                cssClass: 'btn btn-danger'
            },
            cancel: {
                label: 'Cancel',
                cssClass: 'btn btn-default'
            }
        };

        openDialog(title, message, btns).then(success, cancel);
    };

    return dialog;
}]);


angular.module('persona').directive('sgReadOnly', function () {
    var disabled = {};

    var d = {
        replace: false,
        link: function (scope, element, attrs) {
            var disable = function (i, e) {
                if (!e.disabled) {
                    disabled[e.tagName + i] = true;
                    e.disabled = true;
                }
            };

            var enable = function (i, e) {
                if (disabled[e.tagName + i]) {
                    e.disabled = false;
                    delete disabled[i];
                }
            };

            scope.$watch(attrs.sgReadOnly, function (readOnly) {
                if (readOnly) {
                    element.find('input').each(disable);
                    element.find('button').each(disable);
                    element.find('select').each(disable);
                    element.find('textarea').each(disable);
                } else {
                    element.find('input').each(enable);
                    element.find('input').each(enable);
                    element.find('button').each(enable);
                    element.find('select').each(enable);
                    element.find('textarea').each(enable);
                }
            });
        }
    };
    return d;
});


angular.module('persona').directive('sgInput', function () {
    var d = {
        scope: true,
        replace: false,
        link: function (scope, element, attrs) {
            var form = element.children('form');
            var label = element.children('label');
            var input = element.children('input');

            var id = form.attr('name') + '.' + input.attr('name');

            element.attr('class', 'control-group');

            label.attr('class', 'control-label');
            label.attr('for', id);

            input.wrap('<div class="controls"/>');
            input.attr('id', id);

            if (!input.attr('placeHolder')) {
                input.attr('placeHolder', label.text());
            }

            if (input.attr('required')) {
                label.append(' <span class="required">*</span>');
            }
        }
    };
    return d;
});

angular.module('persona').directive('sgEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.sgEnter);
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('persona').directive('sgSave', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr, ctrl) {
            elem.addClass('btn btn-primary');
            elem.attr('type","submit');
            elem.bind('click', function () {
                $scope.$apply(function () {
                    var form = elem.closest('form');
                    if (form && form.attr('name')) {
                        var ngValid = form.find('.ng-valid');
                        if ($scope[form.attr('name')].$valid) {
                            //ngValid.removeClass('error');
                            ngValid.parent().removeClass('has-error');
                            /* jshint -W069 */
                            $scope['save']();
                        } else {
                            console.log('Missing or invalid field(s). Please verify the fields in red.');
                            //ngValid.removeClass('error');
                            ngValid.parent().removeClass('has-error');

                            var ngInvalid = form.find('.ng-invalid');
                            //ngInvalid.addClass('error');
                            ngInvalid.parent().addClass('has-error');
                        }
                    }
                });
            });
        }
    };
}]);

angular.module('persona').directive('sgReset', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr, ctrl) {
            elem.addClass('btn btn-default');
            elem.attr('type', 'submit');
            elem.bind('click', function () {
                $scope.$apply(function () {
                    var form = elem.closest('form');
                    if (form && form.attr('name')) {
                        form.find('.ng-valid').removeClass('error');
                        form.find('.ng-invalid').removeClass('error');
                        /* jshint -W069 */
                        $scope['reset']();
                    }
                });
            });
        }
    };
}]);

angular.module('persona').directive('sgCancel', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr, ctrl) {
            elem.addClass('btn btn-default');
            elem.attr('type', 'submit');
        }
    };
}]);

angular.module('persona').directive('sgDelete', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr, ctrl) {
            elem.addClass('btn btn-danger');
            elem.attr('type', 'submit');
        }
    };
}]);

angular.module('persona').filter('remove', function () {
    return function (input, remove, attribute) {
        if (!input || !remove) {
            return input;
        }

        var out = [];
        for (var i = 0; i < input.length; i++) {
            var e = input[i];

            if (Array.isArray(remove)) {
                for (var j = 0; j < remove.length; j++) {
                    if (attribute) {
                        if (remove[j][attribute] === e[attribute]) {
                            e = null;
                            break;
                        }
                    } else {
                        if (remove[j] === e) {
                            e = null;
                            break;
                        }
                    }
                }
            } else {
                if (attribute) {
                    if (remove[attribute] === e[attribute]) {
                        e = null;
                    }
                } else {
                    if (remove === e) {
                        e = null;
                    }
                }
            }

            if (e !== null) {
                out.push(e);
            }
        }

        return out;
    };
});

angular.module('persona').filter('capitalize', function () {
    return function (input) {
        if (!input) {
            return;
        }
        var result = input.substring(0, 1).toUpperCase();
        var s = input.substring(1);
        for (var i = 0; i < s.length; i++) {
            var c = s[i];
            if (c.match(/[A-Z]/)) {
                result = result.concat(' ');
            }
            result = result.concat(c);
        }
        return result;
    };
});

angular.module("sgtemplate/modal/modal.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("sgtemplate/modal/modal.html",
        "<div class=\"modal-header\">\n" +
        "<button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
        "<span class=\"pficon pficon-close\">?</span>\n" +
        "</button>\n" +
        "<h4 class=\"modal-title\">{{title}}</h4>\n" +
        "</div>\n" +
        "<div class=\"modal-body\">{{message}}</div>\n" +
        "<div class=\"modal-footer\">\n" +
        "<button type=\"button\" data-ng-class=\"btns.cancel.cssClass\" ng-click=\"cancel()\">{{btns.cancel.label}}</button>\n" +
        "<button type=\"button\" data-ng-class=\"btns.ok.cssClass\" ng-click=\"ok()\">{{btns.ok.label}}</button>\n" +
        "</div>\n" +
        ""
    );
}]);
