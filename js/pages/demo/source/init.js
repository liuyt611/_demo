/**
 * name
 * @param {Object}
 * @return {Object} 实例
 * @author xxx@yiche.com
 * @example
 *
 */
define(function(require, exports, module) {
    //---引用定义区----------------------------------
    var $ = require("jquery");
    
        //---常量定义区----------------------------------

    //----------------------------------------------

    //---构造函数----------------------------------
    function init() {
        // argsCheck();
        initPlugins();
        bindDOM();
        bindCustEvt();
        bindListener();
    }

    //----------------------------------------------

    //---变量量定义区----------------------------------


    var _postData = {},
        sTop = '',
        winH = $('html').height(),
        winW = $(window).width();


    var _this = {
        DOM: {}, //节点容器
        objs: {}, //组件容器
        DOM_eventFun: { //DOM事件行为容器
        },
        countdown:function(option){//倒计时
            //该功能在小于等于n天的时候，显示倒计时，否则只显示天数（比如距离倒计时还有三天多，则显示四天）
            var endtime = '2016-1-11 19:00:00';
            var _option = $.extend({
                'endtime':endtime,//结束时间
                'n':'3',//当小于等于3天的时候，显示倒计时
                'content':'#countdown'//倒计时容器
            },option);
            //转换时间格式，（转换为兼容模式new Date(y,m,d,h,ms,s)）
            var _endtime = _option.endtime,
                _dateD = _endtime.split(' ')[0],
                y = _dateD.split('-')[0],
                m = _dateD.split('-')[1] - 1,
                d = _dateD.split('-')[2];
                _dateH = _endtime.split(' ')[1],
                h = _dateH.split(':')[0],
                ms = _dateH.split(':')[1],
                s = _dateH.split(':')[2];
            //默认值
            var today = new Date().getTime(),
                eTime = new Date(y,m,d,h,ms,s).getTime(),
                dValue = (eTime - today) / (24 * 60 * 60 * 1000);
            if(dValue > _option.n){
                var day = Math.ceil(dValue);
                $(_option.content).text('剩余' + day + '天')
            }

            var time = setInterval(function(){
                today = new Date().getTime(),
                eTime = new Date(y,m,d,h,ms,s).getTime(),
                dValue = (eTime - today) / (24 * 60 * 60 * 1000);

                if(dValue <= _option.n){//小于等于n天时，显示倒计时
                    var day = parseInt(dValue),
                        hours =  parseInt((dValue - day) * 24),
                        minutes = parseInt((dValue - day - hours / 24) * 24 * 60),
                        seconds = parseInt((dValue - day - hours / 24 - minutes / (24 * 60)) * 24 * 60 * 60);
                    if((eTime - today) <= 0){//倒计时结束后，改变状态为已结束
                        $(_option.content).text('已结束');
                        clearInterval(time);
                    }else{
                        $(_option.content).text('剩余' + day + '天' + hours + '小时' + minutes + '分' + seconds + '秒');
                    }  
                } 
            },1000) 
            var timeday = setInterval(function(){
                today = new Date().getTime(),
                eTime = new Date(y,m,d,h,ms,s).getTime(),
                dValue = (eTime - today) / (24 * 60 * 60 * 1000);
                if(dValue > _option.n){//否则只显示天数
                    var day = Math.ceil(dValue);
                    $(_option.content).text('剩余' + day + '天')
                }  
            },60*60*1000)//1小时去判断一次
        },
        pop: function (option) {//提示弹层
            var _option = $.extend({
                    'width': '300',//弹层的宽度
                    'height': '180',//弹层的高度
                    'text': '上传成功',//弹层文本
                    'time': 2, // 停留时间(单位为秒)                                                                                                                                                      
                    'color': '#333',//文本颜色
                    'easeTime': 0.5, //渐显时间(单位为秒)
                },option)
            var _tpl = '<div id="alertPop" class="popCont" style="display: none;opacity:0;transition:opacity ' + _option.easeTime + 's ease;width:' + _option.width + 'px;height: ' + _option.height + 'px;margin-left:-' + _option.width / 2 + 'px;margin-top:-' + _option.height / 2 + 'px;"><p style="color:' + _option.color + ';">' + _option.text + '</p></div>';

            $(_tpl).appendTo('body').show().css('opacity', '1');
            setTimeout(function () {
                var __pop = $('#alertPop');
                __pop.css('opacity', '0')
                setTimeout(function () {
                    __pop.remove()
                }, _option.easeTime * 1000)
            }, _option.time * 1000)
        },
        area:function(option){//地区选择弹层
            var _option = $.extend({
                'titText':'选择城市',//弹层标题
                'titBackClose':'<b id="icon_back" class="icon-arrow"></b><b id="icon_close" class="icon-close"></b>',//弹层标题返回和关闭
                'popupAre':'#popupAre',//弹层容器
                'wrap':'#wrap',//内容区域容器
                'back':'#icon_back',//返回按钮容器
                'close':'#icon_close',//关闭按钮容器
                'header':'#popupAre header'//返回与关闭按钮父级容器
            },option)
            // 处理弹层
            $(_option.popupAre).show();
            setTimeout(function(){
                $(_option.popupAre).css('transform','translate(0,0)')
            },50)
            sTop = document.body.scrollTop;//点击弹层时距离顶部距离
            $(_option.wrap).css({
                'height':winH - 50,
                'overflow-y':'scroll'
            })
            $(_option.wrap)[0].scrollTop=sTop;
            document.body.scrollTop = 0;
            if($(_option.back).length < 1 || $(_option.close).length < 1){
                $(_option.header).append($(_option.titBackClose));
                $(_option.header).append(_option.titText);  
            }
            
        },
        areaBack:function(option){//地区选择返回
            var _option = $.extend({
                'popupAre':'#popupAre',//弹层容器
                'wrap':'#wrap'//内容区域容器
            },option)

            $(_option.wrap).css({
                'height':'auto'
            })
            $(_option.popupAre).css({
                'transform':'translate(0,100%)',
                'display':'none'
            })
            document.body.scrollTop = sTop;
        },
        filter:function(option){//筛选
            var _option = $.extend({
                'wrap':'#wrap',//内容区域容器
                'popupCon':'#popupCon',//弹层内容区域
                'popStyle':'#popupFilter,#popupCon,#bg'//弹层容器，灰色背景，弹层内容容器
            },option)
            $(_option.popupCon).css('right',-winW);
            //获取当前 滚动条的位置
            scrolltop = $(window).scrollTop();
            $(_option.wrap).css({
                height:$(window).height(),
                'overflow-y':'hidden'
            });
            $(_option.wrap)[0].scrollTop=scrolltop;
            document.body.scrollTop = 0;

            $(_option.popStyle).css('display','block');
            setTimeout(function(){
                $(_option.popupCon).css({'right':'0'});
            },50)
        },
        filterSure:function(option){//筛选-确定
            var _option = $.extend({
                'wrap':'#wrap',//内容区域容器
                'popupCon':'#popupCon',//弹层内容区域
                'popStyle':'#popupFilter,#bg'//弹层容器，灰色背景，弹层内容容器
            },option)

            $(_option.popupCon).css({'right':-winW});
            setTimeout(function(){
                $(_option.popStyle).css({'display':'none'});
            },260);
            $(_option.wrap).css('height','auto');

            // 滚动条恢复弹层前的位置
            document.body.scrollTop = scrolltop;
        },
        moveClose:function(option){//筛选-滑动关闭
            var _option = $.extend({
                'wrap':'#wrap',//内容区域容器
                'popupCon':'#popupCon',//弹层内容区域
                'popupFilter':'#popupFilter',//弹层容器
                'bg':'#bg'//灰色背景
            },option)
            var xStart,yStart,xEnd,yEnd,xDistance,yDistance;
            $('body').on('touchstart',_option.popupFilter,function(e){//获取起始坐标
                xStart = e.originalEvent.touches[0].pageX;
                yStart = e.originalEvent.touches[0].pageY;
            }).on('touchend',_option.popupFilter,function(e) {//获取结束坐标
                var _touch = e.originalEvent.changedTouches[0];
                xEnd = _touch.pageX;
                yEnd = _touch.pageY;
                xDistance = xEnd - xStart;
                yDistance = yEnd - yStart;

                if(xDistance > 40 && yDistance < 40 && yDistance > -40){   
                    $(_option.popupCon).css({'right':-winW});
                    setTimeout(function(){
                        $(_option.popupFilter).css({'display':'none'});
                        $(_option.bg).css({'display':'none'});
                    },260);
                    $(_option.wrap).css('height','auto');

                    // 滚动条恢复弹层前的位置
                    document.body.scrollTop = scrolltop;
                }
            })
        },
        more:function(option){//加载更多
            var _option = $.extend({
                'more':'#more',//加载更多容器
                'appendWrap':'#list',//内容追加区域
            },option)
            var bodyH,scrolltop,
                page = 1,
                total = 3,//一共加载3次
                goto = false,
                $more = $(_option.more);
            $('body').on('touchstart',function(){//按下改变“加载更多”的状态为“正在加载”
                bodyH = $('body').height();
                scrolltop = $(window).scrollTop();
                if(winH + scrolltop >= bodyH){
                    $more.text('正在加载');
                }
            }).on('touchmove',function(){//拖动时改为“松开加载更多”
                bodyH = $('body').height();
                scrolltop = $(window).scrollTop();
                if(winH + scrolltop >= bodyH){
                    $more.text('松开加载更多');
                } 
            }).on('touchend',function(){//end时，恢复为“加载更多”或者隐藏
                if(winH + scrolltop >= bodyH){
                    if(!$more.hasClass('none') && goto == false){
                        goto =true;
                        $(_option.appendWrap).append('<div>加载的内容</div><img src="images/car1.jpg">')
                        goto = false;//在加载成功后赋为false
                    }

                    if(page < total){
                        page += 1;
                        $more.text('加载更多');
                    }else{
                        $more.addClass('none');
                    }
                    
                } 
            });
        }
        
    };
    //----------------------------------------------
    //---自定义事件绑定的回调函数定义区--------------------
    var bindCustEvtFuns = {};
    //----------------------------------------------

    //---广播事件绑定的回调函数定义区---------------------
    var bindListenerFuns = {};
    //-------------------------------------------

    //---参数的验证方法定义区---------------------------
    var argsCheck = function(node) {
        
    };
    //-------------------------------------------

    //---模块的初始化方法定义区-------------------------
    var initPlugins = function() {
        //倒计时
        _this.countdown();
        //提示弹层
        _this.pop({
            'width':'200',
            'height':'40',
            'color':'#fff',
            'text':'无符合条件的结果'
        });
        //滑动关闭弹层
        _this.moveClose()

        //加载更多
        _this.more();

        
    };
    //-------------------------------------------

    //---DOM事件绑定方法定义区-------------------------
    var bindDOM = function() {
        //选择地区
        $('#area').click(function(){
            _this.area();
        })
        //关闭返回  选择地区
        $('#popupAre header').on('click','b',function(){
            _this.areaBack();
        })
        //筛选
        $('#filter').click(function(){
            _this.filter();
        })
        //筛选  确定
        $('#sure').click(function(){
            _this.filterSure();
        })
    };
    //-------------------------------------------

    //---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function() {

    };
    //-------------------------------------------

    //---广播事件绑定方法定义区------------------------
    var bindListener = function() {

    };
    //-------------------------------------------

    //---组件公开方法的定义区---------------------------
    init.prototype.destroy = function() {
        
    };
    //-------------------------------------------
    //---组件的初始化方法定义区-------------------------
    // var init = function() {
    // };
    //-------------------------------------------

    //---组件公开属性或方法的赋值区----------------------
    module.exports = init;
    //-------------------------------------------00
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            