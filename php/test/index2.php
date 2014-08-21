<?php
header( 'Content-Type: text/html; charset=utf-8' ); 
//Get the db config file from global external source
$file = 'conf/db.ini'; 
if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');
session_start();

require ('inc/AudioExif.class.php');
require ('inc/mp3file.class.php');
$AE = new AudioExif($charset = 'utf8');

// set error reporting level
if (version_compare(phpversion(), '5.3.0', '>=') == 1)
  error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
else
  error_reporting(E_ALL & ~E_NOTICE);


// gathering all mp3 files in 'mp3' folder into array
// $sDir = '\messages\1\\';
// $aFiles = array();
// $rDir = opendir($sDir);
// print $s_Dir;

$di = new RecursiveDirectoryIterator('messages/');
foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
    if (!$file->isFile())
        continue;

    $aPathInfo = pathinfo($filename);
        // print_r ($aPathInfo);
    $sExt = strtolower($aPathInfo['extension']);
        // print 'extension is here: ' . $sExt;
    if ($sExt == 'mp3') {
        $aFiles[] = $filename;
    }

    // echo $filename . ' - ' . $file->getSize() . ' bytes <br/>';
        // print_r ($aFiles);
}

// if ($rDir) {
//     while ($sFile = readdir($rDir)) {
//         if ($sFile == '.' or $sFile == '..' or !is_file($sDir . $sFile))
//             continue;

//         $aPathInfo = pathinfo($sFile);
//         $sExt = strtolower($aPathInfo['extension']);
//         if ($sExt == 'mp3') {
//             // $aFiles[] = $sDir . $sFile;
//         }
//     }
//     closedir( $rDir );
// }

// new object of our ID3TagsReader class
//$oReader = new ID3TagsReader();// passing through located files ..


$sList = $sList2 = '';
// foreach ($aFiles as $sSingleFile) {
//     echo 'success';
//     $aTags = $oReader->getTagsInfo($sSingleFile); // obtaining ID3 tags info
//     $sList .= '<tr><td>'.$aTags['Title'].'</td><td>'.$aTags['Album'].'</td><td>'.$aTags['Author'].'</td>
//                     <td>'.$aTags['AlbumAuthor'].'</td><td>'.$aTags['Track'].'</td><td>'.$aTags['Year'].'</td>
//                     <td>'.$aTags['Lenght'].'</td><td>'.$aTags['Lyric'].'</td><td>'.$aTags['Desc'].'</td>
//                     <td>'.$aTags['Genre'].'</td></tr>';

//     $sList2 .= '<tr><td>'.$aTags['Title'].'</td><td>'.$aTags['Encoded'].'</td><td>'.$aTags['Copyright'].'</td>
//                     <td>'.$aTags['Publisher'].'</td><td>'.$aTags['OriginalArtist'].'</td><td>'.$aTags['URL'].'</td>
//                     <td>'.$aTags['Comments'].'</td><td>'.$aTags['Composer'].'</td></tr>';
// }
try {


$user = $settings['database']['username'];
$pswd =  $settings['database']['password'];
$db = $settings['database']['schema'];
$conn = mysql_connect( $settings['database']['host'], $user, $pswd);  
mysql_set_charset('utf8',$conn); 
mysql_select_db($db, $conn);


foreach ($aFiles as $sSingleFile) {
    // print_r($aFiles);
    //$aTags = readID3($sSingleFile); // obtaining ID3 tags info
    $audio = $AE->GetInfo($sSingleFile);
    $createdDate = getCreatedDate($sSingleFile);
    $extraMeta = getExtraMeta($sSingleFile);
    $filesize = $extraMeta['Filesize'];
    $duration = $extraMeta['Length mm:ss'];
    $title = $audio['Title'];
    $speaker = $audio['Artist'];
    $url = getURL($sSingleFile);
    $language = getLanguage($sSingleFile);

    // print getDuration($sSingleFile);

    // $sList .= '<tr><td>'.$aTags['Title'].'</td><td>'.$aTags['Album'].'</td><td>'.$aTags['Author'].'</td>
    //                 <td>'.$aTags['AlbumAuthor'].'</td><td>'.$aTags['Track'].'</td><td>'.$aTags['Year'].'</td>
    //                 <td>'.$aTags['Lenght'].'</td><td>'.$aTags['Lyric'].'</td><td>'.$aTags['Desc'].'</td>
    //                 <td>'.$aTags['Genre'].'</td></tr>';

    // $sList2 .= '<tr><td>'.$aTags['Title'].'</td><td>'.$aTags['Encoded'].'</td><td>'.$aTags['Copyright'].'</td>
    //                 <td>'.$aTags['Publisher'].'</td><td>'.$aTags['OriginalArtist'].'</td><td>'.$aTags['URL'].'</td>
    //                 <td>'.$aTags['Comments'].'</td><td>'.$aTags['Composer'].'</td></tr>';
    $query = "INSERT INTO audio (title, speaker, duration, added_date, filesize, url, language) VALUES ('$title', '$speaker', '$duration', '$createdDate', '$filesize', '$url', '$language')";

    // print $query;
     mysql_query($query);

    // $retrieveBackInfo = mysql_query("SELECT * FROM reservations WHERE res_code='$resCode'");
    // $rows = mysql_num_rows($retrieveBackReservation);
    // if( $rows> 0) {

    // }


}

mysql_close($conn);

} catch (Exception $e) {
    echo $e->getMessage();
}

function getCreatedDate($sFile)
{
    $aPathInfo = pathinfo($sFile);
    $sFile = $aPathInfo['basename'];
    $sDate = substr($sFile, 0, 11);
    $date = new DateTime($sDate);
    return date_format($date, 'Y-m-d H:i:s');
}

function getExtraMeta($sFile)
{
    $m = new mp3file($sFile);
    $a = $m->get_metadata();

    if ($a['Encoding']=='Unknown')
        return "?";
    else if ($a['Encoding']=='VBR')
        return $a;
    else if ($a['Encoding']=='CBR')
        return $a;
}

function getURL($sFile) 
{   
    return str_replace('\\','/', $sFile);
}

function getLanguage($sFile) 
{
    if (strpos($sFile,'english') !== false) {
        return 'EN';
    } else if (strpos($sFile,'chinese') !== false) {
        return 'CN';
    } else if (strpos($sFile,'bilingual') !== false) {
        return 'BI';
    }

    return '';
}

?>