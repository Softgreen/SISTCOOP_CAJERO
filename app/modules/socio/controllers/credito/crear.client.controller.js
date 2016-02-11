'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Credito.CrearController',
  function ($scope, $state, toastr, SGDialog, PersonaNaturalService, PersonaJuridicaService, MonedaService, CuentaBancariaService, SessionService) {

    $scope.working = false;

    $scope.transaccion = {};
    $scope.view = {
      credito: {
        interes: 0
      }
    };

    $scope.view.load = {
      persona: undefined
    };

    $scope.combo = {
      tipoPersona: [
        {denominacion: 'NATURAL', valor: 'NATURAL'},
        {denominacion: 'JURIDICA', valor: 'JURIDICA'}
      ],
      tipoDocumento: undefined,
      moneda: undefined,
      tipoInteres: [
        {denominacion: 'FIJO', valor: 'FIJO'},
        {denominacion: 'PORCENTUAL (%)', valor: 'PORCENTUAL'}
      ]
    };
    $scope.combo.selected = {
      tipoPersona: undefined,
      tipoDocumento: undefined,
      moneda: undefined,
      tipoInteres: $scope.combo.tipoInteres[0]
    };

    $scope.loadCombo = function () {
      $scope.$watch('combo.selected.tipoPersona', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          if ($scope.combo.selected.tipoPersona.valor === 'NATURAL') {
            PersonaNaturalService.getTipoDocumentos().then(function (response) {
              $scope.combo.tipoDocumento = response;
            });
          } else if ($scope.combo.selected.tipoPersona.valor === 'JURIDICA') {
            PersonaJuridicaService.getTipoDocumentos().then(function (response) {
              $scope.combo.tipoDocumento = response;
            });
          }
        }
      }, true);

      MonedaService.getMonedas().then(function (response) {
        $scope.combo.moneda = response;
      });
    };
    $scope.loadCombo();

    $scope.check = function ($event) {
      if (!angular.isUndefined($event)) {
        $event.preventDefault();
      }
      if ($scope.combo.selected.tipoPersona.valor === 'NATURAL') {
        PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.credito.numeroDocumento).then(function (response) {
          $scope.view.load.persona = response;
          if ($scope.view.load.persona) {
            toastr.info('Persona encontrada');
          } else {
            toastr.warning('Persona no encontrada');
          }
        });
      } else if ($scope.combo.selected.tipoPersona.valor === 'JURIDICA') {
        PersonaJuridicaService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.credito.numeroDocumento).then(function (response) {
          $scope.view.load.persona = response;
          if ($scope.view.load.persona) {
            toastr.info('Persona encontrada');
          } else {
            toastr.warning('Persona no encontrada');
          }
        });
      }
    };

    $scope.$watch('view.credito.monto', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);
    $scope.$watch('view.credito.interes', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);
    $scope.$watch('combo.selected.tipoInteres', function (newValue, oldValue) {
      $scope.updateTotal();
    }, true);
    $scope.updateTotal = function () {
      var interes = 0;

      //hallando comision
      if ($scope.combo.selected.tipoInteres.valor === 'PORCENTUAL') {
        interes = $scope.view.credito.monto * $scope.view.credito.interes / 100;

        //redondeo a un decimal y hacia arriba
        interes = Math.round(interes * 10) / 10;
      } else {
        interes = $scope.view.credito.interes;
      }

      $scope.transaccion = {
        monto: $scope.view.credito.monto,
        interes: interes
      };
    };

    $scope.save = function () {
      SGDialog.confirm('Guardar', 'Estas seguro de crear el Credito?', function () {
        var transaccion = {
          tipoPersona: $scope.combo.selected.tipoPersona.valor,
          idPersona : $scope.view.load.persona.id,
          idMoneda: $scope.combo.selected.moneda.id,
          monto : $scope.transaccion.monto,
          interes : $scope.transaccion.interes,
          fechaLimitePago : $scope.view.credito.fechaLimitePago.getTime()
        };

        $scope.working = true;
        SessionService.crearTransaccionCredito(transaccion).then(
          function(response){
            $scope.working = false;
            toastr.success('Credito creado satisfactoriamente');
            $state.go('^.editar', {credito: response.id});
          },
          function error(err){
            $scope.working = false;
            toastr.error(err.data.message);
          }
        );
      });
    };

    $scope.cancel = function () {
      $state.go('^.buscar');
    };

  });
