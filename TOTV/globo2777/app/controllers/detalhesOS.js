//Pega OS
$.WidNR.show();
var os = $.args.os;
var div = $.args.div;
var ssaLib = require('SSAlib');
//ssaLib.textGetLocal(Ti.App.divisoes_solicita,$.lblLocalInfo,os.os_local_id);
var Cloud = require ('ti.cloud');
var cDateToString = require('dateParse').cDateToString;
$.WidFechar.init({
    text: "DETALHES DA O.S. " + os.os_id_globo,
    parent: $.winDet
});


$.lblNota.setVisible(false);
$.lblNotaInfo.setVisible(false);
$.lblComent.setVisible(false);
$.lblComentInfo.setVisible(false);

var local_desc;


Cloud.Photos.query({
            where: {
                os_id:os.os_id.toString()
            }
        }, function (e) {
            if (e.success) {
                if (e.photos.length == 0){
                    //Se não carregar nenhuma aproxima
                    $.scrollFotos.height = "4";
                }
                for (var i = 0; i < e.photos.length; i++) {
                    var photo = e.photos[i];
                    if (OS_IOS)
                        $.scrollFotos.add(Ti.UI.createImageView({
                            top:"4",
                            image:photo.urls.original,
                            left:"5",
                            height:"480",
                            width:"320"     
                        }));
                    else
                    {
                        var img = Ti.UI.createImageView({
                            transform: Ti.UI.create2DMatrix().rotate(90),
                            top:"4",
                            image:photo.urls.original,
                            left:"-60dp",
                            height:"320",
                            width:"480"
                                  
                        });
                        $.scrollFotos.add(img); 
                    
                    }
                }
                
                $.lblDetServInfo.text = os.os_desc;
                $.lblTpServInfo.text = os.os_tipo_id;
                $.lblServInfo.text = os.os_serv_id;
                $.lblLocalDescInfo.text = os.os_local_desc;
                if(typeof os.os_created_at != 'undefined')
                    $.lblDataInfo.text = cDateToString(os.os_created_at);
                
                if (os.pesq_nota != "")
                {
                    $.lblNota.setVisible(true);
                    $.lblNotaInfo.setVisible(true);
                    $.lblComent.setVisible(true);
                    $.lblComentInfo.setVisible(true);
                    $.lblNotaInfo.text = os.pesq_nota;
                    $.lblComentInfo.text = os.pesq_coment;
                } 
                setTimeout(function(){
                    var local, localObj ;
                    if('undefined'!= typeof os.os_local_full_desc)
                        local = os.os_local_full_desc;
                    else{
                      localObj = ssaLib.getLocalAndDiv(div,os.os_local_id);
                      local = localObj? localObj.loc_descri : false;
                    }
                    if (local){  
                            $.lblLocalInfo.text = local;   
                    }
                    $.WidNR.hide();
                },2200); //garante que o local vai ser atualizado a tempo (2.2 segundos)
            } else {
                custAlert("Não foi possível carregar as informações deste sistema");
                $.WidNR.hide();
            }
});

$.winDet.addEventListener('close',function(e){
    require('clearMemory').clear($.winDet);
});
