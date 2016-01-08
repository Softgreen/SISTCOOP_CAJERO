'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.Historial.BuscarController',
    function ($scope, $state, $modal, toastr, CAJA, SGDialog, CajaService, SessionService, VoucherService) {

        var paginationOptions = {
            page: 1,
            pageSize: 10
        };

        $scope.filterOptions = {
            filterText: undefined
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
                {field: 'idTransaccion', displayName: 'TRANS.', width: '9%'},
                {field: 'tipoTransaccion', displayName: 'TIPO TRANS.', width: '9%'},
                {field: 'numeroOperacion', displayName: 'NRO.OP.', width: '9%'},
                {field: 'moneda', displayName: 'MONEDA', width: '16%'},
                {field: 'monto', displayName: 'MONTO', width: '19%'},
                {field: 'fecha', cellFilter: 'date: "dd/MM/yyyy"', displayName: 'FECHA', width: '10%'},
                {field: 'hora', cellFilter: 'date: "HH:mm:ss"', displayName: 'HORA', width: '10%'},
                {field: 'estado', cellFilter: 'si_no: "ACTIVO"', displayName: 'ESTADO', width: '10%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div class="btn-group" uib-dropdown dropdown-append-to-body>'+
                      '<button id="btn-append-to-body" type="button" class="btn btn-default" uib-dropdown-toggle>Acciones <span class="caret"></span></button>'+
                      '<ul uib-dropdown-menu role="menu" aria-labelledby="btn-append-to-body" class="dropdown-menu-right">'+
                        '<li role="menuitem"><a href="" data-ng-click="grid.appScope.gridActions.ver(row.entity)"><i class="pficon pficon-screen"></i><span>&nbsp;Ver</span></a></li>'+
                        '<li role="menuitem"><a href="" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)"><i class="pficon pficon-print"></i><span>&nbsp;Imprimir</span></a></li>'+
                        '<li role="menuitem"><a href="" data-ng-click="grid.appScope.gridActions.imprimir(row.entity, true)"><i class="pficon pficon-print"></i><span>&nbsp;Imprimir con saldo</span></a></li>'+
                        '<li class="divider" data-ng-hide="!row.entity.estado"></li>'+
                        '<li role="menuitem" data-ng-hide="!row.entity.estado"><a href="" data-ng-click="grid.appScope.gridActions.extornar(row.entity)"><i class="pficon pficon-delete"></i><span>&nbsp;Extornar</span></a></li>'+
                      '</ul>'+
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
            ver: function(row) {
              var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/cooperativa/views/transaccionCliente/historial/form-ver-transaccion-popup.html',
                controller: 'Cooperativa.TransaccionCliente.Historial.VerTransaccionPopupController',
                resolve: {
                  transaccion: function () {
                    return row;
                  }
                }
              });
              modalInstance.result.then(function () {
              }, function () {
              });
            },
            imprimir: function (row, saldo) {
                if (row.tipoTransaccion === 'APORTE') {
                    CajaService.getVoucherCuentaAporte(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherAporte(response);
                    });
                }
                else if (row.tipoTransaccion === 'DEPOSITO' || row.tipoTransaccion === 'RETIRO') {
                    CajaService.getVoucherTransaccionBancaria(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherCuentaPersonal(response, saldo);
                    });
                }
                else if (row.tipoTransaccion === 'COMPRA' || row.tipoTransaccion === 'VENTA') {
                    CajaService.getVoucherCompraVenta(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherCompraVenta(response);
                    });
                }
                else if (row.tipoTransaccion === 'TRANSFERENCIA') {
                    CajaService.getVoucherTransferenciaBancaria(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherTransferencia(response);
                    });
                }
                else if (row.tipoTransaccion === 'COBRO_CHEQUE') {
                    CajaService.getVoucherTransaccionCheque(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherCheque(response);
                    });
                } else {
                    alert('Tipo de transaccion no encontrado');
                }
            },
            extornar: function (row) {
                SGDialog.confirmDelete('Transaccion', '', function () {
                    SessionService.extornarTransaccion(row.idTransaccion).then(
                        function (response) {
                            toastr.success('Transaccion extornada satisfactoriamente.');
                            $scope.search();
                        }, function error(err) {
                            toastr.error(err.data.message);
                            $scope.search();
                        }
                    );
                });
            }
        };

        $scope.search = function () {
            var ft = $scope.filterOptions.filterText;
            var desde = (paginationOptions.page * paginationOptions.pageSize) - paginationOptions.pageSize;
            var hasta = paginationOptions.pageSize;
            CajaService.getHistorialTransaccion(CAJA.id, null, ft, desde, hasta).then(function (response) {
                $scope.gridOptions.data = response;
                $scope.gridOptions.totalItems = 1000;
            });
        };

    });
