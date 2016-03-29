var ordenesUrl = global_settings.urlCORS + '/api/cargaapi/';

registrationModule.factory('ordenRepository', function ($http) {
    return {
        getOrdenPendiente: function (idProveedor) {
            return $http.get(ordenesUrl + '1|' + idProveedor );
        } ,
        getOrdenValidadas: function (idProveedor) {
            
            return $http.get(ordenesUrl + '2|' + idProveedor );
        },
        getOrdenProgPago: function (idProveedor) {
            return $http.get(ordenesUrl + '3|' + idProveedor);
        },
        getOrdenPagadas: function(idProveedor){
            return $http.get(ordenesUrl + '4|' + idProveedor);
        },
        getEmpresa: function(idProveedor){
            return $http.get(ordenesUrl + '5|' + idProveedor);
        },
        getSucursales: function(empresa){
            return $http.get(ordenesUrl + '6|' + empresa );
        }
    };
});

