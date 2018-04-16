<?php 
	header("content-type:text/html;charset=utf-8");

	$userName = $_POST["userName"];
	$userPassword = $_POST["userPassword"];


	$con = mysql_connect("localhost", "root", "123456");

	if($con){
		echo "success";
	}else{
		echo "error";
		exit;
	}

	mysql_select_db("ebooks");

	/*查询要注册账号是否存在*/
	$sql = "SELECT * FROM ebooksuser;";
	$res = mysql_query($sql);
	$is_ok = true;
	while($row = mysql_fetch_assoc($res)){
		if ($userName == $row['name']) {				
			$is_ok = false;
		}else{
			echo "";
		}		
	}
	/*判断要注册的账号不存在，不存在就添加到数据库*/
	if($is_ok){
		$login = "INSERT INTO ebooksuser VALUES('$userName','$userPassword');";
		echo "<br/>注册成功";
		if (mysql_query($login)) {
			echo "1";
		}else{
			echo "0";
		}
	}else{
		echo "注册失败，账号已存在";
	}

 ?>