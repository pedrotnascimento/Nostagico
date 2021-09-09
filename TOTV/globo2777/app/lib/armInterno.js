/**
 * @author rafael.bellotti
 * @version 1.0
 */
/*Observações
 *
 * Para armazenamento:
 * Não armazena id e id_globo porque são parametros de retorno do SSA
 * imagePaths é um array de strings do filepath de cada foto (5 máximo)
 * os é objeto da OS
 * o id armazenado é só um index que é auto-incrementado, por isso não precisa ser especificado no insert
 *
 *Para envio:
 * Deleta os arquivos de foto após envio
 * Deleta o registro no sqlite após envio
 */

//Checa se o dispositivo tem acesso a internet
exports.checkOnline = function(){
  return Ti.Network.online;
};

//Armazena no SQLite OS
exports.storageOS = function (os,imagePaths){
    var db = Ti.Database.open("central2777");

    db.execute('INSERT INTO os(local_id,serv_id,tipo_id,desc,local_desc,div,codTipoSSA,codUsuario,loc_codigo,timestamp,local_full_desc,filePathOne,filePathTwo,filePathThree,filePathFour,filePathFive) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',  os.local_id,os.serv_id,os.tipo_id,os.desc,os.local_desc,os.div,os.codTipoSSA,os.codUsuario,os.loc_codigo,os.timestamp,os.local_full_desc,imagePaths[0],imagePaths[1],imagePaths[2],imagePaths[3],imagePaths[4]);
    db.close(); 

};

//Armazena no SQLite SS
exports.storageSS = function (ss,imagePaths){
    var db = Ti.Database.open("central2777");
    db.execute('INSERT INTO ss(local_id,serv_id,tipo_id,desc,local_desc,div,loc_codigo,codUsuario,local_full_desc,filePathOne,filePathTwo,filePathThree,filePathFour,filePathFive) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', ss.local_id,ss.serv_id,ss.tipo_id,ss.desc,ss.local_desc,ss.div,ss.loc_codigo,ss.codUsuario,ss.local_full_desc,imagePaths[0],imagePaths[1],imagePaths[2],imagePaths[3],imagePaths[4]);
    db.close();
};

//Envia solicitação
exports.send = function(user){
    if (Ti.Network.online){
        var db = Ti.Database.open("central2777");
        var ssalib = require('SSAlib');   
        //Query de OS
        var dbquery = db.execute('SELECT * FROM os');
        while (dbquery.isValidRow()){
            var os = {
              id: dbquery.fieldByName('id'),
              local_id:dbquery.fieldByName('local_id'),
              serv_id:dbquery.fieldByName('serv_id'),
              tipo_id:dbquery.fieldByName('tipo_id'),
              desc:dbquery.fieldByName('desc'),
              local_desc:dbquery.fieldByName('local_desc'),
              div:dbquery.fieldByName('div'),
              codTipoSSA:dbquery.fieldByName('codTipoSSA'),
              codUsuario:dbquery.fieldByName('codUsuario'),
              loc_codigo:dbquery.fieldByName('loc_codigo'),
              timestamp:dbquery.fieldByName('timestamp'), 
              local_full_desc:dbquery.fieldByName('local_full_desc'),                  
            };
            var photoArray = [];
            var photoMedia = [];
            var file = [];
            
            populateImageArray(dbquery,photoMedia,photoArray,file);
            
            dbquery.next();
            ssalib.sendOS(photoMedia,user,photoArray,os,file,function(id,file){
                var database = Ti.Database.open("central2777");
                database.execute('DELETE FROM os WHERE os.id=' + id);
                database.close();
                for (var counter = 0; counter < file.length; counter++)
                    file[counter].deleteFile(); 
                file = null;  
            });
        }
        
        //Deleta todas as OS armazenadas
        //db.execute('DELETE FROM os');
        
        //Query de SS
        dbquery = db.execute('SELECT * FROM ss');
        while (dbquery.isValidRow()){
            var ss = {
              id: dbquery.fieldByName('id'),
              local_id:dbquery.fieldByName('local_id'),
              serv_id:dbquery.fieldByName('serv_id'),
              tipo_id:dbquery.fieldByName('tipo_id'),
              desc:dbquery.fieldByName('desc'),
              local_desc:dbquery.fieldByName('local_desc'),
              div:dbquery.fieldByName('div'),
              codUsuario:dbquery.fieldByName('codUsuario'),
              loc_codigo:dbquery.fieldByName('loc_codigo'),
              local_full_desc:dbquery.fieldByName('local_full_desc'),                     
            };
            var photoArray = [];
            var photoMedia = [];
            var file = [];
            populateImageArray(dbquery,photoMedia,photoArray,file);
              
            dbquery.next();
            ssalib.sendSS(photoMedia,user,photoArray,ss,file,function(id,file){
                var database = Ti.Database.open("central2777");
                database.execute('DELETE FROM ss WHERE ss.id=' + id);
                database.close();   
                for (var counter = 0; counter < file.length; counter++)
                    file[counter].deleteFile();
                file = null;
            });
        }
        
        //Deleta todas as SS armazenadas
        //db.execute('DELETE FROM ss');
        
        db.close();
    }
};

function populateImageArray(dbquery,photoMedia,photoArray,fileArray){
    var file = [];
    var path = dbquery.fieldByName('filePathOne');
    if (path != '')
        file.push(Ti.Filesystem.getFile(path));
    
    path = dbquery.fieldByName('filePathTwo');
    if (path != '')
        file.push(Ti.Filesystem.getFile(path));
        
    path = dbquery.fieldByName('filePathThree');
    if (path != '')
        file.push(Ti.Filesystem.getFile(path));
        
    path = dbquery.fieldByName('filePathFour');
    if (path != '')
        file.push(Ti.Filesystem.getFile(path));
    
    path = dbquery.fieldByName('filePathFive');
    if (path != '')
        file.push(Ti.Filesystem.getFile(path));
    
    for (var counter = 0; counter < file.length; counter++){
        photoArray.push(file[counter].read());
        photoMedia.push(Ti.Utils.base64encode(file[counter].read()));
    }
    fileArray = file;
       
}

exports.initTables = function(){
     //Cria as tabelas no SQLite se elas não existem:
    //Caso a versão seja diferente da nova versão do armazenamento offline
    if (Ti.App.tableV != Ti.App.Properties.getString("tableVersion","no version")){
        var db = Ti.Database.open("central2777");
        db.execute('DROP TABLE IF EXISTS os');
        db.execute('DROP TABLE IF EXISTS ss');
        
        db.execute('CREATE TABLE IF NOT EXISTS os(id INTEGER PRIMARY KEY, local_id TEXT,serv_id TEXT, tipo_id TEXT, desc TEXT, local_desc TEXT, div INTEGER, codTipoSSA INTEGER, codUsuario INTEGER, loc_codigo INTEGER, timestamp TEXT, local_full_desc TEXT, filePathOne TEXT, filePathTwo TEXT, filePathThree TEXT, filePathFour TEXT, filePathFive TEXT );');
        db.execute('CREATE TABLE IF NOT EXISTS ss(id INTEGER PRIMARY KEY, local_id TEXT,serv_id TEXT, tipo_id TEXT, desc TEXT, local_desc TEXT, div INTEGER, loc_codigo INTEGER, codUsuario INTEGER,local_full_desc TEXT, filePathOne TEXT, filePathTwo TEXT, filePathThree TEXT, filePathFour TEXT, filePathFive TEXT );');
        db.close(); 
        Ti.App.Properties.setString("tableVersion",Ti.App.tableV);
    }
      
};

