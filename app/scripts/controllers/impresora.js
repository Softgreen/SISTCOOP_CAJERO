'use strict';

angular.module('mean').controller('ConfiguracionImpresoraController', ['$scope', '$state', 'toastr', 'localStorageService', 'PRINTER',
  function($scope, $state, toastr, localStorageService, PRINTER) {

    $scope.cookieName = 'sg-sistcoop-printer';

    $scope.view = {
      defaulPrinterName: undefined
    };

    $scope.loadPrinter = function(){
      var cookieName = $scope.cookieName;
      var valueCookie = localStorageService.get(cookieName);
      if(valueCookie !== null){
        $scope.view.defaulPrinterName = valueCookie;
      } else {
        var defaulPrinterName = PRINTER;
        localStorageService.set(cookieName, defaulPrinterName);
        $scope.view.defaulPrinterName = defaulPrinterName;
      }
      console.log('en nombre es:' + $scope.view.defaulPrinterName);
    };
    $scope.loadPrinter();


    $scope.verificar = function(){
      findPrinter($scope.view.defaulPrinterName);
    };
    $scope.guardar = function(){
      findPrinter($scope.view.defaulPrinterName);

      var cookieName = $scope.cookieName;
      localStorageService.set(cookieName, $scope.view.defaulPrinterName);

      toastr.success('Nombre de impresora actualizada');
    };

    $scope.cancelar = function(){

    };


    //$scope.defaulPrinterName = undefined;

  }]);
