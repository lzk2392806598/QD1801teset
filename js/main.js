console.log("加载成功");

/*
	配置路径
*/
require.config({
	paths: {
		"jquery":"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        login:"login",
        index:"index",
        details:"details",
        buy:"buy",
        list:"list"

        
	},
	shim: {
		"jquery-cookie":["jquery"]
	}
})
define(["login","index","details","buy","list"],function(login,index,details,buy,list){
	function main(){
		index.index();
		login.login();		
		buy.buy();
		list.list();
		details.details();

	}
	return{
		main:main()
	}
})
