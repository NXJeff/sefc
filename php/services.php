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

 session_start();


 switch($request) {

 	case 'A1':		//Recently Added
 	if(isset($_POST['offset'])){ $offset = $_POST['offset']; } 
 	if(isset($_POST['itemperpage'])){ $items = $_POST['itemperpage']; } 
 	if(isset($_POST['orderBy'])){ $orderBy = $_POST['orderBy']; } 
 	if(isset($_POST['orderAs'])){ $orderAs = $_POST['orderAs']; } 
 	if(isset($_POST['whereClause'])){ $whereClause = htmlspecialchars_decode($_POST['whereClause']); }
 	$arr = DAOFactory::getAudioDAO()->queryLazyLoad($offset, $items, $whereClause, $orderBy, $orderAs);
 	break;

 	case 'A2':		//Browse By Month
 	if(isset($_POST['offset'])){ $offset = $_POST['offset']; } 
 	if(isset($_POST['itemperpage'])){ $items = $_POST['itemperpage']; } 
 	if(isset($_POST['orderBy'])){ $orderBy = $_POST['orderBy']; } 
 	if(isset($_POST['orderAs'])){ $orderAs = $_POST['orderAs']; } 
 	if(isset($_POST['startDate'])){ $startDate = $_POST['startDate']; } 
 	if(isset($_POST['endDate'])){ $endDate = $_POST['endDate']; } 
 	$whereClause = " added_date>='".$startDate."' AND  added_date<'".$endDate."' ";
 	$arr = DAOFactory::getAudioDAO()->queryLazyLoad($offset, $items, $whereClause, $orderBy, $orderAs);
 	break;

 	case 'A3':		//Browse By Language
 	if(isset($_POST['offset'])){ $offset = $_POST['offset']; } 
 	if(isset($_POST['itemperpage'])){ $items = $_POST['itemperpage']; } 
 	if(isset($_POST['orderBy'])){ $orderBy = $_POST['orderBy']; } 
 	if(isset($_POST['orderAs'])){ $orderAs = $_POST['orderAs']; } 
 	if(isset($_POST['lang'])){ $language = $_POST['lang']; } 
 	$whereClause = " language='".$language."' ";
 	$arr = DAOFactory::getAudioDAO()->queryLazyLoad($offset, $items, $whereClause, $orderBy, $orderAs);
 	break;

 	case 'A4':		//List all speakers
 	if(isset($_POST['lang'])){ $language = $_POST['lang']; } 
 	// $whereClause = " language='".$language."' ";
 	$arr = DAOFactory::getSpeakersDAO()->queryByLanguage($language);
 	break;

 	case 'A5':		//List all records by speaker
 	if(isset($_POST['offset'])){ $offset = $_POST['offset']; } 
 	if(isset($_POST['itemperpage'])){ $items = $_POST['itemperpage']; } 
 	if(isset($_POST['orderBy'])){ $orderBy = $_POST['orderBy']; } 
 	if(isset($_POST['orderAs'])){ $orderAs = $_POST['orderAs']; } 
 	if(isset($_POST['speaker'])){ $speaker = $_POST['speaker']; } 
 	$whereClause = " speaker='".$speaker."' ";
 	$arr = DAOFactory::getAudioDAO()->queryLazyLoad($offset, $items, $whereClause, $orderBy, $orderAs);
 	break;

 	case 'S1': //search for title and speaker
 	if(isset($_POST['offset'])){ $offset = $_POST['offset']; } 
 	if(isset($_POST['itemperpage'])){ $items = $_POST['itemperpage']; } 
 	if(isset($_POST['orderBy'])){ $orderBy = $_POST['orderBy']; } 
 	if(isset($_POST['orderAs'])){ $orderAs = $_POST['orderAs']; } 
 	if(isset($_POST['keyword'])){ $keyword = $_POST['keyword']; } 
 	$whereClause = " title like '".$keyword."%' or title like '%".$keyword."%' or title like '%".$keyword."' or speaker like '".$keyword."%' or speaker like '%".$keyword."%' or speaker like '%".$keyword."'  ";

 	$arr = DAOFactory::getAudioDAO()->queryLazyLoad($offset, $items, $whereClause, $orderBy, $orderAs);

 	break;

 	case 'UP': //User Pending:search for pending verification users
 	$status = 'P';
 	$arr = DAOFactory::getUsersDAO()->queryByStatus($status);
 	break;

 	case 'UA': //User Arppove: approve User
 	$status = 'A';
 	$arr = DAOFactory::getUsersDAO()->queryByStatus($status);
 	break;

 }


 print_r (json_encode($arr));




 ?>

