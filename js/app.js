/* 地理位置信息库，注意北京市，天津市直辖市，筛选值 */

var _default_city = "广州市";
var _default_province = "广东省";

var _current_city;
var _current_province;

var _current_lat;
var _current_lng;

var _default_lat = '23.05413';
var _default_lng = '113.3958';

var getPositionModule = {
  "getPosition" : function (){
    /* 这里应该从url中获取 */
    /* 可以将_current_lat or _current_lng 转为整型，再做出判断 */
    if( document.URL.split("?").length == 1 ){
      getPositionModule.requestPosition( _default_lat , _default_lng );
    }
    else{
      _current_lat = document.URL.split("?")[1].split("&")[0].split("=")[1];
      _current_lng = document.URL.split("?")[1].split("&")[1].split("=")[1];
      if ( parseInt(_current_lat) && parseInt(_current_lng)  ){
        getPositionModule.requestPosition( _current_lat, _current_lng );
      }
      else{
        popUpModule.show("定位失败","获取默认地址");
        setTimeout( function (){ popUpModule.hide(); }, 1000 );
        getPositionModule.requestPosition( _default_lat , _default_lng );
      }
    }
  },
  "requestPosition" : function ( the_lat , the_lng ){
    var positionRequestSetting = {
      url: 'server/getLocation.php',
      type: 'POST',
      data: 'lat='+ the_lat +'&lng=' + the_lng ,
      error: function (){  popUpModule.error(); },
      beforeSend: function(){ popUpModule.show("正在获取地理信息",""); },
      success: function(m){
        popUpModule.hide();
        /* get cityname and province */
        var obj = JSON.parse(m);
        console.log(obj);
        _current_city = obj.result.addressComponent.city;
        _current_province = obj.result.addressComponent.province;
        return selectModule.loadProvince( _current_province , _current_city ); 
        /* 要判断city and province 为空的情况 */
      }
    }; 
    $.ajax( positionRequestSetting );
  }
}


var selectModule = {
  "loadProvince" : function ( theprovince , thecityname ){
    $.get("lib/json-array-of-province.json", function(data_p){
        var provincename = theprovince;
        var data_p = JSON.parse(data_p);
        //console.log(data_p.province);
        for(var i=0;i<data_p.province.length;i++){
          if ( provincename.substring(0,2) == data_p.province[i].name.substring(0,2) ){
            $("#province").append("<option id=province_id_"+data_p.province[i].code+" selected=selected value="+data_p.province[i].code+">"+data_p.province[i].name+"</option>");
            $("#provinceValue a").html( provincename );
          }
          else{
            $("#province").append("<option id=province_id_"+data_p.province[i].code+" value="+data_p.province[i].code+">"+data_p.province[i].name+"</option>");
          }
        }
        selectModule.loadCity(thecityname);
    });
  },
  "loadCity" : function ( thecityname ){
    var cityResourceRequest = {
      url: 'lib/json-array-of-city.json?version='+ new Date().getTime() ,
      type: 'GET',
      error: function(){ popUpModule.error(); },
      beforeSend: function (){ popUpModule.show("正在加载城市数据" , ""); },
      timeout: 10000,
      success: function(data_c){
        $("#city").html("");
        var cityname = thecityname;
        popUpModule.hide();
        var data_c = JSON.parse(data_c);
        for(var j=0;j<data_c.city.length;j++){
          var provinceNum = $("#province").val();
          if (provinceNum.substring(0, 2) == data_c.city[j].code.substring(0, 2)){
            if ( cityname == data_c.city[j].name ){
              $("#city").append("<option id=city_id_"+ data_c.city[j].code +" selected=selected value=" + data_c.city[j].code + data_c.city[j].name +">"+ data_c.city[j].name +"</option>");
              $("#cityValue a").html( cityname );
            }
            else{
              $("#city").append("<option id=city_id_"+ data_c.city[j].code +" value=" + data_c.city[j].code + data_c.city[j].name +">"+ data_c.city[j].name +"</option>");
            }
          }
        }
      }
    }; 
    $.ajax( cityResourceRequest );
  },
  "bindSelectEvent" : function (){

    $("#province").bind('change',function(){
			$("#city").html("");
      var now_province_value = $("#province").val();
      var now_province_name = $("#province_id_" + now_province_value).html();
      $("#provinceValue a").html(now_province_name);
      $("#cityValue a").html("请选择城市");
      var cityResourceAync = {
        url: 'lib/json-array-of-city.json',
        type: 'GET',
        error: function(){ popUpModule.error(); },
        beforeSend: function(){ popUpModule.show("正在加载城市数据", ""); },
        success: function(data_c){
          popUpModule.hide();
          var data_c = JSON.parse(data_c);
          for(var j=0;j<data_c.city.length;j++){
            var provinceNum = $("#province").val();
            if (provinceNum.substring(0, 2) == data_c.city[j].code.substring(0, 2)){
                $("#city").append("<option id=city_id_"+ data_c.city[j].code +" value=" + data_c.city[j].code + data_c.city[j].name +">"+ data_c.city[j].name +"</option>");
            }
				  }
        },
      };      
      $.ajax( cityResourceAync );
		});

    //当省份改变是加载城市信息
    $("#city").bind("change", function (){
      var now_city_value = $("#city").val().substring(0,6);
      var now_city_name = $("#city_id_" + now_city_value).html();
      $("#cityValue a").html(now_city_name);
      _current_city = $("#cityValue a").html();
      _current_province = $("#provinceValue a").html();
    });

  }
}

/* display the error and loading msg */
var popUpModule = {
  "show" : function ( text1 , text2 ){ $('#pop-msg').html("<p>"+ text1 +"</p><p>"+ text2 +"</p>").show(); },
  "hide" : function (){ $('#pop-msg').hide(); },
  "error" : function (){
    $('#pop-msg').html("<p>网络错误或者过慢</p><p>请重试</p>").show();
    setTimeout(function (){ $('#pop-msg').hide().html("<p>正在获取</p><p>当前天气...</p>"); }, 1500 );
  }
}



$(document).ready(function(){

  /* public run functions here */
  selectModule.bindSelectEvent();//绑定筛选列表的事件

  //加载筛选列表
  //涉及到地理位置判断
  //涉及到手机版本判断
  //if( $('#applat').val() == '0.000000' || $('#applng').val() == '0.000000'){ getPositionModule.getPosition(); }
  if( $.os.android.toString() == 'true' ){ getPositionModule.getPosition(); }
    else {
      /* 这里应该是先获取地理位置信息，然后再获取天气情况 */
      //getWeatherModule.getNormalWeather( '广州市','广东省','广州市' );
      if (navigator.geolocation) { return getPositionModule.getPosition();  }
        else { popUpModule.show("你的设备不支持geolocation哦",""); setTimeout( function (){ popUpModule.hide(); }, 1000 ); }
    }

});
