--[[
acoes.lua
MÛdulo de aÁıes/operaÁıes que o cliente pode executar
indicador de conte˙do: 67 linhas
Autor: Pedro Nascimento
Data: 12/04/2016
]]



 --[[
 fun√ß√£o: sacar
 Cliente: cliente que deseja sacar
 retirada: valor a ser retirado
 return: valor retirado
 pr√©-cond: cliente precisa fazer login
 pos-cond: Ao final da transa√ß√£o, saldo atual ser√° o saldo anterior menos o valor retirado
 ]]
 function sacar (cliente, retirada)
	if cliente.login ==true then
		if (cliente.saldo - retirada) > 0 and cliente.limite > retirada then
			old_saldo = cliente.saldo
			cliente.saldo = cliente.saldo - retirada
			print("Foi retirado "..retirada.." reais")
			if (cliente.saldo == old_saldo - retirada) then
				return retirada
			else print("pos-cond falsa")
			end
		end
	end
 end

--[[
cliente: cliente que ter√° valor depositado na conta
deposito: valor depositado
pr√©-cond: cliente estar logado
p√≥s-cond: saldo do cliente ser√° o saldo anterior mais o valor do dep√≥sito
]]
 function depositar (cliente, deposito)
	if cliente.login == true  then
		old_saldo = cliente.saldo
		cliente.saldo = cliente.saldo + deposito
		if cliente.saldo == old_saldo + deposito then
			print("Foi depositado "..deposito.." reais, no cliente "..cliente.nome)
			return 0
		else print("pos-cond falsa")
		end
	else print("cliente n„o est· logado")
	end
end

--[[
cliente: cliente que pegar√° emprestimo
valor: valor a ser emprestado
pr√©-cond: cliente logado
p√≥s-cond: saldo do cliente ser√° o saldo anterior mais o valor do empr√©stimo
]]
 function retirar_emprestimo (cliente, valor)
	if cliente.login ==true then
		old_saldo = cliente.saldo
		cliente.saldo = cliente.saldo + valor
		if cliente.saldo == old_saldo + valor then
			print("foi emprestado a sua conta "..valor.." reais")
			return 0
		else print("pos-cond falsa")
		end
	else print("cliente nao est· logado")
	end
 end

