'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonal.EstadoCuentaController',
  function ($scope, $state, $window, toastr, SGDialog, cuentaPersonal, CuentaBancariaService) {

    $scope.view = {
      cuentaPersonal: cuentaPersonal,
      desde: undefined,
      hasta: undefined
    };

    $scope.view.load = {
      estadoCuenta: []
    };

    $scope.loadFechas = function () {
      var d = new Date();
      d.setDate(d.getDate() - 30);
      $scope.view.desde = d;
      $scope.view.hasta = new Date();
    };
    $scope.loadFechas();

    $scope.loadEstadoCuenta = function () {
      CuentaBancariaService.getEstadoCuenta($scope.view.cuentaPersonal.id, $scope.view.desde.getTime(), $scope.view.hasta.getTime(), true).then(function (response) {
        $scope.view.load.estadoCuenta = response;
      });
    };

    $scope.imprimirPdf = function() {
      var restApiUrl = ConfiguracionService.getRestApiUrl();
      $window.open(restApiUrl+'/cuentasBancarias/'+ $scope.id+'/estadoCuenta/pdf?desde='+$scope.view.desde.getTime()+'&hasta='+$scope.view.hasta.getTime());
    };

    $scope.enviarEmail = function() {
      var restApiUrl = ConfiguracionService.getRestApiUrl();
      $window.open(restApiUrl+'/cuentasBancarias/'+ $scope.id+'/estadoCuenta/pdf?desde='+$scope.desde.getTime()+'&hasta='+$scope.hasta.getTime());
    };

  });
