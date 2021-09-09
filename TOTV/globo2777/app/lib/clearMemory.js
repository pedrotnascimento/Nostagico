/**
 * @author rafael.bellotti
 */

exports.clear = function(window){
	var i =0;
    if (window.children) { 
       for ( i=0; i< window.children.length; i++) { 
           if (window.children[i] !== undefined) { 
               window.remove( window.children[i] ); 
               window.children[i] = null;
           } 
        } 
    }
   // alert(i);
    window = null; 
};
