console.log("list加载成功");

define(["jquery","jquery-cookie"],function($){
	var list = function(){
		//图书加载
		$.ajax({
			url: "data/focus.json",
			type: "GET",
			success: function(res){
				//将数据进行解析，添加到页面上
				var listHtml = "";
				for(var i = 0; i < res.length; i++){
					listHtml += '<li class="list-li"><div class="list-pic"><a href="details.html"><img src="'+res[i].img+'" alt=""></a></div><div class="sc"><div class="sc_btn" id="'+res[i].id+'" >加入购物车</div></div><div class="list-title"><a href="details.html">'+res[i].title+'</a></div><div class="list-price cl"><p>'+res[i].price+'</p><p>'+res[i].priceOld+'</p></div><div class="list-cont"><a href="details.html">'+res[i].content+'</a></div></li>';
				}
				$(".list-books").find("ul").eq(0).html(listHtml);
			}
		})

		$(".list-books").on("mouseover","li",function(){			
			$(this).find(".list-cont").stop().animate({
				height: 89
			},300)
		})
		$(".list-books").on("mouseout","li",function(){
			
			$(this).find(".list-cont").stop().animate({
				height: 0
			},300)
		})
		//聚焦购物车
		function sc_car(){
			var sc_str = $.cookie("goods");
			if(sc_str){ //判断字符串是否存在
				var sc_arr = eval(sc_str);
				var sc_num = 0;
				var count = 0;
				for(var i in sc_arr){
					sc_num = Number(sc_arr[i].num) + sc_num;
					count += parseFloat(sc_arr[i].price * Number(sc_arr[i].num));
					
				}
				$(".car-ul-sum").find("strong").html(`￥${count}`);
				$(".car-ul-num").find("strong").html(sc_num);
				$(".car-top").html(sc_num);
				$(".usercar-top").html(sc_num);
			}
		}
		//侧边购物车
		$(".list-books").on("click", ".sc_btn", function(){
			var pricestr = $(this).parent().parent().find(".list-price").find("p").eq(0).html();
			var price = parseFloat(pricestr.substring(1));
			var priceOstr = $(this).parent().parent().find(".list-price").find("p").eq(1).html();
			var priceO = parseFloat(priceOstr.substring(1));
			// alert(this.id);
			//是否是第一次添加cookie
			var id = this.id;
			var first = $.cookie("goods") == null ? true : false;
			if(first){
				//第一次添加  [{id:id,num:2}]
				$.cookie("goods", '[{id:' + id + ',num:1,price:'+price+',priceOld:'+priceO+'}]', {
					expires: 7
				});
				
			}else{
				var str = $.cookie("goods");
				
				var arr = eval(str);
				var same = false; //代表是否有相同商品

				//遍历所有的对象，判断是否id相同，num++
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num = arr[i].num + 1;
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods", cookieStr,  {
							expires: 7
						});
						same = true;
						break;
					}
				}

				//没有相同的商品
				if(!same){
					var obj = {id: id, num: 1,price: price,priceOld:priceO};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods", cookieStr, {
						expires: 7
					});
				}
			}
			sc_car();
				
			
			var imgtodrag = $(".list-books").find('.list-li').eq(id).find("img");//获取当前btn
				if (imgtodrag) {
					var imgclone = imgtodrag.clone().offset({
						top: imgtodrag.offset().top,
						left: imgtodrag.offset().left
					}).css({
						'opacity': '0.9',
						'position': 'absolute',
						'height': '90px',
						'width': '90px',
						'z-index': '100'
					}).appendTo($('body')).animate({
						'top': $('.sc_pic').offset().top,
						'left': $('.sc_pic').offset().left + 10,
						'width': 50,
						'height': 50
					}, 1000);
					
					imgclone.animate({
						'width': 10,
						'height': 10
					}, function () {
						$(this).detach();
					});
				}
			// alert($.cookie("goods"));			
			return false;
		})	
	}
	return {
		list:list
	}
})