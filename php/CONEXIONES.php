<?php
/**
 * Created by PhpStorm.
 * User: Epi
 * Date: 14/05/2017
 * Time: 21:02
 */
include "CNTS.php";
//include "correo.php";

class Prueba
{
    // Declaración de una propiedad
    function __construct(){

        $this->name = "John";
        $this->age = 30;
        $this->city = "New York";
    }
    public $var = 'un valor predeterminado';



}
class Usuario{
    // Declaración de una propiedad
    function __construct(){
        $a = func_get_args();
        $i = func_num_args();
        if (method_exists($this,$f='__construct'.$i)) {
            call_user_func_array(array($this,$f),$a);
        }
    }
    function __construct12($iduser,$username,$pass,$email,$name,$surname,$city,$country,$bannerimg,$likes,$views,$userimg,$category){

            $this->iduser = $iduser;
            $this->username =$username;
            $this->pass = $pass;
            $this->email = $email;
            $this->name = $name;
            $this->surname = $surname;
            $this->city = $city;
            $this->country = $country;
            $this->bannerimg = $bannerimg;
            $this->likes = $likes;
            $this->views = $views;
            $this->userimg = $userimg;
            $this->category = $category;

    }
    function __set($name, $value)
    {
        // TODO: Implement __set() method.
        $this->$name = $value;
    }


}
class ImageGallery
{
    // Declaración de una propiedad
    function __construct()
    {
        $a = func_get_args();
        $i = func_num_args();
        if (method_exists($this,$f='__construct'.$i)) {
            call_user_func_array(array($this,$f),$a);
        }
    }

    function __construct10($idimage,$iduser,$title,$description,$date,$likes,$views,$category,$tags,$image){

        $this->idimage = $idimage;
        $this->iduser = $iduser;
        $this->title =$title;
        $this->description = $description;
        $this->date = $date;
        $this->likes = $likes;
        $this->views = $views;
        $this->category = $category;
        $this->tags = $tags;
        $this->image= $image;

    }
    function __set($name, $value)
    {
        // TODO: Implement __set() method.
        $this->$name = $value;
    }


}


function cargarGaleriaMasPoulares(){

        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {

            $query = "SELECT * FROM images ORDER BY likes DESC";

            $result = mysqli_query($conn, $query);

            if ($result) {
                $imagenes = [];

                while ($linea = mysqli_fetch_assoc($result)) {

                    $imagen = new ImageGallery();
                    $imagen->__set("idimage", $linea['idimage']);
                    $imagen->__set("iduser", $linea['iduser']);
                    $imagen->__set("title", $linea['title']);
                    $imagen->__set("description", $linea['description']);
                    $imagen->__set("date", $linea['date']);
                    $imagen->__set("likes", $linea['likes']);
                    $imagen->__set("views", $linea['views']);
                    $imagen->__set("category", $linea['category']);
                    $imagen->__set("tags", $linea['tags']);
                    $imagen->__set("image", $linea['image']);

                    array_push($imagenes, $imagen);
                    unset($imagen);
                }
                mysqli_close($conn);

//                return json_encode($usuario);
                return json_encode($imagenes);
            } else {
                mysqli_close($conn);
                return json_encode("false");
            }
        }

}
function cargarGaleriaMasVisitados(){

    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {
        return json_encode("Imposible conectarse con la base de datos");
    } else {


        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {

            $query = "SELECT * FROM images ORDER BY views DESC";

            $result = mysqli_query($conn, $query);

            if ($result) {
                $imagenes = [];

                while ($linea = mysqli_fetch_assoc($result)) {

                    $imagen = new ImageGallery();
                    $imagen->__set("idimage", $linea['idimage']);
                    $imagen->__set("iduser", $linea['iduser']);
                    $imagen->__set("title", $linea['title']);
                    $imagen->__set("description", $linea['description']);
                    $imagen->__set("date", $linea['date']);
                    $imagen->__set("likes", $linea['likes']);
                    $imagen->__set("views", $linea['views']);
                    $imagen->__set("category", $linea['category']);
                    $imagen->__set("tags", $linea['tags']);
                    $imagen->__set("image", $linea['image']);

                    array_push($imagenes, $imagen);
                    unset($imagen);
                }
                mysqli_close($conn);

//                return json_encode($usuario);
                return json_encode($imagenes);
            } else {
                mysqli_close($conn);
                return json_encode("false");
            }
        }
    }
}
function buscarProyecto(){

        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("0");
        } else {

            $filtro = $_POST['filtro'];

            $query = "SELECT * FROM images WHERE title LIKE '%$filtro%' OR tags LIKE '%$filtro%' ORDER BY title DESC";

            $result = mysqli_query($conn, $query);

            if ($result) {
                $imagenes = [];

                while ($linea = mysqli_fetch_assoc($result)) {

                    $imagen = new ImageGallery();
                    $imagen->__set("idimage", $linea['idimage']);
                    $imagen->__set("iduser", $linea['iduser']);
                    $imagen->__set("title", $linea['title']);
                    $imagen->__set("description", $linea['description']);
                    $imagen->__set("date", $linea['date']);
                    $imagen->__set("likes", $linea['likes']);
                    $imagen->__set("views", $linea['views']);
                    $imagen->__set("category", $linea['category']);
                    $imagen->__set("tags", $linea['tags']);
                    $imagen->__set("image", $linea['image']);

                    array_push($imagenes, $imagen);
                    unset($imagen);
                }
                mysqli_close($conn);

//                return json_encode($usuario);
                return json_encode($imagenes);
            } else {
                mysqli_close($conn);
                return json_encode("false");
            }
        }

}
function cargarNotificacionesLikes(){
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {
        return json_encode("Imposible conectarse con la base de datos");
    } else {
        $iduser = $_POST['iduser'];
        $query = "select l.idimage ,i.iduser,i.image, u.username,u.iduser as iduserlike, u.userimg, i.title from likes l left outer join images i on l.idimage= i.idimage  left outer join users u on l.iduser = u.iduser where i.iduser = '$iduser' ORDER BY l.idlike DESC";

        $result = mysqli_query($conn,$query);
        $resultados = array();
        if($result){
            while($resultado = mysqli_fetch_assoc($result)){
                array_push($resultados,$resultado);
            }
            return json_encode($resultados);
        }else{
            return json_encode("0");
        }


    }
}

