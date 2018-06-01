<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
 	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<script src="jquery.ui.touch-punch.min.js"></script>

	<script src="./script.js" type="text/javascript"></script>

	<link rel="stylesheet" href="./style.css">
	<title>RGB</title>
</head>
<body>

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
?>

<div class="controler">
	<div class="left">
		<div class="colorPickerW">
			<div class="colorPicker">
				<div class="color"></div>
				<div class="cursor" value="<?php echo $data[1]; ?>"></div>
			</div>

		</div>

		<div class="sliderRange" id="sat">
			<div class="move" value="<?php echo $data[2]; ?>"></div>
		</div>

		<div class="sliderRange" id="bright">
			<div class="move" value="<?php echo $data[3]; ?>"></div>
		</div>
		<div class="pallete">
			<div value="rgb(255,0,255)"></div><div value="rgb(255,0,127)"></div><div value="rgb(255,0,0)"></div><div value="rgb(255,127,0)"></div><div value="rgb(255,255,0)"></div><br>
			<div value="rgb(127,0,255)"></div><div value="rgb(0,0,255)"></div><div value="rgb(0,127,255)"></div><div value="rgb(0,255,255)"></div><br>
			<div value="rgb(127,255,0)"></div><div value="rgb(0,255,0)"></div><div value="rgb(0,255,127)"></div><br>
		</div>
	</div>
	<div class="mod_">
		<div class="onoff active">
			<div class="on">ON</div>
			<div class="off">OFF</div>
		</div>
		<span class="mod selected" value="0"></span> Static <br>
		<span class="mod" value="1"></span> Breathe <br>
		<span class="mod" value="2"></span> Color Cycle <br>
		<span class="mod" value="3"></span> Random Cycle <br>
		<input class="time" type="text" name="time" value="1000"> Time[ms]<br>
		<div class="log"></div>
		<div class="update">
			<a href="#" onclick="check()">UPDATE</a>
		</div>
	</div>

</div>


Reklama:
</body>
</html>
