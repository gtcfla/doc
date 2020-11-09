window.onload = function(){
    if( ("onhashchange" in window) && ((typeof document.documentMode==="undefined") || document.documentMode==8)) {
        // 浏览器支持onhashchange事件
        window.onhashchange = hashChangeFire;  // TODO，对应新的hash执行的操作函数
    } else {
        // 不支持则用定时器检测的办法
        setInterval(function() {
            var ischanged = isHashChanged();  // TODO，检测hash值或其中某一段是否更改的函数
            if(ischanged) {
                hashChangeFire();  // TODO，对应新的hash执行的操作函数
            }
        }, 150);
    }
    function hashChangeFire(){
      var URL = window.location.href;
      URL = URL.split("?")[0];
      console.log(URL)
      var praise_txt = document.getElementById("praise-txt");
      const likeCount = AV.Object.extend("Zan"),  //为 AV.Object 创建子类
        likeDemo = new likeCount(),  //为该类创建一个新实例
        getCounter = new AV.Query("Zan"),  //使用 AV.Object 的构造器
        getCount = getCounter.equalTo("url",URL);  //用于筛选指定 url 的 like 计数
      getCount.find().then(results => {
        praise_txt.innerHTML = results.length>=1 ? (typeof(results[0].attributes.num) == 'undefined' ? 0 : results[0].attributes.num) : 0;
     });
    } 
    var praise = document.getElementById("praise");
    var praise_txt = document.getElementById("praise-txt");
    var URL = window.location.href;
    URL = URL.split("?")[0];
    const likeCount = AV.Object.extend("Zan"),  //为 AV.Object 创建子类
        likeDemo = new likeCount(),  //为该类创建一个新实例
        getCounter = new AV.Query("Zan"),  //使用 AV.Object 的构造器
        getCount = getCounter.equalTo("url",URL);  //用于筛选指定 url 的 like 计数
    getCount.find().then(results => {
        //成功返回数据=>获取云端计数=>写入到元素 || 返回空数据=>写入到元素
        praise_txt.innerHTML = results.length>=1 ? (typeof(results[0].attributes.num) == 'undefined' ? 0 : results[0].attributes.num) : 0;
    });
   
    praise.addEventListener('click', function(){
        var praise_img = document.getElementById("praise-img");
        var text_box = document.getElementById("add-num");
        var num= parseInt(praise_txt.innerHTML);
        if(praise_img.getAttribute("src") == "images/yizan.png"){
            this.innerHTML = "<img src='images/zan.png' id='praise-img' class='animation' />";
            praise_txt.classList.remove("hover");
            text_box.style.display = "inline";
            text_box.innerHTML = "<em class='add-animation'>-1</em>";
            document.getElementsByClassName("add-animation").className = "hover";
            num -= 1;
            praise_txt.innerHTML = num;
            getCount.find().then(results => {
                if(results.length>=1){  //成功返回数据（已创建对象，更新 num 数据）
                    let countNUM = results[0].attributes.num,  //获取云端计数
                        objId = results[0].id;  //获取当前页面 id
                    countNUM--;  //本地计数++
                    praise_txt.innerHTML = countNUM;  //写入本地计数到元素
                    const increase = AV.Object.createWithoutData('Zan', objId);  //获取当前页面 id 的云端对象
                    increase.increment('num', -1);  //使用 increment 函数更新云端对象的 num 属性
                    //储存（更新）对象到云端
                    increase.save().then(increase => {
                        console.log("Update Successfully.");
                    }, error => {
                        console.log("Update Error.")
                    })
                }else{  //返回空数据（未创建对象，第一次创建num+url）
                    let countNUM = 0,  //初始化本地计数
                        countURL = URL;  //获取当前 url
                    countNUM++;  //本地计数++
                    praise_txt.innerHTML = countNUM;  //写入本地计数到元素
                    //储存 num（本地计数） 和 url（当前url） 对象到云端
                    likeDemo.save({
                        'like': countNUM,
                        'url': countURL
                    }).then(result => {
                        console.log("Save Successfully.");
                    }, error => {
                        console.log("Save Error.")
                    })
                }
            })
        }else{
            this.innerHTML = "<img src='images/yizan.png' id='praise-img' class='animation' />";
            praise_txt.className = "hover";
            text_box.style.display = "block";
            text_box.innerHTML = "<em class='add-animation hover'>+1</em>";
            num += 1;
            praise_txt.innerHTML = num;
            getCount.find().then(results => {
                if(results.length>=1){  //成功返回数据（已创建对象，更新 num 数据）
                    let countNUM = results[0].attributes.num,  //获取云端计数
                        objId = results[0].id;  //获取当前页面 id
                    countNUM++;  //本地计数++
                    praise_txt.innerHTML = countNUM;  //写入本地计数到元素
                    const increase = AV.Object.createWithoutData('Zan', objId);  //获取当前页面 id 的云端对象
                    increase.increment('num', 1);  //使用 increment 函数更新云端对象的 num 属性
                    //储存（更新）对象到云端
                    increase.save().then(increase => {
                        console.log("Update Successfully.");
                    }, error => {
                        console.log("Update Error.")
                    })
                }else{  //返回空数据（未创建对象，第一次创建num+url）
                    let countNUM = 0,  //初始化本地计数
                        countURL = URL;  //获取当前 url
                    countNUM++;  //本地计数++
                    praise_txt.innerHTML = countNUM;  //写入本地计数到元素
                    //储存 num（本地计数） 和 url（当前url） 对象到云端
                    likeDemo.save({
                        'like': countNUM,
                        'url': countURL
                    }).then(result => {
                        console.log("Save Successfully.");
                    }, error => {
                        console.log("Save Error.")
                    })
                }
            })
        }
    });
    
}
