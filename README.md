<h1>Geolocation Template</h1>
<p>这个简单的模板是用于完成即时获取地理位置（坐标），并关联到省，城市的交互需求。同时省，城市，可以实现筛选联动。<p>

<h1>Libraries</h1>
<ul>
  <li>jq.mobi.js 一个用于移动应用Web App开发的类库，兼容jQuery语法</li>
  <li>json-array-of-city.json 全国各大城市库（不包含港澳台）</li>
  <li>json-array-of-province.json 全国各省库（不包含港澳台）</li>
  <li>images/select.png 小图标</li>
  <li>app.js 主程文件</li>
</ul>

<h1>How to use it</h1>
<p>使用方法非常简单，首先将所需要的库添加到html文件中</p>
<pre>
<!--

style : 
  <link rel='stylesheet' type='text/css' href='css/style.css' />

Javascript :
  <script src="lib/jq.mobi.min.js"></script>
  <script type='text/javascript' language='javascript' src="js/app.js"></script>

-->
</pre>
<p>然后在body中添加必要的元素<p>
<pre>
<!--

  <div id=pop-msg>
    <p>正在获取</p><p>当前地理信息...</p>
  </div>

  <div id=select-form>

    <div id=provinceValue class=selectValue>
      <a>加载中...</a>
      <select id=province>
        <option>请选择省份</option>
      </select>
    </div>

    <div id=cityValue class=selectValue>
      <a>加载中...</a>
      <select id=city>
        <option id=city_val value=0>请选择城市</option>
      </select>
    </div>

  </div>

-->

<!-- 作为调试用，获取当前地理位置的latitude 以及 longitude  
  <input id=applat style=display:none  type=text value=<?php echo substr($_GET[latitude],0,8) ?>  placeholder=app-lat/>
  <input id=applng style=display:none  type=text value=<?php echo substr($_GET[longitude],0,8).substr($_GET[longtitude],0,8) ?>  placeholder=app-lng/>
-->

</pre>
<p>你已经没有更多的东西要处理了 :-) </p>
<h1>Versions</h1>
<ul>
  <li>v1.0.0 简单部署，基本功能使用</li>
</ul>
