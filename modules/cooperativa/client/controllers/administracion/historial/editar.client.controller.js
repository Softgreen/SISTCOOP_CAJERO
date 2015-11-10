'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Administracion.Historial.EditarController',
    function ($scope, $state, CAJA, historial, CajaService) {

        $scope.view = {
            historial: historial
        };
        $scope.view.load = {
            balanceCaja: undefined,
            resumenCaja: undefined
        };

        $scope.loadBalanceCaja = function () {
            CajaService.getVoucherCierreCaja(CAJA.id, $scope.view.historial.id).then(function (response) {
                $scope.view.load.balanceCaja = response;
            });

            CajaService.getResumenCierreCaja(CAJA.id, $scope.view.historial.id).then(function (response) {
                $scope.view.load.resumenCaja = response;
            });
        };
        $scope.loadBalanceCaja();

    }
);
