--[[
Display.lua
Modulo de informações do cliente tais como saldo, limite e nome
indicador de conteúdo: 67 linhas
Autor: Pedro Nascimento
Data: 12/04/2016
]]

--Se cliente logado, retorna saldo do cliente
 function get_saldo (cliente)
	if cliente.login == true then
		print("Seu saldo eh de "..cliente.saldo)
		return cliente.saldo
	end
 end

 --Se cliente logado, retorna limite de saque/emprÃ©stimo
 function get_limite (cliente)
	if cliente.login == true then
		print("Seu limite eh de " .. cliente.limite)
		return cliente.limite
	end
 end

 --Se cliente logado, retorna nome do cliente
 function get_nome (cliente)
	if cliente.login == true then
		print("Seu nome eh " .. cliente.nome)
		return cliente.nome
	end
 end
