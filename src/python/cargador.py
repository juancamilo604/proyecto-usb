import pymysql
from Excel import getExcel, CreateExcel
import sys
from keysdb import keysdb
import numpy as np

# * ***********************
# * Conexión base de datos
# * *********************

def limpiarCampo(valor):
  if (isinstance(valor, str)):
    valor = valor.strip().upper()
    valor = valor[0:254] # deja el string de 254 caracteres
    return valor
  elif (np.isnan(valor)):
    return "N/A"
  else:
    return valor

ipServidor = keysdb['host']
userServer = keysdb['user']
passwordServidor = keysdb['password']
bdd = keysdb['database']


path = sys.argv[1]
prueba = "registros.xlsx"
print(prueba)
print("Esraaa es la pruebaaaa")


excel = getExcel()
excel.read_excel(path)
regCiclo = excel.getDataFromColumn('CICLO')
regPrograma = excel.getDataFromColumn('PROGRAMA')
regId = excel.getDataFromColumn('EMPLID')
regNombre = excel.getDataFromColumn('NOMBRE')
regPri = excel.getDataFromColumn('PRIMER CORTE')
regSeg = excel.getDataFromColumn('SEGUNDO CORTE')
regTer = excel.getDataFromColumn('TERCER CORTE')
regDef = excel.getDataFromColumn('DEFINITIVA')
regCatalogo = excel.getDataFromColumn('CATÁLOGO')
regSesion = excel.getDataFromColumn('SESSIÓN')
regClase = excel.getDataFromColumn('CLASE')
regMateria = excel.getDataFromColumn('MATERIA')

cantidad = len(regCiclo)
regCiclo = regCiclo.tolist()
regPrograma = regPrograma.tolist()
regId = regId.tolist()
regNombre = regNombre.tolist()
regPri = regPri.tolist()
regSeg = regSeg.tolist()
regTer = regTer.tolist()
regDef = regDef.tolist()
regCatalogo = regCatalogo.tolist()
regSesion = regSesion.tolist()
regClase = regClase.tolist()
regMateria = regMateria.tolist()

val3 = []
try:
    for x in range(cantidad): 
        tupla = (regCiclo[x],regPrograma[x],regId[x],regNombre[x],limpiarCampo(regPri[x]),limpiarCampo(regSeg[x]),limpiarCampo(regTer[x]),limpiarCampo(regDef[x]),regCatalogo[x],regSesion[x],regClase[x],regMateria[x])
        val3.append(tupla)

except Exception as e:
    print(e)
try:
    connectionMySQL = pymysql.connect(host=ipServidor, user=userServer,password=passwordServidor, db=bdd, read_timeout=60, autocommit=True)
    fcursor = connectionMySQL.cursor()
    sqlInsert = "INSERT INTO dbp_ged.tbl_rregistros (FKPER_NUSUARIO, REG_CCICLO, REG_CPROGRAMA, REG_CEMPLID, REG_CNOMBRE, REG_CNOTA_PR, REG_CNOTA_SEC, REG_CNOTA_TER, REG_CNOTA_DEF, REG_CCATALOGO, REG_CSESION, REG_CCLASE, REG_CMATERIA, REG_CESTADO) VALUES ('system', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'Activo');"
    fcursor.executemany(sqlInsert,val3)
    connectionMySQL.commit()
    fcursor.fetchall()

except Exception as e:
    print(e)
