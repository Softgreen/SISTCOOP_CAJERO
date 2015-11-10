'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Administracion.Pendiente.BuscarController',
    function ($scope, $state, CAJA, CajaService) {

        $scope.view = {};

        $scope.gridOptionsDelDia = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'moneda.denominacion', displayName: 'MONEDA'},
                {field: 'monto', cellFilter: 'number: 2', displayName: 'MONTO'},
                {field: 'tipoPendiente', displayName: 'TIPO'},
                {field: 'fecha', cellFilter: "date : 'dd/MM/yyyy'", displayName: 'FECHA'},
                {field: 'hora', cellFilter: "date : 'HH:mm:ss'", displayName: 'HORA'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
                }
            ]
        };

        $scope.gridOptionsPorPagar = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.moneda.simbolo"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '29%'
                },
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '44%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.pagar(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Pagar</button></div>'
                }
            ]
        };

        $scope.gridActions = {
            pagar: function (row) {
                $state.go('^.crear', {idPendienteRelacionado: row.id, tipoPendiente: 'PAGO'});
            },
            imprimir: function(){

            }
        };

        $scope.search = function () {
            CajaService.getPendientes(CAJA.id).then(function (response) {
                $scope.gridOptionsDelDia.data = response;
            });
            CajaService.getPendientesPorPagar(CAJA.id).then(function (response) {
                $scope.gridOptionsPorPagar.data = response;
            });
        };
        $scope.search();
    }
);
