<?php
/**
 * Created by PhpStorm.
 * User: Epi
 * Date: 14/05/2017
 * Time: 21:02
 */
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
class Usuario
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

    function __construct12($iduser,$username,$pass,$email,$name,$surname,$city,$country,$bannerimg,$likes,$views,$userimg){

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



//function guardarDibujo(){
//    $conn = mysqli_connect("localhost","root","","cgpulse");
//    if(mysqli_connect_errno($conn)){
//        return null;
//    }else{
//        $query = "SELECT * FROM images";
//        $result = mysqli_query($conn,$query);
//        if($result){
//            mysqli_close($conn);
//            return $result;
//        }else{
//            mysqli_close($conn);
//            return false;
//        }
//    }
//}
//
function cargarProyecto(){
    $idimage = $_POST['idimage'];
    $conn = mysqli_connect("localhost","root","","cgpulse");
    if(mysqli_connect_errno($conn)){
        return utf8_encode("Imposible conectarse con la base de datos");
    }else {
        $query = "SELECT * FROM images WHERE idimage = '$idimage' ";
        $result = mysqli_query($conn,$query);
        if($result){
            $imagen = mysqli_fetch_assoc($result);
            return json_encode($imagen);
        }else{
            return json_encode("false");
        }
    }



}
function cargarGaleriaUsuario()
{

    $iduser = $_POST['iduser'];
    $conn = mysqli_connect("localhost", "root", "", "cgpulse");
    if (mysqli_connect_errno($conn)) {
        return json_encode("Imposible conectarse con la base de datos");
    } else {


        $conn = mysqli_connect("localhost", "root", "", "cgpulse");
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
        $date = $_POST['datos']['date'];
        $likes = 0;
        $views = 0;
        $category = $_POST['datos']['category'];
        $tags = $_POST['datos']['tags'];
        $image = $_POST['datos']['image'];

        $conn = mysqli_connect("localhost", "root", "", "cgpulse");
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
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
        $conn = mysqli_connect("localhost", "root", "", "cgpulse");
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {
//        $query = "UPDATE * FROM users where bannerimg!='' and userimg!=''";

//        $query = "UPDATE users SET pass='".$pass."' ,email='".$email."' ,name='".$name."' ,surname='".$surname."' ,city='".$city."' ,country='".$country."' ,banner='".$bannerimg."' ,userimg='".$userimg ."' WHERE iduser='".$iduser."'";
            $query = "UPDATE users SET pass='$pass' , email='$email' , name='$name' , surname='$surname' , city='$city' ,country='$country', userimg='$userimg', bannerimg='$bannerimg'  WHERE iduser='$iduser'";
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

        $conn = mysqli_connect("localhost", "root", "", "cgpulse");

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

        $conn = mysqli_connect("localhost", "root", "", "cgpulse");
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
                $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg, role) VALUES ('" . $userdatos['username'] . "','" . $userdatos['pass'] . "','" . $userdatos['email'] . "','" . $userdatos['name'] . "','" . $userdatos['surname'] . "','" . $userdatos['city'] . "','" . $userdatos['country'] . "','" . $userdatos['banner'] . "'," . $userdatos['likes'] . "," . $userdatos['views'] . ",'" . $userdatos['userimg'] . "','15673')";

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

        $conn = mysqli_connect("localhost", "root", "", "cgpulse");
        if (mysqli_connect_errno($conn)) {
            return json_encode("Imposible conectarse con la base de datos");
        } else {


            $query = "SELECT * FROM users where bannerimg!='' and userimg!=''";
//        return json_encode($query);
//        $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg) VALUES ('usu1','usu1','usu1','usu1','usu1','usu1','usu1','$bannerimg',0,0,'$userimg')";
//        return json_encode($query);

            $result = mysqli_query($conn, $query);
            $arrayUsers = [];
            if ($result) {
//                $usuario = new Usuario();

                while ($linea = mysqli_fetch_assoc($result)) {

                    $usuario = new Usuario();
                    $usuario->__set("likes", $linea['likes']);
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

                    array_push($arrayUsers, $usuario);
                }
                mysqli_close($conn);

//                return json_encode($usuario);
                return json_encode($arrayUsers);
            } else {
                mysqli_close($conn);
                return json_encode(false);
            }
        }
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
            case "cargarProyect" : echo cargarProyecto();
                break;
        }
    }
?>