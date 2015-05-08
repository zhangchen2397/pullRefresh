pullRefresh 下拉刷新组件
======

适用于移动端纵向下拉刷新，通过对外暴露相应的事件完成相应的切换逻辑

###对外事件

```
@customEvent canPullDownMove touchmove时触发，此时可处理下拉时Loading状态
@customEvent clearPullDownMove touchend时触发，介于canPullDownMove与canPullDownRefresh之间，可用于取消loading状态
@customEvent canPullDownRefresh touchend时触发，所有状态准备完毕，可请求新数据
```

###使用
```javascript
var pullRefreshIns = new pullRefresh({
    el: $( document.body ), //绑定事件的dom元素 id或jq对象
    offsetScrollTop: 2,     //滚动条偏移值，大于此值不触发下拉事件
    offsetY: 75             //触摸起止Y偏移值，大于些值才会触发下拉事件
});

$.bind(pullRefreshIns, 'canPullDownMove', function() {
    //此时可处理下拉时Loading状态
});

$.bind(pullRefreshIns, 'clearPullDownMove', function() {
    //此时可处理清除下拉loading状态
});

$.bind(pullRefreshIns, 'canPullDownRefresh', function() {
    //所有状态准备完毕，可请求新数据
});
```

###demo 扫描以下二维码手机体验
![demo](https://github.com/zhangchen2397/touchTab/blob/master/qrcode.png?raw=true)
