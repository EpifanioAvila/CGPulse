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
    $('#idbtn-username').val(user.iduser) ;
    $('#idbtn-username').on("click",function () {
        onclick_cargarPortfolio(user.iduser);
    }) ;
    $('#avatarIniciado').css("background-image","url('"+user.userimg+"')");
    $("#btn-configuracionUser").on("click",onclick_cargaConfiguracionUsuario);
    // $("#btn-registrarse").on("click",onclick_cargarFormularioRegistro);
    // $("#btn-iniciarsesion").on("click",onclick_cargarFormularioInicioSesion);

}
function uiBotonesCategoriasBuscador() {

    $("#logo").on("click",onclick_cargaIndex);
}
let url = "";
function uiGaleriaPrincipal() {
    let data = {metodo:'cargarGaleriaMasPopulares'};

    $.post(
        CONEXIONES,
        data,
        function(data) {

            if (data.length) {
                let cuerpoBase = document.getElementById("galeriaprincipal");

                cuerpoBase.innerHTML = "";
                let galeria = JSON.parse(data);
                for(let i = 0; i < galeria.length; i++){
                    let imagen = galeria[i].image.replace("\/","/");
                    cuerpoBase.innerHTML+=
                        "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin degradado' style='background-image:url("+imagen+")!important' id='"+galeria[i].idimage+","+galeria[i].iduser+"' onclick='onclick_cargarProyecto(`"+galeria[i].idimage+","+galeria[i].iduser+"`)' >" +
                        "</div>";
                }

            } else {
                console.log("No se han encontrado usuarios");
            }
        }
    )
}
function uiCuerpoBase() {
    $('a[href$="#galeriaprincipal"]').on("click",function(){
        uiGaleriaPrincipal();
    });
    $('a[href$="#galeriaprincipal"]').on("click",function(){
        uiGaleriaPrincipal();
    });
    let data = {metodo:'cargarGaleriaMasPopulares'};

    $.post(
        CONEXIONES,
        data,
        function(data) {

            if (data.length) {
                let cuerpoBase = document.getElementById("galeriaprincipal");

                cuerpoBase.innerHTML = "";
                let galeria = JSON.parse(data);
                for(let i = 0; i < galeria.length; i++){
                    let imagen = galeria[i].image.replace("\/","/");
                    cuerpoBase.innerHTML+=
                        "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin degradado' style='background-image:url("+imagen+")!important' id='"+galeria[i].idimage+","+galeria[i].iduser+"' onclick='onclick_cargarProyecto(`"+galeria[i].idimage+","+galeria[i].iduser+"`)' >" +
                        "</div>";
                }

            } else {
                console.log("No se han encontrado usuarios");
            }
        }
    )
    .done(function () {

        // $('body').css('cursor', 'initial');
    });
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
                    imageproyect = canvas.toDataURL("image/jpeg",0.7);
                    // console.log("Imrpimiendouserimg")
                    // console.log(userimg)
                    document.getElementById("imgprueba").setAttribute("src",canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("width","100px")
                }
                if(key == "banner"){
                    // banner = canvas.toDataURL().split('base64,')[1];
                    banner = canvas.toDataURL("image/jpeg",0.7);
                    // console.log("Imrpimiendouserimg")

                    // console.log(canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("src",canvas.toDataURL())
                    document.getElementById("imgprueba").setAttribute("width","100px")

                }
                if(key == "imguser"){
                    userimg = canvas.toDataURL("image/jpeg",0.7);
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
        let iduser=sessionStorage.getItem("infoUser");
        console.log(iduser)
        $.post(
            CONEXIONES,
            {metodo:"cargarUsuario",iduser:iduser},
            function (data) {
                if(JSON.parse(data)!=null){
                    let userinfo = JSON.parse(data);
                    document.getElementById('banner').style.backgroundImage = "url("+userinfo.bannerimg+")";
                    document.getElementById('avatarUsuario').style.backgroundImage = "url("+userinfo.userimg+")";

                    $('#likes-info').html(userinfo.likes);
                    $('#views-info').html(userinfo.views);

                    $('#nombreYApellidos').html(userinfo.name+" "+userinfo.surname);
                    $('#categoria').html(userinfo.category);
                    $('#cityCountry').html(userinfo.city+" , "+userinfo.country);

                    let datos = {metodo:"cargarGaleriaUsuario",iduser:userinfo.iduser};
                    $.post(
                        CONEXIONES,
                        datos,
                        function (data) {
                            let cuerpoBase = document.getElementById("portfolioGallery");

                            cuerpoBase.innerHTML = "";
                            let galeria = JSON.parse(data);
                            if(galeria.length==0){
                                cuerpoBase.innerHTML = "<p class='letras text-center'>Este artista todavía no ha subido nada a su portfolio</p>";
                            }
                            for(let i = 0; i < galeria.length; i++){
                                let imagen = galeria[i].image.replace("\/","/");
                                if(JSON.parse(sessionStorage.getItem("userIniciado"))){

                                    if(JSON.parse(sessionStorage.getItem("userIniciado")).iduser==iduser){

                                        cuerpoBase.innerHTML+=
                                            "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin   alinear-horizontal-derecha' style='background-image:url("+imagen+")!important' id='"+galeria[i].idimage+","+galeria[i].iduser+"' onclick='onclick_cargarProyecto(`"+galeria[i].idimage+","+galeria[i].iduser+"`)' ><div class='btn btn-danger' onclick='onclick_borrarProyecto("+galeria[i].idimage.trim()+","+galeria[i].iduser+")'>X</div>" +
                                            "</div>";
                                    }else{

                                        cuerpoBase.innerHTML+=
                                            "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin ' style='background-image:url("+imagen+")!important' id='"+galeria[i].idimage+","+galeria[i].iduser+"' onclick='onclick_cargarProyecto(`"+galeria[i].idimage+","+galeria[i].iduser+"`)' >" +
                                            "</div>";
                                    }
                                }else{
                                    cuerpoBase.innerHTML+=
                                        "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin ' style='background-image:url("+imagen+")!important' id='"+galeria[i].idimage+","+galeria[i].iduser+"' onclick='onclick_cargarProyecto(`"+galeria[i].idimage+","+galeria[i].iduser+"`)' >" +
                                        "</div>";
                                }
                            }
                        }
                    )

                }else{
                    alert("No se pueden cargar los datos de este usuario en este momento");
                }
            }
        )

}
let query = "SELECT * FROM images i LEFT OUTER JOIN users u ON i.iduser = u.iduser;";

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
    // console.log("proyecto")
    // console.log(proyecto)
    $("#idViews").html("");
    $("#idViews").html(proyecto.views);

    $("#btn-aniadirComentario").attr("disabled",true);

    $("#idLikes").html("");
    $("#idLikes").html(proyecto.likes);

    $("#idNombreCompleto").html("");
    $("#idNombreCompleto").html(proyecto.name+" "+proyecto.surname);
    $("#idNombreCompleto").on("click",function () {
        onclick_cargarPortfolio(proyecto.iduser);
    });



    $("#avatarPropietarioProyecto").attr('src',  proyecto.userimg.replace("\/","/") );

    $("#avatarPropietarioProyecto").on("click",function () {
        onclick_cargarPortfolio(proyecto.iduser);
    })

    $("#idImagenProyecto").attr('src', '' );
    $("#idImagenProyecto").attr('src',  proyecto.image.replace("\/","/") );

    $("#idTituloProyecto").html("");
    $("#idTituloProyecto").html(proyecto.title);

    $("#idDescripcionProyecto").html("");
    $("#idDescripcionProyecto").html(proyecto.description);

    $("#idCategoryUser").html("");
    $("#idCategoryUser").html(proyecto.categoryuser);
    $("#idFechaSubidaProyecto").html("Posted on " + proyecto.date);



    $("#btn-pulgararriba").addClass("btn-success")
    $("#btn-pulgararriba").removeClass("btn-default")
    if(JSON.parse(sessionStorage.getItem("userIniciado")!=null)){
        let user =JSON.parse(sessionStorage.getItem("userIniciado"));
        $("#btn-pulgararriba").on("click",function () {


            console.log("userid"+user.iduser + " idimage"+proyecto.idimage)
            $.post(
                CONEXIONES,
                {metodo:"daleALike",iduserliked:proyecto.iduser,iduserlike:user.iduser,idimage:proyecto.idimage},
                function (data) {
                    console.log("recargando")
                    let cuerpoBase = document.getElementById("cuerpoBase");
                    cargarLayout(cuerpoBase,PROYECTOBASE,uiProyectoBase);
                    onclick_cargarProyecto(proyecto.idimage+","+proyecto.iduser)
                }
            )
        });

        $("#idNuevoComentario").on("change",function () {
            if( $(this).val().trim()!=""){

                $('#btn-aniadirComentario').removeAttr("disabled");
            }else{

                $("#btn-aniadirComentario").attr("disabled",true);
            }
        });
        $('#btn-aniadirComentario').on("click",function () {
            let comentario = $("#idNuevoComentario").val();
            // alert("guardando comentario : "+comentario)
            $.post(
                CONEXIONES,
                {metodo:"aniadirComentario",idimage:proyecto.idimage,iduser:user.iduser,comentario:comentario},
                function (data) {
                    let respuesta =JSON.parse(data);
                    if(respuesta == "true"){

                        let cuerpoBase = document.getElementById("cuerpoBase");
                        cargarLayout(cuerpoBase,PROYECTOBASE,uiProyectoBase);
                    }else{
                        alert("no se ha podido publicar el comentario en estos momentos");
                    }
                }
            );
        });


        // this.css("background-color","#23CF5F!important")
    }else{

        $("#btn-pulgararriba").on("click",function () {
           alert("Inicia sesión o regístrate para poder dar a me gusta");
        });
    }

    $.post(
        CONEXIONES,
        {metodo:"cargarComentarios",idimage:proyecto.idimage},
        function (data) {
            document.getElementById("idCajaComentarios").innerHTML="";
            if(JSON.parse(data).length){
                let comentarios = JSON.parse(data);

                $("#idNumComments").html(comentarios.length);
                for(let i=0;i<comentarios.length;i++){
                    document.getElementById("idCajaComentarios").innerHTML+="<div class='row comentario' value='"+comentarios[i].iduser+"'><div class='col-xs-4 capacircular nopaddingnomargin' style='background-image:url("+comentarios[i]['userimg']+")'></div><div class='col-xs-8'  onclick='onclick_cargarPortfolio(`"+comentarios[i].iduser+"`)'>"+comentarios[i].name+""+comentarios[i].surname+"</div><span class='col-xs-8 nopaddingnomargin letras' id='"+comentarios[i]['idcomment']+"'><h4>"+comentarios[i]['comment']+"</h4></span></div><div class='comentariopalo '></div>";

                }
            }else{

                $("#idNumComments").html(0);
                document.getElementById("idCajaComentarios").innerHTML="<h4 class='row comentario letras'>Este proyecto todavía no tiene ningún comentario, sé el primero en comentar!</h4>";
            }

        }
    )

}