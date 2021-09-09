#-*- coding: utf-8   -*-

from  os import system
import sys
from variables import logradouros
import re
from bairro import *

bairroObj = Bairro() 

LOCALIDADES_QT = 2
CARRIAGE = "\r\n"
DEFAULT_PATH = "tipos_de_entrada/"



def cut_extension(x):
    x = x[::-1]
    temp = list(x)
    for i in range(len(temp)):
        if temp[i] == ".":
            break
    y = temp[i+1:]
    y = ''.join(y[::-1])
    return y

# classe que trata bairros e gerencia relatorios de bairros
def retiraLatin(string):
    # "á":"A","é":"E","í":"I","ó":"O","ú":"u","â":"A","ê":"E","ô":"O","ã":"A","ç":"C","°":"","º":"","ª":"", "´":"", "À":"A","Ü":"U","Ò":"O", "È":"E"
    cuts = {'\xc1':'A', '\xc9':'E', '\xcd':'I', '\xd3':'O', '\xda':'U',
    '\xca':'E','\xc2':'A', '\xd4':'O', '\xc3':'A','\xd5':'O','\xc7':'C',
    "\xe1":"A","\xe9":"E","\xed":"I","\xf3":"O","\xfa":"u","\xe2":"A","\xea":"E",
    "\xf4":"O","\xe3":"A","\xe7":"C","\xb0":"","\xba":"","\xaa":"", "\xb4":"", "\xc0":"A",
    "\xdc":"U","\xd2":"O","\xc8":"E"}
    string_list = list(string)
    
    for c, inx in zip(string_list, range(len(string_list))):        
        if c in cuts:
            string_list[inx] = cuts[c]

    return ''.join(string_list)

def converteLogradouro(string):
    if string in logradouros:
        return logradouros[string]
    return string

def compile_stopwords_to_regex(arr):
    orRegexSign = "|"
    return re.compile(orRegexSign.join(arr))
    
def trataLocalidade(data):
    flagLocal = [
                "PROXIMO",
                "PERTO",
                "ESQUINA",
                "APÓS",
                "APOS",
                "FRENTE",
                "LOCALIZADO",
                "ATRAS",
                "ATRÁS",
                "ALTURA",
                "CONHECIDO",
                "LADO",
                "ACESSO",
                " CONHECIDA COMO "]
    comAcento = {"PRÓXIMO": "PROXIMO"
                }
    
    stopWords = [
                " COM A ",
                " AO ",
                " DO ",
                " DA ",
                " COM ",
                " COMA ",
                " O ",
                " A ",
                " POR ",
                " NO ",
                "PELA"]
    
    stopWordRe = compile_stopwords_to_regex(stopWords)
    
    
    strProc = re.sub(stopWordRe, "$%", data) # $% susbtitui stopwords, 
    # strProc = strProc.replace("PRÓXIMO", "PROXIMO")
    strProc = re.sub(r"[.,\n]", " PAUSA", strProc) # virgula e pontos pausam a captura
    strProc = re.sub(r"$", " END", strProc) # fim de linha r"$" garante término
    strProc = strProc.replace("$%", " ").split(" ") # stopwords se torna espaços, e espaços são base para converter para list
    
    retStr = "" # string que é retornada
    for e, inx in zip(strProc, range(len(strProc))):
        if e in flagLocal:
            local_ref_qt = 0

            for found in range(inx+1, len(strProc)):
                if strProc[found] not in ["PAUSA", "END"]:
                    retStr+=strProc[found] + " "
                elif strProc[found]!= "END":
                    # retStr = retStr.strip(" ") + DELIMIT  # descomentar para pegar outras localidades separando por virgula
                    return retStr.strip() ## se comentar, ele pegará outras localidades.
                    # local_ref_qt +=1
                    break
                # elif local_ref_qt>= LOCALIDADES_QT:
                    # return retStr.strip(";")
              
    if retStr != "":
        retStr = retStr.strip(", ")
        return retStr
    return converteLogradouro(data)

        
# RETORNA TODOS OS LOCAIS ONDE HOUVERAM DENUNCIAS RELACIONADA A DROGAS
#template/exemplo do comando
# sqlcmd -S ESTATISTICA-08 -E -Q "select * from dd.dbo.aux_olhos" -s ";" -o "abc.csv"
SERVIDOR = "ESTATISTICA-08"
DELIMIT = '%' # caracter que nao foi encontrado em todo o banco, aceito sugestoes

