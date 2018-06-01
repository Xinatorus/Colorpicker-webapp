<?php

$soubor = fopen("data.txt","r");
	if($soubor!=NULL){
		$str = fgets($soubor);
		if(strlen($str)==0){
			$data[0] = 0;
			$data[1] = 0;
			$data[2] = 1;
			$data[3] = 1;
		}else{
			$data = explode(" ",$str);
		}


	} else echo("ERROR Data file error");

	echo json_encode(array('h' => $data[1],'s' => $data[2],'v'=>$data[3]));

	header('Content-Type: application/json');
?>
