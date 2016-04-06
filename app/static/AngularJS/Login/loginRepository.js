var loginUrl = global_settings.urlCORS + '/api/loginapi/';

registrationModule.factory('loginRepository', function ($http) {
    return {
       /* getLogin: function ( usuario, password) {
            return $http.get(loginUrl + '1|' + usuario + '|' + password);
        },*/
        getLogin: function(usuario, password){
            return $http({
                url: loginUrl,
                method: "GET",
                params: {
                    id: '1|' + usuario + '|' + password
                }
            });
        },
        insertRegistro: function(razonSocial, rfc, correo, contrasena){
            return $http({
                url: loginUrl,
                method: "POST",
                params: {
                    id: '1|' + razonSocial + '|' + rfc + '|' + correo+ '|' + contrasena
                }
            });
        },
        editaRegistro: function(razonSocial, rfc, correo, contrasena){
            return $http({
                url: loginUrl,
                method: "POST",
                params: {
                    id: '2|' + razonSocial + '|' + rfc + '|' + correo+ '|' + contrasena
                }
            });
        }
    };
});

