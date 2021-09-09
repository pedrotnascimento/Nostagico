# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import sys

import helper
# import spellchecker

from words import *

import recode

from PyQt4 import QtCore, QtGui

# Prepara spellchecker para realizar correcoes

# spellchecker.NWORDS = spellchecker.train(map(lambda s: s.lower(),types+words*2))

# Abre arquivo excel como Pandas Dataframe

# filepath = '/Users/ferocha/Desktop/gcd_nul_final_TableToExcel.xls'
filepath = '/Users/ferocha/Downloads/AmostraSub.xlsx'

df = pd.read_excel(filepath)

# df = df[pd.notnull(df['fref'])]

# df = df.sample(frac = 0.1, random_state = 1234)

# df.to_excel('/Users/ferocha/Downloads/AmostraSub.xlsx')

locationColumns = ['locf','ftlo','flog','fnum','fcom','fref','fbai','fmun']


df = df[locationColumns]

df = df.dropna(how='all')



# df = df[:1200]

# Limpa acentos
# df = df.applymap(helper.strclean)
# locationColumns = ['fref']
df[locationColumns] = df[locationColumns].applymap(helper.strclean)

# np.vectorize(recode.print_tokens)(df['fref'])
df['locfrecode2'],df['frefrecode'] = np.vectorize(recode.recode_locf)(df['ftlo'],df['flog'],df['fref'],df['fmun'])

del df['locfrecode2']

# df.to_excel('/Users/ferocha/Desktop/gcd_fref_interpretado.xls')

# df['locfrecode2'] = df.apply(lambda row: recode.recode_locf(row['ftlo'],df['flog']) , axis=1)

# print(df)
# print(df[['locf','ftlo','flog','fnum','fcom','fref','locfrecode']])
# print(df[['ftlo','flog','locfrecode','locfrecode2','frefrecode']])
# print(df.info())

# df = df[['ftlo','flog','locfrecode','locfrecode2','frefrecode']]

# funcao para exibir dataframe em uma janela amigavel
def show_df(df):
	app = QtGui.QApplication([])

	w = QtGui.QWidget()
	w.resize(1200, 600)
	w.move(100, 100)


	datatable = QtGui.QTableWidget(parent=w)
	datatable.setColumnCount(len(df.columns))
	datatable.setRowCount(len(df.index))
	# datatable.horizontalHeader().setStretchLastSection(True)

	for i in range(len(df.index)):
		for j in range(len(df.columns)):
			if i == 0:
				datatable.horizontalHeader().setResizeMode(j, QtGui.QHeaderView.Stretch)
			datatable.setItem(i,j,QtGui.QTableWidgetItem(str(df.iget_value(i, j))))
	datatable.resize(1200, 600)
	w.show()

	app.exec_()

# show_df(df)

# print(spellchecker.NWORDS)
# print(spellchecker.correct('camunidade'))
