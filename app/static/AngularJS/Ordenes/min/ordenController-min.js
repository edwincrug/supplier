registrationModule.controller("ordenController",function(e,a,s,r,t,u){e.proveedorId=4,e.viewby=5,e.totalItems,e.currentPage=4,e.itemsPerPage=e.viewby,e.maxSize=5,e.totalPendientes,e.viewbyV=5,e.totalItemsV,e.currentPageV=4,e.itemsPerPageV=e.viewbyV,e.maxSizeV=5,e.totalValidadas,e.viewbyPP=5,e.totalItemsPP,e.currentPagePP=4,e.itemsPerPagePP=e.viewbyPP,e.maxSizePP=5,e.totalProgPago,e.viewbyP=5,e.totalItemsP,e.currentPageP=4,e.itemsPerPageP=e.viewbyP,e.maxSizeP=5,e.totalPagadas,e.OpcionDefaultEmpresa="---Elije una opción---",e.OpcionDefaultSucursal="---Elije una opción---",e.currentEmpresa,e.currentSucursal,e.OpcionDefaultEmpresaV="---Elije una opción---",e.OpcionDefaultSucursalV="---Elije una opción---",e.currentEmpresaV,e.currentSucursalV,e.OpcionDefaultEmpresaPP="---Elije una opción---",e.OpcionDefaultSucursalPP="---Elije una opción---",e.currentEmpresaPP,e.currentSucursalPP,e.OpcionDefaultEmpresaP="---Elije una opción---",e.OpcionDefaultSucursalP="---Elije una opción---",e.currentEmpresaP,e.currentSucursalP,e.valEmpresa=null,e.valSucursal=null,e.init=function(){c()};var c=function(){u.getOrdenPendiente(e.proveedorId).success(n).error(g),u.getOrdenValidadas(e.proveedorId).success(o).error(g),u.getOrdenProgPago(e.proveedorId).success(l).error(g),u.getOrdenPagadas(e.proveedorId).success(P).error(g),u.getEmpresa(e.proveedorId).success(i).error(g)},n=function(a,s,r,u){e.listaPendiente=a,e.totalItems=a.length,e.totalPendientes=a.length,t.success("Datos Obtenidos.")},o=function(a,s,r,u){e.listaValidadas=a,e.totalItemsV=a.length,e.totalValidadas=a.length,t.success("Datos Obtenidos.")},l=function(a,s,r,u){e.listaProgPago=a,e.totalItemsPP=a.length,e.totalProgPago=a.length,t.success("Datos Obtenidos.")},P=function(a,s,r,u){e.listaPagadas=a,e.totalItemsP=a.length,e.totalPagadas=a.length,t.success("Datos Obtenidos.")},i=function(a,s,r,u){e.listaEmpresas=a,e.listaEmpresasV=a,e.listaEmpresasPP=a,e.listaEmpresasP=a,t.success("Datos de Empresas cargados.")},g=function(e,a,s,r){c(),t.error("Ocurrio un problema: "+e)};e.getSucursal=function(a){e.OpcionDefaultEmpresa=null,e.currentEmpresa=a,e.valEmpresa=a.emp_idempresa,u.getSucursales(a.emp_idempresa).success(p).error(g)};var p=function(a,s,r,u){e.listaSucursales=a,t.success("Datos de Sucursales cargados.")};e.getSucursalV=function(a){e.OpcionDefaultEmpresaV=null,e.currentEmpresaV=a,e.valEmpresa=a.emp_idempresa,u.getSucursales(a.emp_idempresa).success(d).error(g)};var d=function(a,s,r,u){e.listaSucursalesV=a,t.success("Datos de Sucursales cargados.")};e.SetSucursal=function(a){e.OpcionDefaultSucursal=null,e.currentSucursal=a},e.getSucursalPP=function(a){e.OpcionDefaultEmpresaPP=null,e.currentEmpresaPP=a,e.valEmpresa=a.emp_idempresa,u.getSucursales(a.emp_idempresa).success(m).error(g)};var m=function(a,s,r,u){e.listaSucursalesPP=a,t.success("Datos de Sucursales cargados.")};e.getSucursalP=function(a){e.OpcionDefaultEmpresaP=null,e.currentEmpresaP=a,e.valEmpresa=a.emp_idempresa,u.getSucursales(a.emp_idempresa).success(f).error(g)};var f=function(a,s,r,u){e.listaSucursalesP=a,t.success("Datos de Sucursales cargados.")};e.setSucursal=function(a){e.valSucursal=a.suc_idsucursal},e.setSucursalV=function(a){e.valSucursal=a.suc_idsucursal},e.setSucursalPP=function(a){e.valSucursal=a.suc_idsucursal},e.setSucursalP=function(a){e.valSucursal=a.suc_idsucursal},e.setPage=function(a){e.currentPage=a},e.pageChanged=function(){console.log("Page changed to: "+e.currentPage)},e.setItemsPerPage=function(a){e.itemsPerPage=a,e.currentPage=1},e.setPageV=function(a){e.currentPageV=a},e.pageChangedV=function(){console.log("Page changed to: "+e.currentPageV)},e.setItemsPerPageV=function(a){e.itemsPerPageV=a,e.currentPageV=1},e.setPagePP=function(a){e.currentPagePP=a},e.pageChangedPP=function(){console.log("Page changed to: "+e.currentPagePP)},e.setItemsPerPagePP=function(a){e.itemsPerPagePP=a,e.currentPagePP=1},e.setPageP=function(a){e.currentPageP=a},e.pageChangedP=function(){console.log("Page changed to: "+e.currentPageP)},e.setItemsPerPageP=function(a){e.itemsPerPageP=a,e.currentPageP=1}});