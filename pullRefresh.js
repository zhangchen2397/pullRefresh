/**
 * 下拉刷新组件，不用iscroll
 * @author samczhang@tencent.com
 * --------------------------------------
 * 对外调用接口及自定义事件
 * @customEvent canPullDownMove touchmove时触发，此时可处理下拉时Loading状态
 * @customEvent clearPullDownMove touchend时触发，介于canPullDownMove与canPullDownRefresh之间，可用于取消loading状态
 * @customEvent canPullDownRefresh touchend时触发，所有状态准备完毕，可请求新数据

 * demo http://info.3g.qq.com/g/s?aid=wechat_l
 * 
 */

define( 'pullRefresh', [ 'jqmobi' ], function( $ ) {
    var pullRefresh = function( config ) {
        this.defaultConfig = {
            el: $( document.body ), //绑定事件的dom元素 id或jq对象
            offsetScrollTop: 2,     //滚动条偏移值，大于此值不触发下拉事件
            offsetY: 75             //触摸起止Y偏移值，大于些值才会触发下拉事件   
        };

        this.config = $.extend( this.defaultConfig, config || {} );
        this.init.call( this );
    };

    $.extend( pullRefresh.prototype, {
        init: function() {
            this._cacheDom();
            this._initEvent();
        },

        _cacheDom: function() {
            this.el = ( typeof this.config.el === 'string' ) ? $( this.config.el ) : this.config.el;
        },

        _initEvent: function() {
            var me = this,
                config = this.config,
                el = this.el,

                touchStartX = 0,
                touchStartY = 0;

            el.on( 'touchstart', function( event ) {
                var touchTarget = event.changedTouches[ 0 ];

                touchStartX = touchTarget.clientX;
                touchStartY = touchTarget.clientY;
            } );

            el.on( 'touchmove', function( event ) {
                var scrollTop = document.body.scrollTop,
                    touchTarget = event.changedTouches[ 0 ],
                    touchMoveX = touchTarget.clientX,
                    touchMoveY = touchTarget.clientY;

                var offsetX = touchMoveX - touchStartX,
                    offsetY = touchMoveY - touchStartY;

                if ( offsetY > 5 && scrollTop < config.offsetScrollTop && Math.abs( offsetX ) < Math.abs( offsetY ) ) {
                    event.preventDefault();

                    $.trigger( me, 'canPullDownMove', [ {
                        touchStartY: touchStartY,
                        touchMoveY: touchMoveY
                    } ] );
                }
            } );

            el.on( 'touchend', function( event ) {
                var scrollTop = document.body.scrollTop,
                    touchTarget = event.changedTouches[ 0 ],
                    touchEndX = touchTarget.clientX,
                    touchEndY = touchTarget.clientY;

                var offsetX = touchEndX - touchStartX,
                    offsetY = touchEndY - touchStartY;

                if ( offsetY > config.offsetY && scrollTop < config.offsetScrollTop && Math.abs( offsetX ) < Math.abs( offsetY ) ) {
                    $.trigger( me, 'canPullDownRefresh' );
                } else {
                    $.trigger( me, 'clearPullDownMove' );
                }
            } );
        }
    } );

    return pullRefresh;
} );

