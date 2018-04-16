<?php 
	header("content-type:text/html;charset=utf-8");
	$userName = $_POST["name"];
	$userPassword = $_POST["password"];
	$con = mysql_connect("localhost", "root", "123456");

	if($con){
		echo "success";
	}else{
		echo "error";
		exit;
	}

	mysql_select_db("ebooks");

	$sql = "SELECT * FROM ebooksuser;";

	$res = mysql_query($sql);
	$is_ok = false;
	while($row = mysql_fetch_assoc($res)){
		if ($userName == $row['name'] && $userPassword == $row['password']) {			
			$is_ok = true;
		}else{
			continue;
		}		
	}
	if($is_ok){		
		echo "登录成功";
	}else{
		echo "账号密码不正确";
	}
 ?>