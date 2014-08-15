<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
header( 'Content-Type: text/html; charset=utf-8' ); 
function __autoload($class_name) {
	include_once 'inc/' . $class_name . '.php';
}

//Get the db config file from global external source
$file = '../conf/db.ini'; 
session_start();

if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');

$user = $settings['database']['username'];
$pswd =  $settings['database']['password'];
$db = $settings['database']['schema'];
$conn = mysql_connect( $settings['database']['host'], $user, $pswd);  
mysql_set_charset('utf8',$conn); 
mysql_select_db($db, $conn);

$perPage    = $_REQUEST['listomatic']['perPage'];
$listOffset = $_REQUEST['listomatic']['listOffset'];
$searchTerm = $_REQUEST['listomatic']['searchTerm'];

if ($searchTerm) {
	$sql = "SELECT SQL_CALC_FOUND_ROWS *
	FROM audio
	WHERE audio_title LIKE '%$searchTerm%'
	ORDER BY audio_added_date DESC
	LIMIT $listOffset, $perPage";
} else {
	$sql = "SELECT SQL_CALC_FOUND_ROWS *
	FROM audio_title
	ORDER BY audio_added_date DESC
	LIMIT $listOffset, $perPage";
}
$result = mysqli_query($con, $sql);

// If you are using MySQL use SQL_CALC_FOUND_ROWS in your main queries (above)
// Now to get the total records available use the FOUND_ROWS() function (below)
$resultNumRows = mysqli_query($con, 'SELECT FOUND_ROWS() as foundRows');
$rowFoundRows = mysqli_fetch_array($resultNumRows);
$iFoundRows = $rowFoundRows['foundRows'];

while($row = mysqli_fetch_array($result)) {
	$sDate = date('m/d/Y', strtotime($row['date']));
    // Listomatic requires the "total" field to show/hide the "Show More" button
	$aData['total'] = $iFoundRows; 
    // The following is sample data (in this case Powerball numbers) that you want to display
	$aData['numbers'][] = array('date' =>  $sDate,
		'number' => array(1 => $row['num1'],
			2 => $row['num2'],
			3 => $row['num3'],
			4 => $row['num4'],
			5 => $row['num5'],
			6 => $row['num6']));
}
echo json_encode($aData);
exit;


?>

