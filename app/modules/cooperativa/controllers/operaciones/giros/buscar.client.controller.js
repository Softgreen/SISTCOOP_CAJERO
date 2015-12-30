'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Operaciones.BuscarGiroController',
  function ($scope, $state, AGENCIA, AgenciaService) {

    $scope.estadoGiro = 'ENVIADO';

    var paginationOptionsEnviados = {
      page: 1,
      pageSize: 10
    };
    $scope.filterOptionsEnviados = {
      filterText: undefined
    };
    $scope.gridOptions_enviados = {
      data: [],
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,

      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,

      columnDefs: [
        {field: 'fechaEnvio', displayName: 'F.Envio', cellFilter: "date : 'dd/MM/yyyy HH:mm:ss'", width: '9%'},
        {
          name: 'remitente',
          displayName: 'Remitente',
          cellTemplate: '<div><span data-ng-bind="row.entity.clienteEmisor"></span></div>',
          width: '17%'
        },
        {
          name: 'para',
          displayName: 'Para',
          cellTemplate: '<div><span data-ng-bind="row.entity.clienteReceptor"></span></div>',
          width: '17%'
        },
        {
          name: 'destino',
          displayName: 'A.Destino',
          cellTemplate: '<div><span data-ng-bind="row.entity.agenciaDestino.abreviatura"></span></div>',
          width: '10%'
        },
        {
          name: 'moneda',
          displayName: 'MONEDA',
          cellTemplate: '<div><span data-ng-bind="row.entity.moneda.simbolo"></span></div>',
          width: '4%'
        },
        {field: 'monto', displayName: 'Monto', cellFilter: 'currency: "" ', width: '10%'},
        {field: 'comision', displayName: 'Comision', cellFilter: 'currency: "" ', width: '5%'},
        {field: 'lugarPagoComision', displayName: 'Pago Comision', width: '8%'},
        {field: 'estado', displayName: 'Estado', width: '7%'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '' +
          '<div style="text-align: center; padding-top: 5px;">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.cancelar(row.entity)" data-ng-disabled="row.entity.estadoConfirmacion || !row.entity.estadoSolicitud" class="btn btn-danger btn-xs">Cancelar' +
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
          paginationOptionsEnviados.page = newPage;
          paginationOptionsEnviados.pageSize = pageSize;
          $scope.searchEnviados();
        });
      }
    };

    var paginationOptionsRecibidos = {
      page: 1,
      pageSize: 10
    };
    $scope.filterOptionsRecibidos = {
      filterText: undefined
    };
    $scope.gridOptions_recibidos = {
      data: [],
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,

      paginationPageSizes: [10, 25, 50],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,

      columnDefs: [
        {field: 'fechaEnvio', displayName: 'F.Envio', cellFilter: "date : 'dd/MM/yyyy HH:mm:ss'", width: '9%'},
        {
          name: 'remitente',
          displayName: 'Remitente',
          cellTemplate: '<div><span data-ng-bind="row.entity.clienteEmisor"></span></div>',
          width: '17%'
        },
        {
          name: 'para',
          displayName: 'Para',
          cellTemplate: '<div><span data-ng-bind="row.entity.clienteReceptor"></span></div>',
          width: '17%'
        },
        {
          name: 'destino',
          displayName: 'A.Destino',
          cellTemplate: '<div><span data-ng-bind="row.entity.agenciaDestino.abreviatura"></span></div>',
          width: '10%'
        },
        {
          name: 'moneda',
          displayName: 'MONEDA',
          cellTemplate: '<div><span data-ng-bind="row.entity.moneda.simbolo"></span></div>',
          width: '4%'
        },
        {field: 'monto', displayName: 'Monto', cellFilter: 'currency: "" ', width: '10%'},
        {field: 'comision', displayName: 'Comision', cellFilter: 'currency: "" ', width: '5%'},
        {field: 'lugarPagoComision', displayName: 'Pago Comision', width: '8%'},
        {field: 'estado', displayName: 'Estado', width: '7%'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '' +
          '<div style="text-align: center; padding-top: 5px;">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.cancelar(row.entity)" data-ng-disabled="row.entity.estadoConfirmacion || !row.entity.estadoSolicitud" class="btn btn-danger btn-xs">Cancelar' +
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
          paginationOptionsRecibidos.page = newPage;
          paginationOptionsRecibidos.pageSize = pageSize;
          $scope.searchRecibidos();
        });
      }
    };


    $scope.gridActions = {
      imprimir: function (row) {

      }
    };

    $scope.searchRecibidos = function () {
      var ft = $scope.filterOptionsRecibidos.filterText;
      var desde = (paginationOptionsRecibidos.pageSize * paginationOptionsRecibidos.page) - paginationOptionsEnviados.pageSize;
      var hasta = paginationOptionsRecibidos.pageSize;
      AgenciaService.getGirosRecibidos(AGENCIA.id, $scope.estadoGiro, ft, desde, hasta).then(function (response) {
        $scope.gridOptions_recibidos.data = response;
      });
      AgenciaService.countRecibidos(AGENCIA.id).then(function (response) {
        $scope.gridOptions_recibidos.totalItems = response;
      });
    };
    $scope.searchEnviados = function () {
      var ft = $scope.filterOptionsEnviados.filterText;
      var desde = (paginationOptionsEnviados.pageSize * paginationOptionsEnviados.page) - paginationOptionsEnviados.pageSize;
      var hasta = paginationOptionsEnviados.pageSize;
      AgenciaService.getGirosEnviados(AGENCIA.id, $scope.estadoGiro, ft, desde, hasta).then(function (response) {
        $scope.gridOptions_enviados.data = response;
      });
      AgenciaService.countEnviados(AGENCIA.id).then(function (response) {
        $scope.gridOptions_enviados.totalItems = response;
      });
    };

    $scope.$watch("estadoGiro", function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.searchRecibidos();
        $scope.searchEnviados();
      }
    }, true);

  }
);
