'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.CapitalizarCuentaPersonalController',
    function ($scope, $state, $modalInstance, toastr, cuentaPersonal, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal,
            capitalizacion: undefined
        };

        $scope.loadCapitalizacion = function() {
          CuentaBancariaService.getCapitalizacion($scope.view.cuentaPersonal.id).then(function (response) {
              $scope.view.capitalizacion = response;
          });
        };
        $scope.loadCapitalizacion();

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
