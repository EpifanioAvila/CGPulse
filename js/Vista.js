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
let url = "";
function uiCuerpoBase() {
    let data = {metodo:'cargarUsuario'};
    let result = "";
    $.post(
        CONEXIONES,
        data,
        function(data){
            if(data.length){
                // let aux = encodeURI(data);
                result = data.split("z");
                // console.log("<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages  ' > <img src='"+data+"' alt=''> <div>");
                    imprimir(result[3]);
                // result = encodeURI(data);
                // console.log(result[0])
            }else{
                console.log("No se han encontrado usuarios");
                // alert("El usuario no se ha podido registrar");

            }
        }
    );

        // document.getElementById("galeriaprincipal").innerHTML = "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages  ' > <img src='"+decodeURI(result)+"' alt=''> <div>";

}
function imprimir(data){
    console.log(data)
    document.getElementById("galeriaprincipal").innerHTML = "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages  ' > <img src='"+data[0]+"' alt=''> <div>";
}

var banner;
var userimg;

function uiFormularioRegistro() {

    $("#imguser").filestyle();
    $("#banner").filestyle();
    $("#btn-registro").on("click",onclick_registrarUSuario);
    $('#imguser').on("change",previsualizar);
    $('#banner').on("change",previsualizar);


}

function codificar(im,key){
    let i=new Image();

    $("#barraprogreso").css("display","block");
    $("#barraprogreso").css("width","80%!important");

    setTimeout(function(){

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
                    // banner = canvas.toDataURL().split('base64,')[1];
                    banner = canvas.toDataURL();

                    document.getElementById("imgprueba").setAttribute("src",canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("width","100px")

                }
                if(key == "imguser"){
                    userimg = canvas.toDataURL();
                    document.getElementById("imgprueba2").setAttribute("src",canvas.toDataURL())
                    document.getElementById("imgprueba2").setAttribute("width","100px")
                }



                setTimeout(function(){
                    $("#barraprogreso").css("width","100%");
                },500);
            }

            i.src=im;
    },500);

}


function previsualizar(event){


    $("#capaFlotanteBarraProgreso").css("display","block");

    $("#barraprogreso").css("width","10%");

    setTimeout(function(){


    },500);


    let input = event.target;
    let idinput = event.target.id;
    console.log(idinput)
    let fr=new FileReader();
    if(input.files.length===0)return;
    fr.onload=function(evt){

        $("#barraprogreso").css("width","70%");

        setTimeout(function(){

            let im=evt.target.result;
            codificar(im,idinput);

            $("#capaFlotanteBarraProgreso").css("display","none");
            console.log("codificando")
        },500);
    }
    fr.readAsDataURL(input.files[0]);

}
function uiFormularioLogin() {

    $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);
}