$(function () {
  /* 初始化 */
  init();
  function init() {
   
    /* 请求轮播图数据 */
    getSwiperdata();
    /* 请求首页导航数据 */
    getCatitems();
    /* 按钮加载 */
    btnJiaZai();
    /* 请求首页商品的数据 */
    getGoodslist();
    /* 注册一大推事件 */
    eventList();
    
  }
 
  /* 轮播图 */
  function pyg_slide() {
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
    });

  }

  /* 请求轮播图数据 */
  function getSwiperdata() {
    // 发送请求
    $.get("home/swiperdata",function (res) {
      if (res.meta.status==200){
        
        // 调用模板方法
        var htmlStr = template("slideTemp",{res:res.data});
        $(".mui-slider").html(htmlStr);
       
        $(".mui-slider img").on("load",function () {
          /* 调用轮播图 */
          pyg_slide();
        })
        
      }
      
      
    });
    
  }

  /* 请求首页导航的数据 */
  function getCatitems() {
    // 发送请求
    $.get("home/catitems",function (res) {
      if(res.meta.status==200){
        // 调用模板方法
        var htmlStr=template("catTemp",{res:res.data})
        $(".pyg-nav").html(htmlStr);
      }
      
    })
  }
  /* 按钮加载 */
  function btnJiaZai() {
    mui(document.body).on('tap', '.mui-btn', function (e) {
      mui(this).button('loading');
      setTimeout(function () {
        mui(this).button('reset');
      }.bind(this), 2000);
    });
  }

  /* 请求首页商品列表的数据 */
  function getGoodslist() {
    // 发送请求
    $.get("home/goodslist",function (res) {
      if(res.meta.status==200){
        // 调用模板方法
        var htmlStr=template("goodsListTemp",{res:res.data});
        $(".commodity-list").html(htmlStr);
       
      }
      
    });
  }

  function eventList() {
    /* 点击跳转页面 */
    $("footer a:nth-child(2)").on("tap", function () {
      var href = this.href;
      location.href = href;
    })
    $("footer a:nth-child(3)").on("tap", function () {
      var href = this.href;
      location.href = href;
    })
    $("footer a:nth-child(4)").on("tap", function () {
      var href = this.href;
      location.href = href;
    })
    // 点击跳转详情页
    $(".commodity-list").on("tap","a",function () {
      var href = this.href;
      location.href = href;
      console.log('aaa');
    })

    $("input[type='search']").on("focus",function () {
      // 跳转到商品列表
      location.href ="./pages/good_list.html";
    })
    
  }

 

  
  
})