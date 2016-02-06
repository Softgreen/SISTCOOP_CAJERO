'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Credito.BuscarController',
    function ($scope, $state, CreditoService) {

        var paginationOptions = {
            page: 1,
            pageSize: 10
        };

        $scope.filterOptions = {
            filterText: undefined,
            estado: true
        };

        $scope.gridOptions = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            paginationPageSizes: [10, 25, 50],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,

            columnDefs: [
                {
                  name: 'documento',
                  displayName: 'DOCUMENTO',
                  cellTemplate: '<div ng-class="col.colIndex()" class="ngCellText" style="text-align: left;">' +
                  '<span ng-show="row.entity.socio.personaNatural" ng-bind-template="{{row.entity.socio.personaNatural.tipoDocumento.abreviatura}}:{{row.entity.socio.personaNatural.numeroDocumento}}"></span>' +
                  '<span ng-show="row.entity.socio.personaJuridica" ng-bind-template="{{row.entity.socio.personaJuridica.tipoDocumento.abreviatura}}:{{row.entity.socio.personaJuridica.numeroDocumento}}"></span>' +
                  '</div>',
                  width: '13%'
                },
                {
                  name: 'cliente',
                  displayName: 'CLIENTE',
                  cellTemplate: '<div ng-class="col.colIndex()" class="ngCellText" style="text-align: left;">' +
                  '<span ng-show="row.entity.socio.personaNatural" ng-bind-template="{{row.entity.socio.personaNatural.apellidoPaterno}} {{row.entity.socio.personaNatural.apellidoMaterno}}, {{row.entity.socio.personaNatural.nombres}}"></span>' +
                  '<span ng-show="row.entity.socio.personaJuridica" ng-bind-template="{{row.entity.socio.personaJuridica.razonSocial}}"></span>' +
                  '</div>',
                  width: '23%'
                },
                {field: 'fechaCreacion', displayName: 'F.Inicio', cellFilter: 'date : "dd/MM/yyyy"', width: '10%'},
                {field: 'fechaLimitePago', displayName: 'F.Vence', cellFilter: 'date : "dd/MM/yyyy"', width: '10%'},
                {field: 'moneda.simbolo', displayName: 'M.', width: '5%'},
                {field: 'monto', displayName: 'Desembolsado', cellFilter: 'number: 2', width: '15%'},
                {field: 'interes', displayName: 'Interes', cellFilter: 'number: 2', width: '10%'},
                {field: 'estado', displayName: 'ESTADO', cellFilter: 'si_no : "activo" | uppercase'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs">' +
                    '<i class="pficon pficon-edit"></i>' +
                    '<span>&nbsp;Editar</span>' +
                    '</button>' +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    console.log('Order by. Not available.');
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.page = newPage;
                    paginationOptions.pageSize = pageSize;
                    $scope.search();
                });
            }
        };

        $scope.gridActions = {
            edit: function (row) {
                $state.go('^.editar', {credito: row.id});
            }
        };

        $scope.search = function () {
            var ft = $scope.filterOptions.filterText;
            var desde = (paginationOptions.page * paginationOptions.pageSize) - paginationOptions.pageSize;
            var hasta = paginationOptions.pageSize;

          CreditoService.findByFilterText(ft, ['ACTIVO'], desde, hasta).then(function (response) {
                $scope.gridOptions.data = response;
          });
          CreditoService.count(ft).then(function (response) {
                $scope.gridOptions.totalItems = response;
          });
        };

    }
);
