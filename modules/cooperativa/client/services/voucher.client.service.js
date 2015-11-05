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
        qz.append(text2 || ' ');
        qz.append('\r\n');//salto de linea
    };
    var fnImprimir = function () {
        qz.append('\x1D\x56\x41');//cortar papel
        qz.append('\x1B\x40');//reset
        qz.print();//imprimir
    };

    var fnCuentaAporte = function (item) {
        alert('Metodo no implementado');
    };

    var fnCompraVenta = function (item) {
        if (notReady()) {
            return;
        }
        fnResetPrinter();

        fnCabecera();
        fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
        fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
        fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));
        fnTabTexto('CUENTA: ' + item.numeroCuenta);
        if (item.referencia) {
            fnTabTexto('CLIENTE: ' + item.referencia);
        }

        function Recibido(obj) {
            if (obj.monedaRecibida.simbolo === '€') {
                fnTabTexto('RECIBIDO: ' + $filter('currency')(obj.montoRecibido, chr(238)));
            } else {
                fnTabTexto('RECIBIDO: ' + $filter('currency')(obj.montoRecibido, obj.monedaRecibida.simbolo));
            }
        }

        function Entregado(obj) {
            if (item.monedaEntregada.simbolo === '€') {
                fnTabTexto('ENTREGADO: ' + $filter('currency')(obj.montoEntregado, chr(238)));
            } else {
                fnTabTexto('ENTREGADO: ' + $filter('currency')(obj.montoEntregado, obj.monedaEntregada.simbolo));
            }
        }

        if (item.tipoTransaccion === 'COMPRA') {
            Recibido(item);
            fnTabTexto('TIPO DE CAMBIO: ' + $filter('number')(item.tipoCambio, 3));
            Entregado(item);
        } else {
            Entregado(item);
            fnTabTexto('TIPO DE CAMBIO: ' + $filter('number')(item.tipoCambio, 3));
            Recibido(item);
        }

        fnSaltoLinea();
        fnCentrado('Gracias por su preferencia');
        fnCentrado('Verifique su dinero antes  de retirarse de ventanilla');
        fnImprimir();
    };

    var fnCuentaPersonal = function (item, saldo) {
        if (notReady()) {
            return;
        }
        fnResetPrinter();

        fnCabecera();
        fnNegritaCentrado(item.tipoTransaccion + ' CUENTA ' + item.tipoCuentaBancaria + (item.moneda.simbolo == 'S/.' ? ' M.N.' : ' M.E.'));

        fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.idTransaccionBancaria);
        fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
        fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));
        fnTabTexto('CLIENTE: ' + item.socio);
        fnTabTexto('MONEDA: ' + item.moneda.denominacion);
        if (item.referencia) {
            fnTabTexto('REF.: ' + item.referencia);
        }
        fnSaltoLinea();

        if (item.tipoTransaccion === 'DEPOSITO') {
            fnTabTexto('IMPORTE RECIBIDO: ' + item.moneda.simbolo + $filter('number')(item.monto, 2));
        } else {
            fnTabTexto("IMPORTE PAGADO:" + item.moneda.simbolo + $filter('number')(item.monto, 2));
        }

        if (saldo === true) {
            if (item.interes !== 0) {
                fnTabTexto('INTERES: ' + item.moneda.simbolo + $filter('number')(item.interes, 2));
            }
        }

        if (saldo === true) {
            fnTabTexto('SALDO DISPONIBLE: ' + item.moneda.simbolo + $filter('number')(item.saldoDisponible, 2));
        }

        if (item.tipoTransaccion === 'DEPOSITO') {
            fnSaltoLinea();
            fnCentrado('Verifique su dinero antes  de retirarse de ventanilla');
        } else {
            fnSaltoLinea();
            fnSaltoLinea();
            fnCentrado('____________________');
            fnCentrado(item.titulares);
            fnCentrado('Gracias por su preferencia');
            fnCentrado('Verifique su dinero antes de retirarse  de ventanilla');
        }

        fnImprimir();
    };

    var fnTransferencia = function (item) {
        if (notReady()) {
            return;
        }
        fnResetPrinter();

        fnCabecera();
        fnNegritaCentrado('TRANSFERENCIA CUENTA PERSONAL');

        fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
        fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
        fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));
        fnTabTexto('CUENTA ORIGEN: ' + item.numeroCuentaOrigen);
        fnTabTexto('CUENTA DESTINO: ' + item.numeroCuentaDestino);
        fnTabTexto('CLIENTE: ' + item.socio);
        fnTabTexto('MONEDA: ' + item.moneda.denominacion);
        if (item.referencia) {
            fnTabTexto('REF.: ' + item.referencia);
        }
        fnSaltoLinea();

        fnTabTexto("MONTO:" + item.moneda.simbolo + $filter('number')(item.monto, 2));

        fnSaltoLinea();
        fnSaltoLinea();
        fnCentrado('____________________');
        fnCentrado(item.titulares);
        fnCentrado('Gracias por su preferencia');
        fnCentrado('Verifique su dinero antes de retirarse  de ventanilla');

        fnImprimir();
    };

    var fnCheque = function (item) {
        if (notReady()) {
            return;
        }
        fnResetPrinter();

        fnCabecera();
        fnNegritaCentrado('COBRO DE CHEQUE');

        fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.idTransaccionBancaria);
        fnTabTexto('CAJA: ' + item.cajaDenominacion, 'NRO.OP.: ' + item.numeroOperacion);
        fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));

        fnTabTexto('NUM.CHEQUE: ' + item.numeroCheque);
        fnTabTexto('T.DOC.: ' + item.tipoDocumento.abreviatura, 'NUM.DOC.: ' + item.numeroDocumento);
        fnTabTexto('CLIENTE: ' + item.socio);
        fnTabTexto('MONTO: ' + item.moneda.simbolo + $filter('number')(item.monto, 2));

        fnSaltoLinea();
        fnCentrado('____________________');
        fnCentrado('Gracias por su preferencia');
        fnCentrado('Verifique su dinero antes de retirarse  de ventanilla');

        fnImprimir();
    };


    var fnBovedaCaja = function (item) {
        if (notReady()) {
            return;
        }
        fnResetPrinter();

        fnCabecera();
        if (item.origen === 'CAJA') {
            fnNegritaCentrado('TRANSACCION CAJA/BOVEDA');
        } else if (item.origen === 'BOVEDA') {
            fnNegritaCentrado('TRANSACCION BOVEDA/CAJA');
        } else {
            alert('Origen no valido');
        }
        fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
        fnTabTexto('ORIGEN: ' + item.origenTransaccion);
        fnTabTexto('DESTINO: ' + item.destinoTransaccion);
        fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));

        fnTabTexto('MONEDA: ' + item.moneda.denominacion);
        if (item.moneda.simbolo.charCodeAt(0) === '€') {
            fnTabTexto('MONTO: ' + $filter('currency')(item.monto, chr(238)));
        } else {
            fnTabTexto('MONTO: ' + $filter('currency')(item.monto, item.moneda.simbolo));
        }

        if (item.estadoSolicitud) {
            fnTabTexto('ESTADO SOLICITUD: SOLICITADO');
        } else {
            fnTabTexto('ESTADO SOLICITUD: CANCELADO');
        }
        if (item.estadoConfirmacion) {
            fnTabTexto('ESTADO CONFIRMACION: CONFIRMADO');
        } else {
            fnTabTexto('ESTADO CONFIRMACION: NO CONFIRMADO');
        }

        fnSaltoLinea();
        fnSaltoLinea();
        fnSaltoLinea();

        fnTabTexto('________________', '________________');
        fnTabTexto('Firma cajero', 'Firma jefe caja', 2);
        fnImprimir();
    };

    var fnCajaCaja = function (item) {
        if (notReady()) {
            return;
        }
        fnResetPrinter();

        fnCabecera();
        fnNegritaCentrado('TRANSACCION CAJA/CAJA');
        fnTabTexto(item.agenciaAbreviatura, 'TRANS.: ' + item.id);
        fnTabTexto('ORIGEN: ' + item.cajaOrigenDenominacion);
        fnTabTexto('DESTINO: ' + item.cajaDestinoDenominacion);
        fnTabTexto('FECHA: ' + $filter('date')(item.fecha, 'dd/MM/yyyy'), 'HORA: ' + $filter('date')(item.hora, 'HH:mm:ss'));

        fnTabTexto('MONEDA: ' + item.moneda.denominacion);
        if (item.moneda.simbolo.charCodeAt(0) === '€') {
            fnTabTexto('MONTO: ' + $filter('currency')(item.monto, chr(238)));
        } else {
            fnTabTexto('MONTO: ' + $filter('currency')(item.monto, item.moneda.simbolo));
        }

        if (item.estadoSolicitud) {
            fnTabTexto('ESTADO SOLICITUD: SOLICITADO');
        } else {
            fnTabTexto('ESTADO SOLICITUD: CANCELADO');
        }
        if (item.estadoConfirmacion) {
            fnTabTexto('ESTADO CONFIRMACION: CONFIRMADO');
        } else {
            fnTabTexto('ESTADO CONFIRMACION: NO CONFIRMADO');
        }

        fnSaltoLinea();
        fnSaltoLinea();
        fnSaltoLinea();
        fnTabTexto('________________', '________________');
        fnTabTexto('Firma caja origen', 'Firma caja destino', 2);
        fnImprimir();
    };

    return {
        imprimirVoucherAporte: fnCuentaAporte,
        imprimirVoucherCompraVenta: fnCompraVenta,
        imprimirVoucherCuentaPersonal: fnCuentaPersonal,
        imprimirVoucherTransferencia: fnTransferencia,
        imprimirVoucherCheque: fnCheque,

        imprimirVoucherTransaccionBovedaCaja: fnBovedaCaja,
        imprimirVoucherTransaccionCajaCaja: fnCajaCaja
    };

});
/* jshint ignore:end */
