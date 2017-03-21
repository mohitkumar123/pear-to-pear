<?php
$message= '';
$error = '';
if(isset($_POST["submit"]))
{
	$fp = fopen('user_details.json','a');
	// fclose($fp);
		if(file_exists('service_scheme.json'))
		{
			$current_data =file_get_contents('user_details.json');
			$array_data =json_decode($current_data,true);
			$data = array(
				"user_id" => $_POST['u_aid'],
				"user_name" => $_POST['u_name'],
				"BHAMASHAH_ID" => $_POST['u_bid'],
				"DOB" => $_POST['u_dob']
				);
			$array_data[] = $data;
			$final_data =json_encode($array_data);
			if(file_put_contents('user_details.json', $final_data))
			{
				$message='data append successfully.';
				echo '<script type="text/javascript">alert("' . $message . '")</script>';
			}

		}else
		{
			$error ="file doesn't exists";
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
		<li><a href="enter_scheme.php">Enter new scheme</a></li>

	</ul>
</header>
<div class="img-container"></div>
<div class="form-container">
	<form method="POST">
	<?php
		if(isset($error))
		{
			echo $error;
		}
	?>
		<label for="u_aid">AADHAR_ID: </label>
		<input type="text" id="u_aid" name="u_aid" required/>
		<label for="u_name">User Name: </label>
		<input type="text" id="u_name" name="u_name" required/>
		<label for="u_bid">BHAMASHAH_ID: </label>
		<input type="text" id="u_bid" name="u_bid" required/>
		<label for="u_dob">Date Of birth(27/01/1982): </label>
		<input type="text" id="u_dob" name="u_dob" required/>
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