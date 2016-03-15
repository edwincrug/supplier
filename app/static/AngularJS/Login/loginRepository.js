﻿var loginUrl = global_settings.urlCORS + '/api/loginapi/';

registrationModule.factory('loginRepository', function ($http) {
    return {
        getLogin: function ( usuario, password) {
            return $http.get(loginUrl + '1|' + usuario + '|' + password);
        },
        insertRegistro: function(razonSocial, rfc, correo, contrasena, confirmarContrasena){
            return $http({
                url: loginUrl,
                method: "POST",
                params: {
                    id: '1|' + razonSocial + '|' + rfc + '|' + correo+ '|' + contrasena+ '|' + confirmarContrasena
                }
            });
        }/*
        insertRegistro: function(razonSocial, rfc, correo, contrasena, confirmarContrasena){
            return $http.post(loginUrl + '1|' + razonSocial + '|' + rfc + '|' + correo + '|' + contrasena + '|' + confirmarContrasena);
        }
        /*,
        update: function (id) {
            return $http.post(parametroUrl + '2|' + id);
        },
        insertEscalamiento: function(proc, nodo, empresa, sucursal, departamento, tipo, nivel_Escalamiento, usuarioAutoriza1, usuarioAutoriza2, usuarioAutoriza3, minutos){
            return $http.post(parametroUrl + '1|' + proc + '|' + nodo + '|' + empresa + '|' + sucursal + '|' + departamento + '|' + tipo + '|' + nivel_Escalamiento + '|' + usuarioAutoriza1 + '|' + usuarioAutoriza2 + '|' + usuarioAutoriza3 + '|' + minutos);
        },
        updateEscalamiento: function(Array1){
            return $http.post(parametroUrl + '2|' + Array1);
        },
        deleteEscalamiento: function(proc, nodo, empresa, sucursal, departamento, tipo, mancomunado){
            return $http.post(parametroUrl + '3|' + proc + '|' + nodo + '|' + empresa + '|' + sucursal + '|' + departamento + '|' + tipo + '|' + mancomunado);
        }
       
        */
    };
});

