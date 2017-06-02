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
    let categoriasYBuscador = document.getElementById("CategoriasYBuscadorBotonera");
    let botonesAccesoUsuario = document.getElementById("botonesAccesoUsuario");

    cargarLayout(cuerpoBase,CUERPOBASE,uiCuerpoBase);
    cargarLayout(categoriasYBuscador,BOTONERAIZQMENUNAV,uiBotonesCategoriasBuscador);

    console.log("cargando botones")
    if(sessionStorage.getItem("userIniciado")){
        console.log("Iniciado");

        cargarLayout(botonesAccesoUsuario,BOTONERAACCESOINICIADO,uiBotonesAccesoUsuarioIniciado);

    }else{
        console.log("No iniciado")
        cargarLayout(botonesAccesoUsuario,BOTONERAACCESO,uiBotonesAccesoUsuario);

    }
}
function onclick_cargaIndex() {

    let cuerpoBase = document.getElementById("cuerpoBase");
    cargarLayout(cuerpoBase,CUERPOBASE,uiCuerpoBase);

    // $('body').css('cursor', 'progress');
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

    console.log(dato8);
    // console.log(dato11.valor);
    // console.log("caracteres:"+banner.length);
    let resultpeti =false;
    if(dato2 != dato2b){
        alert("La contraseña tiene que coincidir")
    }else{
        let peticion = $.post(
                            CONEXIONES,
                            data,
                            function(data){
                                $('body').css('cursor', 'initial');
                                try{
                                    let resultado = JSON.parse(data);
                                    console.log(data);
                                    if(resultado == "0" || resultado == 0){
                                        alert("El usuario ya existe");
                                    }else{
                                        if(resultado == "true"){
                                            resultpeti = true
                                        }else{
                                            alert("Imagen demasiado grande!");
                                        }
                                    }
                                }catch (e){
                                    console.log(dato11);
                                    console.log(dato8);
                                    alert("No se ha podido registrar el usuario en estos momentos.");
                                }


                            })
        .done(function () {
            if(resultpeti){
                alert("Usuario registrado correctamente");
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
                console.log(user)
                sessionStorage.setItem("userIniciado",data);
                onload_main();

            }else{
                alert("Datos incorrectos")
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
        let dato2   = $("#pass1").val();
        let dato3   = $("#pass2").val();
        let dato4   = $("#name").val();
        let dato5   = $("#surname").val();
        let dato6   = $("#email").val();
        let dato7   = $("#city").val();
        let dato8   = $("#country").val();
        let dato11   =  $("#category").val();
        let dato9   = banner.replace("\/","/");
        let dato10   = userimg.replace("\/","/");


        let campos = {iduser:user.iduser, username : dato1,pass : dato2,email: dato6, name:dato4, surname:dato5,city:dato7,country:dato8,banner:dato9,userimg:dato10};
        let data = {metodo:"modificarUsuario",datos:campos};
        $.post(
            CONEXIONES,
            data,
            function (data) {

                // console.log(JSON.parse(data).replace("\/","/"))
                if(JSON.parse(data)=="false"){
                    alert("No se ha podido modificar los datos en estos momentos")
                }else{
                    sessionStorage.setItem("userIniciado",data);
                    alert("Usuario modificado con exito");
                    let cuerpoBase = document.getElementById("cuerpoBase");
                    cargarLayout(cuerpoBase,CONFIGURADORUSUARIO,uiConfiguracionUsuario);
                    cargarLayout(botonesAccesoUsuario,BOTONERAACCESOINICIADO,uiBotonesAccesoUsuarioIniciado);

                }
            }
        )
    }

}
function onclick_cargarPortfolioPropietario(event) {
    let target = $(event.target).attr(id);
    console.log("hola"+$(target))
    let iduser = target;
    sessionStorage.setItem("infoUser",iduser);

    cargarLayout(cuerpoBase,PORTFOLIOBASE,uiPortfolioBase);

}
function onclick_cargarPortfolio(iduser) {

    sessionStorage.setItem("infoUser",iduser);

    cargarLayout(cuerpoBase,PORTFOLIOBASE,uiPortfolioBase);
    console.log("holiwis");

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
        let category = $('#category').val();
        let image = imageproyect;

        let campos = {iduser:user.iduser, title:title, description:description, date:"", likes:0, category:category, tags:tags, image: image}
        let datos = {metodo: "crearProyecto", datos: campos}

        console.log("hola");

        $.post(
            CONEXIONES,
            datos,
            function (data) {
                console.log(data)
                // console.log(JSON.parse(data).replace("\/","/"))
                if(JSON.parse(data)=="true"){
                    alert("Proyecto publicado correctamente");
                }else{
                    alert("No se ha podido modificar el proyecto en estos momentos")
                }
            }
        )

    }
}
function onclick_cargarProyecto(ids) {
    let idTarget = ids;
    let idimage = idTarget.split(",")[0];
    let iduser = idTarget.split(",")[1];
    // console.log(iduser)
    // console.log(idimage)
    $.post(
        CONEXIONES,
        {metodo:"cargarProyecto",idimage:idimage,iduser:iduser},
        function (data) {
            if(JSON.parse(data)!="false"){
                // console.log(JSON.parse(data));
                sessionStorage.setItem("infoproyecto",data);
                let cuerpoBase = document.getElementById("cuerpoBase");
                cargarLayout(cuerpoBase,PROYECTOBASE,uiProyectoBase);
            }else{
                console.log("no encontrado")
            }
        }
    )
}
function onclick_borrarProyecto(idimage,iduser) {
    alert("borrando obra "+idimage);
    $.post(
        CONEXIONES,
        {metodo:"borrarProyecto",idimage:idimage,iduser:iduser},
        function(data){
            onclick_cargarPortfolio(iduser)
        });

    event.stopPropagation();
}