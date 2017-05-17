/**
 * Created by Epi on 14/05/2017.
 */

function uiBotonesAccesoUsuario() {

    $("#btn-registrarse").on("click",onclick_cargarFormularioRegistro);
    $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);

}
function uiBotonesCategoriasBuscador() {

    $("#logo").on("click",onclick_cargaIndex);
}
function uiCuerpoBase() {

}

var banner;
var userimg;

function uiFormularioRegistro() {

    $("#btn-registro").on("click",onclick_registrarUSuario);
    $('#imguser').on("change",previsualizar);
    $('#banner').on("change",previsualizar);

// $("#btn-registro").on("click",function () {
    //
    //     document.getElementById("formularioRegistro").submit();
    // });



    $(":file").filestyle({buttonName: "btn-primary"});

    // let boton = document.getElementById("btn-registro");
    // boton.onclick = function () {
    //     console.log("gunca")
    // }
}

function codificar(im,key){
    let i=new Image();
    i.onload=function(){
        let w=this.width,
            h=this.height,
            canvas=document.createElement('canvas'),
        ctx=canvas.getContext('2d');
        canvas.width=w;
        canvas.height=h;
        ctx.drawImage(i,0,0,w,h);
        // console.log(canvas.toDataURL().split('base64,')[1]);
        // let campo = {name:canvas.toDataURL().split('base64,')[1]}
        if(key == "banner"){
            banner =canvas.toDataURL().split('base64,')[1];
        }
        if(key == "userimg"){
            userimg = canvas.toDataURL().split('base64,')[1];
        }
        console.log("codificando")

    }
    i.src=im;
}
function previsualizar(event){
    let input = event.target;
    let idinput = event.target.id;
    console.log(idinput)
    let fr=new FileReader();
    if(input.files.length===0)return;
    fr.onload=function(evt){
        let im=evt.target.result;
        codificar(im,idinput);
    }
    fr.readAsDataURL(input.files[0]);
}
function uiFormularioLogin() {

    $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);
}