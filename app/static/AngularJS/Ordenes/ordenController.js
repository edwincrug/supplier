registrationModule.controller("ordenController", function ($scope, $filter, $rootScope, localStorageService, alertFactory, ordenRepository, consultaRepository, facturaRepository) {

 $scope.proveedorId=$rootScope.idProveedor;
 
   /*//Begin Datos paginado Pendientes
   $scope.viewby = 5;
   $scope.totalItems; 
   $scope.currentPage = 4;
   $scope.itemsPerPage = $scope.viewby;
   $scope.maxSize = 5; 
   $scope.totalPendientes;
*/
  //End Datos paginado Pendientes

  //Begin Datos paginado Pendientes
  $scope.viewbyV = 5;
  $scope.totalItemsV; 
  $scope.currentPageV = 4;
  $scope.itemsPerPageV = $scope.viewbyV;
  $scope.maxSizeV = 5; 
  $scope.totalValidadas;

  //End Datos paginado Pendientes
  //Begin Datos paginado Programadas para Pago
  $scope.viewbyPP = 5;
  $scope.totalItemsPP; 
  $scope.currentPagePP = 4;
  $scope.itemsPerPagePP = $scope.viewbyPP;
  $scope.maxSizePP = 5; 
  $scope.totalProgPago;

  //End Datos paginado Pendientes
  //Begin Datos paginado Pagadas
  $scope.viewbyP = 5;
  $scope.totalItemsP; 
  $scope.currentPageP = 4;
  $scope.itemsPerPageP = $scope.viewbyP;
  $scope.maxSizeP = 5; 
  $scope.totalPagadas;

  //End Datos paginado Pendientes
  $scope.OpcionDefaultEmpresa='---Elije una opción---';
  $scope.OpcionDefaultSucursal = '---Elije una opción---';
  $scope.currentEmpresa;
  $scope.currentSucursal;

  $scope.OpcionDefaultEmpresaV='---Elije una opción---';
  $scope.OpcionDefaultSucursalV = '---Elije una opción---';
  $scope.currentEmpresaV;
  $scope.currentSucursalV;

  $scope.OpcionDefaultEmpresaPP='---Elije una opción---';
  $scope.OpcionDefaultSucursalPP = '---Elije una opción---';
  $scope.currentEmpresaPP;
  $scope.currentSucursalPP;

  $scope.OpcionDefaultEmpresaP='---Elije una opción---';
  $scope.OpcionDefaultSucursalP = '---Elije una opción---';
  $scope.currentEmpresaP;
  $scope.currentSucursalP;

  //Valores para obtener valor de los combos Empresa y Sucursal
  $scope.valEmpresa=null;
  $scope.valSucursal=null;
  $scope.currentTextPendiente=null;
  $scope.valEmpresaV=null;
  $scope.valSucursalV=null;
  $scope.valEmpresaPP=null;
  $scope.valSucursalPP=null;
  $scope.valEmpresaP=null;
  $scope.valSucursalP=null;
//carga los tabs al entrar a la pagina

$scope.rutaDocumento=null;
$rootScope.validaEstatus =null;
$scope.init = function () {

        if($rootScope.idProveedor==''||$rootScope.idProveedor==null||$rootScope.idProveedor==undefined)
        {
          
          alertFactory.warning('Por favor inicie sesión .');
          return;
        }

        
        getData();
        
    };


/////////////////////////////////////LLENA  LOS GRID Y EL COMBO DE EMPRESAS  AL CARGAR LA PAGINA /////////////////////////
var getData = function(){

  ordenRepository.getOrdenPendiente( $scope.proveedorId)
  .success(getOrdenPendienteSuccessCallback)
  .error(errorCallBack);

  ordenRepository.getOrdenValidadas( $scope.proveedorId)
  .success(getOrdenValidadasSuccessCallback)
  .error(errorCallBack);

  ordenRepository.getOrdenProgPago( $scope.proveedorId)
  .success(getProgPagoSuccessCallback)
  .error(errorCallBack);

  ordenRepository.getOrdenPagadas( $scope.proveedorId)
  .success(getPagadasSuccessCallback)
  .error(errorCallBack);

         ordenRepository.getEmpresa($scope.proveedorId) 
         .success(getEmpresasSuccessCallback)
         .error(errorCallBack); 

         
         
       }

       var getOrdenPendienteSuccessCallback = function(data, status, headers, config){
        $rootScope.PendientesUno=data;
        $scope.listaPendiente = data;   
        $scope.totalItems = data.length;
        $scope.totalPendientes  =data.length;   
        alertFactory.success('Datos Obtenidos.');
        
      };

      var getOrdenValidadasSuccessCallback = function(data, status, headers, config){
        $scope.listaValidadas = data;   
        $scope.totalItemsV = data.length;
        $scope.totalValidadas  =data.length;   
        alertFactory.success('Datos Obtenidos.');
        
      };

      var getProgPagoSuccessCallback = function(data, status, headers, config){
        $scope.listaProgPago = data;   
        $scope.totalItemsPP = data.length;
        $scope.totalProgPago  =data.length;   
        alertFactory.success('Datos Obtenidos.');
        
      };

      var getPagadasSuccessCallback = function(data, status, headers, config){
        $scope.listaPagadas = data;   
        $scope.totalItemsP = data.length;
        $scope.totalPagadas  =data.length;   
        alertFactory.success('Datos Obtenidos.');
        
      };
      var getEmpresasSuccessCallback = function(data, status, headers, config){
        $scope.listaEmpresas = data;
        $scope.listaEmpresasV = data;
        $scope.listaEmpresasPP = data;
        $scope.listaEmpresasP = data;
        alertFactory.success('Datos de Empresas cargados.');
      };
//Mensajes en caso de error
var errorCallBack = function (data, status, headers, config) {
  getData();
  alertFactory.error('Ocurrio un problema: ' + data);
};

 /////////////////////LLENA COMBO SURCURSALES Y REALIZA PRIMER FILTRO DE PENDIENTES CON EMPRESAS///////////////////////

   $scope.getSucursal= function(tip) {
    $scope.OpcionDefaultEmpresa =null;
    $scope.currentEmpresa =tip;
    $scope.valEmpresa =tip.emp_idempresa;
    ordenRepository.getSucursales(tip.emp_idempresa)
    .success(getSucursalesSuccessCallback)
    .error(errorCallBack);    

      /////////////Filtra combo con Empresas////////////
      var dato1 = $scope.proveedorId;  
       var dato2 = null;//document.getElementById('inputPendientes').value;       
       var dato3 =  $scope.valEmpresa;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 = null;// $scope.valSucursal;
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenPendiente(dato1,dato2,dato3,dato4)
             .success(getOrdenPendienteSuccessCallback)
             .error(errorCallBack);   
  };

  var getSucursalesSuccessCallback = function(data, status, headers, config){
    $scope.listaSucursales = data;        
    alertFactory.success('Datos de Sucursales cargados.');
  };

   $scope.setSucursal= function(tip) {
          $scope.OpcionDefaultSucursal=null;
          $scope.currentSucursal=tip;
          $scope.valSucursal=tip.suc_idsucursal; 

           /////////////Filtra combo con Empresas y Sucursales////////////
      var dato1 = $scope.proveedorId;  
       var dato2 = null;//document.getElementById('inputPendientes').value;       
       var dato3 =  $scope.valEmpresa;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 = $scope.valSucursal;
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenPendiente(dato1,dato2,dato3,dato4)
             .success(getOrdenPendienteSuccessCallback)
             .error(errorCallBack);     
         // alert('SALUDOS');
    };


/////////////////////////////////FILTROS CON ORDENES VALIDADAS Y EMPRESAS////////////////////////////////////////////////

$scope.getSucursalV= function(tip) {
    $scope.OpcionDefaultEmpresaV =null;
    $scope.currentEmpresaV =tip;
    $scope.valEmpresa =tip.emp_idempresa;
    ordenRepository.getSucursales(tip.emp_idempresa)
    .success(getSucursalesSuccesVCallback)
    .error(errorCallBack);   
    
       var dato1 = $scope.proveedorId;  
       var dato2 = null;      
       var dato3 = tip.emp_idempresa;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 = null;// $scope.valSucursalV;
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenValidadas(dato1,dato2,dato3,dato4)
             .success(getOrdenValidadasSuccessCallback)
             .error(errorCallBack);    
  };


  var getSucursalesSuccesVCallback = function(data, status, headers, config){
    $scope.listaSucursalesV = data;        
    alertFactory.success('Datos de Sucursales cargados.');
  };
 
          ////////Filtra validadas  con empresas y sucursales //////
    $scope.setSucursalV= function(tip) {
          $scope.OpcionDefaultSucursalV=null;
          $scope.currentSucursalV=tip;
          $scope.valSucursalV=tip.suc_idsucursal; 


          var dato1 = $scope.proveedorId;  
          var dato2 = null;      
          var dato3 = tip.emp_idempresa;
          if(dato3=='0' || dato3=="0"){dato3=null;}
          var dato4 = tip.suc_idsucursal;// $scope.valSucursalV;
          if(dato4=='0' || dato4=="0"){dato4=null;}

        consultaRepository.getOrdenValidadas(dato1,dato2,dato3,dato4)
             .success(getOrdenValidadasSuccessCallback)
             .error(errorCallBack); 
    };

//////////////////////////FILTRO CON ORDENES PROGRAMADOS PARA PAGO /////////////////////////////////////////////////

  $scope.getSucursalPP= function(tip) {
    $scope.OpcionDefaultEmpresaPP =null;
    $scope.currentEmpresaPP =tip;
    $scope.valEmpresa =tip.emp_idempresa;
    ordenRepository.getSucursales(tip.emp_idempresa)
    .success(getSucursalesSuccesPPCallback)
    .error(errorCallBack);    

        //////////Filtra solo con empresas /////////////////
       var dato1 = $scope.proveedorId;  
       var dato2 = null;//document.getElementById('inputProgPago').value;       
       var dato3 = tip.emp_idempresa;// $scope.valEmpresaPP;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 = null;// $scope.valSucursalPP;
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenProgPago(dato1,dato2,dato3,dato4)
             .success(getProgPagoSuccessCallback)
             .error(errorCallBack);
  };


  var getSucursalesSuccesPPCallback = function(data, status, headers, config){
    $scope.listaSucursalesPP = data;        
    alertFactory.success('Datos de Sucursales cargados.');
  };

    $scope.setSucursalPP= function(tip) {
          $scope.OpcionDefaultSucursalPP=null;
          $scope.currentSucursalPP=tip;
          $scope.valSucursalPP=tip.suc_idsucursal; 


          //////////Filtra  con empresas y sucursal/////////////////
       var dato1 = $scope.proveedorId;  
       var dato2 = null;//document.getElementById('inputProgPago').value;       
       var dato3 = tip.emp_idempresa;// $scope.valEmpresaPP;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 = tip.suc_idsucursal;// $scope.valSucursalPP;
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenProgPago(dato1,dato2,dato3,dato4)
             .success(getProgPagoSuccessCallback)
             .error(errorCallBack);

    };


//////////////////////////FILTRO CON ORDENES PAGADAS  ////////////////////////////////////////////////////////

  

    $scope.getSucursalP= function(tip) {
     
		$scope.OpcionDefaultEmpresaP =null;
		$scope.currentEmpresaP =tip;
		$scope.valEmpresaP =tip.emp_idempresa;
		ordenRepository.getSucursales(tip.emp_idempresa)
             .success(getSucursalesSuccesPCallback)
             .error(errorCallBack);  


            ///////Filtra con empresas///////
    var dato1 = $scope.proveedorId;  
       var dato2 = null;
       var dato3 =  tip.emp_idempresa;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 = null;
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenPagadas(dato1,dato2,dato3,dato4)
             .success(getPagadasSuccessCallback)
             .error(errorCallBack); 
    
   };


    var getSucursalesSuccesPCallback = function(data, status, headers, config){
        $scope.listaSucursalesP = data;        
        alertFactory.success('Datos de Sucursales cargados.');
    };

 


    $scope.setSucursalP= function(tip) {
		      $scope.OpcionDefaultSucursalP=null;
          $scope.currentSucursalP=tip;
		      $scope.valSucursalP=tip.suc_idsucursal;  


            ///////Filtra con empresas  y sucursales///////
       var dato1 = $scope.proveedorId;  
       var dato2 = null;
       var dato3 =  tip.emp_idempresa;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 = tip.suc_idsucursal; 
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenPagadas(dato1,dato2,dato3,dato4)
             .success(getPagadasSuccessCallback)
             .error(errorCallBack);  
    };



    ////////////////////////////////  PAGINACION DE LAS PESTAÑAS ///////////////////////////////////////////7
//Paginacion Pendientes
/*
$scope.setPage = function (pageNo) {
  $scope.currentPage = pageNo;
};

$scope.pageChanged = function() {
  console.log('Page changed to: ' + $scope.currentPage);
};

$scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
}
*/

//Paginacion Validadas

$scope.setPageV = function (pageNo) {
      $scope.currentPageV = pageNo;
};

$scope.pageChangedV = function() {
      console.log('Page changed to: ' + $scope.currentPageV);
};

$scope.setItemsPerPageV = function(num) {
      $scope.itemsPerPageV = num;
      $scope.currentPageV = 1; //reset to first paghe
}

 //Paginacion Programadas para pago

 $scope.setPagePP = function (pageNo) {
      $scope.currentPagePP = pageNo;
};

$scope.pageChangedPP = function() {
      console.log('Page changed to: ' + $scope.currentPagePP);
};

$scope.setItemsPerPagePP = function(num) {
      $scope.itemsPerPagePP = num;
     $scope.currentPagePP = 1; //reset to first paghe
}

//Paginacion Pagadas

$scope.setPageP = function (pageNo) {
      $scope.currentPageP = pageNo;
};

$scope.pageChangedP = function() {
      console.log('Page changed to: ' + $scope.currentPageP);
};

$scope.setItemsPerPageP = function(num) {
      $scope.itemsPerPageP = num;
      $scope.currentPageP = 1; //reset to first paghe
}

//////////////////////////////////////////  BUSQUEDAS  ///////////////////////////////////////////////////////////



$scope.buscaPagadas= function() {    
       var dato1 = $scope.proveedorId;  
       var dato2 = document.getElementById('inputPagadas').value;       
       var dato3 =  $scope.valEmpresaP;
       if(dato3=='0' || dato3=="0"){dato3=null;}
       var dato4 =  $scope.valSucursalP;
       if(dato4=='0' || dato4=="0"){dato4=null;}

       consultaRepository.getOrdenPagadas(dato1,dato2,dato3,dato4)
             .success(getPagadasSuccessCallback)
             .error(errorCallBack); 
        
    };


  /////////////////////////////////////////////  MUESTRA FACTURAS  ////////////////////////////////////////////////
//Método para mostrar documento PDF, JPG o PNG
      $scope.verFactura = function(Pendiente) {
              $scope.rutaDocumento = Pendiente.oce_folioorden;
              var type = '';
      
              type = "application/pdf";

              ordenRepository.getDocumentos(Pendiente.oce_folioorden)
              .success(getDocumentosSuccessCallback)
              .error(errorCallBack);

      
              //var ruta = "http://192.168.20.9/GA_Centralizacion/CuentasXPagar/TempPdf/OrdenCompra/" + Pendiente.oce_folioorden +".pdf";// "http://192.168.20.9/Documentos/factura.pdf"; //global_settings.downloadPath + localStorageService.get('currentVIN').vin + '/'+ idDoc + ext;
              var ruta = "http://192.168.20.9/GA_Centralizacion/CuentasXPagar/TempPdf/OrdenCompra/Orden_AU-AUA-VIG-OT-PE-22.pdf";
              var pdf_link = ruta;
              var titulo ="Factura" ;  
              var iframe = '<div id="hideFullContent" style="width:500px; height:600px;"><div id="hideFullMenu" onclick="nodisponible()" ng-controller="ordenController"> </div> <object id="ifDocument" data="' + pdf_link + '" type="' + type + '" width="100%" height="100%"></object></div>';
              $.createModal({      
                  title: titulo,
                  message: iframe,
                  closeButton: false,
                  scrollable: false
              });        
      };



     $scope.verFactura2 = function(Pendiente) {
            $scope.rutaDocumento = Pendiente.oce_folioorden;
            var type = '';
      
            type = "application/pdf";

            ordenRepository.getDocumentos(Pendiente.oce_folioorden)
            .success(getDocumentosSuccessCallback)
            .error(errorCallBack);

      
            //var ruta = "http://192.168.20.9/GA_Centralizacion/CuentasXPagar/TempPdf/OrdenCompra/" + Pendiente.oce_folioorden +".pdf";// "http://192.168.20.9/Documentos/factura.pdf"; //global_settings.downloadPath + localStorageService.get('currentVIN').vin + '/'+ idDoc + ext;
            var ruta = "http://192.168.20.9:3700";
            var pdf_link = ruta;
            var titulo ="Subir Documentos" ;  
            var user = $rootScope.user; 
            var pass =$rootScope.pass;
            var folio = Pendiente.oce_folioorden;
            var editar ='0';
            //var  iframe='<iframe frameborder="1" height="600px" width="550px" src="http://localhost:49990/Login.aspx?user=' + user + '&pass=' + pass + '&folio=' + folio + '&editar=' + editar + '" width="100%">Tu Navegador no soporta esta característica</iframe>'
            var  iframe='<iframe frameborder="1" height="600px" width="550px" src="http://192.168.20.9:8085/Login.aspx?user=' + user + '&pass=' + pass + '&folio=' + folio + '&editar=' + editar + '" width="100%">Tu Navegador no soporta esta característica</iframe>'

            $.createModal({      
                title: titulo,
                message: iframe,
                closeButton: false,
                scrollable: false
            });        
      };


     $scope.verFacturaValidada = function(validada) {
            consultaRepository.getBuscaEstatus(validada.oce_folioorden)
            .then(function successCallback(response) {
              // Contenido de la funcionalidad
                   $rootScope.validaEstatus = response.data;  
                    if($rootScope.validaEstatus[0].estatus=='2')
                    {
                        alertFactory.warning('la factura ya fue procesada, no es posible actualizar.');
                          return;
                    }

                      $scope.rutaDocumento = validada.oce_folioorden;
                    var type = '';
      
                    type = "application/pdf";

                    ordenRepository.getDocumentos(validada.oce_folioorden)
                    .success(getDocumentosSuccessCallback)
                      .error(errorCallBack);

     
                      //var ruta = "http://192.168.20.9/GA_Centralizacion/CuentasXPagar/TempPdf/OrdenCompra/" + Pendiente.oce_folioorden +".pdf";// "http://192.168.20.9/Documentos/factura.pdf"; //global_settings.downloadPath + localStorageService.get('currentVIN').vin + '/'+ idDoc + ext;
                      var ruta = "http://192.168.20.9:3700";
                      var pdf_link = ruta;
                      var titulo ="Subir Documentos" ;  
                      var user = $rootScope.user; 
                      var pass =$rootScope.pass;
                      var folio = validada.oce_folioorden;
                      var editar ='1';
                      var  iframe='<iframe frameborder="1" height="600px" width="550px" src="http://192.168.20.9:8085/Login.aspx?user=' + user + '&pass=' + pass + '&folio=' + folio + '&editar=' + editar + '" width="100%">Tu Navegador no soporta esta característica</iframe>'
                      //var  iframe='<iframe frameborder="1" height="600px" width="550px" src="http://localhost:49990/Login.aspx?user=' + user + '&pass=' + pass + '&folio=' + folio + '&editar=' + editar + '" width="100%">Tu Navegador no soporta esta característica</iframe>'
                      //var  iframe='<iframe frameborder="1" height="600px" width="550px" src="http://192.168.20.9:8085/Login.aspx?user=' + user + '&pass=' + pass + '&folio=' + folio + '&editar=' + editar + '" width="100%">Tu Navegador no soporta esta característica</iframe>'
                      $.createModal({      
                          title: titulo,
                          message: iframe,
                          closeButton: false,
                          scrollable: false
                      });                    

            }, function errorCallback(response) {
              //Seccion para atrapar el error;
               alertFactory.error('Ocurrio un problema al validar estatus : ' + response.data);
            });

      };


//////////////////////////////////// Pendiente para terminar 
 $scope.buscaDocumento = function(){
        //Descomentar esto
        /*ordenRepository.getDocumentos(oce_folioorden)
        .success(getDocumentosSuccessCallback)
        .error(errorCallBack);*/

        ordenRepository.saveDocumentos('CFE0316','AU-ZM-ZAR-OT-PS-1',4)
        .success(saveDocumentosSuccessCallback)
        .error(errorCallBack);
  };

  var getDocumentosSuccessCallback = function(data, status, headers, config){
        $scope.rutaDocumento = data;        
        alertFactory.success('Documento Obtenidos.');
        
 };


 var saveDocumentosSuccessCallback = function(data, status, headers, config){
        $scope.rutaDocumento = data;        
        alertFactory.success('Documento Guardados.');
};


//////////////////////////////////////    UPLODAD   ///////////////////////////////////////////////////////////7777777



$scope.toggleModal = function(){
        $('#viewNewEscalamiento').modal('show');
    };

$scope.upSubeDocumento = function(){
        //var file = documentos;
        var fd = new FormData();
        fd.append('file', file);
        $http.post('post.php', fd, {
            transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}
            })
            .success(function(response){
                //Guardamos la url de la imagen y hacemos que la muestre.
                $scope.imagen=response;
                $scope.img=true;
            })
            .error(function(response){
 
        });
    };




$scope.uploadFile = function() {
      
                    
      var formData = new FormData();
              
        for (var i in scope.files) {
            formData.append("uploadedFile", scope.files[i]);
        }
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "/fileupload");
        scope.progressVisible = true;
        xhr.send(fd);
    };

    function uploadProgress(evt) {
        scope.$apply(function(){
            if (evt.lengthComputable) {
                scope.progress = Math.round(evt.loaded * 100 / evt.total);
            } else {
                scope.progress = 'unable to compute';
            }
        });
    };

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText);
    };

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
    };

    function uploadCanceled(evt) {
        scope.$apply(function(){
            scope.progressVisible = false;
        });
        alert("The upload has been canceled by the user or the browser dropped the connection.");
    };

    $scope.setFiles = function(element) {
        $scope.$apply(function(scope) {
            console.log('files:', element.files);
      // Turn the FileList object into an Array
            $scope.files = []
            for (var i = 0; i < element.files.length; i++) {
                $scope.files.push(element.files[i]);
            }
          $scope.progressVisible = false;
      });
    };
