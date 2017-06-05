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
    $()
    $('#btn-cerrarSesion').on("click",function () {
        sessionStorage.removeItem("userIniciado");
        snackbarAlert("Cerrando Sesión")
        onload_main();
    });
    $('#btn-notificaciones').on("click",function () {
        onclick_cargarMenuNotificaciones();
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

    $('#btn-BuscadorSup').click(function () {

        cargarLayout(cuerpoBase,FILTROCATEGORIAS,uiFiltroCategorias);
        filtro = $('#buscadorProyectosSup').val().trim();
        console.clear();

            $.post(
                CONEXIONES,
                {metodo:"buscarProyecto",filtro:filtro},
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

                    }else{
                        console.log("no results");
                    }
                }
            )

    });
    $('#btn-categorias').on("click",function () {
        console.log("holaa");
        cargarLayout(cuerpoBase,FILTROCATEGORIAS,uiFiltroCategorias);
    });
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

    let cuerpoBase = document.getElementById("galeriaprincipal");
    cuerpoBase.innerHTML = "<h1>Cargando Galeria...</h1>";

    $('.col-lg-2.col-md-3.col-sm-4.col-xs-6.alto50.altofull.alinear-horizontal.alinear-vertical:nth-child(1)').on("click",function () {

        onclick_cargarGaleriaPopulares();
    })
    $('.col-lg-2.col-md-3.col-sm-4.col-xs-6.alto50.altofull.alinear-horizontal.alinear-vertical:nth-child(2)').on("click",function () {

        onclick_cargarGaleriaVisitados();
    })

    onclick_cargarGaleriaPopulares();

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

