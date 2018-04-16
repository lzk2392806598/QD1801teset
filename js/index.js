console.log("index加载成功");

define(["jquery","jquery-cookie"],function($){
	var index = function(){
		//固定搜索栏
		
		$(window).on("scroll",function(){
			var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
			/*document.title= scrollTop;*/
			if (scrollTop >= 95) {
				$(".fix-header").css("display","block");
				$(".fix-header").stop().animate({
					height:124
				},800)
				$(".backtop").css("display","block");
			}else{
				$(".fix-header").css("display","none");
				$(".fix-header").stop().animate({
					height:0
				},100);
				$(".backtop").css("display","none");
			}
		})
		//返回顶部
		var toptimer = "";
		$(".backtop").click(function(){

        //设置一个定时器
        toptimer = setInterval(function(){
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            isTop =true;  //用于阻止滚动事件清除定时器
            if(osTop == 0){
                clearInterval(toptimer);
            }
        },30);
    		 /*$("html,body").animate({scrollTop:0}, 500);*/

		})
		//引入导航栏数据
		$.ajax({
			url: "data/nav.json",
			type: "GET",
			success: function(res){
				//将数据进行解析，添加到页面上
				var navHtml = "";
				for(var i = 0; i < res.length; i++){
					navHtml += '<li class="other_item"><a href="list.html">'+res[i].title+'</a></li>';
				}
				$(".other").html(navHtml);
				var navWidth = 1000 / res.length;
				$(".other_item").css("width",navWidth);
				
			}
		})
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
						secHtml += '<li class="classify_li"><a href="list.html">'+res[i].subTitle[j].classify+'</a></li>';
					};
					classifyHtml += '<li class="classify_item"><s></s><a href="list.html">'+res[i].title+'</a><i></i><ul class="classify_ul">'+secHtml+'</ul></li>';
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
				},500)
			});
			$(".classify_item").mouseout(function(){
				$(this).find(".classify_ul").eq(0).stop().animate({
					height:0
				},500)
			})
		})
		$(".nav-all").mouseout(function(){
			$(".classify").css("display","none");
		})
		//卷闸顶部
		
		$(".easy-box").mouseover(function(){
			$(".easy").stop().animate({
				height: 78
			},500)
		})
		$(".easy-box").mouseout(function(){
			$(".easy").stop().animate({
				height: 0
			},500)
		})
		$(".help-box").mouseover(function(){
			$(".help").stop().animate({
				height: 130
			},500)
		})
		$(".help-box").mouseout(function(){
			$(".help").stop().animate({
				height: 0
			},500)
		})
		$(".server-box").mouseover(function(){
			$(".server").stop().animate({
				height: 52
			},500)
		})
		$(".server-box").mouseout(function(){
			$(".server").stop().animate({
				height: 0
			},500)
		})
		$(".erweima-box").mouseover(function(){
			$(".erweima").stop().animate({
				height: 150
			},500)
		})
		$(".erweima-box").mouseout(function(){
			$(".erweima").stop().animate({
				height: 0
			},500)
		})
		
		//轮播图
		var aBtns = $(".page-p").find(".small").find("li");
		var arrBtns = $.makeArray(aBtns);
		var oUl = $(".page-p").find(".big");
		var aLis = oUl.find("li");

		var iNow = 0; //当前是第几张图片索引
		var timer = null;

		aBtns.click(function(){
			iNow = $(this).index();
			tab();
		})
		//设置轮播图宽高
		var oWidth = document.body.offsetWidth;
		$(".page-p").css("width",oWidth);

		oUl.css("width",oWidth * 6);
		for (var i = 0; i < aLis.length; i++) {
			aLis[i].style.width = oWidth + "px";
			aLis.eq(i).find("img").eq(0).css("width",oWidth);
		};
		function tab(){
			aBtns.removeClass("active").eq(iNow).addClass("active");
			if(iNow == 5){
				aBtns.eq(0).addClass("active");
			}
			//让ul动
			oUl.animate({
				left: -oWidth * iNow
			}, 1000, function(){
				if(iNow == 5){
					iNow = 0;
					oUl.css("left", 0);
				}
			})		
		}


		function timerInner(){
			iNow++;
			tab();
			
		}

		timer = setInterval(timerInner, 2000);

		//添加移入移出效果
		$(".page-p").hover(function(){
			clearInterval(timer);
			if ($(".small").on("mouseover")) {
				$(".small").on("mouseover","li",function(){
					aBtns.removeClass("active");
					$(this).addClass("active");
					iNow = $(this).index();					
					oUl.css("left", -oWidth * iNow);
					oUl.stop();
				})
			}			
		}, function(){
			timer = setInterval(timerInner, 2000);
		})
		//聚焦图书加载
		$.ajax({
			url: "data/focus.json",
			type: "GET",
			success: function(res){
				//将数据进行解析，添加到页面上
				var focusHtml = "";
				for(var i = 0; i < res.length; i++){
					focusHtml += '<li class="focus-li"><div class="focus-pic"><a href="details.html"><img src="'+res[i].img+'" alt=""></a></div><div class="sc"><div class="sc_btn" id="'+res[i].id+'" >加入购物车</div></div><div class="focus-title"><a href="details.html">'+res[i].title+'</a></div><div class="focus-price cl"><p>'+res[i].price+'</p><p>'+res[i].priceOld+'</p></div><div class="focus-cont"><a href="details.html">'+res[i].content+'</a></div></li>';
				}
				$(".focus-ul").html(focusHtml);
			}
		})

		$(".focus-ul").on("mouseover","li",function(){			
			$(this).find(".focus-cont").stop().animate({
				height: 89
			},300)
		})
		$(".focus-ul").on("mouseout","li",function(){
			
			$(this).find(".focus-cont").stop().animate({
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

		//加入购物车
		sc_car();
		//购物车高度
		var carHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var carHeightUl = carHeight - 80;
		$(".shoppingcar").find("a").eq(1).on("mouseover",function(){
			$(".car-box").stop().animate({
				right:0
			},300);		
			var carHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var carHeightUl = carHeight - 90;
			$(".car-ul-box").css("height",carHeight);	
			$(".car-bbox").css("height",carHeightUl);
			$("car-bbox").css("width",$(".car-ul-box").find("h3").css("width"));
			var arrhei = parseInt($(".car-bbox").find("ul").eq(0).css("height"));
			
			if (arrhei >= carHeightUl) {
				$(".car-bbox").find("ul").eq(0).css("margin-right","-20px");
			}else{
				$(".car-bbox").find("ul").eq(0).css("margin-right","0");
			}			
			sc_msg();
			
		})
		//购物栏移入移出
		$(".car-ul-box").on("mouseover",function(){
			$(".car-box").stop().animate({
				right:0
			},300);
			var arrhei = parseInt($(".car-bbox").find("ul").eq(0).css("height"));
			
			if (arrhei >= carHeightUl) {
				$(".car-bbox").find("ul").eq(0).css("margin-right","-20px");
			}else{
				$(".car-bbox").find("ul").eq(0).css("margin-right","0");
			}
			$(".car-ul-box").find("h3").find("span").click(function(){
				$(".car-box").css("right","-270px");
			})
		})

		$(".car-box").on("mouseout",function(){
			$(".car-box").stop().animate({
				right:-270
			},800)
		})			
		//购物栏添加删除	
		$(".focus-ul").on("click", ".sc_btn", function(){
			var pricestr = $(this).parent().parent().find(".focus-price").find("p").eq(0).html();
			var price = parseFloat(pricestr.substring(1));
			var priceOstr = $(this).parent().parent().find(".focus-price").find("p").eq(1).html();
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
				
			
			var imgtodrag = $(".focus-ul").find('.focus-li').eq(id).find("img");//获取当前btn
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
		//购物栏清单删除
		$(".car-ul-box").find("ul").eq(0).on("click",".sc_delete",function(){
			var arrhei = parseInt($(".car-bbox").find("ul").eq(0).css("height"));
			
			if (arrhei >= carHeightUl) {
				$(".car-bbox").find("ul").eq(0).css("margin-right","-20px");
			}else{
				$(".car-bbox").find("ul").eq(0).css("margin-right","0");
			}
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
			sc_msg();
			sc_car();
			return false;
		})	
		//已经存储在cookie数据进行加载
		function sc_msg(){
			$.ajax({
				url: "data/focus.json",
				type: "get",
				success: function(res){
					var sc_arr = eval($.cookie("goods"));
					var cookiehtml = '';
					for(var i in sc_arr){
						cookiehtml += '<li class="cl"><div class="sc_goodsPic"><img src="'+res[sc_arr[i].id].img+'" alt=""></div><div class="sc_goodsTitle"><a href="details.html">'+res[sc_arr[i].id].title+'</a></div><div class="sc_goodsPrice"><strong>'+res[sc_arr[i].id].price+'</strong>X'+sc_arr[i].num+'</div><a href="" class="sc_delete" id ="'+sc_arr[i].id+'">删除</a></li>';
					}
					$(".car-ul-box ul").html(cookiehtml);
				}
			})
		}
		//推荐选项卡
		$.ajax({
			url: "data/commend.json",
			type: "GET",
			success: function(res){
				//左侧数据
				var commendHtml = "";
				var tabHtml= "";
				var comUlHtml = "";
				var tabLiHtml = "";
				for(var i = 0; i < res[0].left.length; i++){
					tabHtml += '<li class="tab-li"><a href="">'+res[0].left[i].title+'</a></div></li>';
					
					for (var j = 0; j < res[0].left[i].sub.length; j++) {
						commendHtml+= '<li class="commend-li"><div class="commend-pic"><a href="details.html"><img src="'+res[0].left[i].sub[j].img+'" alt=""></a></div><div class="commend-title"><a href="details.html">'+res[0].left[i].sub[j].subTitle+'</a></div><div class="commend-price cl"><p>'+res[0].left[i].sub[j].price+'</p><p>'+res[0].left[i].sub[j].priceOld+'</p></div></li>';
					}	
					comUlHtml +='<ul class="commend-ul cl">'+commendHtml+'</ul>';
					commendHtml = "";		
				}
				
				tabLiHtml = '<li class="tab-underline"><b></b></li>' + tabHtml
				$(".tab-box").html(tabLiHtml);
				$(".commend-ul-box").html(comUlHtml);
				$(".commend-ul-box").find(".commend-ul").eq(0).css("display","block");
				//右侧数据
				var contHtml = "";
				for (var i = 0; i < res[1].right.length; i++) {
					contHtml +='<li class="cont-li"><div class="cont-pic"><a href="details.html"><img src="'+res[1].right[i].img+'" alt=""></a></div><div class="cont-tit"><a href="details.html">'+res[1].right[i].title+'</a></div><div class="cont-price cl"><p>'+res[1].right[i].price+'</p><p>'+res[1].right[i].priceOld+'</p></div></li>'
				};

				$(".cont-ul").html(contHtml);
			}
		})
		//推荐选项卡
		$(".tab-box").on("mouseover",".tab-li",function(){
		
			$(".tab-underline").animate({
				left:$(this).index()*100 - 90
			},200);

			$(".commend-ul-box").find(".commend-ul").css("display","none").eq($(this).index()-1).css("display","block");
		});
		//作者推荐
		$.ajax({
			url: "data/author.json",
			type: "GET",
			success: function(res){
				//左侧数据
				var authorCHtml = "";
				var authorNewsHtml = "";
				var authorTabHtml= "";
				var authorUlHtml = "";
				var authorDivHtml = "";
				var authorLiHtml = "";
				var authorNewsPhoHtml = "";
				for(var i = 0; i < res.left.news.length; i++){
					authorNewsHtml += '<li class="news-li"><a href="list.html"><strong>【热荐】</strong>'+res.left.news[i].title+'</a></div></li>';

				}
				$(".author-news").html(`<a href=""><img src="${res.left.img}"></a>`);
				$(".author-news-ul").html(authorNewsHtml);

				for(var i = 0; i < res.center.length; i++){
					authorTabHtml += '<li class="author-tab-li"><a href="list.html">'+res.center[i].name+'</a></div></li>';		
					for (var j = 0; j < res.center[i].works.length; j++) {
						authorLiHtml += '<li class="author-li"><div class="author-pic"><a href="details.html"><img src="'+res.center[i].works[j].img+'" alt=""></a></div><div class="author-tit"><a href="details.html">'+res.center[i].works[j].title+'</a></div><div class="author-price cl"><p>'+res.center[i].works[j].price+'</p><p>'+res.center[i].works[j].priceOld+'</p></div></li>';
					}
					authorDivHtml+= '<div class="author-c-t"><div class="author-c-pic"><a href=""><img src="'+res.center[i].nameImg+'" alt=""></a></div><div class="author-c-name"><a href="">'+res.center[i].name+'</a></div><div class="author-c-introduce">'+res.center[i].introduce+'</div></div><span>相关作品</span><ul class="author-ul">'+authorLiHtml+'</ul>';
					authorLiHtml="";
					authorCHtml += '<div class="author-center">'+authorDivHtml+'</div>';
					authorDivHtml = "";
				}
				authorTabHtml += '<li class="author-tab-underline"><b></b></li>'
				$(".author-tab-box").html(authorTabHtml);
				$(".author-center-box").html(authorCHtml);
				var authorRHtml = "";
				for (var i = 0; i < res.right.length; i++) {
					authorRHtml += '<li class="author-right-li"><a href="">'+res.right[i].name+'</a></li>';
				}
				$(".author-right-ul").html(authorRHtml);
				$(".author-center-box").find(".author-center").eq(0).css("display","block");
			}
		})
		//作者推荐选项卡
		$(".author-tab-box").on("mouseover",".author-tab-li",function(){
			$(".author-tab-underline").animate({
				left:$(this).index()*100 + 10
			},200);

			$(".author-center-box").find(".author-center").css("display","none").eq($(this).index()).css("display","block");
		});
		//电子书加载
		$.ajax({
            url: "data/ebook.json",
            type:"get",
            success: function(res){
            	$(`	<div class = "ebook-l-pho">
            			<a href="details.html">
            				<img src="${res.left.img}" alt="">
            			</a>
            		</div>
            		<div class = "ebook-l-tit">
            			<a href="details.html">${res.left.title}</a>
            		</div>
            		<div class = "ebook-l-cont">${res.left.content}</div>`).appendTo($(".ebook-l-content"));
            	for (var i = 0; i < res.center.photo.length; i++) {
            		$(`<a href="details.html">
            				<img src="${res.center.photo[i].img}" alt="">
            			</a>`).appendTo($(".ebook-c-pho"));
            	};
            	for (var i = 0; i < res.center.ebook.length; i++) {
            		$(`<li class="c-ebook-li">
            				<div class="ebook-li-pic">
            				<a href="details.html">
            					<img src="${res.center.ebook[i].img}" alt="">
            				</a>
            				</div>
            				<div class="ebook-li-title">
            				<a href="details.html">${res.center.ebook[i].title}</a>
            				</div>
            				<div class="ebook-li-price">${res.center.ebook[i].price}</div>
            			</li>`).appendTo($(".ebook-c-ebook"));
            	};
            	for (var i = 0; i < res.center.name.length; i++) {
            		$(`	<li class="c-name-li">
            			<a href="">${res.center.name[i].title}</a>
            			</li>`).appendTo($(".ebook-c-name"));
            	};                   
            },
            error:function(error, xxx){
                console.log(error + ", " + xxx);
            }
        })
		//百货加载
		$.ajax({
            url: "data/general.json",
            type:"get",
            success: function(res){
            	$(`<a href="list.html">
            			<img src="${res.center.img}" alt="">
            		</a>`).appendTo($(".general-center"));
            	$(`<a href="list.html">
            			<img src="${res.left.img}" alt="">
            		</a>`).appendTo($(".general-l-pho"));
            	for (var i = 0; i < res.left.seller.length; i++) {
            		$(`	<li>
            				<a href="">${res.left.seller[i].name}</a>
            			</li>`).appendTo($(".general-l-b"));
            	};
            	for (var i = 0; i < res.right.length; i++) {
            		$(`<li>
            				<div class="general-li-pic">
            				<a href="details.html">
            					<img src="${res.right[i].img}" alt="">
            				</a>
            				</div>
            				<div class="general-li-title">
            				<a href="details.html">${res.right[i].title}</a>
            				</div>
            			</li>`).appendTo($(".general-right"));
            	}            	  
            },
            error:function(error, xxx){
                console.log(error + ", " + xxx);
            }
        })

	}
	return {
			index:index
	}

})