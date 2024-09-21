using LibEntidad;
using LibNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace webExamenFL.Controllers
{
    public class InventarioController : Controller
    {
        // GET: Inventario
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarMovimientos(Movimiento enMovmiento)
        {
            NegMovimiento objNegMovimiento = new NegMovimiento();
            List<Movimiento> listaMovimiento= new List<Movimiento>();
            listaMovimiento = objNegMovimiento.ListarMovimientos(enMovmiento.FECHA_INICIO, enMovmiento.FECHA_FIN,enMovmiento.TIPO_MOVIMIENTO,enMovmiento.NRO_DOCUMENTO);
            var lista = listaMovimiento.Select(
                t=>new { 
                    COD_CIA = t.COD_CIA, 
                    COMPANIA_VENTA_3 = t.COMPANIA_VENTA_3,
                    ALMACEN_VENTA = t.ALMACEN_VENTA,
                    TIPO_MOVIMIENTO = t.TIPO_MOVIMIENTO,
                    TIPO_DOCUMENTO = t.TIPO_DOCUMENTO,
                    NRO_DOCUMENTO = t.NRO_DOCUMENTO,
                    FECHA_TRANSACCION = t.FECHA_TRANSACCION,
                }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}