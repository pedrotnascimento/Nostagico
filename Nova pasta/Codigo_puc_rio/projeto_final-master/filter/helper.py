# -*- coding: utf-8 -*-
import unicodedata

def remove_accents(input_str):
	nfkd_form = unicodedata.normalize('NFKD', input_str)
	only_ascii = nfkd_form.encode('ASCII', 'ignore')
	return only_ascii.decode("utf-8")

def strclean(input_str):
	if type(input_str) is not str:
		return input_str
	return remove_accents(input_str).upper()

