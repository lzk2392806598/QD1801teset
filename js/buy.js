console.log("buy加载成功");

define(["jquery","jquery-cookie"],function($){
	var buy = function(){
		//已经存储在cookie数据进行加载
		function sc_carp(){
			var sc_str = $.cookie("goods");
			if(sc_str){ //判断字符串是否存在
				var sc_arr = eval(sc_str);
				var sc_num = 0;
				var count = 0;
				var countAll = 0;
				var minus = 0;
				for(var i in sc_arr){
					sc_num = Number(sc_arr[i].num) + sc_num;
					countAll +=sc_arr[i].priceOld*100 * Number(sc_arr[i].num);

					count += sc_arr[i].price*100 * Number(sc_arr[i].num);
					
				}	
				minus = parseFloat((countAll - count)/100);

				$(".buy-sum-num").find("span").html(sc_num);
				$(".buy-sum-all").find("span").html(`￥${countAll/100}`);
				$(".buy-sum-minus").find("span").html(`￥${minus}`);
				$(".buy-count").find("span").html(`￥${count/100}`);
			}
		}
		function sc_msgp(){
			$.ajax({
				url: "data/focus.json",
				type: "get",
				success: function(res){
					var sc_arr = eval($.cookie("goods"));
					var cookiehtml = '';
					var grade = "";
					for(var i in sc_arr){
						grade = res[sc_arr[i].id].price;

						var sc_grade=parseFloat(grade.substring(1))*10;
						cookiehtml += '<li class="cl"><div class="buy-li-top"></div><div class="sc_goodsPic"><img src="'+res[sc_arr[i].id].img+'" alt=""></div><div class="sc_goodsTitle"><a href="">'+res[sc_arr[i].id].title+'</a></div><div class="sc_goodsPrice"><strong>'+res[sc_arr[i].id].price+'</strong><span>'+sc_grade+'</span><div class="fav">&nbsp</div><p>X'+sc_arr[i].num+'</p></div><a href="" class="sc_delete" id ="'+sc_arr[i].id+'">删除</a></li>';
					}
					$(".buy-ul").html(cookiehtml);
				},
	            error:function(error, xxx){
	                console.log(error + ", " + xxx);
	            }	
			})
		}
		sc_carp();
		sc_msgp();
		//删除清单
		$(".buy-ul").on("click",".sc_delete",function(){
			var id = this.id;
			var str = $.cookie("goods");
			var arr = eval(str);
			//遍历所有的对象，判断是否id相同，num++
			var del = false;
			var delindex = 0;
			var arrlen = arr.length;
			for(var i = 0 ; i < arr.length;i++){
				if(arr[i].id == id){
					if (arr[i].num > 1) {
						arr[i].num = arr[i].num - 1;
					}else if (arr[i].num == 1) {
						del = true;
						delindex = i;
						
					};
					//删除对应cookie
					if (del) {
						var arr1 = arr.slice(0,i);
						var arr2 = arr.slice(i + 1,arr.length);
						arr = arr1.concat(arr2);
						del= false;	
						break;
					}
				}
			}	
				
			var cookieStr = JSON.stringify(arr);
			$.cookie("goods", cookieStr,  {
				expires: 7
			});
			sc_carp();
			sc_msgp();
			return false;
		})	
	}
	return {
		buy:buy
	}
})