# -*- coding: utf-8 -*-
from nltk import *
from nltk.corpus import stopwords


# Cria lista de stopwords (palavras irrelevantes)

# stops = set(stopwords.words('portuguese'))

# stops -= set(['e','de','do','da','dos','das'])

# Tipos de logradourdo

logTypes = \
	[ 'RUA', 'FAVELA', 'RODOVIA', 'AVENIDA', \
	'LADEIRA', 'ESTRADA', 'BECO', 'PRAIA', 'MORRO', 'PRACA', \
	'VIA', 'RAMAL', 'LARGO', 'VIELA', 'CAMPO', 'TRAVESSA', 'LOTEAMENTO', \
	'SERVIDAO', 'ALAMEDA', 'PARQUE', 'ARCO',  \
	'VILA', 'TUNEL', \
	'CAMINHO', 'TREVO', 'PATIO', 'CONJUNTO', 'PONTE', 'ESCADA', \
	'SITIO', 'SUBIDA', 'VALE', \
	'CAIS' \
	]


# Palavras com significado de lugar

placeTypes = \
	['SEM TIPO', 'RUA', 'FAVELA', 'SEM', 'RODOVIA', 'AVENIDA', \
	'OUTROS', 'LADEIRA', 'ESTRADA', 'BECO', 'PRAIA', 'MORRO', 'PRACA', \
	'VIA', 'RAMAL', 'LARGO', 'VIELA', 'CAMPO', 'TRAVESSA', 'LOTEAMENTO', \
	'RETORNO', 'SERVIDAO', 'ACESSO', 'ALAMEDA', 'PARQUE', 'ARCO', 'ENTRADA', \
	'VILA', 'FAZENDA', 'ESCADARIA', 'CONDOMINIO', 'TERMINAL', 'TUNEL', \
	'CAMINHO', 'TREVO', 'PATIO', 'CONJUNTO', 'PONTE', 'ESCADA', \
	'TERRENO BALDIO', 'SITIO', 'SUBIDA', 'VALE', 'REPRESA', 'VIADUTO', \
	'PASSARELA', 'COMUNIDADE', 'COMPLEXO', 'CIDADE', 'ZONA', 'ESQUINA', \
	'LOGRADOURO', 'TRAVESSIA', 'MATA', 'ESTACAO', 'ESCOLA', 'CASA', 'POSTO',
	'DISTRITO', 'BARRACAO', 'NUMERO', 'NUMEROS', 'BAIRRO' \
	]

placeTypeSet = set(placeTypes)

# Substantivos que nao devem ser quebrados (vide recode.py)

nonBreakingWords = \
	['RUA', 'FAVELA', 'RODOVIA', 'AVENIDA', \
	'ESTRADA', 'PRAIA', 'MORRO', 'PRACA', \
	'VIA', 'LARGO', 'CAMPO', 'TRAVESSA', \
	'ALAMEDA', 'PARQUE', 'ILHA', \
	'VILA', 'FAZENDA', 'CONDOMINIO', 'TERMINAL', 'TUNEL', \
	'CAMINHO', 'TREVO', 'PATIO', 'CONJUNTO', 'PONTE', \
	'SITIO', 'SUBIDA', 'VALE', 'VIADUTO', \
	'PASSARELA', 'COMUNIDADE', 'COMPLEXO', 'CIDADE', 'ZONA', \
	'PONTO', 'BECO', 'LOJA', 'FABRICA', 'BAR', 'LADEIRA', 'PEDRA', \
	'ESTACAO', 'CHACARA', 'PADARIA', 'CASA', 'POSTO' \
	]

nonBreakingWordSet = set(nonBreakingWords)


# Conjunto placeTypeSet menos elementos de nonBreakingWordSet (vide recode.py)

placeSetExceptNonBreaking = placeTypeSet - nonBreakingWordSet

# Palavras que disparam a filtragem (bastam aparecer na frase)

forbiddenWords = \
	['CONHECIDA', 'CONHECIDO', 'DENOMINADA', 'DENOMINADO', 'FATO', \
	'LOCALIZADA', 'LOCALIZADO', 'INFORMADA', 'INFORMADO', 'INFORMAR', \
	'INFORMOU', 'CITADO' ]

forbiddenWordSet = set(forbiddenWords)

# Palavras que disparam a filtragem quando sozinhas em um elemento de frase (após quebra)
# Obs: Inclui lista de palavras com significado de lugar,
#	logo novas palavras devem ser adicionadas lá, caso possuam significado de lugar 
forbiddenSingletonWords = placeTypes + \
	['FRENTE', 'AREIA', 'INTERIOR', 'NOME', 'PROXIMO', 'SN', 'S/N',\
	'LOCALIDADE', 'MURO', 'AC', 'ALTURA', 'LOCAL', 'FATO', 'PROX', \
	'BAIRRO', 'NOME', 'DIRECAO', 'PROXIMIDADE', 'PROXIMIDADES', 'ARREDORES',
	'INICIO','FINAL', 'PONTO', 'OBS' ]

forbiddenSingletonWordSet = set(forbiddenSingletonWords)

# Lista de palavras do portugues

bigList = [line.strip() for line in open('lista.txt', 'r')]

bigListSet = set(bigList)

# Lista de qualificadores

qualifierList = [ \
	'ESQUINA', 'PROXIMO', 'PERTO', 'FRENTE', 'ATRAS', 'FINAL', 'INTERIOR', \
	'LATERAL', 'ULTIMO', 'ULTIMA', 'PRIMEIRO', 'PRIMEIRA'
	]

qualifierSet = set(qualifierList)


# Palavras que devem ser removidas do inicio e final das partes

wordsToTrimList = [ \
	'NUMERO', 'NUMEROS', 'BAIRRO'
	]

wordsToTrimSet = set(wordsToTrimList)





