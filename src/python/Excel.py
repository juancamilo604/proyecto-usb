import pandas
from pandas import ExcelWriter
from openpyxl import load_workbook
import pandas.io.formats.excel


class getExcel:
    try:
        datos = {}
        columnas = []

        def read_excel(self,PATH):
            self.archivo_excel = pandas.read_excel(PATH)
            self.inputPath = PATH

        def read_excel2(self,PATH): #Hoja de retiros
            self.archivo_excel = pandas.read_excel(PATH, sheet_name='retirados')
            self.inputPath = PATH


        def getExcel(self):
            return self.archivo_excel

        def getDataFromColumn(self,column):
            return self.archivo_excel[str(column)].values

        def getColums(self):
            return self.archivo_excel.columns
        
        def getRows(self):
            return self.archivo_excel.shape[0]

        def write(self,PATH,col):
            df = pandas.DataFrame.from_records(self.datos)
            df = df[self.columnas]
            
            #print ((df.shape[1]))
            #df.columns = range(df.shape[1])
            
            # Configuramos Pandas y cargamos el archivo correspondiente (en este caso se llama archivo.xlsx)                       
            book = load_workbook(PATH)
            writer = pandas.ExcelWriter(PATH, engine='openpyxl') 
            writer.book = book
            # Por defecto Pandas formatea las celdas del header con negrita y borde, si no se quiere hacemos lo siguiente:
            pandas.io.formats.excel.header_style = None
            # Guardamos el df en el excel en el lugar apropiado.
            writer.sheets = dict((ws.title, ws) for ws in book.worksheets)
            df.to_excel(writer, book.worksheets[0].title, startrow = col,  header=False, index = False) 
            writer.save()

        def addData(self,nombre,data):
            if str(nombre) not in self.columnas:
                self.columnas.append(str(nombre))
            self.datos[str(nombre)] = data

    except Exception as Error:
        print("error excel")
        print(Error)




class CreateExcel:

    try:
        datos = {}
        columnas = []
        def setPath(self, PATH):
            self.path = PATH

        def addData(self,nombre,data):
            if str(nombre) not in self.columnas:
                self.columnas.append(str(nombre))
            self.datos[str(nombre)] = data
        def saveExcel(self):
            #print(self.datos)
            df = pandas.DataFrame.from_records(self.datos)
            df = df[self.columnas]
            writer = ExcelWriter(self.path)
            df.to_excel(writer, 'Hoja de datos', index=False)
            writer.save()

    except Exception as Error:
        print("error excel")
        print(Error)



