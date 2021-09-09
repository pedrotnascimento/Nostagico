var geofence = require('geofence');

var args = $.args || {};


$.vwSettings.setVisible(false);


require('armInterno').initTables();

// Create our node items
user = $.args.user;

var divisoes = args.divisoes;
console.log(divisoes.length);
var Cloud = require ('ti.cloud');
var localArray = [];
Cloud.Objects.query({
                classname: 'local',
                limit: 999,
                //order:"desc,created_at"   //por algum motivo nao consegue organizar por desc
            }, function (e) {
                if (e.success) {
                    for (var i = 0; i < e.local.length; i++) 
                        localArray.push( e.local[i]);
                    if (localArray.length > 0)
                        localArray.sort(function(a, b){
                             var nameA=a.desc.toUpperCase(), nameB=b.desc.toUpperCase();
                             if (nameA < nameB) //sort string ascending
                              return -1;
                             if (nameA > nameB)
                              return 1;
                             return 0; //default return value (no sorting)
                        });    
                } else {
                    //TROCAR MENSAGEM DE ERRO
                    custAlert("Árvore de locais indisponível no momento.", 'ERRO');
                     /*alert('Error:\n' +
                ((e.error && e.message) || JSON.stringify(e)));*/
                }
});




function logout(){
    var Cloud = require ('ti.cloud');
    Cloud.Users.logout(function (e) {
    });
    $.winPrincipal.close();
}


//$.itemSair.addEventListener('click', logout);


function openSettings(){
	
	if($.vwSettings.visible == false){
		$.vwSettings.setVisible(true);
	} else {
		$.vwSettings.setVisible(false);
	}
/*	$.vwSettings.animate({
		zIndex:"999", 
	 	anchorPoint: {x:1, y:1},
        top: 0,
        duration: 1000
});*/
}
//Popup de ajuda///

var winAjuda = Ti.UI.createWindow({
	width:"100%",
	height:"90%",
	top:"10%",
	backgroundColor:"white",
	theme:"Theme.Light"
});

var scrollAjuda = Ti.UI.createScrollView({
	width:Ti.UI.FILL,
	height:Ti.UI.FILL,
	top:"40dp",
	layout:"vertical"
});

var vwBlack = Ti.UI.createView({
	opacity: 0.5,
	width:Ti.UI.FILL,
	height:Ti.UI.FILL,
	zIndex: 999,
	backgroundColor:"black",
});

var lblTitleAjuda = Ti.UI.createLabel({
	text:"AJUDA",
	top:"5dp",
	font:{fontWeight:'bold', fontSize:'18'},
	color:"black"
});

var lblCloseAjuda = Ti.UI.createLabel({
	text:"X",
	top:"5dp",
	right:"10dp",
	font:{fontWeight:'bold', fontSize:'20'},
	color:"black"
});

