listar();
function listar() {

    //$.get(baseUrl+"/Curso/listarCurso", function (data) {
    $.get(accionListarProductos, function (data) {
        crearListado(["Id", "Codigo", "Descripcion", "Cantidad"], data);
    });
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
    contenido += "<td>Operaciones</td>";

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

        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button class='btn btn-danger'  onclick='eliminar(" + data[i][llaveId] + ")'><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>"
        contenido += "</tr>"
    }
    contenido += "</tbody>"
    contenido += "</table>"

    document.getElementById("tabla").innerHTML = contenido;
    $("#tablas").dataTable(
        { searching: false }
    );
}
function abrirModal(id) {
    var controlesObligatorios = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorios.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorios[i].parentNode.classList.remove("error");

    }
    if (id == 0) {
        borrarDatos();
    } else {
        $.get(accionRecuperarDatos+"/?id=" + id, function (data) {
            document.getElementById("txtProductId").value = data.productID;
            document.getElementById("txtProductCode").value = data.productCode;
            document.getElementById("txtDescription").value = data.description;
            document.getElementById("txtQuantity").value = data.quantity;
        });
    }
}
function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}
function Agregar() {
    if (datosObligatorios() == true) {
        var id = document.getElementById("txtProductId").value;
        var productCode = document.getElementById("txtProductCode").value;
        var description = document.getElementById("txtDescription").value;
        var quantity = document.getElementById("txtQuantity").value;
        const Producto = {};
        Producto.productID = id;
        Producto.productCode = productCode;
        Producto.description = description;
        Producto.quantity = quantity;
        if (confirm("Desea realemnte guardar") == 1)
            $.ajax({
                type: 'POST',
                url: accionGuardarDatos,
                data: JSON.stringify(Producto),
                proccesData: false,
                contentType: 'application/json',
                success: function (data) {
                    if (data != 0) {
                        listar();
                        alert("se ejecuto correctamente");
                        document.getElementById("btnCancelar").click();
                    } else {
                        alert("ocurrio error")
                    }
                }
            })
    }
}
function datosObligatorios() {
    var exito = true;
    var controlesObligatorios = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorios.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorios[i].value == "") {
            exito = false;
            controlesObligatorios[i].parentNode.classList.add("error");
        } else {
            controlesObligatorios[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}