/**
 * Created by Epi on 16/05/2017.
 */
function onclick_cargarFormularioRegistro() {
    let cuerpoBase = document.getElementById("cuerpoBase");
        cargarLayout(cuerpoBase,FORMULARIOREGISTRO,uiFormularioRegistro);

}
function onclick_cargarFormularioInicioSesion() {
    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,FORMULARIOLOGIN,uiFormularioLogin);
}
function onclick_cargarMenuNotificaciones(){
    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,MENUNOTIFICACIONES,uiMenuNotificaciones);
}
function onload_main() {
    console.log(Sha256.hash("querty123"))
    let cuerpoBase = document.getElementById("cuerpoBase");
    cuerpoBase.style.minHeight = screen.height+"px";
    console.log(window.innerHeight)
    let categoriasYBuscador = document.getElementById("CategoriasYBuscadorBotonera");
    let botonesAccesoUsuario = document.getElementById("botonesAccesoUsuario");
    $('#terminos').on("click",function () {
        var modal = document.getElementById('myModal2');

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
    })

    cargarLayout(cuerpoBase,CUERPOBASE,uiCuerpoBase);
    cargarLayout(categoriasYBuscador,BOTONERAIZQMENUNAV,uiBotonesCategoriasBuscador);

    if(sessionStorage.getItem("userIniciado")){

        cargarLayout(botonesAccesoUsuario,BOTONERAACCESOINICIADO,uiBotonesAccesoUsuarioIniciado);

    }else{
        cargarLayout(botonesAccesoUsuario,BOTONERAACCESO,uiBotonesAccesoUsuario);

    }
}
function onclick_cargaIndex() {

    let cuerpoBase = document.getElementById("cuerpoBase");
    cuerpoBase.style.minHeight = screen.height+"px";
    console.log(window.innerHeight)
    cargarLayout(cuerpoBase,CUERPOBASE,uiCuerpoBase);

    // $('body').css('cursor', 'progress');
}
function onclick_cargarGaleriaPopulares() {
    $('.col-lg-2.col-md-3.col-sm-4.col-xs-6.alto50.altofull.alinear-horizontal.alinear-vertical:nth-child(1)').css("background-color","#2f2f30");
    $('.col-lg-2.col-md-3.col-sm-4.col-xs-6.alto50.altofull.alinear-horizontal.alinear-vertical:nth-child(2)').css("background-color","");

    let cuerpoBase = document.getElementById("galeriaprincipal");
    cuerpoBase.innerHTML = "<h1>Cargando Galeria...</h1>";
    $.post(
        CONEXIONES,
        {metodo:'cargarGaleriaMasPopulares'},
        function(data) {

            if (data.length) {
                cuerpoBase.innerHTML = "";
                let galeria = JSON.parse(data);
                for(let i = 0; i < galeria.length; i++){
                    let imagen = galeria[i].image.replace("\/","/");
                    cuerpoBase.innerHTML+=
                        "<div class='col-lg-2 col-md-2 col-sm-4 col-xs-6 galeria-images back1 nopaddingnomargin degradado' style='background-image:url("+imagen+")!important' id='"+galeria[i].idimage+","+galeria[i].iduser+"' onclick='onclick_cargarProyecto(`"+galeria[i].idimage+","+galeria[i].iduser+"`)' >" +
                        "</div>";
                }

            } else {
                console.log("No se han encontrado imagenes");
            }
        }
    )

}
function onclick_cargarGaleriaVisitados() {
    $('.col-lg-2.col-md-3.col-sm-4.col-xs-6.alto50.altofull.alinear-horizontal.alinear-vertical:nth-child(2)').css("background-color","#2f2f30");
    $('.col-lg-2.col-md-3.col-sm-4.col-xs-6.alto50.altofull.alinear-horizontal.alinear-vertical:nth-child(1)').css("background-color","");

    let cuerpoBase = document.getElementById("galeriaprincipal");
    cuerpoBase.innerHTML = "<h1>Cargando Galeria...</h1>";
    $.post(
        CONEXIONES,
        {metodo:'cargarGaleriaMasVisitados'},
        function(data) {

            if (data.length) {

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

function onclick_registrarUSuario() {

    // $('body').css('cursor', 'progress');
    let dato1  = $("#username").val();
    let dato2  = Sha256.hash($("#pass1").val());
    let dato2b  = Sha256.hash($("#pass2").val());
    let dato4  = $("#name").val();
    let dato5  = $("#surname").val();
    let dato3  = $("#email").val();
    let dato6  = $("#city").val();
    let dato7  = $("#country").val();
    let dato12  = $("#category").val();

    let dato8 = banner;
    let dato9 = 0;
    let dato10 = 0;
    let dato11 = userimg;

    let campos = { username : dato1,pass : dato2,email: dato3, name:dato4, surname:dato5,city:dato6,country:dato7,banner:dato8,likes:dato9,views:dato10,userimg:dato11,category:dato12};

    let data = {metodo : 'crearUsuario',datos : campos};

    let resultpeti =false;
    if(dato2 != dato2b){
        snackbarAlert("La contraseña tiene que coincidir")
    }else{
        let peticion = $.post(
                            CONEXIONES,
                            data,
                            function(data){
                                $('body').css('cursor', 'initial');
                                try{
                                    let resultado = JSON.parse(data);
                                    if(resultado == "0" || resultado == 0){
                                        snackbarAlert("El usuario ya existe");
                                    }else{
                                        if(resultado == "true"){
                                            resultpeti = true
                                        }else{
                                            snackbarAlert("Imagen demasiado grande!");
                                        }
                                    }
                                }catch (e){
                                    snackbarAlert("No se ha podido registrar el usuario en estos momentos.");
                                }


                            })
        .done(function () {
            if(resultpeti){
                snackbarAlert("Usuario registrado correctamente");
            }
        });
    }

}
function onclick_iniciarSesion() {
    let username = $('#username').val();
    let pass = Sha256.hash($('#pass1').val());
    let data = {metodo:"iniciarSesion",user:username,pass:pass};
    $.post(
        CONEXIONES,
        data,
        function (data) {
            let user = JSON.parse(data);
            if(user.username!=null){
                snackbarAlert("Bienvenido "+JSON.parse(data).username)
                sessionStorage.setItem("userIniciado",data);
                onload_main();

            }else{
                snackbarAlert("Datos incorrectos")
            }
    })

}
function onclick_cargaConfiguracionUsuario() {
    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,CONFIGURADORUSUARIO,uiConfiguracionUsuario)
}
function onclick_modificarUsuario() {
    // $("#")
    if(JSON.parse(sessionStorage.getItem("userIniciado"))){
        let user = JSON.parse(sessionStorage.getItem("userIniciado"));
        let dato1   = $("#username").val();
        let dato2   = Sha256.hash($("#pass1").val());
        let dato3   = Sha256.hash($("#pass2").val());
        let dato4   = $("#name").val();
        let dato5   = $("#surname").val();
        let dato6   = $("#email").val();
        let dato7   = $("#city").val();
        let dato8   = $("#country").val();
        let dato11   =  $("#category").val();
        let dato9   = banner.replace("\/","/");
        let dato10   = userimg.replace("\/","/");

        if(dato2 == dato3){
            let campos = {iduser:user.iduser, username : dato1,pass : dato2,email: dato6, name:dato4, surname:dato5,city:dato7,country:dato8,banner:dato9,userimg:dato10,category:dato11};
            let data = {metodo:"modificarUsuario",datos:campos};
            $.post(
                CONEXIONES,
                data,
                function (data) {

                    if(JSON.parse(data)=="false"){
                        snackbarAlert("No se ha podido modificar los datos en estos momentos")
                    }else{
                        sessionStorage.setItem("userIniciado",data);
                        snackbarAlert("Usuario modificado con exito");
                        let cuerpoBase = document.getElementById("cuerpoBase");
                        cargarLayout(cuerpoBase,CONFIGURADORUSUARIO,uiConfiguracionUsuario);
                        cargarLayout(botonesAccesoUsuario,BOTONERAACCESOINICIADO,uiBotonesAccesoUsuarioIniciado);

                    }
                }
            )
        }else{
            snackbarAlert("Las contraseñas deben coincidir")
        }

    }

}
function onclick_cargarPortfolioPropietario(event) {
    let target = $(event.target).attr(id);
    let iduser = target;
    sessionStorage.setItem("infoUser",iduser);

    cargarLayout(cuerpoBase,PORTFOLIOBASE,uiPortfolioBase);

}
function onclick_cargarPortfolio(iduser) {

    sessionStorage.setItem("infoUser",iduser);

    cargarLayout(cuerpoBase,PORTFOLIOBASE,uiPortfolioBase);
    // console.log("holiwis");

}
function onclick_cargarNuevoProyecto() {
    cargarLayout(cuerpoBase,FORMULARIONUEVOPROYECTO,uiFormularioNuevoTrabajo);

}
function onclick_subirProyecto() {
    if(JSON.parse(sessionStorage.getItem("userIniciado"))) {

        let user = JSON.parse(sessionStorage.getItem("userIniciado"));
        // console.log(user)
        let title = $('#title').val();
        let description = $('#description').val();
        // console.log(description)
        let tags = $('#tags').val();
        let category = $('#category option:selected').text();
        let image = imageproyect;

        let campos = {iduser:user.iduser, title:title, description:description, date:"", likes:0, category:category, tags:tags, image: image}
        let datos = {metodo: "crearProyecto", datos: campos}


        $.post(
            CONEXIONES,
            datos,
            function (data) {
                console.log(data)
                // console.log(JSON.parse(data).replace("\/","/"))
                if(JSON.parse(data)=="true"){
                    snackbarAlert("Proyecto publicado correctamente");
                    sessionStorage.setItem("infoUser",user.iduser);

                    cargarLayout(cuerpoBase,PORTFOLIOBASE,uiPortfolioBase);
                }else{
                    snackbarAlert("No se ha podido modificar el proyecto en estos momentos")
                }
            }
        )

    }
}
function onclick_cargarProyecto(ids) {
    let idTarget = ids;
    let idimage = idTarget.split(",")[0];
    let iduser = idTarget.split(",")[1];
    $.post(
        CONEXIONES,
        {metodo:"cargarProyecto",idimage:idimage,iduser:iduser},
        function (data) {
            console.log("hola");

            if(JSON.parse(data)!="false"){
                // console.log(JSON.parse(data));
                sessionStorage.setItem("infoproyecto",data);
                let cuerpoBase = document.getElementById("cuerpoBase");
                cargarLayout(cuerpoBase,PROYECTOBASE,uiProyectoBase);
            }else{
                snackbarAlert("no encontrado")
            }
        }
    )
}
function onclick_borrarProyecto(idimage,iduser) {
    // snackbarAlert("borrando obra "+idimage);
    if(JSON.parse(sessionStorage.getItem("userIniciado")).iduser == iduser){
        $.post(
            CONEXIONES,
            {metodo:"borrarProyecto",idimage:idimage,iduser:iduser},
            function(data){
                console.log(data)
                snackbarAlert("Borrando Proyecto")
                onclick_cargarPortfolio(iduser)
            }
        );
    }


    event.stopPropagation();
}

function snackbarAlert(msg) {
    var x = document.getElementById("snackbar")
    x.className = "show";
    x.innerHTML = msg;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function onclick_enviarCorreo() {
    let nombre= $('#usuario-nombre').val();
    let email= $('#usuario-email').val();
    let asunto= $('#asunto-contacto').val();
    let mensaje= $('#mensaje-contacto').val();
    let para = JSON.parse(sessionStorage.getItem("infoproyecto"))
    console.log("holis")
    mensaje = "<h3>"+nombre+" te ha enviado un mensaje desde tu portfolio:</h3><h3>Nombre del contacto: "+nombre+" <br/> Email del contacto: "+email+"</h3><p>"+mensaje+"</p>"
    if(nombre != "" && email !="" && asunto != "" && mensaje != "" && para.email != ""){
        $.post(
            CONEXIONES,
            {metodo:"enviarCorreo",name:nombre,to:para.email,subject:asunto,from:email,message:mensaje},
            function (data) {
                console.log(data)
                if(JSON.parse(data)==true){

                    snackbarAlert("Mensaje enviado")
                    $.post(
                        CONEXIONES,
                        {metodo:"enviarCorreo",name:nombre,to:email,subject:"CGPULSE - Mensaje enviado",from:"cgpulseproyect@gmail.com",message:"Tu correo a "+para.name+" ha sido enviado, en cuanto lo lea, contactará contigo"},
                        function (data) {
                            // snackbarAlert("Hola")
                        }
                    );

                }else{
                    snackbarAlert("El correo no se ha podido enviar en estos momentos, disculpe las molestias")
                }
            }
        )
    }else{
        snackbarAlert("todos los campos son obligatorios")
    }
}