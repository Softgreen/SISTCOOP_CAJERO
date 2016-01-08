'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.Historial.VerTransaccionPopupController',
    function ($scope, $modalInstance, transaccion) {

      $scope.transaccion = transaccion;

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    });
