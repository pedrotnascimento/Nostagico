#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import json
import csv

input = sys.argv[1]

#csv input
with open("problem.csv", "rb") as f:
    fcsv = csv.reader(f, delimiter="\t")
    flist = [i for i in fcsv]
    
class Pilot():
    def __init__(self, list):
        self.nome = list[1].split("-")
        

def proc_column_name(line):
    
    

sys.stdout.flush()


"""
APRENDIZADO CAUSADO POR UM SIMPLES en-dash

chcp 65001
set PYTHONIOENCODING=utf-8

"\u2013".encode("utf-8") codifica para o bystring \xe2\x80\x93
"\xe2\x80\x93".decode("utf-8") nao codifica por que da erro

e existe sérios problemas de codificação no windows usando o encode para o utf-8

usar python3 pois pelo menos o macete do chcp funciona
"""