'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Operaciones.EditarGiroController',
  function ($scope, $state, toastr, SGDialog, AGENCIA, giro, GiroService, SessionService, VoucherService) {

    $scope.giro = giro;
    $scope.agenciaSession = AGENCIA;

    $scope.loadGiro = function() {
      GiroService.findById($scope.giro.id).then(function(response) {
        $scope.giro = response;
      });
    };

    //transaccion
    $scope.desembolsar = function () {
      SGDialog.confirm('Guardar', 'Estas seguro de realizar la transaccion', function () {
        var giro = angular.copy($scope.giro);
        giro.estadoPagoComision = true;
        giro.estado = 'COBRADO';
        GiroService.update(giro.id, giro).then(
          function (response) {
            toastr.success('Giro desembolsado correctamente');
            $scope.loadGiro();
          }, function error(err) {
            toastr.error(err.data.message);
          }
        );
      });
    };

    $scope.extornar = function () {
      SGDialog.confirm('Guardar', 'Estas seguro de realizar esta operacion', function () {
        SessionService.extornarGiro($scope.giro.id).then(
          function (response) {
            toastr.success('Giro extornado correctamente');
            $scope.loadGiro();
          }, function error(err) {
            toastr.error(err.data.message);
          }
        );
      });
    };

    $scope.imprimir = function() {
      VoucherService.imprimirVoucherGiro($scope.giro);
    };

  }
);
