(function () {
    angular.module('convem.pedidos')
    .factory('pedidosFactory', function ($http, sessionFactory, APIconfig) {
        var factory = {};
        var pedido = {}; // Objeto do Pedido
        pedido.preco_total = 0; // Inicializa como 0
        pedido.quantidade_total = 0; // Começa vazio
        pedido.items = {}; // Lista de Produtos

        factory.sendOrder = function () {
            
            var postJSON = {};
            postJSON.order = {};
            postJSON.order.location = {};
            postJSON.order.location.lat = sessionFactory.getUserLat();
            postJSON.order.location.long = sessionFactory.getUserLng();
            postJSON.order.location.zip_code = "21000000"; //sessionFactory.getUserZipcode() ? sessionFactory.getUserZipcode():"21000000";
            postJSON.order.location.address = sessionFactory.getUserStreet();
            postJSON.order.location.number = sessionFactory.getUserNumber()? sessionFactory.getUserNumber():404;
            postJSON.order.location.complement = sessionFactory.getUserComplement();
            postJSON.order.location.district = sessionFactory.getUserDistrict();
            postJSON.order.location.city = sessionFactory.getUserCity();
            postJSON.order.location.state = sessionFactory.getUserState();
            postJSON.order.products = [];
            for (var index in pedido.items){
                postJSON.order.products.push(pedido.items[index]);
            }
            console.log(JSON.stringify(postJSON));
            
            return $http.post(APIconfig.getPathOrder(),postJSON).then(function (response) {
                        return response.data;
                    });
        }

        factory.addProduct = function (product) {
            if (product.id) { //Tenta garantir que isso é um produto e não uma variável qualquer
                pedido.items[product.id] = product;
                pedido.items[product.id].checked = true; // Produto faz parte da REAL* Lista do pedido
                // Incrementa a quantidade total e o preço
                pedido.preco_total = pedido.preco_total + parseFloat(product.value);
                pedido.quantidade_total = pedido.quantidade_total + parseFloat(product.qty);
             //   alert(JSON.stringify(pedido));
                return 0; //OK
            }
            else {
                return null;
            }
        }

        factory.removeProduct = function (product) {
            if (product.id) { //Tenta garantir que isso é um produto e não uma variável qualquer
                delete pedido.items[product.id];
                pedido.preco_total = pedido.preco_total - (parseFloat(product.value) * parseFloat(product.qty));
                pedido.quantidade_total = pedido.quantidade_total - parseFloat(product.qty);
                
                product.qty = 0;
                return 0; //OK
            }
            else {
                return null;
            }

        }

        factory.getPedidoSize = function () {
            return pedido.quantidade_total;
        }

        factory.getProductQuantity = function (product) {
            if (product.id) {
                return pedido.items[product.id] ? pedido.items[product.id].qty : 0;
            }
        }

        factory.increaseProductQt = function (product) {
            //Atualiza a quantidade Total
            pedido.quantidade_total = parseInt(pedido.quantidade_total) + 1;
            pedido.items[product.id].checked = true; // Volta a fazer parte do Pedido
            //Atualiza o preço Total
            pedido.preco_total = pedido.preco_total + parseFloat(pedido.items[product.id].value);
        }

        factory.decreaseProductQt = function (product) {
            //Atualiza a quantidade Total
            pedido.quantidade_total = pedido.quantidade_total - 1;
            if (product.qty == 0){
                pedido.items[product.id].checked = false; // Não vai fazer parte do pedido REAL
            }
            //Atualiza o preço Total
            pedido.preco_total = pedido.preco_total - parseFloat(pedido.items[product.id].value);
        }

        factory.pedidoHasEmptyProduct = function () {
            var hasEmptyProduct = false;
            console.log(JSON.stringify(pedido.items));
            for (var index in pedido.items){
                if(!pedido.items[index].checked){
                    hasEmptyProduct = true;
                }
            }
            return hasEmptyProduct;
        }

        factory.selectProducts = function () {
            for (var index in pedido.items){
                if(!pedido.items[index].checked){
                    factory.removeProduct(pedido.items[index]);
                }
            }
        }

        factory.save = function (_pedido) {
            pedido = _pedido;
        }
        factory.load = function () {
            return pedido;
        }

        factory.clear = function () {
            for(var index in pedido.items) {
                factory.removeProduct(pedido.items[index]);
            }
        }

        return factory;
    })
})();