<?php
session_start();
require_once "../resources/config.php";

// Check if file was uploaded without errors
if(isset($_FILES['image']) && $_FILES['image']['error'] == 0){
	$allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
	$filename = $_FILES['image']['name'];
	$filetype = $_FILES['image']['type'];
	$filesize = $_FILES['image']['size'];
	$filepath = $_FILES['image']['tmp_name'];
	$folder = "/var/www/html/assets/upload/" . $filename;
	//this is the path to be saved in database
	$url = "assets/upload/".basename($filename);
	
	
	// Verify file extension
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
	if(!array_key_exists($ext, $allowed)) die("Error: Please select a valid file format.");

	// Verify file size - 5MB maximum
	$maxsize = 100 * 1024 * 1024;
	if($filesize > $maxsize) die("Error: File size is larger than the allowed limit.");
	
	$filesize = intval($filesize);
	$filesize = round($filesize/1048576,2);
	
	if($filesize < 1){
		$filesize = round($filesize * 1024,2);
		$filesize = strval($filesize);
		$filesize = $filesize."kb";
	}else{
		$filesize = strval($filesize);
		$filesize = $filesize."mb";
	}
	// Verify MYME type of the file
	if(in_array($filetype, $allowed)){
		// Check whether file exists before uploading it
		if(file_exists("upload/" . $filename)){
			echo $filename . " is already exists.";
		}else{
			if(move_uploaded_file($filepath, $folder)){
				$sql = "UPDATE settings SET image_name = '".$filename."' WHERE user_id = '".$_SESSION['id']."'";
				$db->exec($sql);
				$sql = "UPDATE settings SET image_type = '".$filetype."' WHERE user_id = '".$_SESSION['id']."'";
				$db->exec($sql);
				$sql = "UPDATE settings SET image_size = '".$filesize."' WHERE user_id = '".$_SESSION['id']."'";
				$db->exec($sql);
				$sql = "UPDATE settings SET image_path = '".$url."' WHERE user_id = '".$_SESSION['id']."'";
				$db->exec($sql);
				echo 1;
				die();
			}else{
				die("Error: File could not be uploaded");
			}
		} 
	}else{
		die("Error: There was a problem uploading your file. Please try again."); 
	}
}else{
	die("Error: " . $_FILES['image']['error']);
}

?>
