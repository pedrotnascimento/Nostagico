--[[
main
Título: Sistema simples de bano
Autor:Pedro
Descrição:
Sistema simples de banco. O sistema tem as principais funções de um banco,
tais como: Saque, login, empréstimo, ver saldo, ver titular, ver limite de conta.

]]



require ("T1_PES")
require ("display")
require ("acoes")

function main ()
	
	repeat
	print("Bem vindo ao SysBank")
	print("Para entrar, digite o seu nome...")
	input_nome = io.read()
	print("...Agora digite a sua senha")
	input_senha = io.read()
	
	retorno = login(input_nome, input_senha)
	print (retorno)
	if  retorno == 0 then
		cliente = busca_cliente(input_nome)
		repeat
		print("Bem vindo " .. cliente.nome ..", o que deseja fazer?")
		print("1)Operacoes(deposito, emprestimo, saque")
		print("2)Display(nome, limte, saldo)")
		print("3)Sair")
		
		option = tonumber(io.read())
		if option == 1 then
			print(" Digite a acao que deseja realizar")
			print("  1)Deposito")
			print("  2)Emprestimo")
			print("  3)Saque")
			option = tonumber(io.read())
			
			if option == 1 then print("   Digite o quanto deseja depositar")
			deposito = tonumber(io.read()) depositar(cliente, deposito)
			elseif option == 2 then print("   Digite o quanto deseja pegar emprestado")
			emprestimo = tonumber(io.read()) retirar_emprestimo(cliente, emprestimo)
			elseif option == 3 then print("   Digite o quanto deseja sacar")
			saque = tonumber(io.read()) sacar(cliente, saque)
			else print("opcao invalida, tente novamente")
			end
			
		elseif  option == 2 then
			print(" Digite a informacao que deseja mostrar")
			print("  1)Mostrar limite") 
			print("  2)Mostrar saldo")
			option = tonumber(io.read())
			
			if option == 1 then get_limite(cliente)
			elseif option == 2 then get_saldo(cliente)
			else print("opcao invalida, tente novamente")
			end
		elseif option == 3 then print("Adeus, nos vemos novamente") return 
		else print("opcao invalida, tente novamente")
		end
		print("//////////////////////////////////////////////")
		until 1 ~= 1
	else 
		print("Nome ou senha errada, tente novamente")
	end
	print("//////////////////////////////////////////////")
	until retorno ~= 0

end

main()