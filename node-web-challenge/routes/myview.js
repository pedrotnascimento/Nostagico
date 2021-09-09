var express = require('express');
var router = express.Router();
var PASSO = 0;
//this must to be first, because the ordinateur goes finding the route, 
//it will find this route and execute, and 
//because the next function it will find the next route, and render myview
router.use(function displayTime(req,res,next){
    console.log("Time!! ", Date.now());
    next();
});
callback = function(req,res, next){
        // nada de fazer isso server side ent�o, s� na logica da pagina
        // res.send("loading...");
        // setTimeout(function(){

        //hmmm mmeio esquisito, TODO: ver se tem forma melhor
        if(req.originalUrl.indexOf("database")!= -1){
            next('route');
            return;
        }
        // repare que a resposta na verdade � passa no parametro req
        req.myresponse = "essa � a resposta";
        console.log("url chamada ", req.originalUrl);
        console.log("metodo", req.method);
        console.log("parametro passado", req.params.num);
        // console.log("parametro passado", req.params.nome);
        console.log(next());
}

callback2 = function(req,res,next){
        //que maneiro, este if faz passar para uma outra rota
        // oa inv�s de continuar no mesmo array
        if(req.params.num == 42)
            next('route');
        else
            next();
    }

// Fun��es de Middleware tem acesso ao:
// objeto de solicita��o (req),
// o objeto de resposta (res), e a 
// pr�xima fun��o de middleware no ciclo solicita��o-resposta ((next).
// Fun��es de middleware podem executar as seguintes tarefas:
// Executar qualquer c�digo.
// Fazer mudan�as nos objetos de solicita��o e resposta.
// Encerrar o ciclo de solicita��o-resposta.
// Chamar o pr�ximo middleware na pilha.
router.get('/:num', [   callback, 
                        callback2,
                function(req, res, next) {
                // repare que a resposta na verdade � passa no parametro req
                console.log("qual eh a resposta? " + req.myresponse );
                //N�O PODE - render, send, json s� podem ser chamados uma vez por request
                // Error: Can't set headers after they are sent.
                res.render('myview'); 
                
                return "olha isso, next n�o � tanto a pr�xima fun��o tanto que N�O retorna";
   
}]);


router.get("/:num", function(req,res, next){
    //hmmm mmeio esquisito, TODO: ver se tem forma melhor
    if(req.originalUrl.indexOf("database")==-1){
            next('route');
            return;
        }
    res.send("PRONTO AGORA ESTAMOS EM OUTRA ROOT")
});


//TODO: usar postgres em projetos 
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

router.get("/database", function(req,res,next){
    db.serialize(function() {

      db.run('CREATE TABLE lorem (info TEXT)');
      var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

      for (var i = 0; i < 10; i++) {
        stmt.run('Ipsum ' + i);
      }

      stmt.finalize();

      db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
        console.log(row.id + ': ' + row.info);
      });
    });

    db.close();
    
});



module.exports = router;
