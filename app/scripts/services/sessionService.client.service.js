'use strict';
/*global $:false */

angular.module('mean').factory('SessionService', ['Restangular',
    function (Restangular) {

        var _cajaService = Restangular.all('session');
        var baseUrl = 'session';

        return {
            getCajaOfSession: function () {
                return Restangular.one(baseUrl + '/caja').get();
            },
            getUsuarioOfSession: function () {
                return Restangular.one(baseUrl + '/usuario').get();
            },
            getAgenciaOfSession: function () {
                return Restangular.one(baseUrl + '/agencia').get();
            },
            abrirCajaOfSession: function () {
                return Restangular.all(baseUrl + '/caja/abrir').post();
            },
            cerrarCajaOfSession: function (detalle) {
                var copy = Restangular.copy(detalle);
                return Restangular.all(baseUrl + '/caja/cerrar').post(copy);
            },
            crearPendiente: function (idBoveda, monto, observacion, tipoPendiente, idPendienteRelacionado) {
                var data;
                if (angular.isUndefined(idPendienteRelacionado)) {
                    /* jshint ignore:start */
                    data = $.param({
                        idboveda: idBoveda,
                        monto: monto,
                        observacion: observacion,
                        tipo: tipoPendiente
                    });
                    /* jshint ignore:end */
                } else {
                    /* jshint ignore:start */
                    data = $.param({
                        idboveda: idBoveda,
                        monto: monto,
                        observacion: observacion,
                        tipo: tipoPendiente,
                        idPendienteRelacionado: idPendienteRelacionado
                    });
                    /* jshint ignore:end */
                }

                return Restangular.one(baseUrl + '/transaccionPendiente').customPOST(
                    data,
                    '', {}, {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                );
            },
            inactivarSocioConRetiro: function (idSocio) {
                return Restangular.all(baseUrl + '/socio/' + idSocio + '/desactivar').post();
            },
            cancelarCuentaBancariaConRetiro: function (id) {
                return Restangular.all(baseUrl + '/cuentasBancarias/' + id + '/cancelar').post();
            },
            crearAporte: function (transaccion) {
                return Restangular.all(baseUrl + '/transaccionCuentaAporte').post(transaccion);
            },
            crearTransaccionBancaria: function (transaccion) {
                return Restangular.all(baseUrl + '/transaccionBancaria').post(transaccion);
            },
            crearTransaccionCheque: function (transaccion) {
                return Restangular.all(baseUrl + '/transaccionCheque').post(transaccion);
            },
            crearTransferenciaBancaria: function (transaccion) {
                return Restangular.all(baseUrl + '/transferenciaBancaria').post(transaccion);
            },
            crearTransaccionCompraVenta: function (transaccion) {
                return Restangular.all(baseUrl + '/transaccionCompraVenta').post(transaccion);
            },
            crearTransaccionGiro: function (transaccion) {
                return Restangular.all(baseUrl + '/transaccionGiro').post(transaccion);
            },
            crearTransaccionCredito: function (transaccion) {
                return Restangular.all(baseUrl + '/transaccionCredito').post(transaccion);
            },
            crearTransaccionHistorialCredito: function (transaccion) {
                return Restangular.all(baseUrl + '/transaccionCredito/pagar').post(transaccion);
            },

            crearTransaccionBovedaCajaOrigenCaja: function (boveda, detalle) {
                var copy = Restangular.copy(detalle);
                return Restangular.all(baseUrl + '/transaccionBovedaCaja/CAJA').post(copy, {'boveda': boveda});
            },
            crearTransaccionBovedaCajaOrigenBoveda: function (boveda, detalle) {
                var copy = Restangular.copy(detalle);
                return Restangular.all(baseUrl + '/transaccionBovedaCaja/BOVEDA').post(copy, {'boveda': boveda});
            },
            crearTransaccionCajaCaja: function (idCaja, idMoneda, monto, observacion) {
                /* jshint ignore:start */
                var data = $.param({idCaja: idCaja, idMoneda: idMoneda, monto: monto, observacion: observacion});
                /* jshint ignore:end */
                return Restangular.one(baseUrl + '/transaccionCajaCaja').customPOST(
                    data,
                    '', {}, {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                );
            },
            cancelarTransaccionBovedaCaja: function (id) {
                return Restangular.all(baseUrl + '/transaccionBovedaCaja/' + id + '/cancelar').post();
            },
            confirmarTransaccionBovedaCaja: function (id) {
                return Restangular.all(baseUrl + '/transaccionBovedaCaja/' + id + '/confirmar').post();
            },
            cancelarTransaccionCajaCaja: function (id) {
                return Restangular.all(baseUrl + '/transaccionCajaCaja/' + id + '/cancelar').post();
            },
            confirmarTransaccionCajaCaja: function (id) {
                return Restangular.all(baseUrl + '/transaccionCajaCaja/' + id + '/confirmar').post();
            },
            crearCuentaPlazoFijo: function (transaccion) {
                return Restangular.all(baseUrl + '/cuentasBancarias').post(transaccion);
            },
            extornarTransaccion: function (idTransaccion) {
                return Restangular.all(baseUrl + '/transaccion/' + idTransaccion + '/extornar').post();
            },
            extornarGiro: function (idTransaccion) {
                return Restangular.all(baseUrl + '/transaccionGiro/' + idTransaccion + '/extornar').post();
            }
        };
    }]);
