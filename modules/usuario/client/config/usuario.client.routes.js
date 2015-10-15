'use strict';

// Setting up route
angular.module('usuario').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('usuario', {
                abstract: true,
                url: '/usuario',
                templateUrl: 'modules/usuario/client/views/_body.html',
                controller: 'UsuarioController'
            })
            .state('usuario.home', {
                url: '/home',
                templateUrl: 'modules/usuario/client/views/index.html',
                ncyBreadcrumb: {
                    label: 'Index'
                }
            })

            .state('usuario.app', {
                url: '/app',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            });
    }
]);
