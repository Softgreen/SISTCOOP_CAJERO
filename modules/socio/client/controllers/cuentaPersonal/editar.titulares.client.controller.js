'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonal.TitularesController',
    function ($scope, $state, cuentaPersonal, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal
        };

        $scope.view.load = {
            titulares: []
        };

        $scope.loadTitulares = function () {
            CuentaBancariaService.getTitulares($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.titulares = response;
            });
        };
        $scope.loadTitulares();


    });
