
//registrationModule.controller("loginController", function ($scope,  $rootScope, localStorageService, alertFactory, parametroRepository,mancomunadoRepository, filtroRepository) {
  registrationModule.controller('loginController', function($scope, $rootScope,alertFactory, loginRepository){
   
   $rootScope.listaLogin =null;   
   $scope.post = {url: 'http://', title: ''};

   $rootScope.razonSocial=null;
   $rootScope.rfc=null;   
   $rootScope.correo=null;
   $rootScope.razonScialEdit='DATOS';
   $rootScope.idProveedorMenu= true;
   //$rootScope.rfcEdit=null;
   
//////////////////////////////////////LLENA PAGINA DE EDITAR /////////////////////////////////////////////////
$scope.init = function () {
      
      
      //document.getElementById('saludo').style.display="none";
      document.getElementById('saludo').style.visibility="hidden";
    };


 /////////////////////////////////////////////METODOS PARA EL LOGUIN///////////////////////////////////////////////////
 $scope.Entrar = function(login){  
   
    if(login == undefined)
    {
       alertFactory.warning('Por favor ingrese su datos');
      return;
    }
    if(login.txtUsuario == '' || login.txtUsuario == undefined)
    {
       alertFactory.warning('Por favor ingrese su usuario');
      return;
    }
    if(login.txtContra == '' || login.txtContra == undefined)
    {
       alertFactory.warning('Por favor ingrese su contraseña');
      return;
    }
    $rootScope.rfc=login.txtUsuario; 
    $rootScope.user=login.txtUsuario; 
    $rootScope.pass=login.txtContra;


        loginRepository.getLogin( login.txtUsuario, login.txtContra)
        .then(function successCallback(response) 
        {

              $rootScope.listaLogin = response.data;
              $rootScope.rfcEdit = login.txtUsuario;

              if( $rootScope.listaLogin[0]== undefined || $rootScope.listaLogin[0]== null || $rootScope.listaLogin[0]== ''){
                     alertFactory.warning('Usuario o contraseña incorrectos.');
                      return;
                }
            else{
                    $rootScope.razonSocial=response.data[0].nombre;    
                    $rootScope.idProveedor= response.data[0].per_idpersona; 
                    $rootScope.listaLogin = response.data;
                    $rootScope.idProveedorMenu=false;
    
                    document.getElementById('saludo').style.visibility="visible";
                    document.getElementById('login').style.visibility="hidden";
                    alertFactory.success('Acceso correcto.');

                    document.cookie="idProveedor="+ response.data[0].per_idpersona;
                    window.location.href = "/ordenes";
                }
      

        }, function errorCallback(response) {
              //Seccion para atrapar el error;
               alertFactory.error('Usuario o contraseña incorrectos');
        });






   /*loginRepository.getLogin( login.txtUsuario, login.txtContra)
   .success(getLoginSuccessCallback)
   .error(errorCallBack);*/
      
    
     //}    
   };

//Respuesta del servicio
   var getLoginSuccessCallback = function(data, status, headers, config){
      if(data[0] == undefined || data[0]==null ||data[0]=='')
      {
        //alertFactory.warning('Usuario o contraseña incorrectos.');
        //return;
        $rootScope.listaLogin = data;
      }

      if(data !=null)
      {
        $rootScope.razonSocial=data[0].nombre;    
        $rootScope.idProveedor= data[0].per_idpersona; 
      }
      else
      {
        $rootScope.razonSocial=null;
        $rootScope.rfc=null;   
        $rootScope.correo=null;
        alertFactory.warning('No se encontró ningún usuario.');
      }

    $rootScope.listaLogin = data;
    alertFactory.success('Datos Obtenidos.');
    $location.path( '/AngularJS/Templates/Ordenes.html');
  };

  //Mensajes en caso de error
  var errorCallBack = function (data, status, headers, config) {
    getData();
    alertFactory.error('Ocurrio un problema: ' + data);
  };

 ///////////////////////////////////////////// CREAR NUEVO USUARIO ///////////////////////////////////////////////////
  $scope.Registro = function(registro){
    if(registro == undefined)
    {
       alertFactory.warning('Falta ingresar los datos de registro');
      return;
    }
    if(registro.txtRazon=='' || registro.txtRazon == undefined){
      alertFactory.warning('Falta ingresar la razón social');
      return;
    }
    if(registro.txtRfc==''|| registro.txtRfc == undefined){
      alertFactory.warning('Falta ingresar el RFC');
      return;
    }
    if(registro.txtCorreo=='' || registro.txtCorreo == undefined){
      alertFactory.warning('Falta ingresar el correo');
      return;
    }
    else
    {
      registro.txtCorreo =registro.txtCorreo.replace("@", "-64-");
      
    }
    if(registro.txtContra==''|| registro.txtContra == undefined){
      alertFactory.warning('Falta ingresar la contraseña');
      return;
    }
    if(registro.txtContra!= registro.txtcContra){
      alertFactory.warning('Las contraseñas no coinciden');
      return;
    }
    
    
    loginRepository.insertRegistro( registro.txtRazon,registro.txtRfc,registro.txtCorreo,registro.txtContra)
   .success(getRegistroSuccessCallback)
   .error(errorCallBack);

   registro.txtRazon='';
   registro.txtRfc='';
   registro.txtCorreo='';
   registro.txtContra='';
   registro.txtcContra='';
  };

  var getRegistroSuccessCallback = function(data, status, headers, config){
    $scope.listaLogin = data;
    alertFactory.success('Datos Guardados.');

  };
//////////////////////////////////////////////// EDITAR DATOS DE USUARIO ///////////////////////////////////////////////
  $scope.RegistroE = function(registroE){
    if(registroE == undefined)
    {
       alertFactory.warning('Falta ingresar los datos de registro');
      return;
    }
    if(registroE.txtRazon=='' || registroE.txtRazon == undefined){
      alertFactory.warning('Falta ingresar la razón social');
      return;
    }
    if($rootScope.rfcEdit==''|| $rootScope.rfcEdit == undefined){
      alertFactory.warning('Falta ingresar el RFC');
      return;
    }
    if(registroE.txtCorreo=='' || registroE.txtCorreo == undefined){
      alertFactory.warning('Falta ingresar el correo');
      return;
    }
    else
    {
      registroE.txtCorreo =registroE.txtCorreo.replace("@", "-64-");
      
    }
    
    if(registroE.txtContra==''|| registroE.txtContra == undefined){
      alertFactory.warning('Falta ingresar la contraseña');
      return;
    }
    if(registroE.txtContra!= registroE.txtcContra){
      alertFactory.warning('Las contraseñas no coinciden');
      return;
    }
    
    
    loginRepository.editaRegistro( registroE.txtRazon,$rootScope.rfcEdit,registroE.txtCorreo,registroE.txtContra)
   .success(getRegistroESuccessCallback)
   .error(errorCallBack);

   registroE.txtRazon='';   
   registroE.txtCorreo='';
   registroE.txtContra='';
   registroE.txtcContra='';
  };

  var getRegistroESuccessCallback = function(data, status, headers, config){
    $scope.listaLogin = data;
    alertFactory.success('Datos Guardados.');

  };



});

//////////////////////////////////////////////////////////7777

