 <?php

error_reporting(0);
header('Access-Control-Allow-Origin: *');
header( 'Content-Type: text/html; charset=utf-8' ); 
function __autoload($class_name) {
	include_once 'inc/' . $class_name . '.php';
}

require_once('include_dao.php');

$jsonObject = json_decode($_POST['resID'], true);
if(isset($_POST['reqID'])){ $request = $_POST['reqID']; } 




//Get the db config file from global external source
// $file = '../conf/db.ini'; 
session_start();

// if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');

// $user = $settings['database']['username'];
// $pswd =  $settings['database']['password'];
// $db = $settings['database']['schema'];
// $host = $settings['database']['host'];
// // $conn = mysql_connect( $settings['database']['host'], $user, $pswd);  
// // mysql_set_charset('utf8',$conn); 
// // mysql_select_db($db, $conn);
// try {
// 	$conn = new PDO('mysql:host='+$host+';dbname='+$db, $user, $pswd);
// 	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch(PDOException $e) {
// 	echo 'ERROR: ' . $e->getMessage();
// }



//print all rows order by title
switch($request) {

	case 'A1':
		if(isset($_POST['offset'])){ $offset = $_POST['offset']; } 
		if(isset($_POST['itemperpage'])){ $items = $_POST['itemperpage']; } 
		if(isset($_POST['orderBy'])){ $orderBy = $_POST['orderBy']; } 
		if(isset($_POST['orderAs'])){ $orderAs = $_POST['orderAs']; } 
		if(isset($_POST['whereClause'])){ $whereClause = $_POST['whereClause']; } 
		$arr = DAOFactory::getAudioDAO()->queryLazyLoad($offset, $items, $whereClause, $orderBy, $orderAs);
		break;

}


print_r (json_encode($arr));




?>