function uiFiltroCategorias() {
    $.post(
        CONEXIONES,
        {metodo:"cargarCategorias"},
        function (data) {
            if(JSON.parse(data).length){
                let categorias = JSON.parse(data);
                let listacategorias  = document.getElementById('listaCategoriasFiltro');
                listacategorias.innerHTML ="";
                for(let i = 0 ; i < categorias.length ; i++){
                    listacategorias.innerHTML += "<option value=''>"+categorias[i]['namecategoria']+"</option>";
                }
            }

        }
    )
    $('#btn-buscador').on("click",function () {
        let galeria;
        let cuerpoBase = document.getElementById("galeriaprincipal");
            // console.log($('selectorder').select());
            let filter = "";
            let category ="";
            let order ="";
            order = $('#selectorder option:selected').text();
            console.log(order)
        console.log(category)
            category = $('#listaCategoriasFiltro option:selected').text();

            filter = $('#idBuscar').val().trim();
            $.post(
                CONEXIONES,
                {metodo:"filtrarCategorias",filter:filter,order:order,category:category},
                function(data) {
                    // console.log(JSON.parse(data))
                    if (data.length>2) {
                        console.log(JSON.parse(data))
                        cuerpoBase.innerHTML = "";
                        galeria = JSON.parse(data);

                    }else{
                        cuerpoBase.innerHTML="<h3 class='letras'>No se han encontrado proyectos con este filtro de búsqueda</h3>"
                    }
                }
            ).done(function () {
                if(galeria!=""){
                        snackbarAlert("Cargando resultados")
                    for(let i = 0; i < galeria.length; i++){
                        let imagen = galeria[i].image.replace("\/","/");

                            cuerpoBase.innerHTML+=
                                "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin degradado animatefade' style='background-image:url("+imagen+")!important;' id='"+galeria[i].idimage+","+galeria[i].iduser+"' onclick='onclick_cargarProyecto(`"+galeria[i].idimage+","+galeria[i].iduser+"`)' >" +
                                "</div>";
                    }
                }
            })

    })
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
    let dato7   = $("#city").val(user.city)
    let dato11   = $("#category").val(user.category)
        console.log(user.category)

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

                    $('#btn-enviar-mensaje-contacto').on("click",onclick_enviarCorreo);


                    $('#btn-contacto').on("click",function () {

                            // Get the modal
                            var modal = document.getElementById('myModal');

    // Get the button that opens the modal
                            var btn = document.getElementById('btn-contacto');

    // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
                            modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
                            span.onclick = function() {
                                modal.style.display = "none";
                            }

    // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function(event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }


                        if(JSON.parse(sessionStorage.getItem("userIniciado"))){

                        }else{
                            // alert("holis");
                        }
                    })
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
                    snackbarAlert("No se pueden cargar los datos de este usuario en este momento");
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
    // snackbarAlert()("cargando formulario nuevo trabajo");
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
            // snackbarAlert()("guardando comentario : "+comentario)
            $.post(
                CONEXIONES,
                {metodo:"aniadirComentario",idimage:proyecto.idimage,iduser:user.iduser,comentario:comentario},
                function (data) {
                    let respuesta =JSON.parse(data);
                    if(respuesta == "true"){

                        let cuerpoBase = document.getElementById("cuerpoBase");
                        cargarLayout(cuerpoBase,PROYECTOBASE,uiProyectoBase);
                    }else{
                        snackbarAlert("no se ha podido publicar el comentario en estos momentos");
                    }
                }
            );
        });


        // this.css("background-color","#23CF5F!important")
    }else{

        $("#btn-pulgararriba").on("click",function () {
           snackbarAlert("Inicia sesión o regístrate para poder dar a me gusta");
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
function uiMenuNotificaciones() {
    let user = JSON.parse(sessionStorage.getItem("userIniciado"));
    document.getElementById("idcapalikes").innerHTML ="<h1 class='letras'>Cargando Notificaciones...</h1>";
    document.getElementById("idcapaComments").innerHTML ="<h1 class='letras'>Cargando Notificaciones...</h1>";

    $.post(
        CONEXIONES,
        {metodo:"cargarLikes",iduser:user.iduser},
        function (data) {
            if(JSON.parse(data).length && JSON.parse(data)!=0 && JSON.parse(data)!="false"){
                let resultados = JSON.parse(data);
                document.getElementById("idcapalikes").innerHTML = "";
                for (let i = 0 ; i < resultados.length;i++){
                    document.getElementById("idcapalikes").innerHTML += "<div class='row etiquetanotificacion'><div class='col-xs-12   alto50 alinear-vertical'><div class='etiquetanoti alinear-vertical'></div><div class='etiquetanotitexto borde2 alinear-vertical borde2 nopaddingnomargin letras'><span class='capacircularnoti back1' onclick='onclick_cargarPortfolio(`"+resultados[i]['iduserlike']+"`)' style='background-position:center; background-size:cover;background-image: url("+resultados[i]['userimg']+")'></span>El usuario  <a class='letraverde' onclick='onclick_cargarPortfolio(`"+resultados[i]['iduserlike']+"`)'>&nbsp; "+resultados[i]['username']+" &nbsp; </a> te ha dado like a tu proyecto '<a class='letraverde' onclick='onclick_cargarProyecto(`"+resultados[i]['idimage']+","+resultados[i]['iduser']+"`)'>&nbsp; "+resultados[i]['title']+" &nbsp; </a>' </div> <div class='etiquetanotiimagen ' onclick='onclick_cargarProyecto(`"+resultados[i]['idimage']+","+resultados[i]['iduser']+"`)' style='background-position:center; background-size:cover;background-image: url("+resultados[i]['image']+")'></div></div></div>";
                }
            }else{
                snackbarAlert("Todavía no tienes notificaciones");
            }
        }
    )
    $.post(
        CONEXIONES,
        {metodo:"cargarComments",iduser:user.iduser},
        function (data) {
            if(JSON.parse(data).length && JSON.parse(data)!=0 && JSON.parse(data)!="false"){
                let resultados = JSON.parse(data);
                document.getElementById("idcapaComments").innerHTML = "";
                for (let i = 0 ; i < resultados.length;i++){
                    document.getElementById("idcapaComments").innerHTML += "<div class='row etiquetanotificacion'><div class='col-xs-12   alto50 alinear-vertical'><div class='etiquetanoti alinear-vertical'></div><div class='etiquetanotitexto borde2 alinear-vertical borde2 nopaddingnomargin letras'><span class='capacircularnoti back1' onclick='onclick_cargarPortfolio(`"+resultados[i]['idusercomment']+"`)' style='background-position:center; background-size:cover;background-image: url("+resultados[i]['userimg']+")'></span>El usuario  <a class='letraverde' onclick='onclick_cargarPortfolio(`"+resultados[i]['idusercomment']+"`)'>&nbsp; "+resultados[i]['username']+" &nbsp; </a> ha comentado en tu proyecto '<a class='letraverde' onclick='onclick_cargarProyecto(`"+resultados[i]['idimage']+","+resultados[i]['iduser']+"`)'>&nbsp; "+resultados[i]['title']+" &nbsp; </a>' </div> <div class='etiquetanotiimagen ' onclick='onclick_cargarProyecto(`"+resultados[i]['idimage']+","+resultados[i]['iduser']+"`)' style='background-position:center; background-size:cover;background-image: url("+resultados[i]['image']+")'></div></div></div>";
                }
            }else{
                snackbarAlert("Todavía no tienes notificaciones");
            }
        }
    )

}
