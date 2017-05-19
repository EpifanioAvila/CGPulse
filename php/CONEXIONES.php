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



//function guardarDibujo(){
//    $conn = mysqli_connect("localhost","root","","cgplus");
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
function crearUsuario(){

    $userdatos = $_POST['datos'];

    $conn = mysqli_connect("localhost","root","","cgplus");
    if(mysqli_connect_errno($conn)){
        return json_encode("Imposible conectarse con la base de datos");
    }else{


//        $banner = addslashes($_POST['banner']);
//        $banner = $_POST['banner'];
//        return json_encode($banner);
//        if($_FILES['banner']['tmp_img']){
//            return json_encode("Hay archivo");
//        }

        $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg) VALUES ('".$userdatos['username']."','".$userdatos['pass']."','".$userdatos['email']."','".$userdatos['name']."','".$userdatos['surname']."','".$userdatos['city']."','".$userdatos['country']."','".$userdatos['banner']."',".$userdatos['likes'].",".$userdatos['views'].",'".$userdatos['userimg']."')";
//        $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg) VALUES ('usu1','usu1','usu1','usu1','usu1','usu1','usu1','$bannerimg',0,0,'$userimg')";
//        return json_encode($query);       return json_encode($query);

        $result = mysqli_query($conn,$query);

        if($result){
            mysqli_close($conn);

           return json_encode(true);
        }else{
            mysqli_close($conn);
            return  json_encode(false);
        }
    }
}
function cargarUsuario(){

    $conn = mysqli_connect("localhost","root","","cgplus");
    if(mysqli_connect_errno($conn)){
        return utf8_encode("Imposible conectarse con la base de datos");
    }else{





        $query = "SELECT * FROM users where username ='qwerty'";
//        return json_encode($query);
//        $query = "INSERT INTO users(username, pass, email, name, surname, city, country, bannerimg, likes, views, userimg) VALUES ('usu1','usu1','usu1','usu1','usu1','usu1','usu1','$bannerimg',0,0,'$userimg')";
//        return json_encode($query);


        $result = mysqli_query($conn,$query);
        $arrayUsers = [];
            if($result){
                $usuario = new Usuario();

                while($linea = mysqli_fetch_assoc($result)){

                    $usuario = new Usuario();
                    $usuario->__set("likes",$linea['likes']);
                    $usuario->__set("username",$linea['username']);
                    $usuario->__set("pass",$linea['pass']);
                    $usuario->__set("email",$linea['email']);
                    $usuario->__set("name",$linea['name']);
                    $usuario->__set("surname",$linea['surname']);
                    $usuario->__set("city",$linea['city']);
                    $usuario->__set("country",$linea['country']);
                    $usuario->__set("bannerimg",$linea['bannerimg']);
                    $usuario->__set("likes",$linea['likes']);
                    $usuario->__set("views",$linea['views']);
                    $usuario->__set("userimg",$linea['userimg']);

                    array_push($arrayUsers,$usuario);
                }
                mysqli_close($conn);

//                return json_encode($usuario);
                return json_encode($arrayUsers);
            }else{
                mysqli_close($conn);
                return  json_encode(false);
            }
    }
}


if(isset($_POST['metodo'])) {

    $metodo = $_POST['metodo'];

    switch ($metodo) {
        case "guardarDibujo" :
            echo guardarDibujo();
            break;
        case "crearUsuario" :
            echo crearUsuario();
            break;
        case "cargarUsuario" : echo cargarUsuario();
            break;
    }
}
?>