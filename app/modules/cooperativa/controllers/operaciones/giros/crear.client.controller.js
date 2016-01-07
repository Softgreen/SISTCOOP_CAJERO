'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Operaciones.CrearGiroController',
  function ($scope, $state, toastr, SGDialog, AGENCIA, PersonaNaturalService, AgenciaService, SessionService, MonedaService, GiroService, VoucherService) {

    $scope.working = false;

    $scope.view = {
      numeroDocumentoEmisor: undefined,
      nombreClienteEmisor: undefined,

      numeroDocumentoReceptor: undefined,
      nombreClienteReceptor: undefined,

      monto: 0,
      comision: 10,

      tipoComision: 'FIJO',//PORCENTUAL
      modoPagoComision: 'ANADIR',//REDUCIR
      lugarPagoComision: 'AL_ENVIAR',//AL_COBRAR

      agenciaOrigen: AGENCIA,
      limpiar: function() {
        $state.reload();
      },
      voucher: {
        list: [],
        limpiar: function () {
          $scope.view.voucher.list = [];
        }
      }
    };

    $scope.transaccion = {};

    $scope.combo = {
      moneda: undefined,
      agenciaDestino: undefined
    };
    $scope.combo.selected = {
      moneda: undefined,
      agenciaDestino: undefined
    };
    $scope.directAccess = {
      moneda: [{
        id: '1',
        denominacion: 'NUEVOS SOLES',
        simbolo: 'S/.'
      }, {
        id: '0',
        denominacion: 'DOLARES AMERICANOS',
        simbolo: '$'
      }, {
        id: '2',
        denominacion: 'EUROS',
        simbolo: '€'
      }]
    };

    $scope.loadCombo = function() {
      AgenciaService.getAgencias(true).then(function (response) {
        $scope.combo.agenciaDestino = response;
      });
      MonedaService.getMonedas().then(function (response) {
        $scope.combo.moneda = response;
      });
    };
    $scope.loadCombo();

    $scope.$watch('view.monto', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);
    $scope.$watch('view.comision', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);
    $scope.$watch('view.tipoComision', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);
    $scope.$watch('view.modoPagoComision', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);
    $scope.$watch('view.lugarPagoComision', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);

    $scope.updateTotal = function () {

      var monto = 0;
      var comision = 0;
      var total = 0;
      var estadoPagoComision = false;

      //hallando monto
      if ($scope.view.modoPagoComision == 'ANADIR') {
        monto = parseFloat($scope.view.monto);
        //redondeo a un decimal y hacia arriba
        monto = Math.round(monto * 10) / 10;
      } else {
        if ($scope.view.tipoComision == 'PORCENTURAL') {
          if ($scope.view.lugarPagoComision == 'AL_ENVIAR') {
            //monto = (100 * parseFloat($scope.view.monto)) / (100 + parseFloat($scope.view.comision));
            monto = ( (100 - parseFloat($scope.view.comision)) * parseFloat($scope.view.monto) ) / 100;
            //redondeo a un decimal y hacia abajo
            monto = Math.floor(monto * 10) / 10;
          } else {
            monto = parseFloat($scope.view.monto);
            //redondeo a un decimal y hacia abajo
            monto = Math.floor(monto * 10) / 10;
          }
        } else {
          if ($scope.view.lugarPagoComision == 'AL_ENVIAR') {
            monto = parseFloat($scope.view.monto) - parseFloat($scope.view.comision);
          } else {
            monto = parseFloat($scope.view.monto);
          }
        }
      }

      //hallando comision
      if ($scope.view.modoPagoComision == 'ANADIR') {
        if ($scope.view.tipoComision == 'PORCENTURAL') {
          comision = parseFloat($scope.view.monto) * parseFloat($scope.view.comision) / 100;
          //redondeo a un decimal y hacia arriba
          comision = Math.round(comision * 10) / 10;
        } else {
          comision = parseFloat($scope.view.comision);
        }
      } else {
        //  QUITAR
        if ($scope.view.tipoComision == 'PORCENTURAL') {
          if ($scope.view.lugarPagoComision == 'AL_ENVIAR') {
            comision = parseFloat($scope.view.monto).toFixed(2) - parseFloat(monto).toFixed(2);
            comision = comision.toFixed(2);
          } else {
            comision = ( parseFloat($scope.view.comision) * parseFloat($scope.view.monto) ) / 100;
            //redondeo a un decimal y hacia arriba
            comision = Math.ceil(comision * 10) / 10;
          }
        } else {
          comision = parseFloat($scope.view.comision);
        }
      }

      //estado de pago comision
      if ($scope.view.lugarPagoComision == 'AL_ENVIAR') {
        estadoPagoComision = true;

        total = parseFloat(monto) + parseFloat(comision);
        total = total.toFixed(2);
      } else {
        estadoPagoComision = false;

        total = parseFloat(monto).toFixed(2);
      }

      $scope.transaccion = {
        monto: monto,
        comision: comision,
        total: total,
        estadoPagoComision: estadoPagoComision
      };
    };

    $scope.buscarClienteEmisor = function ($event) {
      if (!angular.isUndefined($event)) {
        $event.preventDefault();
      }
      PersonaNaturalService.findByTipoNumeroDocumento(1, $scope.view.numeroDocumentoEmisor).then(function (data) {
        $scope.view.nombreClienteEmisor = data.apellidoPaterno + ' ' + data.apellidoMaterno + ' ' + data.nombres;
      });
    };
    $scope.buscarClienteReceptor = function ($event) {
      if (!angular.isUndefined($event)) {
        $event.preventDefault();
      }
      PersonaNaturalService.findByTipoNumeroDocumento(1, $scope.view.numeroDocumentoReceptor).then(function (data) {
        $scope.view.nombreClienteReceptor = data.apellidoPaterno + ' ' + data.apellidoMaterno + ' ' + data.nombres;
      });
    };

    //transaccion
    $scope.save = function () {
      SGDialog.confirm('Guardar', 'Estas seguro de realizar la transaccion', function () {
        var transaccion = {
          idAgenciaOrigen: $scope.view.agenciaOrigen.id,
          idAgenciaDestino: $scope.combo.selected.agenciaDestino.id,

          numeroDocumentoEmisor: $scope.view.numeroDocumentoEmisor,
          clienteEmisor: $scope.view.nombreClienteEmisor,
          numeroDocumentoReceptor: $scope.view.numeroDocumentoReceptor,
          clienteReceptor: $scope.view.nombreClienteReceptor,

          idMoneda: $scope.combo.selected.moneda.id,
          lugarPagoComision: $scope.view.lugarPagoComision,
          monto: $scope.transaccion.monto,
          comision: $scope.transaccion.comision,
          estadoPagoComision: $scope.transaccion.estadoPagoComision
        };

        $scope.working = true;
        SessionService.crearTransaccionGiro(transaccion).then(
          function (response) {
            $scope.working = false;
            toastr.success('Transaccion creada satisfactoriamente');
            GiroService.findById(response.id).then(function (voucher) {
              $scope.view.voucher.list.unshift(voucher);
            });
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.message);
          }
        );
      });
    };

    $scope.imprimir = function (item) {
      VoucherService.imprimirVoucherGiro(item);
    };
    $scope.extornar = function (item, index) {
      SGDialog.confirmDelete('Transaccion', '', function () {
        SessionService.extornarGiro(item.id).then(
          function (response) {
            toastr.success('Transaccion extornada satisfactoriamente.');
            $scope.view.voucher.list.splice(index, 1);
          }, function error(err) {
            toastr.error(err.data.message);
          }
        );
      });
    };

  }
);
