var consultaUrl = global_settings.urlCORS + '/api/consultaapi/';

registrationModule.factory('consultaRepository', function ($http) {
    return {
        getOrdenPendiente: function (idProveedor,orden,empresa,sucursal) {
            return $http.get(consultaUrl + '1|' + idProveedor + '|'+ orden + '|'+ empresa + '|' +  sucursal);
        } ,
        getOrdenValidadas: function (idProveedor,orden,empresa,sucursal) {
            
            return $http.get(consultaUrl + '2|' + idProveedor + '|'+ orden + '|'+ empresa + '|' +  sucursal);
        },
        getOrdenProgPago: function (idProveedor,orden,empresa,sucursal) {
            return $http.get(consultaUrl + '3|' + idProveedor + '|'+ orden + '|'+ empresa + '|' +  sucursal);
        },
        getOrdenPagadas: function(idProveedor,orden,empresa,sucursal) {
            return $http.get(consultaUrl + '4|' + idProveedor + '|'+ orden + '|'+ empresa + '|' +  sucursal);
        },
        getBuscaEstatus: function(folioorden) {
            return $http.get(consultaUrl + '5|' + folioorden );
        }
    };
});

