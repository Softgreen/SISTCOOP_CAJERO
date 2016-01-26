'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonalController',
    function ($scope, $window, $state, $modal, toastr, cuentaPersonal, CuentaBancariaService, SGDialog, VoucherService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal
        };

        $scope.congelar = function () {
            CuentaBancariaService.congelarCuentaBancaria($scope.view.cuentaPersonal.id).then(
                function (response) {
                    toastr.success('Cuenta congelada.');
                    $state.reload();
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

        $scope.descongelar = function () {
            CuentaBancariaService.descongelarCuentaBancaria($scope.view.cuentaPersonal.id).then(
                function (response) {
                    toastr.success('Cuenta descongelada.');
                    $state.reload();
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

        $scope.contrato = function(){
            $window.open(CuentaBancariaService.getUrlContrato($scope.view.cuentaPersonal.id));
        };

        $scope.capitalizar = function() {
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modules/socio/views/cuentaPersonal/form-editar-capitalizar.html',
            controller: 'Socio.CuentaPersonal.CapitalizarCuentaPersonalController',
            resolve: {
              cuentaPersonal: function () {
                return $scope.view.cuentaPersonal;
              }
            }
          });

          modalInstance.result.then(function () {
            $scope.working = true;
            CuentaBancariaService.capitalizarCuenta($scope.view.cuentaPersonal.id).then(
              function (response) {
                toastr.success('Cuenta personal capitalizada correctamente');
                $scope.working = false;
                $state.reload();
              }, function error(err) {
                $scope.working = false;
                toastr.error(err.data.message);
              }
            );
          }, function () {
          });
        };

        $scope.cancelar = function() {
          SGDialog.confirm('Guardar', 'Esta operacion no puede ser revertida ¿Estas seguro de cancelar la cuenta? Recuerda retirar todo el saldo de la cuenta antes de cancelarla.', function () {
            CuentaBancariaService.cancelarCuenta($scope.view.cuentaPersonal.id).then(
              function (response) {
                toastr.success('Cuenta cancelada correctamente');
                $state.go('socio.app.socio.cuentaPersonal.buscar');
              }, function error(err) {
                toastr.error(err.data.message);
              }
            );
          });
        };

        $scope.consultaSaldo = function () {
          VoucherService.imprimirConsultaEstadoCuenta($scope.view.cuentaPersonal);
        };

    });