var lblAjuda = Ti.UI.createLabel({
	color:"black",
	text:" LOGIN\n\n\u2022O login deverá ser realizado com o seu e-mail.\n\n\u2022Caso já esteja cadastrado no SSA, digitar a mesma senha.\n\n\u2022 Esqueceu sua senha, clique em \"ESQUECI MINHA SENHA\".\n\n\u2022 Caso não esteja cadastrado no SSA, realizar o cadastro, informar seus dados e criar sua senha.\n\n\u2022 VISITANTE não necessita de senha.\n\n LOCALIZAÇÃO E GPS \n\n\u2022 Por questões de segurança, para acessar o aplicativo o GPS deverá estar ligado, pois para fazer login ou entrar como visitante, o Central 2777 verificará a sua localização.\n\n\u2022 Para verificar você mesmo a sua localização no mapa, o GPS deverá permanecer ligado."+
	"\n\n\u2022 Caso você esteja dentro de algum local (ex: edifício), o GPS poderá funcionar de forma imprecisa, informando a sua localização fora das dependências da Globo, e não permitir o acesso ao Central 2777. Neste caso o Login deverá ser realizado perto de uma janela ou ao ar livre."+
	"\n\n FAVORITOS\n\n\u2022 Utilize na tela principal do sistema os atalhos para \"ADICIONAR SERVIÇOS FAVORITOS\". Este atalho facilitará o acesso aos principais serviços utilizados com apenas um clique. Caso queira apagar o atalho, pressione o botão do serviço que deseja excluir por 2 segundos e clique em \"Excluir Favorito\". " +
	"\n\n SERVIÇOS\n\n\u2022 Abra a sua solicitação com poucos cliques.\n\n\u2022 Informe o Tipo de Solicitação do Serviço.\n\n\u2022 Escaneie o QR Code para informar uma localização mais precisa. \n\n\u2022 Caso não encontre o QR Code no local, clique no link imediatamente abaixo do QR Code. Informe mais detalhes do local caso necessário. \n\u2022" +
	"\n\u2022 Insira até 5 fotos para evidenciar a necessidade do serviço.\n\n\u2022 Descreva a sua solicitação com detalhes no campo \"Informação Adicional\". " +
	"\n\n MENU\n\n\u2022 Localize-se nos Estúdios Globo acessando o MAPA.\n\n\u2022 No próprio MAPA, visualize, pesquise ou filtre o que você precisa localizar nos Estúdios Globo.\n\n\u2022" +
	" Em Restaurantes, seus horários de atendimento, cardápios e e ligue com apenas um clique se necessário."+
	"\n\n\u2022 Acesse os serviços de Patrimônio e Serviços."+
	"\n\n\u2022 Veja suas OS abertas pelo \"MENU/MINHAS SOLICITAÇÕES\". Solicitações de Manutenção aparecerão somente quando a OS for aberta."+
	"\n\n PESQUISA DE SATISFAÇÃO\n\n\u2022 Clicar na OS com status \"ENCERRADA\", em \"MINHAS SOLICITAÇÕES\"." +
	"\n\n\u2022 Para todas as OS com status \"ENCERRADA\" o usuário deverá fazer uma pesquisa de satisfação para concluí-la." 
});
winAjuda.add(lblTitleAjuda);
winAjuda.add(lblCloseAjuda); 
scrollAjuda.add(lblAjuda);
$.winPrincipal.add(vwBlack);
vwBlack.setVisible(false);

winAjuda.add(scrollAjuda);
lblCloseAjuda.addEventListener('click', function(){
	//$.winPrincipal.setAccessibilityHidden(true);
	winAjuda.close();
	vwBlack.setVisible(false);
});

//Popup de ajuda///

$.imgSair.addEventListener('click',openSettings);

$.lstSettings.addEventListener('itemclick', function(e){
	
	
	if (e.itemIndex == 2){
		logout();
	} else if(e.itemIndex == 1){
		$.vwSettings.setVisible(false);
		custAlert("Versão 1.0\n\nDesenvolvido por:\nTOTVS CONSULTING");
	} else if(e.itemIndex == 0){
		$.vwSettings.setVisible(false);
		vwBlack.setVisible(true);
		//custAlert("","AJUDA");
		
		winAjuda.open();
	}
});


if (OS_ANDROID)
	$.winPrincipal.addEventListener('androidback', function(e){
		//disable back button
	});

$.winPrincipal.addEventListener('click', function(e){
	if(e.source != $.imgSair)
	$.vwSettings.setVisible(false);
});

$.winPrincipal.addEventListener('swipe', function(e){
	
	$.vwSettings.setVisible(false);
});
 
var nodes = [
    
 //   { id: 1, title: "MAPA ESTÚDIOS GLOBO" },
 //   { id: 2, title: "ALIMENTAÇÃO"},
    { id: 6, title: "BEBEDOURO INDUSTRIAL"},
    { id: 3, title: "CONTROLE DE PRAGAS INTERNO"},
    { id: 8, title: "GUARDA CHUVA"},
    { id: 11, title: "LIMPEZA DE ÁREA VERDE"},
    { id: 12, title: "LIMPEZA INTERNA"},
    { id: 13, title: "MANUTENÇÃO"},
    { id: 9, title: "MÁQUINA DE CAFÉ"},
    { id: 10, title: "NESPRESSO"},
    { id: 7, title: "PURIFICADOR DE ÁGUA"},
    { id: 4, title: "REPROGRAFIA"},
    { id: 5, title: "SNACK/BEBIDA GELADA"},
       
];

/////////////////////////Abrir formulário//////////////////////////////////

