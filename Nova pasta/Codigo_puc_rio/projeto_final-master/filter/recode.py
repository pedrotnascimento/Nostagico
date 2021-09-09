# -*- coding: utf-8 -*-
import nltk
from nltk import *
import re

from words import *

from neighborhoods import *

# import spellchecker
import helper

modelFile = 'perceptron.pickle'
if os.path.exists(modelFile):
	print('> Carregando modelo pre-existente\n')

	tagger = nltk.tag.perceptron.PerceptronTagger(load=True)
	tagger.load(modelFile)
else:
	print('> Treinando modelo. Isto pode levar varios minutos...\n')
	tsents = nltk.corpus.mac_morpho.tagged_sents() # DA ONDE ISTO VEM
	tsents = [[(helper.remove_accents(w).upper(),t) for (w,t) in sent] for sent in tsents if sent]

	# Remove sentencas problematicas do MAC MORPHO 
	del tsents[28194]
	del tsents[28500]
	tagger = nltk.tag.perceptron.PerceptronTagger(load=False)
	tagger.train(tsents,save_loc=modelFile)
	# tagger.save(modelFile)

# tagger = nltk.tag.BigramTagger(tsents,backoff=tagger)
# tagger = nltk.tag.TrigramTagger(tsents,backoff=tagger)
# tagger.train(tsents)

# Expande abreviacoes
def expand_words(s):
	s = s.replace('\n','. ')

	s = s.replace('S/N', ' ')

	# Substitui abreviacao (incluindo ponto ou nao)
	s = re.sub(r'(^|\W)PC\.?\W', ' PRACA ',s)
	s = re.sub(r'(^|\W)AV\.?\W', ' AVENIDA ',s)
	s = re.sub(r'(^|\W)ESTR\.?\W', ' ESTRADA ',s)
	s = re.sub(r'(^|\W)PQ\.?\W', ' PARQUE ',s)

	# No caso de rua, verifica se a palavra anterior é RUA. Ex:
	# 'R' => 'RUA'
	# 'RUA R' => 'RUA R'
	# 'R R' => 'RUA R'
	s = re.sub(r'(^|\W(?!(?<=RUA\W)))R\.?\W', ' RUA ',s)

	# Expande N e NO em NUMERO apenas se sucedido por um numero
	s = re.sub(r'(^|\W)NO?\.?\W(?=\d)', ' NUMERO ',s)

	return s

# Pre-processa strings de fref
def preprocess_fref(s):
	s = ' '+s+' '

	# Elimina virgula antes de numeros
	# Ex: 'RUA X, 123' => 'RUA X 123'
	s = re.sub(r'(,(?=(\W?)(\d+)))', ' ',s)

	s = s.replace('- ', ' - ')
	s = s.replace(' -', ' - ')

	s = s.replace('/', ' / ')

	# NASCIMENTO: nao entendi pq dessas substituicoes
	s = s.replace(' DO ', ' DE O ')
	s = s.replace(' DA ', ' DE A ')
	s = s.replace(' DOS ', ' DE OS ')
	s = s.replace(' DAS ', ' DE AS ')
	s = s.replace(' NA ', ' EM A ')
	s = s.replace(' NO ', ' EM O ')
	s = s.replace(' NAS ', ' EM AS ')
	s = s.replace(' NOS ', ' EM OS ')
	s = s.replace(' PELO ', ' POR O ')
	s = s.replace(' PELA ', ' POR A ')
	


	s = s.replace('BOCA DE FUMO', 'BOCA_DE_FUMO')	

	return s.strip()

# Filtra sentencas (True = valida, False = descarta)
# 	lista de palavras estão no arquivo words.py
def sentence_filter(s):
	# Se é um qualificador, mantém
	if(len(s) == 1 and s[0][1] == 'Q'):
		return True

	# Se possui algum numero, mantém
	if any((t[1] == 'N|AP') for t in s):
		return True

	# Se é um singleton de uma palavra existente em forbiddenSingletonWordSet, descarta
	if(len(s) == 1 and s[0][0] in forbiddenSingletonWordSet):
		return False

	# Se singleton que nao contem nome proprio e esteja na lista de palavras do portugues, descarta
	if(len(s) == 1 and s[0][1] != 'NPROP' and s[0][0] in bigListSet ):
		return False

	# Se possui uma palavra proibida, descarta
	if any((t[0] in forbiddenWordSet) for t in s):
		return False

	NCount = sum(1 for t in s if t[1]=='N')
	NPropCount = sum(1 for t in s if t[1]=='NPROP')
	# AdCount = sum(1 for t in s if t[1].startswith('AD'))

	# Se nao possui nenhum substantivo (comum ou proprio), descarta
	if NCount == 0 and NPropCount == 0:
		return False
	# Se possui um unico substantivo comum e o mesmo pertence a placeTypeSet, descarta
	elif NCount == 1 and NPropCount == 0:
		l = [t[0] for t in s if t[1]=='N']
		if l[0] in placeSetExceptNonBreaking:
			return False

	return True

