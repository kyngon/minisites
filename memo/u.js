var cards = '';
var cmat;

function getCards(cardname){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', cardname+'.txt', false);
    request.send(null);
    var type = request.getResponseHeader('Content-Type');
    if ( type.indexOf("text") !== 1) {
        return request.responseText;
    }
} 

function setSelection(name){
    var sel = document.getElementById('dictSelect');
    var opts = sel.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (opt.value == name) {
            sel.selectedIndex = j;
            break;
        }
    }
}
function loadDict(){
    cmat = getCards(cards);
    cmat = cmat.split('\n');
    _max=cmat.length;
    document.getElementById("pgnum").max=_max;
    _itm=0;
}
function init(){
    var item = window.location.toString();
    if (item.indexOf('?')!==-1){
        cards=item.substring(item.indexOf('?')+1).split('+');
        cards=cards[0];
    }else{
        cards='chinese';
    }
    setSelection(cards);
    loadDict();
  
    if(item.indexOf('item=')!==-1){
        try { 
            item = item.substring(item.indexOf('item=')+5);
            _itm=Number(item);
            } catch (e) {
                _itm=0;
            }
    }else{
        _itm=0;
    }
    load();
}

function load() {    
    var _text=cmat[_itm].split('\\');
    document.getElementById("char_1_cnt").innerHTML=_text[0];
    document.getElementById("spoiler").innerHTML=_text[1]+"<br/>"+_text[2];
    var txthtml='<a href="?'+cards+'+item='+_itm+'">Permalink</a>';
    document.getElementById("char_1_txt").innerHTML = txthtml;
    document.getElementById("pgnum").value=_itm;
    if(_itm===_max){
        document.getElementById("b_prev").disabled=false;
        document.getElementById("b_next").disabled=true;
    }
    else if(_itm===0){
        document.getElementById("b_prev").disabled=true;
        document.getElementById("b_next").disabled=false;
    }
    else{
        document.getElementById("b_prev").disabled=false;
        document.getElementById("b_next").disabled=false;
    }
  }
  function prev() {
    if(_itm>0){_itm--}
    load()
    }
  function next() {
    if(_itm<_max){_itm++}
    load()
  }
  function randchar() {
    _itm=Math.floor(Math.random()*(_max+1));
    load()
  }
  function gopg() {
    var _pgnum = document.getElementById("pgnum").value;  
    if(_pgnum>_max){_itm=_max}
    else if (_pgnum<0){_itm=0}
    else{_itm=Number(_pgnum)}
    load()
  }
  


function uhide(){
    if(document.getElementById('spoiler') .style.display=='none') 
    {
        document.getElementById('spoiler') .style.display=''
    }
    else
    {
        document.getElementById('spoiler') .style.display='none'
    }
}
function changeDict(){
    var x = document.getElementById("dictSelect").value;
    cards = x;
    loadDict();
    load();
}