function openScreen(formId){

	if (formId == 1){
		Alloy.createController('mapa',{pesquisa:""}).getView().open();
	}
	
	else if (formId == 2){
		openRest = Alloy.createController('restaurantes').getView().open();

	}
	
	else{
	    var tipo;
		switch(formId){
			case 3:
				tipo = "ctrlPragas";
			break;
			
			case 4:
				tipo = "repro";
			break;
			
			case 5:
				tipo = "snack";
			break;
			
			case 6:
				tipo = "bebedouro";
			break;
			
			case 7:
				tipo = "purificador";
			break;
			
			case 8:
				tipo = "guardaChuva";
			break;
			
			case 9:
				tipo = "maqCafe";
			break;
			
			case 10:
				tipo = "nespresso";
			break;
			
			case 11:
				tipo = "limpVerde";
			break;
			
			case 12:
				tipo = "limpInt";
			break;
			
			case 13:
				tipo = "manut";
			break;
			
		}
		
		    var ctrlForm = Alloy.createController('form',   {tipo: tipo, 
                                                        tipoId: formId, 
                                                        localArray:localArray,
                                                        user: user,
                                                        divisoes: divisoes
                                                    }).getView();
        
           ctrlForm.open();
		    
	}

}

////////////////////////////////////////////////////////////////////////

// Inicializa o Slide Menu
$.SlideMenu.init({
    nodes: nodes,
    divisoes: divisoes
});

// Set the first node as active
$.SlideMenu.setIndex(0);

// Add an event listener on the nodes

  $.SlideMenu.Nodes.addEventListener("click", handleMenuClick);

	
// Handle the click event on a node
function handleMenuClick(_event) {
    if(typeof _event.row.id !== "undefined") {
        // Open the corresponding controller
        if (Ti.App.user_role == "admin")
            openScreen(_event.row.id);
        else if (geofence.checkLocal()){
          openScreen(_event.row.id);
        }
    }
}

$.vwMenuBtn.addEventListener('click', openMenu);