# Limpa a parte quebrada
def cleanup_fref_sent(s):
	# Se possui preposicao solta no inicio, descarta
	if(len(s) > 0 and s[0][1].startswith('PREP')):
		del s[0]

	# Se possui artigo solto no inicio, descarta
	if(len(s) > 0 and s[0][1] == 'ART'):
		del s[0]

# Pós-processa uma cada parte quebrada
def postprocess_fref_sent(s):
	# Remove palavras referentes a lugar consideradas nao importantes
	# do inicio e final
	while(len(s) > 0 and s[0][0] in wordsToTrimSet):
		del s[0]

	while(len(s) > 0 and s[-1][0] in wordsToTrimSet):
		del s[-1]

	# Junta palavras em uma string
	s = ' '+(' '.join(map(lambda t: t[0],s)))+' '

	s = s.replace(' DE O ', ' DO ')
	s = s.replace(' DE A ', ' DA ')
	s = s.replace(' DE OS ', ' DOS ')
	s = s.replace(' DE AS ', ' DAS ')
	s = s.replace(' EM A ', ' NA ')
	s = s.replace(' EM O ', ' NO ')
	s = s.replace(' EM AS ', ' NAS ')
	s = s.replace(' EM OS ', ' NOS ')

	s = s.replace('BOCA_DE_FUMO', 'BOCA DE FUMO')	

	# Remove preposicao solta no inicio
	# s = re.sub(r'^(\W?)(D|N)?(A|O)S?\W', '',s)
	# s = re.sub(r'^(\W?)AO\W', '',s)

	return s.strip()

# Categoriza a parte quebrada
# Recebe tanto sent (lista de palavras com tags)
#	 quanto postProcessedSent (string já pós processada)
def categorize_fref_sent(sent, postProcessedSent, fmun):
	if sent[0][0] in ['FAVELA', 'COMUNIDADE']:
		return 'COMUNIDADE'

	if re.match('(RJ|BR)(-|\W)?\d\d\d',postProcessedSent):
		return 'RODOVIA'

	# Verifica se a primeira palavra é um tipo de logradouro
	# if any((t[0] in logTypes) for t in s):
	if sent[0][0] in logTypes:
		return 'LOGRADOURO'

	# Verifica se possui algum numero
	if any((t[1] == 'N|AP') for t in sent):
		return 'NUMERO'

	# Verifica se a string comeca com BAIRRO ou
	# 	se a mesma está incluida na lista de bairros daquele municipio
	if sent[0][0] == 'BAIRRO' or (fmun in neighMap and postProcessedSent in neighMap[fmun]):
		return 'BAIRRO'

	if postProcessedSent in munSet: # or postProcessedSent.endswith('/RJ'):
		return 'MUNICIPIO'

	if postProcessedSent == 'RJ':
		return 'UF'


	return None

def is_separator(s):
	return s in set(['.',',','-','(',')','/',':',';','\'','\'\'','"','""','`','``'])

def print_tokens(s):
	s = '' if type(s) is not str else s.strip()
	tokens = word_tokenize(s)
	for t in tokens:
		print(t)

