'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Credito.EditarController',
    function ($scope, $state, toastr, credito, SGDialog) {

        $scope.view = {
          credito: credito
        };

        $scope.remove = function(){
            SGDialog.confirm('Eliminar', 'Estas seguro de eliminar el socio?', function () {

            });
        };

    });
