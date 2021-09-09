# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import sys

import helper

import os

import numbers
import math

###########################
## Script para captura de bairros das planilhas Excel
###########################

# Este script presume que cada municipio possuirá uma planilha (cujo nome será o nome do municipio)
# 	e que, dentro desta planilha, haverá os nomes dos bairros deste municipio.
# O método para extrair nomes de bairros é simples: para cada célula com valor numérico (código do bairro), 
# 	captura-se o conteúdo da célua imediatamente à esquerda.

# Nome da pasta contendo arquivos excel com bairros
neighborhoodsFolder = "bairros"

absFilepath = os.path.abspath(neighborhoodsFolder)

# Lista de municipios
lmun = []

# Map onde a key é o nome do municipio e o value, conjunto de bairros daquela cidade
neighMap = dict()

# Para cada arquivo
for f in os.listdir("bairros"):
	filepath = os.path.join(absFilepath,f)

	xl = pd.ExcelFile(filepath)

	# Para cada planilha
	for sheet in xl.sheet_names:
		df = xl.parse(sheet, index_col=None)
		# print(df)

		city = helper.strclean(sheet)
		lmun.append(city)

		l = []

		# Para cada célula de índices i, j
		for i, row in df.iterrows():
			for j, e in enumerate(row):
				if isinstance(e,numbers.Number) and not math.isnan(e) and j > 0 and isinstance(row[j-1],str):
					l.append(helper.strclean(row[j-1])) 

		# Atribui lista de bairros ao map
		neighMap[city] = set(l)


munSet = set(lmun)


