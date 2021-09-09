var searchIcon = Image.createFromFile("images/ic_search.png");
var searchIconView = searchIcon.getViewByHeight(25);
searchIconView.left = 20;
$.vwSearch.add(searchIconView);


$.init = function(searchCallback){
    $.fldSearch.addEventListener('change',function(){
        searchCallback($.fldSearch.getValue());
    });
};

