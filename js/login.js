console.log("login加载成功");

define(["jquery","jquery-cookie"],function($){
	var login = function(){
		$(document).ready(function(c) {
			$('.close').on('click', function(c){
				$('.login-form').fadeOut('slow', function(c){
			  		$('.login-form').css("display","none");
				});
			});
			$("h1").on('click', function(c){
				$('.login-form').fadeIn('slow', function(c){
			  		$('.login-form').css("display","block");
				});
			});
		});
		$("#name").blur(function(){
			//<1>误输入的空格进行删除
			var oValue = this.value.replace(/\s/g, "");
			this.value = oValue;
			//<2>判断用户名不能为空
			if(!oValue){
				$("#name_span").html("用户名不能为空");
				$("#name_span").css("color","red");
			}else if(oValue.length > 18 || oValue.length < 6){
				$("#name_span").html("用户名长度必须是6~18位");
				$("#name_span").css("color","red");
			}else if(!/[a-zA-Z]/.test(oValue[0])){
				$("#name_span").html("用户名首字母必须为字母");
				$("#name_span").css("color","red");
			}else if(/\W/.test(oValue)){
				$("#name_span").html("用户名必须由数字字母下划线组成");
				$("#name_span").css("color","red");
			}else{
				$("#name_span").html("√");
				$("#name_span").css("color","green");
			}
		});
		$("#password").blur(function(){
			var oValuepw = $("#password")[0].value;
			if (oValuepw == "") {
				$("#password_span").html("密码不能为空");
				$("#password_span").css("color","red");
			}else if(!(/^.{6,16}$/.test(oValuepw))){
				$("#password_span").html("密码由6~16位字符构成");
				$("#password_span").css("color","red");
			}else{
				$("#password_span").html("√");
				$("#password_span").css("color","green");
			}
		}); 
		function CAPTCHA(n){
			var arr = [];
			for(var i = 0; i < n; i++){
				var num = Math.floor(Math.random() * 100);
				if(num >= 0 && num <= 9){
					arr.push(num);
				}else if(num >= 65 && num <= 90){
					arr.push(String.fromCharCode(num));
				}else if(num >= 27 && num <= 52){
					arr.push(String.fromCharCode(num + 70));
				}else{
					i--;
				}
			}
			return arr.join("");
		}
		$(function(){
			$(".codeN")[0].innerHTML = CAPTCHA(4);
			$(".codeN").click(function(){
				$(".codeN")[0].innerHTML = CAPTCHA(4);
				
			})
			$("#code").blur(function(){				
				var oValueid = this.value.replace(/ /ig,"");
				this.value = oValueid;
				if (oValueid == "") {
					$("#code_span")[0].innerHTML = "验证码不能为空";
					$("#code_span").css("color","red");

				}else if (oValueid.length != 4) {
					$("#code_span")[0].innerHTML = "验证码为4位";
					$("#code_span").css("color","red");
				}else if(oValueid.length == 4){
					if(oValueid.toLowerCase() == $(".codeN")[0].innerHTML.toLowerCase()){
					$("#code_span")[0].innerHTML = "验证码正确";
					$("#code_span").css("color","green");
					}else{
						$("#code_span")[0].innerHTML = "验证码不正确";
						$("#code_span").css("color","red");
					}
				}
			}) 	
		})
		$(".regis").click(function(){
			$.ajax({
				method: "post",
				url: "http://datainfo.duapp.com/shopdata/userinfo.php",
				data: `status=register&userID=${$("#name")[0].value}&password=${$("#password")[0].value}`,
				success: function(data){
					alert(data);
				},
				error: function(e){
					alert(e);
				}
			})
		})
		$(".signin").click(function(){
			$.ajax({
				method: "post",
				url: "http://datainfo.duapp.com/shopdata/userinfo.php",
				data: `status=login&userID=${$("#name")[0].value}&password=${$("#password")[0].value}`,
				success: function(data){
					alert(data);
				},
				error: function(e){
					alert(e);
				}
			})
		})
	}
	return {
		login:login
	}
})