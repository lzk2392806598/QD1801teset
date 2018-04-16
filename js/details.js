console.log("details加载成功");

define(["jquery","jquery-cookie"],function($){
	var details = function(){
		//全部商品数据
		$.ajax({
			url: "data/classify.json",
			type: "GET",
			success: function(res){
				//将数据进行解析，添加到页面上
				var classifyHtml = "";
				var secHtml = "";
				for(var i = 0; i < res.length; i++){			
					for (var j = 0; j <res[i].subTitle.length; j++) {
						secHtml += '<li class="classify_li"><a href="#">'+res[i].subTitle[j].classify+'</a></li>';
					};
					classifyHtml += '<li class="classify_item"><s></s><a href="#">'+res[i].title+'</a><i></i><ul class="classify_ul">'+secHtml+'</ul></li>';
					secHtml = "";
				}
				$(".classify").html(classifyHtml);
			}
		})
		$.ajax({
			url: "data/classify.json",
			type: "GET",
			success: function(res){	

				for(var i = 0; i < res.length; i++){	
					$(".classify").find(".classify_item").eq(i).find("s").css("backgroundImage",`url(${res[i].img})`);
					$(".classify").find(".classify_item").eq(i).find("s").css("backgroundSize","contain");
				}	
			}
		})
		//全部商品js
		$(".nav-all").mouseover(function(){
			$(".classify").css("display","block");
			$(".classify_item").mouseover(function(){
				$(this).find(".classify_ul").eq(0).stop().animate({
					height:200
				},500);

			});
			$(".classify_item").mouseout(function(){
				$(this).find(".classify_ul").eq(0).stop().animate({
					height:0
				},500)
			})
		})
		$(".nav-all").mouseout(function(){
			$(".classify").css("display","none");
			return false;
		})
		//放大镜
		function big(){
		var oS_box=document.getElementById('s_box');
		var oS_position=oS_box.children[2];
		var oS_mark=oS_box.children[0];
		var oB_box=document.getElementById('b_box');
		var oB_box_all=document.getElementById('b_box_all')
		oS_mark.onmouseover=function(){
			oS_position.style.display='block';
			oB_box.style.display='block';

		}
		oS_mark.onmouseout=function(){
			oS_position.style.display='none';
			oB_box.style.display='none';
		}

		oS_mark.onmousemove=function(event){
			var evt=event||window.event;

			var left=evt.offsetX-oS_position.offsetWidth/2;
			//console.log(left)
			
			if(left<0){
				left=0;
			}else if(left>oS_box.offsetWidth-oS_position.offsetWidth){
				left=oS_box.offsetWidth-oS_position.offsetWidth
			}
			//console.log(left)
			oS_position.style.left=left+'px';


			var top=evt.offsetY-oS_position.offsetHeight/2;
			if(top<0){
				top=0;
			}else if(top>oS_box.offsetHeight-oS_position.offsetHeight){
				top=oS_box.offsetHeight-oS_position.offsetHeight
			}
			//console.log(top)
			oS_position.style.top=top+'px';

			//移动的比例  把X值和Y值换算成比例;

			var proportionX=left/(oS_box.offsetWidth-oS_position.offsetWidth);
			var proportionY=top/(oS_box.offsetHeight-oS_position.offsetHeight);

			console.log(proportionX+':'+proportionY)

			//利用比例去算出大小不同的元素的偏移距离；

			oB_box_all.style.left=-proportionX*(oB_box_all.offsetWidth-oB_box.offsetWidth)+'px';

			oB_box_all.style.top=-proportionY*(oB_box_all.offsetHeight-oB_box.offsetHeight)+'px';
		}
		}
		big();
	}
	return {
		details:details
	}
})