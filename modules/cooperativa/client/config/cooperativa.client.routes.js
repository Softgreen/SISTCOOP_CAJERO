'use strict';

// Setting up route
angular.module('cooperativa').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        var moduleName = 'cooperativa';

        $urlRouterProvider.when('/cooperativa/app', '/cooperativa/app/transaccionCliente/transacciones/compraVenta');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas', '/cooperativa/app/estructura/bovedas/buscar');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas', '/cooperativa/app/estructura/cajas/buscar');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda', '/cooperativa/app/estructura/bovedas/editar/:boveda/resumen');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja', '/cooperativa/app/estructura/cajas/editar/:caja/resumen');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda/historiales', '/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/buscar');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial', '/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/resumen');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/transaccionesBovedaCaja', '/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/transaccionesBovedaCaja/buscar');

        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/buscar');

        //$urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/resumen');
        //$urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/buscar');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/buscar');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial/resumen');


        //Transacciones cliente
        $urlRouterProvider.when('/cooperativa/app/transaccionCliente/transacciones', '/cooperativa/app/transaccionCliente/transacciones/compraVenta');
        $urlRouterProvider.when('/cooperativa/app/transaccionCliente/historial', '/cooperativa/app/transaccionCliente/historial/buscar');

        //Transacciones interna
        $urlRouterProvider.when('/cooperativa/app/transaccionInterna/transaccionesBovedaCaja', '/cooperativa/app/transaccionInterna/transaccionesBovedaCaja/buscar');
        $urlRouterProvider.when('/cooperativa/app/transaccionInterna/transaccionesCajaCaja', '/cooperativa/app/transaccionInterna/transaccionesCajaCaja/buscar');

        //Administracion
        $urlRouterProvider.when('/cooperativa/app/administracion/historiales', '/cooperativa/app/administracion/historiales/buscar');
        $urlRouterProvider.when('/cooperativa/app/administracion/historiales/editar/:historial', '/cooperativa/app/administracion/historiales/editar/:historial/resumen');

        $urlRouterProvider.when('/cooperativa/app/administracion/pendientes', '/cooperativa/app/administracion/pendientes/buscar');

        $stateProvider
            .state('cooperativa', {
                abstract: true,
                url: '/cooperativa',
                templateUrl: 'modules/cooperativa/client/views/_body.html',
                controller: 'CooperativaController'
            })
            .state('cooperativa.home', {
                url: '/home',
                templateUrl: 'modules/cooperativa/client/views/index.html',
                ncyBreadcrumb: {
                    label: 'Index'
                }
            })
            .state('cooperativa.app', {
                url: '/app',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.operaciones', {
                url: '/operaciones',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('cooperativa.app.estructura', {
                url: '/estructura',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('cooperativa.app.transaccionCliente', {
                url: '/transaccionCliente',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('cooperativa.app.transaccionInterna', {
                url: '/transaccionInterna',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('cooperativa.app.administracion', {
                url: '/administracion',
                template: '<div ui-view></div>',
                abstract: true
            })

            .state('cooperativa.app.operaciones.cerrarCaja', {
                url: '/cerrarCaja',
                templateUrl: 'modules/cooperativa/client/views/operaciones/form-cerrar-caja.html',
                controller: 'Cooperativa.Operaciones.CerrarCajaController',
                ncyBreadcrumb: {
                    label: 'Cerrar Caja'
                }
            })

            //Estructura

            //Bovedas
            .state('cooperativa.app.estructura.boveda', {
                url: '/bovedas',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.boveda.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/boveda/form-buscar-boveda.html',
                controller: 'Cooperativa.Boveda.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.estructura.boveda.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/boveda/form-crear-boveda.html',
                controller: 'Cooperativa.Boveda.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear boveda',
                    parent: 'cooperativa.app.estructura.boveda.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar', {
                url: '/editar/:boveda',
                templateUrl: 'modules/cooperativa/client/views/boveda/form-editar-boveda.html',
                controller: 'Cooperativa.Boveda.EditarController',
                resolve: {

                    boveda: function ($state, $stateParams, SGBoveda) {
                        return SGBoveda.$find($stateParams.boveda);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar boveda',
                    parent: 'cooperativa.app.estructura.boveda.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/client/views/boveda/form-editar-boveda-resumen.html',
                controller: 'Cooperativa.Boveda.Editar.ResumenController',
                resolve: {},
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'modules/cooperativa/client/views/boveda/form-editar-boveda-datosPrincipales.html',
                controller: 'Cooperativa.Boveda.Editar.DatosPrincipalesController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Datos principales'
                }
            })

            //HistorialBoveda
            .state('cooperativa.app.estructura.boveda.editar.historial', {
                url: '/historiales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-buscar-historial.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Buscar historial'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-crear-historial.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear historial',
                    parent: 'cooperativa.app.estructura.boveda.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar', {
                url: '/editar/:historial',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-editar-historial.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.EditarController',
                resolve: {

                    historial: function ($state, $stateParams, boveda) {
                        return boveda.SGHistorialBoveda().$find($stateParams.historial);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar historial',
                    parent: 'cooperativa.app.estructura.boveda.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.Editar.ResumenController',
                resolve: {},
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar.cerrar', {
                url: '/cerrar',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-editar-historial-cerrar.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.Editar.CerrarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Cerrar historial'
                }
            })

            //TransaccionBovedaCaja
            .state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja', {
                url: '/transaccionesBovedaCaja',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/transaccionBovedaCaja/form-buscar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Buscar transaccionBovedaCaja'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/transaccionBovedaCaja/form-crear-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear transaccion boveda-caja',
                    parent: 'cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.editar', {
                url: '/editar/:transaccion',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/transaccionBovedaCaja/form-editar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.EditarController',
                resolve: {

                    transaccion: function ($state, $stateParams, historial) {
                        return historial.SGTransaccionBovedaCaja().$find($stateParams.transaccion);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar transaccion boveda-caja',
                    parent: 'cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.buscar'
                }
            })

            //Cajas
            .state('cooperativa.app.estructura.caja', {
                url: '/cajas',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/form-buscar-caja.html',
                controller: 'Cooperativa.Caja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.estructura.caja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/form-crear-caja.html',
                controller: 'Cooperativa.Caja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar', {
                url: '/editar/:caja',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja.html',
                controller: 'Cooperativa.Caja.EditarController',
                resolve: {

                    caja: function ($state, $stateParams, SGCaja) {
                        return SGCaja.$find($stateParams.caja);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-resumen.html',
                controller: 'Cooperativa.Caja.Editar.ResumenController',
                resolve: {},
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.editar.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-datosPrincipales.html',
                controller: 'Cooperativa.Caja.Editar.DatosPrincipalesController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Datos principales'
                }
            })

            //BovedaCajas
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja', {
                url: '/bovedaCajas',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/form-buscar-bovedaCaja.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Bovedas'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/form-crear-bovedaCaja.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear Boveda-Caja',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar', {
                url: '/editar/:bovedaCaja',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/form-editar-bovedaCaja.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.EditarController',
                resolve: {

                    bovedaCaja: function ($state, $stateParams, caja) {
                        return caja.SGBovedaCaja().$find($stateParams.bovedaCaja);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar boveda-caja',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.buscar'
                }
            })

            //HistorialBovedacaja
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial', {
                url: '/historiales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-buscar-historial.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-crear-historial.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear Historial',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar', {
                url: '/editar/:historial',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-editar-historial.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.EditarController',
                resolve: {

                    historial: function ($state, $stateParams, bovedaCaja) {
                        return bovedaCaja.SGHistorialBovedaCaja().$find($stateParams.historial);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.ResumenController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.cerrar', {
                url: '/cerrar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-editar-historial-cerrar.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.CerrarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Cerrar caja'
                }
            })

            //TransaccionBoevdaCaja
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja', {
                url: '/historiales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-buscar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-crear-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'crear caja'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.editar', {
                url: '/editar/:transaccion',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.EditarController',
                resolve: {

                    transaccion: function ($state, $stateParams, historial) {
                        return historial.SGTransaccionBovedaCaja().$find($stateParams.transaccion);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar transaccion'
                }
            })

            //TransaccionCajacaja
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja', {
                url: '/transaccionesCajaCaja',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
                resolve: {

                    caja: function ($state, $stateParams, SGCaja) {
                        return SGCaja.$find($stateParams.caja);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
                resolve: {

                    caja: function ($state, $stateParams, SGCaja) {
                        return SGCaja.$find($stateParams.caja);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
                resolve: {

                    caja: function ($state, $stateParams, SGCaja) {
                        return SGCaja.$find($stateParams.caja);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.editar', {
                url: '/editar/:transaccion',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
                resolve: {

                    caja: function ($state, $stateParams, SGCaja) {
                        return SGCaja.$find($stateParams.caja);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })

            .state('cooperativa.app.estructura.caja.editar.editar.boveda', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-bovedas.html',
                controller: 'Cooperativa.Caja.Editar.BovedaController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Bovedas'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.editar.abrir', {
                url: '/abrir',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-abrir.html',
                controller: 'Cooperativa.Caja.EditarCaja.AbrirController',
                resolve: {}
            })
            .state('cooperativa.app.estructura.caja.editar.editar.cerrar', {
                url: '/cerrar',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-cerrar.html',
                controller: 'Cooperativa.Caja.EditarCaja.CerrarController',
                resolve: {}
            })

            //Transaccion Cliente
            .state('cooperativa.app.transaccionCliente.transaccion', {
                url: '/transacciones',
                templateUrl: 'modules/cooperativa/client/views/transaccionCliente/form-transaccion-cliente.html',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.transaccionCliente.historial', {
                url: '/historial',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.transaccionCliente.transaccion.compraVenta', {
                url: '/compraVenta',
                templateUrl: 'modules/cooperativa/client/views/transaccionCliente/compraVenta/form-transaccion-compraVenta.html',
                controller: 'Cooperativa.TransaccionCliente.CompraVenta.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.transaccionCliente.transaccion.cuentaPersonal', {
                url: '/cuentaPersonal',
                templateUrl: 'modules/cooperativa/client/views/transaccionCliente/cuentaPersonal/form-transaccion-cuentaPersonal.html',
                controller: 'Cooperativa.TransaccionCliente.CuentaPersonal.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })

            .state('cooperativa.app.transaccionCliente.historial.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/transaccionCliente/historial/form-buscar-transaccion.html',
                controller: 'Cooperativa.TransaccionCliente.Historial.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })

            //Transacciones internas
            .state('cooperativa.app.transaccionInterna.bovedaCaja', {
                url: '/transaccionesBovedaCaja',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.transaccionInterna.cajaCaja', {
                url: '/transaccionesCajaCaja',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.transaccionInterna.bovedaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/transaccionInterna/bovedaCaja/form-buscar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.BovedaCaja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.transaccionInterna.bovedaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/transaccionInterna/bovedaCaja/form-crear-transaccionBovedaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.BovedaCaja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear transaccion boveda-caja',
                    parent: 'cooperativa.app.transaccionInterna.bovedaCaja.buscar'
                }
            })

            .state('cooperativa.app.transaccionInterna.cajaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/transaccionInterna/cajaCaja/form-buscar-transaccionCajaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.CajaCaja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.transaccionInterna.cajaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/transaccionInterna/cajaCaja/form-crear-transaccionCajaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.CajaCaja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear transaccion caja-caja',
                    parent: 'cooperativa.app.transaccionInterna.cajaCaja.buscar'
                }
            })

            //administracion
            .state('cooperativa.app.administracion.pendiente', {
                url: '/pendientes',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.administracion.historial', {
                url: '/historiales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.administracion.pendiente.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/administracion/pendiente/form-buscar-pendiente.html',
                controller: 'Cooperativa.Administracion.Pendiente.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.administracion.pendiente.crear', {
                url: '/crear?idBoveda&monto&idPendienteRelacionado&tipoPendiente',
                templateUrl: 'modules/cooperativa/client/views/administracion/pendiente/form-crear-pendiente.html',
                controller: 'Cooperativa.Administracion.Pendiente.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear pendiente',
                    parent: 'cooperativa.app.administracion.pendiente.buscar'
                }
            })

            .state('cooperativa.app.administracion.historial.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/administracion/historial/form-buscar-historiales.html',
                controller: 'Cooperativa.Administracion.Historial.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.administracion.historial.editar', {
                url: '/editar/:historial',
                templateUrl: 'modules/cooperativa/client/views/administracion/historial/form-editar-historial.html',
                controller: 'Cooperativa.Administracion.Historial.EditarController',
                resolve: {
                    historial: function ($state, $stateParams) {
                        return {id: $stateParams.historial};
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar historial',
                    parent: 'cooperativa.app.administracion.historial.buscar'
                }
            })
            .state('cooperativa.app.administracion.historial.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/client/views/administracion/historial/form-editar-historial-resumen.html',
                //controller: 'Cooperativa.Boveda.Editar.ResumenController',
                resolve: {},
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.administracion.historial.editar.balanceCaja', {
                url: '/datosPrincipales',
                templateUrl: 'modules/cooperativa/client/views/administracion/historial/form-editar-historial-balanceCaja.html',
                //controller: 'Cooperativa.Boveda.Editar.DatosPrincipalesController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Datos principales'
                }
            });


    }
]);