function cargarNotificacionesComments(){
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {
        return json_encode("Imposible conectarse con la base de datos");
    } else {
        $iduser = $_POST['iduser'];
        $query = "select c.idimage ,i.iduser,i.image, u.username,u.iduser as idusercomment, u.userimg, i.title from comments c left outer join images i on c.idimage= i.idimage left outer join users u on c.iduser = u.iduser where i.iduser = '$iduser' ORDER BY c.idcomment DESC ";

        $result = mysqli_query($conn,$query);
        $resultados = array();
        if($result){
            while($resultado = mysqli_fetch_assoc($result)){
                array_push($resultados,$resultado);
            }
            return json_encode($resultados);
        }else{
            return json_encode("0");
        }


    }
}
function getVisitas(){
    $conn = mysqli_connect(HOST,USERBBDD,"",NAMEBBDD);
    if(mysqli_connect_errno($conn)){
        return json_encode("Imposible conectarse con la base de datos");
    }else {
        $iduser = $_POST['iduser'];

        $query = "SELECT likes,views from users where iduser = '$iduser'";

        $result = mysqli_query($conn,$query);

        if($result){
            $visitas = mysqli_fetch_row($result);
            return json_encode($visitas);
        }else{
            return json_encode("false");
        }
    }
}
function cargarProyecto(){
    $idimage = $_POST['idimage'];
    $iduser = $_POST['iduser'];
    $conn = mysqli_connect(HOST,USERBBDD,PASSBBDD,NAMEBBDD);
    if(mysqli_connect_errno($conn)){
        return json_encode("Imposible conectarse con la base de datos");
    }else {
//
        $query = "UPDATE images i, users u SET i.views = i.views +1 , u.views = u.views +1 where i.idimage = '$idimage' AND u.iduser=i.iduser ";

        $result = mysqli_query($conn,$query);

        $query = "select u.name, u.surname,u.category as categoryuser,  u.email ,u.userimg, i.* from users u left outer join images i on i.iduser=u.iduser where i.idimage='$idimage'";
        $result = mysqli_query($conn,$query);
        if($result){
            $imagen = mysqli_fetch_assoc($result);
            return json_encode($imagen);
        }else{
            return json_encode("false");
        }
    }



}
function borrarProyecto(){
    $idimage = $_POST['idimage'];
    $iduser = $_POST['iduser'];
    $conn = mysqli_connect(HOST,USERBBDD,"",NAMEBBDD);
    if(mysqli_connect_errno($conn)){
        return json_encode("Imposible conectarse con la base de datos");
    }else {

        $query = "select count(*) from likes where idimage ='$idimage'";
        $result = mysqli_query($conn,$query);
        $likes = mysqli_fetch_row($result)[0];

        $query = "DELETE from comments where idimage ='$idimage'";
        $result = mysqli_query($conn,$query);

        $query = "DELETE from likes where idimage ='$idimage'";
        $result = mysqli_query($conn,$query);


        $query = "select views from images where idimage ='$idimage'";
        $result = mysqli_query($conn,$query);
        $views = mysqli_fetch_row($result)[0];

        $query = "DELETE from images where idimage ='$idimage'";
        $result = mysqli_query($conn,$query);

        $query = "UPDATE users SET views = views - $views, likes = likes - $likes where iduser='$iduser'";
        $result = mysqli_query($conn,$query);
        if($result){
            return json_encode("true");
        }else{
            return json_encode("false");

        }


//        $resultados = Array();
//        while($linea = mysqli_fetch_assoc($result)){
//            array_push($resultados,$linea);
//        }
////        return json_encode($resultados);
//
//        $query = "UPDATE images i, users u SET i.views = i.views +1 , u.views = u.views +1 where i.idimage = '$idimage' AND u.iduser=i.iduser ";
//        $result = mysqli_query($conn,$query);
//
//        $query = "select u.name, u.surname,u.category as categoryuser,  u.userimg,  i.* from users u left outer join images i on i.iduser=u.iduser where i.idimage='$idimage'";
//        $result = mysqli_query($conn,$query);
//        if($result){
//            $imagen = mysqli_fetch_assoc($result);
//            return json_encode($imagen);
//        }else{
//            return json_encode("false");
//        }
    }



}
function cargarGaleriaUsuario()
{

    $iduser = $_POST['iduser'];
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {
        return json_encode("Imposible conectarse con la base de datos");
    } else {


        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {

            $query = "SELECT * FROM images where iduser='$iduser' ORDER BY idimage DESC";

            $result = mysqli_query($conn, $query);

            if ($result) {
                $imagenes = [];

                while ($linea = mysqli_fetch_assoc($result)) {

                    $imagen = new ImageGallery();
                    $imagen->__set("idimage", $linea['idimage']);
                    $imagen->__set("iduser", $linea['iduser']);
                    $imagen->__set("title", $linea['title']);
                    $imagen->__set("description", $linea['description']);
                    $imagen->__set("date", $linea['date']);
                    $imagen->__set("likes", $linea['likes']);
                    $imagen->__set("views", $linea['views']);
                    $imagen->__set("category", $linea['category']);
                    $imagen->__set("tags", $linea['tags']);
                    $imagen->__set("image", $linea['image']);

                    array_push($imagenes, $imagen);
                    unset($imagen);
                }
                mysqli_close($conn);

//                return json_encode($usuario);
                return json_encode($imagenes);
            } else {
                mysqli_close($conn);
                return json_encode("false");
            }
        }
    }
}
    function crearProyecto()
    {
        $iduser = $_POST['datos']['iduser'];
        $title = $_POST['datos']['title'];
        $description = $_POST['datos']['description'];
        setlocale(LC_TIME,"es_ES.UTF-8");
        $date = ucwords(strftime("%Y-%m-%d"));
        $likes = 0;
        $views = 0;
        $category = $_POST['datos']['category'];
        $tags = $_POST['datos']['tags'];
        $image = $_POST['datos']['image'];

        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("0");
        } else {
            $query = "INSERT INTO  images(iduser,title,description,date,likes,views,category,tags,image) VALUES ('$iduser','$title','$description','$date','$likes','$views','$category','$tags','$image')";

            $result = mysqli_query($conn, $query);
            if ($result) {
                return json_encode("true");

            } else {
                return json_encode("false");

            }
        }
