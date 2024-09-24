function listarMovimientos() {
    var fechaInicio = document.getElementById("txtFechaInicio").value;
    var fechaFin = document.getElementById("txtFechaFin").value;
    var tipoMovimiento = document.getElementById("txtTipoMovimiento").value;
    var nroDocumento = document.getElementById("txtNroDocumento").value;
        const Movimiento = {};
    Movimiento.FECHA_INICIO = fechaInicio;
    Movimiento.FECHA_FIN = fechaFin;
    Movimiento.TIPO_MOVIMIENTO = tipoMovimiento;
    Movimiento.NRO_DOCUMENTO = nroDocumento;
            $.ajax({
                type: 'POST',
                url: accionListarMovimientos,
                data: JSON.stringify(Movimiento),
                proccesData: false,
                contentType: 'application/json',
                success: function (data) {
                    alert(data)
                    if (data != 0) {
                        crearListado(["COD_CIA", "COMPANIA_VENTA_3", "ALMACEN_VENTA", "TIPO_MOVIMIENTO", "TIPO_DOCUMENTO","NRO_DOCUMENTO","FECHA_TRANSACCION"], data);
                        alert("se ejecuto correctamente");
                    } else {
                        $('#tablas').dataTable().fnClearTable();
                        alert("ocurrio error")
                    }
                }
            })
    
}
function crearListado(arrayColumnas, data) {
    var contenido = "";
    contenido += "<table id='tablas' class='table'>"
    contenido += "<thead>"
    contenido += "<tr>"
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";

    }
 /*   contenido += "<td>Operaciones</td>";*/

    contenido += "</tr>"
    contenido += "</thead>"

    var llaves = Object.keys(data[0]);

    contenido += "<tbody>"
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>"
        for (var j = 0; j < llaves.length; j++) {
            var valorLLaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLLaves];
            contenido += "</td>"
        }
        var llaveId = llaves[0];

        //contenido += "<td>";
        //contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> "
        //contenido += "<button class='btn btn-danger'  onclick='eliminar(" + data[i][llaveId] + ")'><i class='glyphicon glyphicon-trash'></i></button>"
        //contenido += "</td>"
        contenido += "</tr>"
    }
    contenido += "</tbody>"
    contenido += "</table>"

    document.getElementById("tabla").innerHTML = contenido;
    $("#tablas").dataTable(
        { searching: false }
    );
}

function alerta() {
    alert("click")
}