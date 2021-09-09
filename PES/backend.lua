--[[
Backend
Modulo responsável pelas funções executadas pela abstração do servidor(Backend)
Autoria: Pedro Nascimento
Data: 09/04/2016
Versão: 1.0
Indicador de Conteúdo: 76 linhas,
]]



--[[
Construtor: Cliente
nome: nome do cliente, string
senha: senha do cliente, número
saldo: saldo do cliente, default = 0
limite: limite de saque/empréstimo do cliente

retorno: objeto cliente instanciado
]]
function Cliente ( nome, senha)
	 cliente = { 	nome=nome,
					saldo=0,
					limite=1024,
					senha= senha,
					login= false}
	 return cliente
 end

clientes = {}
clientes[1] = Cliente("pedro", 123)
clientes[2] = Cliente("thiago", 123)
clientes[3] = Cliente("Celia", 123)

 --[[
 função: login
 Clientes: base de clientes que contém o cliente com objetivo de fazer login
 nome: nome do cliente que deseja fazer login
 senha: senha do cliente
 ]]
 function login(nome, senha)
	--DBG-- print(nome .. senha )
	senha = tonumber(senha)
	for i, cliente in ipairs(clientes) do
		--DBG-- print(cliente.nome)
		if cliente.nome == nome and cliente.senha == senha then
			print ("login sucessfull")
			cliente.login = true
			return 0
		end
	end
end

function busca_cliente(nome)
	for i, cliente in ipairs(clientes) do
		if cliente.nome == nome then
			return cliente
		end
	end
end

