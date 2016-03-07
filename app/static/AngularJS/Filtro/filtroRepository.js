var filtroUrl = global_settings.urlCORS + '/api/filtroapi/';

registrationModule.factory('filtroRepository', function ($http) {
   /* return {
        getEmpresas: function(){
            return $http.get(filtroUrl + '1|');
         },
        getSucursales: function(idEmpresa){
            return $http.get(filtroUrl + '2|' + idEmpresa);
        },
        getDepartamentos: function(idEmpresa, idSucursal){
            return $http.get(filtroUrl + '3|' + idEmpresa + '|' + idSucursal);
        },
        getTipoOrden: function(){
            return $http.get(filtroUrl + '4|');
        },
        getUsuarios: function(){
            return $http.get(filtroUrl + '5|');
        }
    };*/
});

//Esta es una prueba