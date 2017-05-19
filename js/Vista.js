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
                let user  =JSON.parse(data);
                // console.log(data);
                imprimirUser(user[0]);
                // result = encodeURI(data);
                // console.log(result[0])
            }else{
                console.log("No se han encontrado usuarios");
            }
        }
    );
}
function imprimirUser(user){

    let bannerimg= user.bannerimg.replace("\/","/");
    let userimg = user.userimg.replace("\/","/");
    console.log(bannerimg)
    // document.getElementById("galeriaprincipal").innerHTML = "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages  ' > <img src='data:image/png;base64,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' alt=''> <div>";
    document.getElementById("galeriaprincipal").innerHTML = "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages back1' > <img src='"+bannerimg+"'/></div>";
}

var banner;
var userimg;

function uiFormularioRegistro() {
    $("#formRegistro").submit(function (event) {
        event.preventDefault();
        onclick_registrarUSuario();
    })
    $("#imguser").filestyle();
    $("#banner").filestyle();
    // $("#btn-registro").on("click",onclick_registrarUSuario);
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
                    banner = canvas.toDataURL("image/jpeg",0.1);
                    // console.log("Imrpimiendouserimg")

                    console.log(canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("src",canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("width","100px")

                }
                if(key == "imguser"){
                    userimg = canvas.toDataURL("image/jpeg",0.1);
                    console.log("Imrpimiendouserimg")
                    // console.log(userimg)
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