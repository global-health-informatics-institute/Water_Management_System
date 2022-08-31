<?php

$filename = $_FILES['image']['name'];
$tempname = $_FILES['image']['tmp_name'];
$folder = "uploads/".basename($_FILES['image']['name']);

if(move_uploaded_file($tempname,$folder)){
	echo "Upload Successful!";
	die();
}else{
	echo "Server Error...";
	die();
}

?>
