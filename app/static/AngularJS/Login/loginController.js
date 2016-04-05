
//registrationModule.controller("loginController", function ($scope,  $rootScope, localStorageService, alertFactory, parametroRepository,mancomunadoRepository, filtroRepository) {
  registrationModule.controller('loginController', function($scope, $rootScope,alertFactory, loginRepository){
   
   $scope.listaLogin =null;   
   $scope.post = {url: 'http://', title: ''};

   $rootScope.razonSocial=null;
   $rootScope.rfc=null;   
   $rootScope.correo=null;
 
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
   
   loginRepository.getLogin( login.txtUsuario, login.txtContra)
   .success(getLoginSuccessCallback)
   .error(errorCallBack);
      

      $location.path( '/AngularJS/Templates/Ordenes.html');     
   };

//Respuesta del servicio
   var getLoginSuccessCallback = function(data, status, headers, config){
      if(data !=null)
      {
        $rootScope.razonSocial=data[0].nombre;                 
      }
      else
      {
        $rootScope.razonSocial=null;
        $rootScope.rfc=null;   
        $rootScope.correo=null;
        alertFactory.warning('No se encontró ningún usuario.');
      }

    $scope.listaLogin = data;
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

});

//////////////////////////////////////////////////////////7777

