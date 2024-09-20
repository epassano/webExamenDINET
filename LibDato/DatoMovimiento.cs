using LibEntidad;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibDato
{
    public class DatoMovimiento
    {

        public List<Movimiento> ListarMovimientos(string fechaInicio,string fechaFin,string tipoMovimiento,string nroDocumento)
        {
            List<Movimiento> listaMovimiento= new List<Movimiento>();

            using (SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ToString()))
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("USP_LISTAR_MOVIMIENTO", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@fechaInicio",fechaInicio);
                cmd.Parameters.AddWithValue("@fechaFin", fechaFin);
                cmd.Parameters.AddWithValue("@tipoMovimiento", tipoMovimiento);
                cmd.Parameters.AddWithValue("@nroDocumento", nroDocumento);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Movimiento objMovimiento = new Movimiento();
                    objMovimiento.COD_CIA = Convert.ToString(reader["COD_CIA"].ToString());
                    objMovimiento.COMPANIA_VENTA_3 = reader["COMPANIA_VENTA_3"].ToString();
                    objMovimiento.ALMACEN_VENTA = reader["ALMACEN_VENTA"].ToString();
                    objMovimiento.TIPO_MOVIMIENTO = reader["TIPO_MOVIMIENTO"].ToString();
                    objMovimiento.TIPO_DOCUMENTO = reader["TIPO_DOCUMENTO"].ToString();
                    objMovimiento.NRO_DOCUMENTO = reader["NRO_DOCUMENTO"].ToString();
                    objMovimiento.FECHA_TRANSACCION = reader["FECHA_TRANSACCION"].ToString();
                    listaMovimiento.Add(objMovimiento);
                }
            }
            return listaMovimiento;
        }
    }
}
