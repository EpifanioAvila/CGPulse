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
    // console.log("cambiando información");
    let user = JSON.parse(sessionStorage.getItem("userIniciado"));
    $(document).ready(function(){
        $('.dropdown-toggle').dropdown()
    });
    $('#btn-cerrarSesion').on("click",function () {
        sessionStorage.removeItem("userIniciado");
        onload_main();
    });
    $('#uploadproyect').on("click",onclick_cargarNuevoProyecto);
    $('#idbtn-username').html(user.username) ;
    $('#idbtn-username').on("click",onclick_cargarPortfolioPropietario) ;
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
    });
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

                if(key == "Image"){
                    imageproyect = canvas.toDataURL("image/jpeg",0.1);
                    // console.log("Imrpimiendouserimg")
                    // console.log(userimg)
                    document.getElementById("imgprueba").setAttribute("src",canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("width","100px")
                }
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
                    console.log("Imrpimiendouserimg")
                    console.log(userimg)
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
    $("#formRegistro").submit(function (event) {
        event.preventDefault();
        onclick_modificarUsuario();
    });
    $("#imguser").filestyle();
    $("#banner").filestyle();
    $("#banner").on("change",uiPrevisualizar);
    $("#imguser").on("change",uiPrevisualizar);
    // $("#btn-configuradorUsuario").on("click",onclick_modificarUsuario);
    if(sessionStorage.getItem("userIniciado")){
    let user = JSON.parse(sessionStorage.getItem("userIniciado"));
    let dato1   = $("#username").val(user.username);
    let dato4   = $("#name").val(user.name);
    let dato5   = $("#surname").val(user.surname);
    let dato6   = $("#email").val(user.email);
    let dato7   = $("#city").val(user.city);
    let dato8   = $("#country").val(user.country);
    let dato9   = $("#imgprueba").attr("src",user.bannerimg.replace("\/","/"));
    let dato10   = $("#imgprueba2").attr("src",user.userimg.replace("\/","/"));
    banner = user.bannerimg;
    userimg = user.userimg;
    }

}
function uiPortfolioBase() {
    if(sessionStorage.getItem("userIniciado")){
        let user = JSON.parse(sessionStorage.getItem("userIniciado"));
        document.getElementById('banner').style.backgroundImage = "url("+user.bannerimg+")";
        document.getElementById('avatarUsuario').style.backgroundImage = "url("+user.userimg+")";
        console.log()
        // $('#').val();
        $('#nombreYApellidos').html(user.name+" "+user.surname);
        $('#categoria').html();
        $('#cityCountry').html(user.city+" , "+user.country);
        $('#likes-info').html(user.likes);
        $('#views-info').html(user.views);

        datos = {metodo:"cargarGaleriaUsuario",iduser:user.iduser};
        $.post(
            CONEXIONES,
            datos,
            function (data) {
                // console.log(data)
                let cuerpoBase = document.getElementById("portfolioGallery");
                cuerpoBase.innerHTML = "";
                // console.log("gh")
                let galeria = JSON.parse(data);
                for(let i = 0; i < galeria.length; i++){
                    let imagen = galeria[i].image.replace("\/","/");
                    cuerpoBase.innerHTML+=
                        "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin degradado' style='background-image:url("+imagen+")!important' id='"+galeria[i].idimage+"' onclick='onclick_cargarProyecto(event)' >" +
                        "</div>";
                    // console.log(document.getElementById(galeria[i].idimage));
                    // $('#'+galeria[i].idimage).on("click",function () {
                    //     onclick_cargarProyecto();
                    // })
                }
                // $('#portfolioGallery').html("<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-imgages back1 ' background-image='url(`"+galeria[0].image+"´)'></div>");
                // console.log(galeria[1].image);
            }
        )
    }
}
function uiFormularioNuevoTrabajo(){

    $("#formRegistro").submit(function (event) {
        event.preventDefault();
        onclick_subirProyecto();
    });
    // alert("cargando formulario nuevo trabajo");
    $('#Image').on('change',uiPrevisualizar);

}
function uiProyectoBase(){
    let proyecto = JSON.parse(sessionStorage.getItem("infoproyecto"));
    $("#idViews").html("");
    $("#idViews").html(proyecto.views);

    $("#idLikes").html("");
    $("#idLikes").html(proyecto.likes);

    $("#idImagenProyecto").attr('src', '' );
    $("#idImagenProyecto").attr('src',  proyecto.image.replace("\/","/") );

    $("#idTituloProyecto").html("");
    $("#idTituloProyecto").html(proyecto.title);

    $("#idDescripcionProyecto").html("");
    $("#idDescripcionProyecto").html(proyecto.description);

    $("#idCategoryUser").html("");
    $("#idCategoryUser").html(proyecto.category);

}