def recode_locf(ftlo,flog,fref,fmun):
	# Remover espaco ao inicio e final
	ftlo = '' if type(ftlo) is not str else ftlo.strip()
	flog = '' if type(flog) is not str else flog.strip()
	fref = '' if type(fref) is not str else fref.strip()
	fmun = '' if type(fmun) is not str else fmun.strip()

	# Variavel com resultado
	locf = ''

	ftlo = ftlo.replace('SEM TIPO', '')
	ftlo = ftlo.replace('SEM', '')

	flogSplit = flog.split(' ')

	if flogSplit[0] in placeTypeSet:
		locf = ' '.join(flogSplit)
	else:
		locf = ftlo+' '+(' '.join(flogSplit))
		print "locf duplicado?", locf, 
		input()

	# locf = fref

	locf = locf.replace('SEM TIPO', '') # NASCIMENTO: ele nao já havia limpado acima?
	locf = locf.replace('OUTROS', '') # NASCIMENTO: pq nao limpar esse código acima também?
	locf = locf.replace('VIA EXPRESSA', 'RODOVIA') # NASCIMENTO: ou colocar estes termos em um dict

	locf = expand_words(locf)

	fref = expand_words(fref)
	fref = preprocess_fref(fref)

	if len(fref) > 0:

		print(fref)

		tagged_fref = tagger.tag(word_tokenize(fref))

		print('')

		print(tagged_fref)

		######################
		## REGRAS DE QUEBRA ##
		######################

		split_fref = [] # lista de frases
		sent = [] # armazena a frase atual
		skipNext = False # flag para pular o proximo
		last = ('','') # armazena tupla anterior (inicializada com valores nulos)

		# Para cada palavra (onde t é uma dupla contendo a palavra e sua tag)
		for inx,t in enumerate(tagged_fref):
			# Corrige casos em que substantivos referentes a lugar recebem tag NPROP incorretamente
			# 	(ver placeTypeSet no arquivo words.py)
			if t[0] in placeTypeSet and t[1] == 'NPROP':
				t = (t[0],'N')
				print "qualifier?", t[0], "palavra", t
				input()

			if t[0] in qualifierSet and not(inx+1 < len(tagged_fref) and tagged_fref[inx+1][1] in [ 'N', 'NPROP', 'ADJ'] and tagged_fref[inx+1][0] not in logTypes):
				if len(sent) > 0:
					split_fref.append(sent)

				split_fref.append([(t[0],'Q')])
				sent = []

				continue				


			if skipNext: # se flag de skip ativada, pula esta palavra
				skipNext = False

			elif ( # Quebra se:
					# 1) preposicao NAO precedida por nenhuma das seguintes possibilidades:
					( t[1].startswith('PREP') and not ( 
						# 	- palavra na lista de "palavras nao-quebrantes" (ver nonBreakingWordSet no arquivo words.py)
						last[0] in nonBreakingWordSet
						# 	- substantivo proprio (NPROP)
						or last[1] == 'NPROP'
						# 	- outra preposicao (REGRA REMOVIDA)
						# or last[1].startswith('PREP')
					) )
				or # OU
					# 2) artigo NAO pertencente a contracao
					( t[1] == 'ART' and last[1] != 'PREP|+' ) 
				or # OU
					# 3) item considerado separador (ver definicao da funcao abaixo)
					is_separator(t[0])
				or # OU
					# 4) Conjuncao
					( t[1] == 'KC' or t[1] == 'KS' )
				):

				### QUEBRA
				# Realiza quebra
				if len(sent) > 0:
					split_fref.append(sent)
					sent = []

				skipNext = t[1].endswith('+') # Se prep é parte de uma contracao, pula o proximo item
				last = t

			else:
				### APPEND
				# Simplesmente anexa a palavra à frase atual
				sent.append(t)
				last = t

		# Anexa ultima frase à lista de frases
		if len(sent) > 0:
			split_fref.append(sent)

		# Imprime sentencas quebradas
		print('\n')
		for s in split_fref:
			print(">\t"+str(s))

		qualifiedSents = []

		# O loop abaixo junta qualificadores com os respectivos pedaços
		i=0
		while i < len(split_fref):
			qualifier = None

			while i < len(split_fref) and len(split_fref[i]) == 1 and split_fref[i][0][1] == 'Q':
				qualifier = split_fref[i][0][0]
				i=i+1
				

			# Se o pedaço passa pelo filtro
			if i < len(split_fref) and sentence_filter(split_fref[i]):

				# Limpa sent (in place)
				cleanup_fref_sent(split_fref[i])
				# Pós processamento
				postProcessedSent = postprocess_fref_sent(split_fref[i])

				# Caso a string fique vazia após limpeza, avança o loop
				# if len(split_fref[i]) == 0:
				if postProcessedSent == '':
					continue

				# Obtem categoria
				category = categorize_fref_sent(split_fref[i], postProcessedSent, fmun)
				# Constroi tripla
				t = ( qualifier, postProcessedSent, category )

				# Adiciona a lista de resultados
				qualifiedSents.append( t )

			i=i+1

		# print(qualifiedSents)

		# Pós tratamento
		# split_sents = map(postprocess_fref_sent,split_fref)

		# split_sents = list(filter(lambda s: s != '',split_sents))

		print('\n')
		if len(qualifiedSents) == 0:
			print("\t< OUTPUT VAZIO >")
		for s in qualifiedSents:
			print(">>>\t"+str(s))
		print('\n\n\n')

		return ( locf, qualifiedSents )


	return ( locf, '' )

