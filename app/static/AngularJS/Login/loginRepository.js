var loginUrl = global_settings.urlCORS + '/api/loginapi/';

registrationModule.factory('loginRepository', function ($http) {
    return {
        getLogin: function ( usuario, password) {
            return $http.get(loginUrl + '1|' + usuario + '|' + password);
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

