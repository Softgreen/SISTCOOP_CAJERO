'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonal.BeneficiariosController',
    function ($scope, $state, cuentaPersonal, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal
        };

        $scope.view.load = {
            beneficiarios: []
        };
        
        $scope.loadBeneficiarios = function () {
            CuentaBancariaService.getBeneficiarios($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.beneficiarios = response;
            });
        };
        $scope.loadBeneficiarios();

    });