//    return json_encode($query);
    }

    function modificarUsuario()
    {
        $iduser = $_POST['datos']['iduser'];
        $email = $_POST['datos']['email'];
        $pass = $_POST['datos']['pass'];
        $name = $_POST['datos']['name'];
        $surname = $_POST['datos']['surname'];
        $city = $_POST['datos']['city'];
        $country = $_POST['datos']['country'];
        $bannerimg = $_POST['datos']['banner'];
        $userimg = $_POST['datos']['userimg'];
        $category = $_POST['datos']['category'];

        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {
//        $query = "UPDATE * FROM users where bannerimg!='' and userimg!=''";

//        $query = "UPDATE users SET pass='".$pass."' ,email='".$email."' ,name='".$name."' ,surname='".$surname."' ,city='".$city."' ,country='".$country."' ,banner='".$bannerimg."' ,userimg='".$userimg ."' WHERE iduser='".$iduser."'";
            $query = "UPDATE users SET pass='$pass' , email='$email' , name='$name' , surname='$surname' , city='$city' ,country='$country', userimg='$userimg', bannerimg='$bannerimg',category='$category'  WHERE iduser='$iduser'";
            $result = mysqli_query($conn, $query);
            if ($result) {
                $query = "SELECT * FROM users WHERE iduser ='$iduser'";
                $result = mysqli_query($conn, $query);
                $usuario = new Usuario();

                $linea = mysqli_fetch_assoc($result);

                $usuario = new Usuario();
                $usuario->__set("iduser", $linea['iduser']);
                $usuario->__set("username", $linea['username']);
                $usuario->__set("pass", $linea['pass']);
                $usuario->__set("email", $linea['email']);
                $usuario->__set("name", $linea['name']);
                $usuario->__set("surname", $linea['surname']);
                $usuario->__set("city", $linea['city']);
                $usuario->__set("country", $linea['country']);
                $usuario->__set("bannerimg", $linea['bannerimg']);
                $usuario->__set("likes", $linea['likes']);
                $usuario->__set("views", $linea['views']);
                $usuario->__set("userimg", $linea['userimg']);
                $usuario->__set("category", $linea['category']);


                return json_encode($usuario);

            } else {
                return json_encode("false");

            }
        }
    }

    function iniciarSesion()
    {

        $user = $_POST['user'];
        $pass = $_POST['pass'];

        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);

        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {

            $query = "SELECT * FROM users where username='$user' AND pass='$pass'";

            $result = mysqli_query($conn, $query);

            if ($result) {

                $usuario = new Usuario();

                $linea = mysqli_fetch_assoc($result);

                $usuario = new Usuario();
                $usuario->__set("iduser", $linea['iduser']);
                $usuario->__set("username", $linea['username']);
                $usuario->__set("pass", $linea['pass']);
                $usuario->__set("email", $linea['email']);
                $usuario->__set("name", $linea['name']);
                $usuario->__set("surname", $linea['surname']);
                $usuario->__set("city", $linea['city']);
                $usuario->__set("country", $linea['country']);
                $usuario->__set("bannerimg", $linea['bannerimg']);
                $usuario->__set("likes", $linea['likes']);
                $usuario->__set("views", $linea['views']);
                $usuario->__set("userimg", $linea['userimg']);
                $usuario->__set("category", $linea['category']);


                mysqli_close($conn);

//                return json_encode($usuario);
                return json_encode($usuario);
            } else {
                mysqli_close($conn);
                return json_encode(false);
            }
        }


    }

    function crearUsuario()
    {

        $userdatos = $_POST['datos'];

        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {

//        PRIMERO COMPROBAMOS SI EL USUARIO INTRODUCIDO YA EXISTE

//        $query = "SELECT 'true' FROM users where username='".$userdatos['username']."' limit 1";
            $result = "";
            $query = "SELECT 'true' FROM users where username='" . $userdatos['username'] . "'";
            $result = mysqli_query($conn, $query);

//        SI EXISTE DEVUELVE 0 Y DESDE JAVASCRIPT SE TRATA LA RESPUESTA
            $linea = mysqli_fetch_row($result);
            if (count($linea) > 0) {
                return json_encode("0");
            } else {
//          SI NO EXISTE LO INTENTA CREAR
                $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg, role, category) VALUES ('" . $userdatos['username'] . "','" . $userdatos['pass'] . "','" . $userdatos['email'] . "','" . $userdatos['name'] . "','" . $userdatos['surname'] . "','" . $userdatos['city'] . "','" . $userdatos['country'] . "','" . $userdatos['banner'] . "'," . $userdatos['likes'] . "," . $userdatos['views'] . ",'" . $userdatos['userimg'] . "','15673','".$userdatos['category']." ')";

//        return json_encode($query);       return json_encode($query);

                $result = mysqli_query($conn, $query);
//            SI LO CONSIGUE CREAR DEVUELVE TRUE

                if ($result) {
                    mysqli_close($conn);
                    return json_encode("true");
                } else {
//                SI NO LO CONSIGUE CREAR DEVUELVE FALSE
                    mysqli_close($conn);
                    return json_encode("false");
                }
            }

        }
    }

    function cargarUsuario()
    {
        $iduser = $_POST['iduser'];
        $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {


            $query = "SELECT * FROM users where iduser = '".$iduser."'";

            $result = mysqli_query($conn, $query);

            if ($result) {
                $usuario = new Usuario();

                    $linea = mysqli_fetch_assoc($result);

                    $usuario = new Usuario();
                    $usuario->__set("iduser", $linea['iduser']);
                    $usuario->__set("likes", $linea['likes']);
                    $usuario->__set("username", $linea['username']);
                    $usuario->__set("email", $linea['email']);
                    $usuario->__set("name", $linea['name']);
                    $usuario->__set("surname", $linea['surname']);
                    $usuario->__set("city", $linea['city']);
                    $usuario->__set("country", $linea['country']);
                    $usuario->__set("bannerimg", $linea['bannerimg']);
                    $usuario->__set("likes", $linea['likes']);
                    $usuario->__set("views", $linea['views']);
                    $usuario->__set("userimg", $linea['userimg']);
                    $usuario->__set("category", $linea['category']);

                mysqli_close($conn);

                return json_encode($usuario);
            } else {
                mysqli_close($conn);
                return json_encode(false);
            }
        }
    }
