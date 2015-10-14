'use strict';

// Configuring the Chat module
angular.module('rrhh').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', {
            title: 'Rrhh',
            state: 'rrhh.app'
        });
    }
]);