class DD():
    def __init__(self, query_file=None, extracted_file=None):
        if query_file is not None:
            self.sql_file_saida = cut_extension(query_file) + "_extracted.csv"
            print "extraindo dados do sql"
            self.queryFromSql(query_file) # TODO: verificar forma de saber se a consulta teve sucesso
            print "dados extraidos"
            self.dd_to_isp(self.sql_file_saida)
        elif extracted_file is not None:
            self.dd_to_isp(extracted_file)
        else:
            print "FORNEÇA UM ARQUIVO COM CONSULTA SQL VALIDA PARA O DD(ver pasta " + DEFAULT_PATH +")"
            
    def queryFromSql(self, query_file, DELIMIT=DELIMIT):
        with open(DEFAULT_PATH + query_file, "rb") as fr:
            SQL_QUERY = re.sub(r"["+CARRIAGE+"]"," ", fr.read())
        print SQL_QUERY
        cmd = 'sqlcmd -S'+ SERVIDOR +' -E -Q' \
                    ' \"set nocount on; ' + SQL_QUERY + '\"' \
                    ' -s "'+ DELIMIT + '" -o "'+ self.sql_file_saida + '"'
                    
        system(cmd)
        self.filename_saida = cut_extension(query_file) +"_saida.csv"

    def dd_to_isp(self, csv_file):
        self.fr = open(csv_file, "rb")
        self.fa = open( cut_extension(csv_file) +"_ISP.csv", "wb")    

        variaveis_cols = self.fr.readline()
        variaveis_cols = [ i.strip(r"[ ]*") for i in variaveis_cols.split(DELIMIT)]
        self.col_len = len(variaveis_cols)
        self.attribs = self.find_index_for_specifics(variaveis_cols)
        
        DEN_COL = self.attribs["den_cd"]
            
        variaveis_cols = ";".join(variaveis_cols) 
        variaveis_cols  = variaveis_cols.strip() + ";id;topico" +CARRIAGE # retira \n
        self.fa.write(variaveis_cols)
        self.fr.readline() ## pula overhead do SQL (------)

        self.count =1 
        self.count_for_topics = 1 
        self.topics = []
        pre_write_lis =[]
        new_line = self.fr.readline()
        new_line_lis = [ i for i in new_line.split(DELIMIT)]
        old_denuncia = new_line_lis[DEN_COL]
        while True:            
            if self.count%30000==0:
                print self.count

            if new_line in [""] : 
                break
            
            new_line = new_line.replace(";",".")
            new_line = retiraLatin(new_line)
            new_line = [i.strip(r"[ ]*") for i in new_line.split(DELIMIT)]
            current = ""
            current += DELIMIT.join(new_line)
            current = self.fix_line(current)
            
            # print current
            self.update_topics(current)
            current = self.address_routine(current)
            pre_write_lis.append(current)    
            new_line = self.fr.readline()
            new_line_lis = [ i for i in new_line.split(DELIMIT)]
            # print new_line_lis , DEN_COL           
            if new_line_lis[DEN_COL]!=old_denuncia:
                
                self.write_instance(pre_write_lis)
                pre_write_lis =[]
                self.count_for_topics = 1
                self.topics =[]
            else:
                self.count_for_topics +=1     

            old_denuncia = new_line_lis[DEN_COL]    
    
        self.fa.close()
        self.fr.close()

    def fix_line(self, line):
        while len(line.split(DELIMIT)) != self.col_len:
            line = line.strip()
            new_line = self.fr.readline().replace(";", ".")
            new_line = [i.strip(r"[ ]*") for i in new_line.split(DELIMIT)]
            new_line = DELIMIT.join(new_line)
            line  +=   " " + new_line
        return line

    def update_topics(self, line):
        line = [ i.strip() for i in line.split(DELIMIT)]
        XPTO_DESC = self.attribs["xpt_ds"]
        
        if XPTO_DESC is not None and \
            line[XPTO_DESC]!="NULL" and \
            line[XPTO_DESC] not in self.topics:
            self.topics.append(line[XPTO_DESC])

        ASSUNTO_DESC = self.attribs["tpa_ds"]
        if ASSUNTO_DESC is not None and \
            line[ASSUNTO_DESC]!="NULL" and \
            line[ASSUNTO_DESC] not in self.topics:
            self.topics.append(line[ASSUNTO_DESC])

    def address_routine(self, line):
        TP_LOGR_COL=self.attribs["den_logr_tp"]
        BAIRRO_COL=self.attribs["den_logr_bairro"]
        REF_COL=self.attribs["den_loc_ref"]

        if TP_LOGR_COL is not None:
            line = [ i.strip() for i in line.split(DELIMIT)]
            line[TP_LOGR_COL] = converteLogradouro(line[TP_LOGR_COL])
        
        if BAIRRO_COL is not None:
            bairro = line[BAIRRO_COL]
            mun = line[self.attribs["den_logr_mun"]]
            line[BAIRRO_COL] =  bairroObj.checa_bairros(bairro, mun)
            localidade = line[REF_COL]

        if REF_COL is not None:
            line[REF_COL] = trataLocalidade(localidade)
        
        line = ";".join(line)
        line = line.strip()
        return line

    def write_instance(self, instance):
        writing = []
        for i in self.topics:
            for j in range(self.count_for_topics):
                writing.append(instance[j] +";"+ str(self.count)+ ";" + i)
                self.count+=1
        writing = CARRIAGE.join(writing).strip() + CARRIAGE
        self.fa.write(writing)

    def find_index_for_specifics(self, columns):
        interests_attrib = {"tpa_ds":None, # "tipo do assunto"
                            "xpt_ds":None, # "tipo do xtpo"
                            "den_logr_tp":None, # "tipo do logradouro"
                            "den_logr_mun":None, #"Municipio"
                            "den_loc_ref":None, # "Referência do Local"
                            "den_logr_bairro":None} # "bairro da denuncia"

        # procura o indice onde as colunas que tem tratamento específico estão                             
        for i in interests_attrib:
            for j_inx, j in enumerate(columns):
                if i in j:
                    interests_attrib[i] = j_inx
                    break

        for j_inx, j in enumerate(columns):
                if "den_cd"==j: # caso especial
                    interests_attrib["den_cd"] = j_inx
                    break

        return interests_attrib

DD(extracted_file="microdado_extracted.csv")
# sqlTable_to_csv("microdado_extracted.csv")