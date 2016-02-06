'use strict';

angular.module('mean').factory('CreditoService', ['Restangular',
  function (Restangular) {

    var baseUrl = 'creditos';

    return {
      findById: function (id) {
        return Restangular.one(baseUrl, id).get();
      },
      update: function(id, obj) {
        return Restangular.one(baseUrl + '/' + id).customPUT(Restangular.copy(obj),'',{},{});
      },
      getSobreGiros: function (queryParams) {
        return Restangular.all(baseUrl).getList(queryParams);
      },

      getHistoriales: function (idSobreGiro) {
        return Restangular.one(baseUrl, idSobreGiro).all('historiales').getList();
      },

      findByFilterText: function (filterText, estados, desde, hasta) {
        return Restangular.all(baseUrl).getList({
          'filterText': filterText,
          'estado': estados,
          'offset': desde,
          'limit': hasta
        }, {});
      },
      count: function () {
        return Restangular.one(baseUrl + '/count').get();
      }

    };

  }]);
