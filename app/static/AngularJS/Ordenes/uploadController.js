registrationModule.controller("uploadController", function ($scope, $filter, $rootScope, localStorageService, alertFactory, ordenRepository, consultaRepository, facturaRepository,ordenRepository) {
   $rootScope.FolioOrden=null;
   $rootScope.nombreXML=null;
 
    $scope.ShowCargar = function(doc) {
        //$('#frameUpload').attr('src', '/uploader.htm');
        $('#frameUpload').attr('src', 'https://www.google.com.mx/');
        $('#modalUpload').modal('show');
        $rootScope.currentUpload = doc;

        $rootScope.FolioOrden=doc.oce_folioorden;
     
    };
   
 $scope.FinishUpload = function(name,name2){
        alert(name + name2);
        return;
        if(name=='')
            
        {
            alertFactory.warning('Seleccione un documento');
            $('#modalUpload').modal('hide');
            return
        }


        var cadena = name,
        separador = ".", // un espacio en blanco
        limite    = 2,
        arregloDeSubCadenas = cadena.split(separador, limite);
        var rutaArchivo = arregloDeSubCadenas[0];

        if(arregloDeSubCadenas[1]=='xml')
        {
            $rootScope.nombreXML =arregloDeSubCadenas[0];
            alertFactory.success('Se guardo el documento ' + name);
            var doc = $rootScope.currentUpload;            
        
            ordenRepository.saveDocumentos(rutaArchivo,$rootScope.FolioOrden,4,1, 'null')
          .success(saveDocumentosSuccessCallback)
          .error(errorCallBack);  
          $('#modalUpload').modal('hide');
        }
        else
        {
            if($rootScope.nombreXML == null)
            {
                alertFactory.warning('Ingrese primero archivo XML ');
                $('#modalUpload').modal('hide');
                return;
            }

            alertFactory.success('Se guardo el documento ' + name);
            var doc = $rootScope.currentUpload; 
            ordenRepository.saveDocumentos(rutaArchivo,$rootScope.FolioOrden,4,2,$rootScope.nombreXML)
            .success(saveDocumentosSuccessCallback)
            .error(errorCallBack);  
            $rootScope.nombreXML = null;
            $('#modalUpload').modal('hide');
        }
    };

    var saveDocumentosSuccessCallback = function(data, status, headers, config){
        $scope.rutaDocumento = data;        
        alertFactory.success('Documento Guardados.');
        
      };

     var errorCallBack = function (data, status, headers, config) {
        getData();
        alertFactory.error('Ocurrio un problema: ' + data);
     };      
}); 


