'use strict';

angular.module('mean').factory('BovedaService', ['Restangular',
    function (Restangular) {

        var baseUrl = 'bovedas';

        return {
            findById: function (id) {
                return Restangular.one(baseUrl, id).get();
            },
            getBovedas: function (idAgencia) {
                return Restangular.all(baseUrl).getList({idAgencia: idAgencia});
            },
            getDetalle: function (idBoveda) {
                return Restangular.all(baseUrl + '/' + idBoveda + '/detalle').getList();
            },
            getDetallePenultimo: function (idBoveda) {
                return Restangular.all(baseUrl + '/' + idBoveda + '/detalle/penultimo').getList();
            }
        };

    }]);