var aberto = 0;
function openMenu() {
	
	if (aberto == 0){
    	$.AppWrapper.animate({
    	
        	left: "250dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});

    	$.SlideMenu.Wrapper.animate({
        	left: "0dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
    	aberto = 1;
 } else {
 	 $.AppWrapper.animate({
        left: "0dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });

    $.SlideMenu.Wrapper.animate({
        left: "-250dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
    aberto = 0;
 }
}

function closeMenu() {
    $.AppWrapper.animate({
        left: "0dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });

    $.SlideMenu.Wrapper.animate({
        left: "-250dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
}

$.AppWrapper.addEventListener("swipe", function(_event) {
    if(_event.direction == "right") {
        openMenu();
    } else if(_event.direction == "left") {
        closeMenu();
    }
});

///////////////////////////////////////////////////////////

resetServiceSelection();
var placeholder = "/images/plus-sign-icon.png";

var services = [
            {
                title: "bebedouro",
                text: "BEBEDOURO INDUSTRIAL",
                image: "/servicos/bebedouro.png"
        },
        {       
                title: "ctrlPragas",
                text: "CONTROLE DE PRAGAS",
                image: "/servicos/ctrlPragas.png"
        },
        {
                title: "guardaChuva",
                text:"GUARDA CHUVA",
                image:"/servicos/guardaChuva.png"
        },
        {
                title:"limpVerde",
                text:"LIMPEZA ÁREA VERDE",
                image:"/servicos/limpVerde.png"
        },
        {
                title: "limpInt",
                text: "LIMPEZA INTERNA",
                image: "/servicos/limpInterna.png"
        },
        {
                title: "manut",
                text: "MANUTENÇÃO",
                image: "/servicos/manut.png"
        },
        {
                title: "mapa",
                text: "MAPA ESTÚDIOS GLOBO",
                image:"/servicos/mapa.png"
        },
        {
                title: "maqCafe",
                text: "MÁQUINA DE CAFÉ",
                image:"/servicos/maqCafe.png"
        },
        {
                title: "nespresso",
                text: "NESPRESSO",
                image:"/servicos/nespresso.png"
        },
        {
                title: "purificador",
                text: "PURIFICADOR DE ÁGUA",
                image:"/servicos/purificador.png"
        },
        {       
                title: "repro",
                text: "REPROGRAFIA",
                image: "/servicos/repro.png"
        },
        {
                title: "restaurantes",
                text: "RESTAURANTES",
                image:"/servicos/restaurantes.png"
        },
        {
                title: "snack",
                text:   "SNACK/BEBIDA GELADA",
                image: "/servicos/snacks.png"
        }
];


//IMPORTANTE: DEIXAR O ÚLTIMO ELEMENTO COMO EMPTY(USADO NA LÓGICA PARA DELETAR FAVORITO)
services.push({
    title: "empty",
    text: "empty",
    image:placeholder
    });

//adding displayed property
for(var i =0 ; i< services.length; i++)
    services[i].displayed = false;

var myServices = [];
//getObject carrega in-localStorage os serviços do usuário, se for null o serviço fica em branco
if((myServices=Ti.App.Properties.getObject("myServices"))==null){
    myServices = [];
    services[6].displayed = true;
    services[11].displayed = true;
    services[5].displayed = true;
    services[4].displayed = true;
    myServices.push(services[6]);
    myServices.push(services[11]);
    myServices.push(services[5]);
    myServices.push(services[4]);
    for ( var  i =0 ; i< 4; i++)
        myServices.push({title:'empty', image:placeholder, displayed: false});
}

    for(var i =0 ; i< myServices.length; i++)//sincronizando objeto entre myServices e services
        if(myServices[i].displayed)
            for(var j =0 ; j < services.length -1; j++)
                if( services[j].title == myServices[i].title){
                    services[j] = myServices[i];
                    break;
                }
        
var servico_especial = ['mapa', 'restaurantes'];

var items = [];
//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
 
var actionFavourite = function(e){
    var title = e.source.data.title;
    
    if(title=="empty"){
		//adicionar servico favorito
        addFavourite(e);
        return ;
	}

	if (Ti.App.user_role == "admin"){
	    for(var i = 0 ; i < servico_especial.length; i++)
            if(title==servico_especial[i]){
                Alloy.createController(title).getView().open();
                return ;  
            }
            
            var ctrlForm = Alloy.createController('form', {   
                                                user: user,
                                                tipo: title, 
                                                localArray:localArray,
                                                divisoes: divisoes
                                                }).getView();
        
           ctrlForm.open();
	}
    
    else if (geofence.checkLocal()){
            
            for(var i = 0 ; i < servico_especial.length; i++)
                if(title==servico_especial[i]){
                    Alloy.createController(title).getView().open();
                    return ;  
                }
                
            var ctrlForm = Alloy.createController('form',{
                                            user: user,
                                            tipo: title, 
                                            localArray:localArray,
                                            divisoes: divisoes
                                            }).getView();
        
           ctrlForm.open();
        }
        
};

function addFavourite(e){
    Ti.App.positionGrid = e.source.data.id;
    Ti.App.Properties.title = e.source.data.title;
    Alloy.createController('favourite',{
        services:services
    }).getView().open();
    return;
}; 
  
Ti.App.addFavouriteCallback = function (index){
    var id = Ti.App.positionGrid;
    resetServiceSelection();
    
    services[index].displayed = true;
    myServices[id].displayed = false;
  
    myServices[id] = services[index]; 
    
    //adicionar data
    Ti.App.Properties.setObject("myServices", myServices);
    $.fg.clearGrid();
	createSampleData(); 
    return;
}; 

 
function resetServiceSelection(){
    Ti.App.positionGrid = null; // interface entre controllers ao selecionar serviço favorito
}

var init_default = {
	columns:2,
	space:0,
	gridBackgroundColor:'#fff',
	itemHeightDelta: 0,
	itemBackgroundColor:[
        "#852b7b",
        "#912777",
        "#9f2172",
        "#b01d6d",
        "#c01d67",
        "#ce1d61",
        "#d91d5b",
        "#e02954",
        "#e53c4c"
    ], 
	itemBorderColor:"",
	itemBorderWidth:0,
	itemBorderRadius:0,
	onItemClick: actionFavourite,
    onItemLongClick: addFavourite
};

//INITIALIZE TIFLEXIGRID
$.fg.init(init_default);
//CUSTOM FUNCTION TO CREATE THE ITEMS FOR THE GRID
function createSampleData(){
	items = [];

	for (var x=0;x<myServices.length;x++){

		//CREATES A VIEW WITH OUR CUSTOM LAYOUT
		var view = Alloy.createController('item_gallery',{
			image:myServices[x].image,
			width:$.fg.getItemWidth(),
			height:$.fg.getItemHeight()
		}).getView();

		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {
			title: myServices[x].title,
			image: myServices[x].image,
            id: x
		};
		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		items.push({
			view: view,
			data: values
		});
	};

	//ADD ALL THE ITEMS TO THE GRID
	$.fg.addGridItems(items);

};
createSampleData();


$.winPrincipal.addEventListener('close',function(e){
    require('clearMemory').clear($.winPrincipal);
    require('clearMemory').clear(winAjuda);
});


setInterval(function(){  
    require('armInterno').send(user);
}, 30000);

