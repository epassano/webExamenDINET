using LibDato;
using LibEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibNegocio
{
    public class NegMovimiento
    {

        public List<Movimiento> ListarMovimientos(string fechaInicio, string fechaFin, string tipoMovimiento, string nroDocumento)
        {
            List<Movimiento> listaMovimientos= new List<Movimiento>();
            DatoMovimiento dato = new DatoMovimiento();
            listaMovimientos = dato.ListarMovimientos(fechaInicio,fechaFin,tipoMovimiento,nroDocumento);
            return listaMovimientos;
        }
    }
}