function cargarComentarios()
{
    $idimage = $_POST['idimage'];
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {
        return json_encode(0);
    } else {

        $query = "SELECT c.*, u.name, u.surname, u.userimg FROM comments c LEFT OUTER JOIN users u on c.iduser=u.iduser where c.idimage = ".$idimage;
        $result = mysqli_query($conn, $query);

        if ($result) {
            $comentarios = Array();
            while($comentario = mysqli_fetch_assoc($result)){
                array_push($comentarios,$comentario);
            }
            return json_encode($comentarios);
        } else {
            mysqli_close($conn);
            return json_encode("false");
        }
    }
}
function daleALike(){
    $iduserlike = $_POST['iduserlike'];
    $iduserliked = $_POST['iduserliked'];
    $idimage = $_POST['idimage'];
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {
        return json_encode(0);
    } else {
        $result ="";
        $query = "SELECT idlike from likes where idimage='$idimage' and iduser='$iduserlike'";
        $result = mysqli_query($conn, $query);
        $resultados = mysqli_fetch_row($result);
        if ($resultados[0]!=null) {
//            return json_encode("Se ha encontrado el like");
            $idlike = $resultados[0];

            $query = "DELETE FROM `likes` WHERE idlike='$idlike'";
//
            $result = mysqli_query($conn, $query);
            if($result){
                $query  = "UPDATE users SET likes=likes-1 where iduser='$iduserliked'";
                mysqli_query($conn,$query);


                $query  = "UPDATE images SET likes=likes-1 where idimage='$idimage'";
                mysqli_query($conn,$query);


                mysqli_close($conn);
                return json_encode("Unlike");
            }else{
                mysqli_close($conn);
                return json_encode("No se ha podido borrar");
            }

        }else{

//            return json_encode("No se encuentra ");
            $query = "INSERT INTO likes(idimage,iduser) VALUES ('$idimage','$iduserlike') ";
            $result = mysqli_query($conn, $query);
            if ($result){

                $query  = "UPDATE users SET likes=likes+1 where iduser='$iduserliked'";
                mysqli_query($conn,$query);

                $query  = "UPDATE images SET likes=likes+1 where idimage='$idimage'";
                mysqli_query($conn,$query);


                mysqli_close($conn);
                return json_encode("Insertada Correctamente".$query );
            }
        }

    }

}
function cargarCategorias(){
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);

    if (mysqli_connect_errno($conn)) {
        mysqli_close($conn);
        return json_encode("0");
    } else {
        $query = "SELECT * FROM categorias WHERE 1";
        $result = mysqli_query($conn,$query);
        if($result){
            $categorias = Array();
            while($categoria = mysqli_fetch_assoc($result)){
                array_push($categorias,$categoria);
            }
            mysqli_close($conn);
            return json_encode($categorias);
        }else{

            mysqli_close($conn);
            return json_encode("0");
        }
    }
}
function aniadirComentario(){
    $idimage = $_POST['idimage'];
    $iduser = $_POST['iduser'];
    $comment = $_POST['comentario'];
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {

        mysqli_close($conn);
        return json_encode(0);
    } else {

        $query = "INSERT INTO comments(idimage,iduser,comment) VALUES ('$idimage','$iduser','$comment')";

        $result = mysqli_query($conn, $query);

        if($result){

            mysqli_close($conn);
            return json_encode("true");
        }else{

            mysqli_close($conn);
            return json_encode("false");
        }

    }

}
function filtrarCategorias(){
    $category = $_POST['category'];
    $filter = $_POST['filter'];
    $order = $_POST['order'];
    $conn = mysqli_connect(HOST, USERBBDD, PASSBBDD, NAMEBBDD);
    if (mysqli_connect_errno($conn)) {

        mysqli_close($conn);
        return json_encode(0);
    } else {
        $query = "select * from images where category='$category' AND (tags LIKE '%$filter%' OR title LIKE '%$filter%') order by $order DESC ";
//        return json_encode($query);
        $result = mysqli_query($conn,$query);

        if ($result) {
            $imagenes = Array();

            while ($linea = mysqli_fetch_assoc($result)) {

                $imagen = new ImageGallery();
                $imagen->__set("idimage", $linea['idimage']);
                $imagen->__set("iduser", $linea['iduser']);
                $imagen->__set("title", $linea['title']);
                $imagen->__set("description", $linea['description']);
                $imagen->__set("date", $linea['date']);
                $imagen->__set("likes", $linea['likes']);
                $imagen->__set("views", $linea['views']);
                $imagen->__set("category", $linea['category']);
                $imagen->__set("tags", $linea['tags']);
                $imagen->__set("image", $linea['image']);

                array_push($imagenes, $imagen);
                unset($imagen);
            }
            mysqli_close($conn);

//                return json_encode($usuario);
            return json_encode($imagenes);
        } else {
            mysqli_close($conn);
            return json_encode("false");
        }

    }
}
function enviarCorreoContacto(){
    $name= $_POST['name'];
    $from = $_POST['from'];
    $to = $_POST['to'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    if(correo::sendEmail($to, $subject, $message, $from, $name)){
        return json_encode("true");
    }else{
        return json_encode("false");
    }


//    $body = "De: $from\n E-Mail: $email\n Mensaje:\n $message";
//
//    if ($_POST['submit']) {
//        if ($name != '' && $email != '' && $subject != '') {
//                if (mail($to, $subject, $body, $from)) {
//                    return '<p>Tu mensaje fue enviado correctamente</p>';
//                } else {
//                    return '<p>Algo salio mal, prueba de nuevo</p>';
//                }
//        } else {
//            return '<p>Por favor, rellena todos los campos del formulario de forma correcta</p>';
//        }
//    }
}
if(isset($_POST['metodo'])) {

        $metodo = $_POST['metodo'];

        switch ($metodo) {
            case "guardarDibujo" :
                echo guardarDibujo();
                break;
            case "crearUsuario" : echo crearUsuario();
                break;
            case "cargarUsuario" : echo cargarUsuario();
                break;
            case "iniciarSesion" : echo iniciarSesion();
                break;
            case "modificarUsuario" : echo modificarUsuario();
                break;
            case "crearProyecto" : echo crearProyecto();
                break;
            case "cargarGaleriaUsuario" : echo cargarGaleriaUsuario();
                break;
            case "cargarProyecto" : echo cargarProyecto();
                break;
            case "getVisitas" : echo getVisitas();
                break;
            case "cargarGaleriaMasPopulares" : echo cargarGaleriaMasPoulares();
                break;
            case "cargarGaleriaMasVisitados" : echo cargarGaleriaMasVisitados();
                break;
            case "cargarComentarios" : echo cargarComentarios();
                break;
            case "daleALike" : echo daleALike();
                break;
            case "aniadirComentario" : echo aniadirComentario();
                break;
            case "borrarProyecto" : echo borrarProyecto();
                break;
            case "cargarLikes" : echo cargarNotificacionesLikes();
                break;
            case "cargarComments" : echo cargarNotificacionesComments();
                break;
            case "buscarProyecto" : echo buscarProyecto();
                break;
            case "cargarCategorias" : echo cargarCategorias();
                break;
            case "filtrarCategorias" : echo filtrarCategorias();
                break;
            case "enviarCorreo" : echo enviarCorreoContacto();
                break;
        }
    }
?>