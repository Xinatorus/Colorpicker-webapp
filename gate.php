<?php
	if(isset($_GET) && isset($_GET["data"])){
		$date = date("d.m.y. G:i:s");
		$data = $_GET["data"];

		$soubor = fopen("data.txt","w");
		if($soubor!=NULL){
			fputs($soubor,$data);
		} else echo("ERROR Data file error");

		$ip = $_SERVER['REMOTE_ADDR'];


		$log = fopen("data.log","a");
		if($log!=NULL){
			fputs($log,"$data|$ip|$date \n");
			echo "$data|$ip|$date \n";
		} else echo("ERROR Log file error");

	}else{
		var_dump($_GET);
		echo "ERROR no data";
	}
?>
