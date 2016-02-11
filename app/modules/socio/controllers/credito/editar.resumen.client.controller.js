'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Credito.Editar.ResumenController',
  function ($scope, $state, toastr, credito, CreditoService, SGDialog) {

    console.log(credito);

    $scope.view = {
      credito: credito,
      historiales: undefined
    };

    var loadHistorial = function () {
      CreditoService.getHistoriales($scope.view.credito.id).then(function (response) {
        $scope.view.historiales = response;
       /* var total = 0;
        for (var i = 0; i < response.length; i++) {
          total = total + response[i].monto;
        }
        $scope.total = total;*/
      });
    };
    loadHistorial();

    $scope.remove = function () {
      SGDialog.confirm('Eliminar', 'Estas seguro de eliminar el socio?', function () {

      });
    };

  });
