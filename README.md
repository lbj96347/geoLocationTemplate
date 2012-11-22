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

style : 
  &lt;link rel='stylesheet' type='text/css' href='css/style.css' /&gt;

Javascript :
  &lt;script src="lib/jq.mobi.min.js"&gt; &lt;/script&gt;
  &lt;script type='text/javascript' language='javascript' src="js/app.js"&gt; &lt;/script&gt;

</pre>
<p>然后在body中添加必要的元素<p>
<pre>

  &lt;div id=pop-msg &gt;
    &lt;p&gt;正在获取 &lt;/p&gt;&lt;p&gt;当前地理信息...&lt;/p&gt;
  &lt;/div&gt;

  &lt;div id=select-form&gt;
    &lt;div id=provinceValue class=selectValue&gt;
      &lt;a&gt;加载中...&lt;/a&gt;
      &lt;select id=province&gt;
        &lt;option&gt;请选择省份&lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;

    &lt;div id=cityValue class=selectValue&gt;
      &lt;a&gt;加载中...&lt;/a&gt;
      &lt;select id=city&gt;
        &lt;option id=city_val value=0&gt;请选择城市&lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;

    <!-- 作为调试用，获取当前地理位置的latitude 以及 longitude  
      <input id=applat style=display:none  type=text value=<?php echo substr($_GET[latitude],0,8) ?>  placeholder=app-lat/>
      <input id=applng style=display:none  type=text value=<?php echo substr($_GET[longitude],0,8).substr($_GET[longtitude],0,8) ?>  placeholder=app-lng/>
    -->
  &lt;/div&gt;

</pre>
<p>你已经没有更多的东西要处理了 :-) </p>
<h1>Versions</h1>
<ul>
  <li>v1.0.0 简单部署，基本功能使用</li>
</ul>
