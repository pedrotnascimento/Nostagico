# -*- coding:utf-8 -*- 
import re
from  os import mkdir

class Bairro():
    
    def __init__(self,bairro_col=0,municipio_col=1):
        # dicionarios, bairros que nao estao abreviados, bairros consertados manualmente respectivamente
        self.bair_mun =self.get_lista_bairros_mun()
        self.fixed_bairros = self.get_lista_bairros_fixed()
        self.saida_tratar = {}
        self.saida_OK = ""
        self.bairros = {}
        
        self.qt_tratar =0
        self.qt_tratado = 0
        self.qt_bairros = 0
        
        self.log_error = ""
        self.out_dir = "saida/"
        
    # bairros nao abreviados
    def get_lista_bairros_mun(self):        
        bairros_lis =""
        with open("bairros_municipios.csv", "rb") as fr:
            bairros_lis = fr.read()
        bairros_lis = bairros_lis.split("\n")
        
        bairros_dict = {}
        for i in bairros_lis:
            temp = i.split(";")

            b = temp[0] # bairro
            m = temp[1] # municipio
                
            if m not in bairros_dict:
                bairros_dict[m] = {}
            if b not in bairros_dict[m]:
                bairros_dict[m][b] = b # nao eh array, pois dicionario é mais rápido
        return bairros_dict
                
    #bairros corrigidos manualmente
    def get_lista_bairros_fixed(self):    
        
        corrigidos = ""
        with open("bairros_corrigidos.csv","rb") as fr:
            corrigidos = fr.read().split("\r\n")
        
        fixed = {}
        for i in corrigidos:
            temp = i.split(";")
            abrv = temp[0] # abreviacao
            m = temp[1] # municipio
            corrigido = temp[3] # corrigido
            if corrigido != "":    
                if m not in fixed:
                    fixed[m] = {}
                if abrv not in fixed[m]:
                    fixed[m][abrv] = corrigido # nao eh array, pois dicionario é mais rápido
                
        return fixed

    def match_bairro(self, b,m):
        div_b = b.split()
        if len(div_b) < 2:
            return b
        
        # checa se o bairro existe no dicionario manual
        if m in self.fixed_bairros and b in self.fixed_bairros[m]:
            return self.fixed_bairros[m][b]
        
        # checa se o bairro pode ser inteligido a partir de algum bairro existente e certo
        if m in self.bair_mun:
            for j in self.bair_mun[m]:
                curr_bairro = self.bair_mun[m][j]
                if len(curr_bairro.split()) <2:
                    continue
                    
                curr_bairro_prim_palavra = self.bair_mun[m][j].split()[0]
                prim_palavra = list(div_b[0])
                tam = len(prim_palavra)
                criterio  = lambda x ,y : x in y
                
                if div_b[-1] == curr_bairro.split()[-1] and \
                    all(map(criterio, prim_palavra, [curr_bairro_prim_palavra]*tam)):
                    return self.bair_mun[m][j]
        
        # retorna bairro original
        return b
        

    def retiraLatin(self, string):
        """
        divide string em lista de caracteres
        verifica se cada caracterer é latino
        se for, troca no dicionario
        junto tudo no final como string de novo.
        """
        # ordem: Á,É,Í,Ó,Ú,Ã,Õ,Ç,Â,Ê,Ô
        dict = {"\xc1":"A","\xc9":"E", "\xcd":"I", "\xd3":"O","\xda":"Ú",
                "\xc3":"A","\xd5":"O","\xc7":"C", "\xc2":"A","\xca":"E","\xd4":"O"}
                
        temp = list(string)
        for c, inx in zip(temp, range(len(temp))):
            if c in dict:
                temp[inx] = dict[c]
        return ''.join(temp)


    def checa_bairros(self, bairro, municipio):
        # global self.qt_bairros,self.qt_tratar,self.qt_tratado,self.bairros,self.saida_OK,self.saida_tratar, bair_mun, self.log_error, self.fixed_bairros
        
        bairro = re.sub(r"[.,]", "", self.retiraLatin(self.substituiSiglas(bairro.strip())))
        municipio = re.sub(r"[.,]", "", self.retiraLatin(self.substituiSiglas(municipio.strip())))
        
        # retira bairros lixos
        lixos = ["NAO INFORMADO",'NAo Informado', "NAo Encontrado", "0", "NI", ""]
        if re.match(r"[0-9]{6}", bairro)!=None or \
            bairro in lixos:
            self.log_error+= bairro + "\n"
            return bairro
        
        # alias
        b = bairro 
        m = municipio
        if m not in self.bairros:
            self.bairros[m] = {}
        
        # tenta inteligir bairro
        b = self.match_bairro(b, m)
    
        # constroi dicionario vindo da base de entrada para gerar relatorios
        if b in self.bairros[m]:
            self.bairros[m][b]['qt'] += 1
        else:
            self.qt_bairros+=1
            self.bairros[m][b] = {'qt':1, 'tratar': False}
                    
            # bairros que sao certos, porem o filtro nao deixa passar
            especificos = ["LOTE XV",  "ZE GAROTO","PE PEQUENO","KM 32", "JARDIM 25 DE AGOSTO"]
            
            
            # foi checado em lista de logradouro para ver se algumas 
            # das palavras abaixo poderiam ser siglas de logradouros
            #http://coopus.com.br/site/upload/tabelas-ans/lodragouro-tipo.pdf
            #http://www.pmf.sc.gov.br/arquivos/arquivos/pdf/04_01_2010_10.27.25.2b615e6755138defe1bdb00f1c86031f.PDF
            funcao_criterio = lambda x: len(x)<=3 and x not in ["DA","DAS","DE","DO", "DOS","OS"] \
                                    and x not in ["SAO", "BOA", "BOM", "RIO", "DEL","ANO","ERA",
                                    "EMA", "DEL", "VAZ","PAU","PAZ","FE","PAO","SAN","SUL","LUZ","EL",
                                    "ISA","REI","LO","II", "III", "XV","0","1","2","3","4","5","6","7","8","9",
                                    "IPE", "MAR","DOM", "SOL","ERA", "CEU", "KM", "ASA", "BOA","ANA","MEU"] 
                                    
            # filtro para ver se o bairro eh abreviado ou nao.
            # nenhuma palavra do bairro pode alguma caracteristica da funcao criterio 
            criterio = map(funcao_criterio, b.split())
            
            if " " in b and any(criterio) and b not in especificos:
                # eh abreviado, tratar!
                self.bairros[m][b]['tratar'] = True
                self.qt_tratar+=1
            else:
                # nao eh abreviado, 
                # checar depois no arquivo bairros_certos, 
                # se o filtro esta correto e se o bairro faz sentido
                self.qt_tratado+=1
        return b
        
    def substituiSiglas(self, string):
        # tinha retirado, mas pra muitos casos, estas siglas resolvem a substituicao,
        # se alguma se estiver errado, inserir no dicionario de correcoes_manuais
        siglas = {"JD": "JARDIM", "JDM":"JARDIM",  "PRQ": "PARQUE", 
                    "VL":"VILA", "STA":"SANTA", "FAZ": "FAZENDA", 
                    "FZD":"FAZENDA", "FZ":"FAZENDA","LRG":"LARGO", "LG":"LARGO", 
                    "TRV":"TREVO", "JRD":"JARDIM"}        
        if string!="":
            candidato = string.split()[0]
        else:
            return ""
        if candidato in siglas:
            return string.replace(candidato, siglas[candidato])
        return string

    def gera_relatorios(self):
        try:
            mkdir(self.out_dir)    
        except OSError: 
            pass
        
        with open(self.out_dir+"bairros_lixos.csv", "wb") as fw:
            fw.write(self.log_error)
            
        saida_count_den_bairros = "bairro;mun;qt_den;corrigir \n"
        self.saida_OK = "bairro;mun;qt_den \n"

        bairros_para_ambiguidades=[]
        for i in self.bairros:
            for j in self.bairros[i]:
                if self.bairros[i][j]['tratar']:
                    bairros_para_ambiguidades += [j]
                    saida_count_den_bairros +=  j +";"+ i + ";" + str(self.bairros[i][j]['qt']) + ";\n"
                else:
                    self.saida_OK += j + ";" + i + ";" +  str(self.bairros[i][j]['qt']) + "\n"

        with open(self.out_dir+"bairros_abreviados.csv", "wb") as fw:
            fw.write(saida_count_den_bairros.strip())

        
        bairros_para_ambiguidades = sorted(bairros_para_ambiguidades)
        ambiguidades_bairro="bairro;municipio\n"
        ambiguidades = {}

        for i in range(len(bairros_para_ambiguidades)-1):
            if bairros_para_ambiguidades[i] == bairros_para_ambiguidades[i+1] \
                and bairros_para_ambiguidades[i] not in ambiguidades:
                    ambiguidades[bairros_para_ambiguidades[i]] =""
                
        for i in self.bairros:
            for j in ambiguidades:
                if j in self.bairros[i]:
                    ambiguidades_bairro+=j+";"+i+ ";"+ str(self.bairros[i][j]['qt']) +"\r\n"
                                    
        with open(self.out_dir+"bairros_ambiguos.csv", "wb") as fw:
            fw.write(ambiguidades_bairro.strip())


        with open(self.out_dir+"bairros_certos.csv", "wb") as fw:
            fw.write(self.saida_OK.strip())
            
        print "quantidade de bairros", self.qt_bairros  
        print "bairros nao tratados", self.qt_tratar
        print "bairros tratados", self.qt_tratado
        print "bairros com ambiguidades", len(ambiguidades)
