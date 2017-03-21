<?php
$message= '';
$error = '';
if(isset($_POST["submit"]))
{
	if(empty($_POST["s_id"]))
	{
		$error ="<label class='errot-text'>Enter Id</label>";
	}else if(empty($_POST["s_name"]))
	{
		$error ="<label class='errot-text'>Enter name</label>";
	}else if(empty($_POST["s_desc"]))
	{
		$error ="<label class='errot-text'>Enter description</label>";
	}else if (empty($_POST["s_ecmin"])) {
		$error ="<label class='errot-text'>Enter minimum age</label>";
	}else if(empty($_POST["s_ecmax"]))
	{
		$error ="<label class='errot-text'>Enter maximum age</label>";
	}else if(empty($_POST["s_date"]))
	{
		$error ="<label class='errot-text'>Enter date</label>";
	}else
	{
		if(file_exists('../service_scheme.json'))
		{
			$current_data =file_get_contents('../service_scheme.json');
			$array_data =json_decode($current_data,true);
			$data = array(
				"scheme_id" => $_POST['s_id'],
				"scheme_name" => $_POST['s_name'],
				"desc" => $_POST['s_desc'],
				"Eligibility_Criteria" => array(
						"min_limit" => $_POST['s_ecmin'],
						"max_limit" => $_POST['s_ecmax']
					),
				"launched_on" => $_POST['s_date']
				);
			$array_data[] = $data;
			$final_data =json_encode($array_data);
			if(file_put_contents('../service_scheme.json', $final_data))
			{
				$message='data append successfully.';
			}

		}else
		{
			$error ="file doesn't exists";
		}
	}
}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>New Scheme</title>
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" type="text/css" href="css/enterSchemeForm.css" />
	<link href='https://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	<script src="../jQuery_v3_1_0.js"></script>
</head>
<body>
<header>
	<ul class="main-nav">
		<li><a href="index.html">Home</a></li>
		<li><a href="bhamashah.rajasthan.gov.in">Bhamashah</a></li>
		<!-- <li><a href="enter_scheme.html">Enter new scheme</a></li> -->
		<li><a href="enter_user.php">Enter new user</a></li>
	</ul>
</header>
<div class="img-container"></div>
<div class="form-container">
<h4 class="formTitle">Fill Details</h4>
<style>
	.formTitle{
		text-align: center;
		font-size:  20px;
	}
</style>
	<form method="POST">
	<?php
		if(isset($error))
		{
			echo $error;
		}
	?>
	<label for="s_id"> Scheme ID: </label>
		<input type="text" id="s_id" name="s_id" required/>



		<label for="s_name"> Scheme Name: </label>
		<input type="text" id="s_name" name="s_name" required/>



		<label for="s_desc"> Scheme Description: </label>
		<input type="text" id="s_desc" name="s_desc" required/>


	<fieldset>
		<legend> Eligibility Criteria:</legend>

				<label for="s_ecmin"> min age: </label>
				<input type="text" id="s_ecmin" name="s_ecmin" required/>



				<label for="s_ecmax"> max age: </label>
				<input type="text" id="s_ecmax" name="s_ecmax" required/>

	</fieldset>


		<label for="s_date">launching Date(9/27/2018 4:27): </label>
		<input type="text" id="s_date" name="s_date" required/>

		<input type="submit" name="submit" value="Create New Scheme">
		<?php
			if(isset($message))
			{
				echo $message;
			}
		?>
	</form>
</div>

<script>
	$(document).ready(function(){
		$('input[type=text]').focusin(function(){
			var id = $(this).attr('id');
			$('label[for='+id+']').addClass('changeLabel');
		});

		$('input[type=text]').focusout(function(){
				var text= $(this).val();
				if(text == '')
					$('label[for='+id+']').removeClass('changeLabel');

			});
	});
</script>
</body>
</html>