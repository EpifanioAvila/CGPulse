/**
 * Created by Epi on 14/05/2017.
 */

function uiBotonesAccesoUsuario() {

    $(document).ready(function(){
        $('.dropdown-toggle').dropdown()
    });

    $("#btn-registrarse").on("click",onclick_cargarFormularioRegistro);
    $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);

}
function uiBotonesAccesoUsuarioIniciado() {
    console.log("hola3")
    let user = JSON.parse(sessionStorage.getItem("userIniciado"));
    $(document).ready(function(){
        $('.dropdown-toggle').dropdown()
    });
    $('#btn-cerrarSesion').on("click",function () {
        sessionStorage.removeItem("userIniciado");
        onload_main();
    });
    // let username =JSON.parse(sessionStorage.getItem("userIniciado"));
    // console.log()

    // $('#idbtn-username').on("click",onclick_portfolio);
    $('#idbtn-username').html(user.username) ;
    $('#avatarIniciado').css("background-image","url('"+user.userimg+"')");
    $("#btn-configuracionUser").on("click",onclick_cargaConfiguracionUsuario);
    // $("#btn-registrarse").on("click",onclick_cargarFormularioRegistro);
    // $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);

}
function uiBotonesCategoriasBuscador() {

    $("#logo").on("click",onclick_cargaIndex);
}
let url = "";
function uiCuerpoBase() {
    let data = {metodo:'cargarUsuario'};
    let result = "";

    // $.post(
    //     CONEXIONES,
    //     data,
    //     function(data) {
    //
    //         if (data.length) {
    //             let user = JSON.parse(data);
    //             // let banner = user;
    //
    //             // console.log(banner)
    //             // console.log(data);
    //             for(let i = 0 ; user.length>0; i++){
    //             imprimirUser(user[i]);
    //             }
    //             // result = encodeURI(data);
    //             // console.log(result[0])
    //         } else {
    //             console.log("No se han encontrado usuarios");
    //         }
    //     }
    // )
    // .done(function () {

        // $('body').css('cursor', 'initial');
    // });
}
function imprimirUser(user){
    let mostrar = false;
    // try{
    //     if(user.banner != null){
            let bannerimg= user.bannerimg.replace("\/","/");
            // console.log(bannerimg)
            // document.getElementById("galeriaprincipal").innerHTML += "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages back1 capaimggaleria' > </div>";

            document.getElementById("galeriaprincipal").innerHTML += "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages back1' style='background-image: url("+bannerimg+");'></div>";
        // }
    // }catch (event){
    //     document.getElementById("galeriaprincipal").innerHTML += "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages back1' ></div>";

    // }

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
    $('#imguser').on("change",uiPrevisualizar);
    $('#banner').on("change",uiPrevisualizar);



}

function uiCodificar(im,key){
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
                    banner = canvas.toDataURL("image/jpeg",0.5);
                    // console.log("Imrpimiendouserimg")

                    // console.log(canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("src",canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("width","100px")

                }
                if(key == "imguser"){
                    userimg = canvas.toDataURL("image/jpeg",0.1);
                    // console.log("Imrpimiendouserimg")
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


function uiPrevisualizar(event){


    $("#capaFlotanteBarraProgreso").css("display","block");

    $("#barraprogreso").css("width","10%");

    setTimeout(function(){


    },500);


    let input = event.target;
    let idinput = event.target.id;
    // console.log(idinput)
    let fr=new FileReader();
    if(input.files.length===0)return;
    fr.onload=function(evt){

        $("#barraprogreso").css("width","70%");

        setTimeout(function(){

            let im=evt.target.result;
            uiCodificar(im,idinput);

            $("#capaFlotanteBarraProgreso").css("display","none");
            console.log("codificando")
        },500);
    }
    fr.readAsDataURL(input.files[0]);

}
function uiFormularioLogin() {
    $("#btnIniciarSesion").on("click",onclick_iniciarSesion);
}
function uiConfiguracionUsuario() {
    
}