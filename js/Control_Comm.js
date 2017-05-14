/**
 * Created by Epi on 14/05/2017.
 */
function cargarLayout(div,url,cblay){
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            div.innerHTML = this.responseText;
            cblay(url);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function limpiarLayout(div){
    div.innerHTML="";
}