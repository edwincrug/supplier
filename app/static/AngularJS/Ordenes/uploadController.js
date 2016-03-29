registrationModule.controller("uploadController", function ($scope, $filter, $rootScope, localStorageService, alertFactory, ordenRepository, consultaRepository, facturaRepository) {

 
    $scope.ShowCargar = function(doc) {
        $('#frameUpload').attr('src', '/uploader.htm');
        $('#modalUpload').modal('show');
        $rootScope.currentUpload = doc;
    };
   
 $scope.FinishUpload = function(name){
        alertFactory.success('Se guardo el documento ' + name);
        var doc = $rootScope.currentUpload;

      /*  documentoRepository.saveDocument(doc.folio, doc.idDocumento, 1, 1, doc.idNodo, 1, global_settings.uploadPath + '/' + name)
            .success(saveDocumentSuccessCallback)
            .error(errorCallBack);*/
    };

}); 


