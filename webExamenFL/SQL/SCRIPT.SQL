ALTER PROCEDURE [dbo].[USP_LISTAR_MOVIMIENTO]
(
@fechaInicio  VARCHAR(50),
@fechaFin  VARCHAR(50),
@tipoMovimiento VARCHAR(50),
@nroDocumento VARCHAR(50)
)
AS
SELECT COD_CIA,COMPANIA_VENTA_3,ALMACEN_VENTA,TIPO_MOVIMIENTO,TIPO_DOCUMENTO,NRO_DOCUMENTO,FECHA_TRANSACCION FROM MOV_INVENTARIO
WHERE
CONVERT(DATETIME,FECHA_TRANSACCION,103)
BETWEEN 
CASE WHEN @fechaInicio is null then CONVERT(DATETIME,FECHA_TRANSACCION,103) else  CONVERT(DATETIME,@fechaInicio,126)end  
AND 
CASE WHEN @fechaFin is null then CONVERT(DATETIME,FECHA_TRANSACCION,103) else  CONVERT(DATETIME,@fechaFin,126)end 
AND
TIPO_MOVIMIENTO= CASE WHEN @tipoMovimiento is null then TIPO_MOVIMIENTO else @tipoMovimiento end AND
NRO_DOCUMENTO= CASE WHEN @nroDocumento is null then NRO_DOCUMENTO else @nroDocumento end 