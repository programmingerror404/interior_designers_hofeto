

<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
function slugify ($string) {
    $string = utf8_encode($string);
    $string = iconv('UTF-8', 'ASCII//TRANSLIT', $string);   
    $string = preg_replace('/[^a-z0-9- ]/i', '', $string);
    $string = str_replace(' ', '-', $string);
    $string = trim($string, '-');
    $string = strtolower($string);

    if (empty($string)) {
        return 'n-a';
    }

    return $string;
}

function uploadZIP($file ,$namepath){
	$filename = $file["name"];
	$source = $file["tmp_name"];
	$type = $file["type"];
	$error = $file['error'];
	
	$name = explode(".", $filename);
	$accepted_types = array('application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/x-compressed');
	foreach($accepted_types as $mime_type) {
		if($mime_type == $type) {
			$okay = true;
			break;
		} 
	}
	
	$continue = strtolower($name[1]) == 'zip' ? true : false;
	if(!$continue) {
		$message = "The file you are trying to upload is not a .zip file. Please try again.";
	}

	$target_path =  $_SERVER['DOCUMENT_ROOT'] . "/interiordesigners/".$filename;  // change this to the correct site path
	echo $target_path;
	if(move_uploaded_file($source, $target_path)) {
		$path =  $_SERVER['DOCUMENT_ROOT'] . "/interiordesigners/";
		if(unzipFile($target_path,$path,$_SERVER['DOCUMENT_ROOT'] . "/interiordesigners/".$namepath)){
			$message = "Your .zip file was uploaded and unpacked.";
		}else{
			$message = "There was a problem with unzipping your file";
		}		
	} else {	
		$message = "There was a problem with the upload. Please try again.";
	}

	return $message ; 
}

function unzipFile($target_path,$path,$name){
	$zip = new ZipArchive;
	$res = $zip->open($target_path);
	if ($res === TRUE) {
	  // extract it to the path we determined above
	  $zip->extractTo($path);
	  $zip->close();
	  unlink($target_path);
	  rename($_SERVER['DOCUMENT_ROOT'] . "/interiordesigners/".basename($target_path,'.zip'), $name) ; 
	  return true;
	}else{
		return false;
	}


}


if(isset($_POST) && isset($_POST['submit'])){
	$variable = explode(',',$_POST['services']);
	$strs = '';
	$error ='';
	foreach ($variable as $key => $value) {

		$strs .= '<span class="tag mb-1">'.$value.'</span>';
	}
	if($_FILES['image']['error']!=0){
		$error = "Please Upload File";
	}else{
		$fname=$_FILES['image']['name'];
		$ftype=$_FILES['image']['type'];
		$filepath=$_SERVER['DOCUMENT_ROOT'] . "/interiordesigners/provider_img/".$fname;
		if($ftype=='image/jpeg' || $ftype=='image/png' ){
			move_uploaded_file($_FILES['image']['tmp_name'],$filepath);
		}else{
			$error = "File is not a image" ;
		}
	}
	$zipf = uploadZIP($_FILES['zip_file'],slugify($_POST['url']));
		var_dump($zipf);
	if($_FILES['zip_file']['error']!=0){
		$error = "Please Upload Zip File";
	}else{

	}
	$var = array(
	    'Name' =>$_POST['txtname'],
	     'Count' =>$_POST['times'],
	      'Location_' =>$_POST['loc'],
	      'services' => $strs,
	    'Desc'  => addslashes($_POST['desc']),
	    'img' => $_FILES['image']['name'],
	    'uri'=>$_SERVER['SERVER_NAME']."/interiordesigners/".slugify($_POST['url']).".html"
	);
	$pattern = '[%s]';
	foreach ($var as $key => $val) {
	    $varMap[sprintf($pattern, $key)] = stripslashes($val);
	}
	$page = file_get_contents('provider.html',true);
	$content     = strtr($page, $varMap);
	//save as?
	 	$filename = slugify($_POST['url']).".html";
	 	$path = $_SERVER['DOCUMENT_ROOT'] . "/interiordesigners/".$filename;
		$fp = fopen($path,"wb");
	if( $fp == false ){
		echo "error";
	}
	else{
		fwrite($fp,$content);
		fclose($fp);
		echo "File successfully generated with url- <strong>" . $_SERVER['SERVER_NAME']."/interiordesigners/".$filename. "</strong>";
	}

}



?>