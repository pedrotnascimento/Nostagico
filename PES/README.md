# PES-2016

Sistema bancário

##(Regra 1)##

TÍTULO: CADASTRO

AUTORIA: Pedro Nascimento

DATA: 09/04/16

VERSÃO: 1.0

INDICADOR DE CONTEÚDO: 83 linhas de código

Descrição: Programa simples que tem como objetivo principal abstrair um sistema bancário. 

##(Regra 2)##
_"Sempre que descrever algo em documentos, deve-se atentar para o uso de pré e pós-condições. "_

Acima de cada função foi escrito as pré-condições e as pós condições para a função ser executada
Inclusive condições estão sendo verificadas nas funções*
Para fins educacionais foi feito apenas no módulo acao.lua	

##(Regra 3) Divisão do programa:##
_"Quando decompomos/dividimos algo devemos fazê-lo de tal modo que a divisão resulte em no mínimo 3 partes e no máximo 6 partes"_

1 ) Classe Cliente

2 ) Instacialização de clientes;

3 ) Ações funcionais do cliente: Login, Sacar, Realizar empréstimo, Depositar

4 ) Ações não funcionais do cliente, i.e, de caráter informacional: Consulta de nome, limite de saque e saldo


##(Regra 4) ##

_"Evite inventar nomes."_
Construtores começam com letra maiúscula
funções são minúsculas
palavras compostas são divididas por underline(_)

##(Regra 5)##
_"Simple solutions"_

Cada função faz apenas uma coisa, a inter-relação entre elas é fraca.


##(Regra 6) ##
Diário de Produção:

9/4 - Pensei em fazer uma aplicação simples de banco; 
Já sabia um pouquinho de Lua e sei um pouco de python então tive um bom começo
Fiz uma abstração básica de um banco, porém, tomei cuidados para que a aplicação
não ficasse sem propriedades inerentes ao um banco como segurança:
- para sacar, cliente precisa fazer login
- Não se pode alterar nome ou senha, só o adm tem esse direito.

12/4 - Ao receber novas orientações do professor resolvi gerar uma interface
		e gerar uma main. Assim eu posso estruturar melhor a aplicação, e ainda 
		tornar a aplicação mais amigável para o cliente da aplicação
		