///////////////////EJEMPLO MANUEL DE PDF  //////////////////////////////////


  
  $scope.getEmpleado = function(){
       /* if(getParameterByName('employee') != ''){
            $rootScope.currentEmployee = getParameterByName('employee');
        }

        if ($rootScope.currentEmployee == null){
            var idEmpleado = prompt("Ingrese un número de empleado", 1);
            $rootScope.currentEmployee = idEmpleado;
        }*/


        //setTimeout(function(){ 
        facturaRepository.getDoc(1,1,20) //se busca que exista la factura (id = 20) para mostrar
            .success(getDocSuccessCallback)
            .error(errorCallBack);
            //},2000);
    };


    $scope.getDocSuccessCallback = function (data, status, headers, config) {        
        if(data != null){
                if(data != '')
                {
                    //$scope.documento = data;
                    $scope.documentoIni = '<div><object id="ifDocument" data="' + data + '" type="application/pdf" width="100%"><p>Alternative text - include a link <a href="' + data + '">to the PDF!</a></p></object> </div>';
                                     // '<div class="izquierda"><object id="ifDocument" data="' + data + '" type="application/pdf" width="100%"><p>Alternative text - include a link <a href="' + data + '">to the PDF!</a></p></object> </div>';
                                     //+ '<div class="derecha"><object id="ifDocument2" data="http://es.tldp.org/COMO-INSFLUG/es/pdf/Linuxdoc-Ejemplo.pdf" type="application/pdf" width="100%"><p>Alternative text - include a link <a href="http://es.tldp.org/COMO-INSFLUG/es/pdf/Linuxdoc-Ejemplo.pdf">to the PDF!</a></p></object></div>';

                    facturaRepository.getDoc($rootScope.currentFolioFactura,$rootScope.currentEmployee,15) //se busca que exista la factura (id = 15) para mostrar
                        .success(getDocRecepcionIniSuccessCallback)
                        .error(errorCallBack);
                    //$("#divDocumento").append(documento);
                    $('#btnSalir').hide();
                }
                else{
                    alertFactory.warning('Aun no se ha subido la Factura de este folio.');
                    var documento = '<div class="noExiste"><b> El documento aun no esta disponible </b> </div>';
                    $("#divDocumento").append(documento);
                    $("#divControles").hide();

                    //alertFactory.success('Que tenga buen día');
                    //setTimeout(function(){window.close();},3000);
                }
        }
        else
            alertFactory.warning('No existe informacion para este folio.');        
    };

 $scope.getDocRecepcionIniSuccessCallback = function(data, status, headers, config) {
      if(data != null){
                if(data != '')
                {
                    var typeAplication = $rootScope.obtieneTypeAplication(data);

                    $scope.documentoIni = $scope.documentoIni.replace('<div>','<div class="izquierda">') + ' ' +
                                            '<div class="derecha"><object id="ifDocument2" data="' + data + '" type="' + typeAplication + '" width="100%"><p>Error al cargar el documento. Intente de nuevo.</a></p></object></div>';

                    if($scope.consultaInicial == 1)
                        $("#divControles").hide();
                }
            }

        $("#divDocumento").append($scope.documentoIni);
    };

 
}); 


