'use strict';

/* jshint ignore:start */
angular.module('cooperativa').factory('VoucherService', function (EMPRESA, $filter) {

    var fnResetPrinter = function () {
        qz.append("\x1B\x40");
    };
    var fnCabecera = function () {
        fnNegritaCentrado(EMPRESA);
    };
    var fnSaltoLinea = function () {
        qz.append('\r\n');
    };
    var fnCentrado = function (text) {
        qz.append(String.fromCharCode(27) + '\x61' + '\x31');//centrado
        qz.append(text);
        qz.append('\r\n');//salto de linea
        qz.append(String.fromCharCode(27) + '\x61' + '\x30');//texto a la izquierda
    };
    var fnNegritaCentrado = function (text) {
        qz.append('\x1B\x21\x08');//negrita
        qz.append(String.fromCharCode(27) + '\x61' + '\x31');//centrado
        qz.append(text);
        qz.append('\r\n');//salto de linea
        qz.append('\x1B\x21\x01');//quitar negrita
        qz.append(String.fromCharCode(27) + '\x61' + '\x30');//texto a la izquierda
    };
    var fnTabTexto = function (text1, text2, numeroTabs) {
        qz.append(text1);
        if (numeroTabs) {
            for (var i = 0; i < numeroTabs; i++) {
                qz.append('\t');
            }
        } else {
            qz.append('\t');
        }
        qz.append(text2);
        qz.append('\r\n');//salto de linea
    };
    var fnImprimir = function () {
        qz.append('\x1D\x56\x41');//cortar papel
        qz.append('\x1B\x40');//reset
        qz.print();//imprimir
    };

    var fnCompraVenta = function (item) {
        if (notReady()) {
            return;
        }
        fnResetPrinter();

        fnCabecera();
        fnNegritaCentrado(item.tipoTransaccion + ' M.E.');
        fnTabTexto(item.agenciaAbreviatura, 'TRANS.:' + item.id);
        fnTabTexto('CAJA:' + item.cajaDenominacion, 'NRO.OP.:' + item.numeroOperacion);
        fnTabTexto('FECHA:' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA:' + $filter('date')(item.hora, 'HH:mm:ss'));
        fnTabTexto('CLIENTE:' + (item.referencia || ' '));

        function Recibido(obj) {
            if (obj.monedaRecibida.simbolo === '€') {
                fnTabTexto('RECIBIDO:' + $filter('currency')(obj.montoRecibido, chr(238)));
            } else {
                fnTabTexto('RECIBIDO:' + $filter('currency')(obj.montoRecibido, obj.monedaRecibida.simbolo));
            }
        }

        function Entregado(obj) {
            if (item.monedaEntregada.simbolo === '€') {
                fnTabTexto('ENTREGADO:' + $filter('currency')(obj.montoEntregado, chr(238)));
            } else {
                fnTabTexto('ENTREGADO:' + $filter('currency')(obj.montoEntregado, obj.monedaEntregada.simbolo));
            }
        }

        if (item.tipoTransaccion === 'COMPRA') {
            Recibido(item);
            fnTabTexto('TIPO DE CAMBIO:' + $filter('number')(item.tipoCambio, 3));
            Entregado(item);
        } else {
            Entregado(item);
            fnTabTexto('TIPO DE CAMBIO:' + $filter('number')(item.tipoCambio, 3));
            Recibido(item);
        }

        fnSaltoLinea();
        fnCentrado('Gracias por su preferencia');
        fnCentrado('Verifique su dinero antes  de retirarse de ventanilla');
        fnImprimir();
    };

    return {
        imprimirVoucherCompraVenta: fnCompraVenta
    };

});
/* jshint ignore:end */
