using LibEntidad;
using LibNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
            var lista = listaMovimiento.ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}