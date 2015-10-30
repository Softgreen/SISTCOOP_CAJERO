'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.CompraVenta.CrearController',
    function ($scope, $state, $modal, toastr, TasaInteresService) {

        $scope.working = false;

        $scope.view = {
            transaccion: {}
        };
        $scope.view.load = {
            tipoCambio: undefined
        };

        $scope.combo = {
            operacion: undefined
        };
        $scope.combo.selected = {
            operacion: undefined
        };
        $scope.combo.groupFn = function (item) {
            return item.tipo;
        };

        $scope.access = {
            login: false
        };

        $scope.loadCombo = function () {
            $scope.combo.operacion = [
                {denominacion: 'Compra Dolar (USD)', tipo: 'COMPRA', idMonedaRecibida: 0, idMonedaEntregada: 1},
                {denominacion: 'Venta Dolar (USD)', tipo: 'VENTA', idMonedaRecibida: 1, idMonedaEntregada: 0},
                {denominacion: 'Compra Euro (EUR)', tipo: 'COMPRA', idMonedaRecibida: 2, idMonedaEntregada: 1},
                {denominacion: 'Venta Dolar (EUR)', tipo: 'VENTA', idMonedaRecibida: 1, idMonedaEntregada: 2}
            ];
        };
        $scope.loadCombo();

        $scope.loadTipoCambio = function () {
            $scope.$watch('combo.selected.operacion', function (newValue, oldValue) {
                if (angular.isDefined($scope.combo.selected.operacion)) {
                    TasaInteresService.getTasaCambio($scope.combo.selected.operacion.idMonedaRecibida, $scope.combo.selected.operacion.idMonedaEntregada).then(function (response) {
                        $scope.view.transaccion.tipoCambio = response.valor;
                    });
                } else {
                    $scope.view.transaccion.tipoCambio = 0;
                }
            }, true);
        };
        $scope.loadTipoCambio();

        $scope.login = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/modules/cooperativa/client/views/login/form-login.html',
                controller: 'Cooperativa.LoginController',
                resolve: {}
            });
            modalInstance.result.then(function () {
                $scope.access.login = true;
            }, function () {
            });
        };

    }
);
