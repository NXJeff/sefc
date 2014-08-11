<?php

 require ('../inc/AudioExif.class.php');
 $AE = new AudioExif($charset = 'utf8');

// set error reporting level
if (version_compare(phpversion(), '5.3.0', '>=') == 1)
  error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
else
  error_reporting(E_ALL & ~E_NOTICE);


// gathering all mp3 files in 'mp3' folder into array
$sDir = '../../content/Messages/conv/';
$aFiles = array();
$rDir = opendir($sDir);

$di = new RecursiveDirectoryIterator('../../content/Messages');
foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
    if (!$file->isFile())
            continue;

        $aPathInfo = pathinfo($filename);
        // print_r ($aPathInfo);
        $sExt = strtolower($aPathInfo['extension']);
        // print 'extension is here: ' . $sExt;
        if ($sExt == 'mp3') {
            // $aFiles[] = $filename;
        }

    // echo $filename . ' - ' . $file->getSize() . ' bytes <br/>';
        // print_r ($aFiles);
}

if ($rDir) {
    while ($sFile = readdir($rDir)) {
        if ($sFile == '.' or $sFile == '..' or !is_file($sDir . $sFile))
            continue;

        $aPathInfo = pathinfo($sFile);
        $sExt = strtolower($aPathInfo['extension']);
        if ($sExt == 'mp3') {
            $aFiles[] = $sDir . $sFile;
        }
    }
    closedir( $rDir );
}

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

foreach ($aFiles as $sSingleFile) {
    //$aTags = readID3($sSingleFile); // obtaining ID3 tags info
    print_r($AE->GetInfo($sSingleFile));
    // $sList .= '<tr><td>'.$aTags['Title'].'</td><td>'.$aTags['Album'].'</td><td>'.$aTags['Author'].'</td>
    //                 <td>'.$aTags['AlbumAuthor'].'</td><td>'.$aTags['Track'].'</td><td>'.$aTags['Year'].'</td>
    //                 <td>'.$aTags['Lenght'].'</td><td>'.$aTags['Lyric'].'</td><td>'.$aTags['Desc'].'</td>
    //                 <td>'.$aTags['Genre'].'</td></tr>';

    // $sList2 .= '<tr><td>'.$aTags['Title'].'</td><td>'.$aTags['Encoded'].'</td><td>'.$aTags['Copyright'].'</td>
    //                 <td>'.$aTags['Publisher'].'</td><td>'.$aTags['OriginalArtist'].'</td><td>'.$aTags['URL'].'</td>
    //                 <td>'.$aTags['Comments'].'</td><td>'.$aTags['Composer'].'</td></tr>';
}


?>