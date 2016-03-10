$(document).ready(function () {




    $('.btn-file :file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });

    $("#pnlBody").hide();
    $("#pnlOrdenDeCompraBody").hide();
    $("#pnlEmpresaBody").hide();
    $("#pnlSucursalBody").hide();

    $("#pnlBodyValidadas").hide();
    $("#pnlOrdenDeCompraBodyValidadas").hide();

    $(function () {
        $("#pnlFiltros").click(function () {
            $("#pnlBody").slideToggle("slow");

        });
    });

    $(function () {
        $("#pnlOrdenDeCompra").click(function () {
            $("#pnlOrdenDeCompraBody").slideToggle("slow");
            $("#pnlEmpresaBody").hide();
            $("#pnlSucursalBody").hide();
        });
    });

    $(function () {
        $("#pnlEmpresa").click(function () {
            $("#pnlEmpresaBody").slideToggle("slow");
            $("#pnlOrdenDeCompraBody").hide();
            $("#pnlSucursalBody").hide();
        });
    });


    $(function () {
        $("#pnlSucursal").click(function () {
            $("#pnlSucursalBody").slideToggle("slow");
            $("#pnlEmpresaBody").hide();
            $("#pnlOrdenDeCompraBody").hide();
        });
    });

    $(function () {
        $("#pnlFiltrosValidadas").click(function () {
            $("#pnlBodyValidadas").slideToggle("slow");

        });
    });
    
    $(function () {
        $("#pnlOrdenDeCompraValidadas").click(function () {
            $("#pnlOrdenDeCompraBodyValidadas").slideToggle("slow");
        });
    });
});
    

$(document).on('change', '.btn-file :file', function () {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).on('click', '.close', function (eventObject) {
   // $('#pnlFiltros').slideUp("slow"); // useful if you want to put several buttons all over the your content
});

$(function () {

    var tabName = $("[id*=hdTabName]").val() != "" ? $("[id*=hdTabName]").val() : "odenes";
    $('#Tabs a[href="#' + tabName + '"]').tab('show');
    $("#Tabs a").click(function () {
        $("[id*=hdTabName]").val($(this).attr("href").replace("#", ""));
    });

});



function xmlNoValidado() {
    $('#dialog').show();
}

function validaArchivos(uploadFile) {

    //alert(uploadFile);

    //var filePDF = document.getElementById("upPDF" + uploadFile);
    //var fileXML = document.getElementById("upXML" + uploadFile);


    var msg = '';

    //var extXML = $('#' + "upXML" + uploadFile).val().split('.').pop().toLowerCase();
    var extXML = $('#' + "upXML" + uploadFile).val();
    var extPDF = $('#' + "upPDF" + uploadFile).val();//.split('.').pop().toLowerCase();

    extXML = extXML.substr((extXML.lastIndexOf('.') + 1)).toLowerCase();
    extPDF = extPDF.substr((extPDF.lastIndexOf('.') + 1)).toLowerCase();

    //alert(extXML + ' ' + extPDF);

    if ($.inArray(extXML, ['xml']) == -1) {
        //alert('invalid extension!');
        msg = "-Seleccione un archivo XML.";
        //alert(msg);
    }

    if ($.inArray(extPDF, ['pdf']) == -1) {
        //alert('invalid extension!');                
        msg = msg + "\n-Seleccione un archivo PDF.";
        //alert(msg);
    }

    //var valor = $('#fUp').val();
    if (msg == '')
        return true;
    else {
        alert(msg);
        return false;
    }
}

function showModalUpLoad(args, orden, rfc, Importe, Control) {
    alert("ENTRA POR AQUI");
    $('input[id$=hdOrdenPDF]').val(orden);
    $('input[id$=hdrfc]').val(rfc);
    $('input[id$=hdImporte]').val(Importe);

    var pOrden = orden; 
    var pRFC = rfc; 
    var pImporte = Importe;

 

    var actionData = "{'Orden': '" + pOrden + "', 'RFC': '" + pRFC + "', 'Importe': '" + pImporte + "'}";

            $.ajax({
                    type: "POST",
                    url: "Default.aspx/ShowPDF",
                    data: actionData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success:
                        function (data) {
                            if (Control == "Link")
                            {
                                if (data.d == "Error al consultar PDF de orden. Intente de nuevo.")
                                {
                                    muestraMensaje(data.d, 'alert alert-danger');
                                }
                                else
                                {
                                    muestraPDF(data.d, "Orden_" + orden, 0);
                                } 
                            }
                            else 
                            {
                                muestraPDF(data.d,"Orden_" + orden, 1);
                            }                            

                        },
                    error: function (data) {
                        muestraMensaje(data.d);
                    }
                });
     
   

    var pleaseWait = $('#pleaseWaitDialog');

    showPleaseWait = function () {
        pleaseWait.modal('show');
    };

    hidePleaseWait = function () {
        pleaseWait.modal('hide');
    };

    showPleaseWait();
}

function RecargarControles() {

    location.reload();


}

function muestraPDF(ruta, orden, mostrar) {


    if (mostrar == '1') {
        $('#divXMLPDF').show();
        $('#btnSalirlnk').hide();
    }
    else {
        $('#divXMLPDF').hide();
        $('#btnSalirlnk').show();
    }

    //$(this).find('.modal-body').css({
    //    width: 'auto', //probably not needed
    //    height: 'auto', //probably not needed 
    //    'max-height': '80%'
    //});

    $('#lblOrdenPDF').text(orden);

    var object = "<object data=\"{FileName}\" type=\"application/pdf\" width=\"700px\" height=\"700px\">";
    object += "Si usted no puede ver el archivo, se puede descargar desde <a href = \"{FileName}\">here</a>";
    object += " o descargargalo de <a target = \"_blank\" href = \"http://get.adobe.com/reader/\">Adobe PDF Reader</a> para ver el archivo.";
    object += "</object>";
    object = object.replace(/{FileName}/g, ruta + orden + ".pdf");
    $("#dialog").html(object);

    var pleaseWait = $('#pleaseWaitDialog');

    hidePleaseWait = function () {
        pleaseWait.modal('hide');
    };

    hidePleaseWait();


    $('#modalFile').modal('show');

}

function GenerarControles(args) {

    $('#modalFile').modal('hide');


    var pleaseWait = $('#pleaseWaitDialog');

    showPleaseWait = function () {
        pleaseWait.modal('show');
    };

    hidePleaseWait = function () {
        pleaseWait.modal('hide');
    };
    showPleaseWait();

    var idBoton = args.id;
    var updatePanel = '<%= UpdatePanel1.UniqueID %>';
    Sys.WebForms.PageRequestManager.getInstance()._updateControls(["t" + updatePanel], [], [idBoton], 90); //PostBack
}

function GenerarControlesPDF(args, orden) {
    //alert(orden);
    var split = args.name.split('_');

    $("#" + '<%= hdOrdenPDF.ClientID %>').val(orden);
    $('#' + '<%=lblODUpFile.ClientID %>').text(orden);
    $("#" + '<%= hfIndex.ClientID %>').val(split[1]);

    //$('#modalFile').modal('hide');

    var pleaseWait = $('#pleaseWaitDialog');

    showPleaseWait = function () {
        pleaseWait.modal('show');
    };

    hidePleaseWait = function () {
        pleaseWait.modal('hide');
    };
    showPleaseWait();

    var idBoton = args.id;
    var updatePanel = '<%= UpdatePanel1.UniqueID %>';
    Sys.WebForms.PageRequestManager.getInstance()._updateControls(["t" + updatePanel], [], [idBoton], 90); //PostBack
    //return true;
}

function muestraMensaje(pMensaje, clase) {

    $('#modMensaje').addClass(clase);

    var mensaje = pMensaje;//'freshnes';
    //$('#modMensaje').append('<p>' + mensaje + '</p>');
    $('#modMensaje').text(mensaje);

    $('#modal-content').modal({
        show: true
    });

    // mensaje = '';

    var pleaseWait = $('#pleaseWaitDialog');

    hidePleaseWait = function () {
        pleaseWait.modal('hide');
    };
    hidePleaseWait();
}

function ConsultaPDFXML(arg, orden) {

    $(this).find('.modal-body').css({
        width: 'auto', //probably not needed
        height: 'auto', //probably not needed 
        'max-height': '80%'
    });

    $('#lblOrdenPDF').text(orden);

    var object = "<object data=\"{FileName}\" type=\"application/pdf\" width=\"700px\" height=\"700px\">";
    object += "Si usted no puede ver el archivo, se puede descargar desde <a href = \"{FileName}\">here</a>";
    object += " o descargargalo de <a target = \"_blank\" href = \"http://get.adobe.com/reader/\">Adobe PDF Reader</a> para ver el archivo.";
    object += "</object>";
    object = object.replace(/{FileName}/g, "Z:/Prueba/MARJ820822PG3CA-CRA-CUA-UN-PF-6.pdf");
    $("#dialog").html(object);


    $('#divOrdenPDF').modal('show');

}



