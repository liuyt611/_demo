/**
 * name
 * @param {Object}
 * @return {Object} 实例
 * @author xxx@yiche.com
 * @example
 *
 */
define(function (require, exports, module) {
    //---引用定义区----------------------------------
    var $ = require("jqueryui");
    require("bootstrap");
    require("jquery.table")($);
    require("jquery.pages")($);
    require('fileupload');
    require('iframe-transport');
    require ('moment');
    require ('datetimepicker');
    require ('/apps/ajaxdemo/mockdata');
    // var timeRange = require("../../module/ui/widget.timeRange.js");
    // timeRange($);
    // var initSidebar = require("../../../module/ui/sidebar");
    // var fn = require("../../../module/data/fn")
    // var pop = require("../../../module/data/pop")
    // var autoHeight = require("../../../module/ui/widget.autoHeight.js");

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
    var myData = '';
    var _this = {
        showTable:function(getUrl,data){
            var opt = $.extend({
                
            }, data);
            var _table = $('#popTable');
            getData(opt, _table);

            function getData(opt, dom) {
                $.get(getUrl,opt,function(json){
                    myData = json.data;

                    var data = {};
                    // var json = '';
                    var _thList = ['{{checkAll}}',"字段名称", "字段描述",'字段内容','操作'];
                    var _tdList = ['{{check}}','fieldName', 'desc','fieldContent','{{operate}}'];
                    var _thSort = [false, false, false,false,false];
                    var _list = json;
                    setTableData(data, opt, _list, _thList, _tdList, _thSort);

                    if (opt.addWidth != undefined) {
                        data['addWidth'] = opt.addWidth;
                    }
                    if(_list.totalPage != 0){
                        data['totalPage'] = _list.totalPage;
                    }
                    data['pageCount'] = json.pagesize;
                    data['pageNum'] = json.currentPage;
                    
                    dom.table(data);
                //全选
                    //广播table更新
                    _table.trigger('tableChange');

                    //初始化时间控件
                    $('[data-node="timepicker"]').datetimepicker({
                        dayViewHeaderFormat: 'YYYY MMMM',
                        format: 'YYYY/MM/DD hh:mm:ss',
                        useCurrent: false,
                        maxDate: '2020-12-12',
                        minDate: '2014-05-01'
                    })

                    //初始化时间控件
                    _this.DateTimePicker();
                },'json')


            };
            function setTableData(data, opt, json, _thList, _tdList, _thSort) {
                var _th = [];
                if (opt.isAdd == true) {
                    _th.push({
                        isCenter: "",
                        isSorting: "",
                        content: ''
                    })
                }
                for (var k = 0; k < _thList.length; k++) {
                    var _s = '';
                    if (_thSort[k] && opt.isSort) {
                        _s = 'sorting';
                        if (_tdList[k] == opt.sortname) {
                            _s = opt.sorttype == 'asc' ? "sorting_asc" : "sorting_desc"
                        }
                    }
                    if (_thList[k] == '{{checkAll}}') {
                        _thList[k] = '<label class="position-relative"><input type="checkbox" checked="checked" class="ace" data-node="all"><span class="lbl"></span></label>'

                        var _c = {
                            isCenter: "center",
                            isSorting: _s,
                            sortName: _tdList[k],
                            content: _thList[k]
                        };

                    } else {
                        var _c = {
                            isCenter: "",
                            isSorting: _s,
                            sortName: _tdList[k],
                            content: _thList[k]
                        };
                    }

                    _th.push(_c);
                }
                data['th'] = _th;
                if (json == null || json == '') {
                    data['td'] = '';
                } else {
                    var _td = [];
                    for (var i = 0; i < json.data.length; i++) {

                        var _tdOne = [];
                        if (opt.isAdd == true) {
                            _tdOne.push({
                                isCenter: "",
                                content: '{{add}}'
                            });
                        };
                        for (var j = 0; j < _tdList.length; j++) {
                            var _tdData = json.data[i],
                                _content = _tdData[_tdList[j]],
                                _cId = _tdData.id,
                                _tag = _tdData.tag;

                            if (_tdList[j] == '{{check}}') {
                                _content = '<label class="position-relative"><input checked="checked" type="checkbox" value="' + _cId + '"></label>';
                            }
                            if (_tdList[j] == 'desc') {
                                _content = '<span class="desc">'+ _content +'</span>';
                            }
                            if (_tdList[j] == 'fieldContent') {
                                if(_tdData.field == 'StartTime'){
                                    _content = '<span class="fieldContent" data-node="StartTime">'+ _content +'</span>';
                                }else if(_tdData.field == 'EndTime'){
                                    _content = '<span class="fieldContent" data-node="EndTime">'+ _content +'</span>';
                                }else{
                                    _content = '<span class="fieldContent">'+ _content +'</span><input class="ipt" type="text" />';
                                }
                            }
                            if (_tdList[j] == '{{operate}}') {
                                if(_tdData.field == 'PId'){
                                    _content = ''
                                }else if(_tdData.field == 'Img'){
                                    _content = '<div  class="upload"><input type="file" id="fileUpload"><span>替换</span></div>'
                                }else if(_tdData.field == 'StartTime'){
                                    _content = '<div class="operate"><div class="input-group date" data-node="datetimepicker">'+
                                                    '<input type="text" class="form-control start_date" name="start_date">'+
                                                    '<span data-node="editTime" class="input-group-addon">编辑</span>'+
                                                '</div>';
                                }else if(_tdData.field == 'EndTime'){
                                    _content = '<div class="operate"><div class="input-group date" data-node="datetimepicker1">'+
                                                    '<input type="text" class="form-control start_date" name="start_date">'+
                                                    '<span data-node="editTime" class="input-group-addon">编辑</span>'+
                                                '</div>';
                                }else{
                                    _content = '<span data-node="edit" class="edit">编辑</span><span class="operateBtn"><span data-node="save" class="save">保存</span>　<span data-node="cancel" class="cancel">取消</span></span>'
                                }
                                
                            }
                            if (_tdList[j] == '{{check}}') {
                                var _c = {
                                    isCenter: "center",
                                    content: _content
                                };
                            } else {
                                var _c = {
                                    isCenter: "",
                                    content: _content
                                };
                            }

                            _tdOne.push(_c);
                        }
                        _td.push(_tdOne);
                    }
                    data['td'] = _td;

                }
            }
        },
        allchecked:function(){
            $('body').on('click','[data-node="all"]',function(){
                if($(this)[0].checked){
                    $('#popTable tbody input[type="checkbox"]').prop('checked',true);
                }else{
                    $('#popTable tbody input[type="checkbox"]').prop('checked',false);
                }
            })
        },
        widgetPosition:function($this){
            var X = $this.offset().left + 40; 
            var Y = $this.offset().top + 25;
            //日历控件父级div定位到点击的地方
            $('#dataTime').css({'left': X,'top': Y});
            //滚动条滚动时，隐藏日历
            $('body').on('mousewheel','#popTable',function(){
                $('[data-node="datetimepicker"] input').blur();
                $('[data-node="datetimepicker1"] input').blur();
            })
        },
        fileUpload:function($this){
            var $span = $this.parents('td').prev('td').find('span');
            $this.fileupload({
                url:"/media/img",//文件上传地址，当然也可以直接写在input的data-url属性内
                // formData:{_token:$('#hidden_token').val()},//如果需要额外添加参数可以在这里添加
                done:function(e,result){
                    var _result = $.parseJSON(result.result);
                    console.log(_result.info)
                    //替换为新增的img地址
                    $span.text(_result.info)

                }
            });
        },
        edit:function($this){
            var $td = $this.parents('td').prev('td');
            //input显示，span隐藏
            $td.find('span').hide();
            $td.find('input').show().val($td.find('span').text());
            //编辑隐藏，保存和取消显示
            $this.hide().next('.operateBtn').show();
        },
        save:function($this){
            //编辑显示，保存取消隐藏
            $this.parent('.operateBtn').hide().prev('span').show();
            //input隐藏，span显示
            var $td = $this.parents('td').prev('td');
            $td.find('span').text($td.find('input').val()).show().next('input').hide();
        },
        cancel:function($this){
            //编辑显示，保存取消隐藏
            $this.parent('.operateBtn').hide().prev('span').show();
            //input隐藏，span显示
            var $td = $this.parents('td').prev('td');
            $td.find('span').show().next('input').hide();
        },
        keyup:function(){
            var checkVal = $('[data-node="check"]').val();
            //克隆原数据
            cloneData = $.extend(true,[],myData);

            $.each(myData,function(i,val){
                var _checkVal = new RegExp(checkVal,'g');
                cloneData[i].desc = myData[i].desc.replace(_checkVal,'<b class="yellow">'+ checkVal +'</b>')
            })


            //新数据渲染表格
            _this.renderTable(cloneData);
        },
        submit:function(){
            var checkVal = $('[data-node="check"]').val();
            var replaceVal = $('[data-node="replace"]').val();

            //判断是否选中
            $.each($('#popTable tbody tr'),function(i,tr){
                if($(tr).find('input[type="checkbox"]')[0].checked == true){
                    myData[i].checkStatus = 1;
                }else{
                    myData[i].checkStatus = 0;
                }
            })
            //替换数据
            $.each(myData,function(i,v){
                if(myData[i].checkStatus){
                    var _checkVal = new RegExp(checkVal,'g');
                    myData[i].desc = v.desc.replace(_checkVal,replaceVal);
                }
                
            })
            //新数据渲染表格
            _this.renderTable(myData);
            
        },
        renderTable:function(myData){
            var _table = '<table class="table table-bordered dataTable"><thead><tr><th class="center " sortname="{{check}}"><label class="position-relative"><input type="checkbox" class="ace" data-node="all"><span class="lbl"></span></label></th><th class=" " sortname="fieldName">字段名称</th><th class=" " sortname="desc">字段描述</th><th class=" " sortname="fieldContent">字段内容</th><th class=" " sortname="{{operate}}">操作</th></tr></thead><tbody>'
            var $popTable = $('#popTable');
            $popTable.empty().append(_table);
            var tr = '';
            for(i = 0;i < myData.length; i++){
                //判断是否要选中
                if(myData[i].checkStatus == 1){
                    var _input = '<input checked="checked" type="checkbox" value="">';
                }else{
                    var _input = '<input type="checkbox" value="">';
                }
                //判断操作按钮的显示
                if(myData[i].field == 'PId'){
                    var _operate = '<td class=" {{isAdd}}" rowspan="1"></td>';
                    var _filedContent = '<span class="fieldContent">'+ myData[i].fieldContent +'</span><input class="ipt" type="text">'
                }else if(myData[i].field == 'Img'){
                    var _operate = '<td class=" {{isAdd}}" rowspan="1"><div class="upload"><input type="file" id="fileUpload"><span>替换</span></div></td>';
                    var _filedContent = '<span class="fieldContent">'+ myData[i].fieldContent +'</span><input class="ipt" type="text">'
                }else if(myData[i].field == 'StartTime'){
                    var _operate = '<td class=" {{isAdd}}" rowspan="1"><div class="operate"><div class="input-group date" data-node="datetimepicker"><input type="text" class="form-control start_date" name="start_date"><span data-node="editTime" class="input-group-addon">编辑</span></div></div></td>';
                    var _filedContent = '<span class="fieldContent" data-node="StartTime">0000-00-00 00:00:00</span>'
                }else if(myData[i].field == 'EndTime'){
                    var _operate = '<td class=" {{isAdd}}" rowspan="1"><div class="operate"><div class="input-group date" data-node="datetimepicker1"><input type="text" class="form-control start_date" name="start_date"><span data-node="editTime" class="input-group-addon">编辑</span></div></div></td>';
                    var _filedContent = '<span class="fieldContent" data-node="EndTime">0000-00-00 00:00:00</span>'
                }else{
                    var _operate = '<td class=" {{isAdd}}" rowspan="1"><span data-node="edit" class="edit">编辑</span><span class="operateBtn"><span data-node="save" class="save">保存</span>　<span data-node="cancel" class="cancel">取消</span></span></td>'
                    var _filedContent = '<span class="fieldContent">'+ myData[i].fieldContent +'</span><input class="ipt" type="text">'
                }

                tr += '<tr><td class="center {{isAdd}}" rowspan="1"><label class="position-relative">'+ _input +'</label></td><td class=" {{isAdd}}" rowspan="1">'+ myData[i].fieldName +'</td><td class=" {{isAdd}}" rowspan="1"><span class="desc">'+ myData[i].desc +'</span></td><td class=" {{isAdd}}" rowspan="1">'+ _filedContent +'</td>'+_operate+'</tr>'
            }
            $popTable.find('tbody').append(tr);
            //判断th中的input是否是选中状态
            if($('#popTable tbody tr input[checked="checked"]').length == myData.length){console.log(99)
                $('#popTable thead th input[type="checkbox"]').prop('checked',true);
            }

            //初始化时间控件
            _this.DateTimePicker();

            
        },
        DateTimePicker:function(){
            var mindate = $('[data-node="StartTime"]').text() == '0000-00-00 00:00:00' ? '2014-01-01' : $('.StartTime').text();
            var maxdate = $('[data-node="EndTime"]').text() == '0000-00-00 00:00:00' ? '2020-12-12' : $('.EndTime').text();
            //开始时间
            $('[data-node="datetimepicker"]').datetimepicker({
                dayViewHeaderFormat: 'YYYY MMMM',
                format: 'YYYY/MM/DD hh:mm:ss',
                useCurrent: false,
                maxDate: maxdate,
                minDate: '2014-05-01',
                widgetParent: "#dataTime div",
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'bottom'
                },
            }).on('dp.change',function(e){
                var _time = new Date(e.date);
                var year = _time.getFullYear();
                var month = (parseInt(_time.getMonth()) + 1) < 10 ? '0' +(parseInt(_time.getMonth()) + 1) : (parseInt(_time.getMonth()) + 1);
                var day = _time.getDate() < 10 ? '0' + _time.getDate() : _time.getDate();
                var hour = _time.getHours() < 10 ? '0' + _time.getHours() : _time.getHours();
                var minutes = _time.getMinutes() < 10 ? '0' +  _time.getMinutes() : _time.getMinutes();
                var seconds = _time.getSeconds() < 10 ? '0' + _time.getSeconds() : _time.getSeconds();
                var newtime = year + '-' + month + '-' + day + ' ' + hour +':' + minutes + ':' + seconds;
                //替换时间
                $(e.target).parents('td').prev('td').find('span').text(newtime);
                //更新最大最小值
                $('[data-node="datetimepicker1"]').data("DateTimePicker").minDate(e.date);
            });
            //结束时间
            $('[data-node="datetimepicker1"]').datetimepicker({
                dayViewHeaderFormat: 'YYYY MMMM',
                format: 'YYYY/MM/DD hh:mm:ss',
                useCurrent: false,
                maxDate: '2020-12-31',
                minDate: mindate,
                widgetParent: "#dataTime div",
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'bottom'
                },
            }).on('dp.change',function(e){
                var _time = new Date(e.date);
                var year = _time.getFullYear();
                var month = (parseInt(_time.getMonth()) + 1) < 10 ? '0' +(parseInt(_time.getMonth()) + 1) : (parseInt(_time.getMonth()) + 1);
                var day = _time.getDate() < 10 ? '0' + _time.getDate() : _time.getDate();
                var hour = _time.getHours() < 10 ? '0' + _time.getHours() : _time.getHours();
                var minutes = _time.getMinutes() < 10 ? '0' +  _time.getMinutes() : _time.getMinutes();
                var seconds = _time.getSeconds() < 10 ? '0' + _time.getSeconds() : _time.getSeconds();
                var newtime = year + '-' + month + '-' + day + ' ' + hour +':' + minutes + ':' + seconds;
                //替换时间
                $(e.target).parents('td').prev('td').find('span').text(newtime);
                //更新最大最小值
                $('[data-node="datetimepicker"]').data("DateTimePicker").maxDate(e.date);
            });
        },
        DOM: {}, //节点容器
        objs: {} //组件容器
    }
//----------------------------------------------
//---自定义事件绑定的回调函数定义区--------------------
    var bindCustEvtFuns = {};
//----------------------------------------------

//---广播事件绑定的回调函数定义区---------------------
    var bindListenerFuns = {};
//-------------------------------------------

//---参数的验证方法定义区---------------------------
    // var argsCheck = function (node) {
    //     if (node == null) {
    //         throw "[]:argsCheck()-The param node is not a DOM node.";
    //     } else {
    //         _this.DOM = node;
    //     }
    // };
//-------------------------------------------

//---模块的初始化方法定义区-------------------------
    var initPlugins = function () {
        //全选
        _this.allchecked();

    };
//-------------------------------------------

//---DOM事件绑定方法定义区-------------------------
    var bindDOM = function () {
    };
//-------------------------------------------

//---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function () {
        
        $('#clickme').click(function(){
            _this.showTable('/media/lists')
        })
        //编辑时间
        $('body').on('click','[data-node="editTime"]',function(){
            _this.widgetPosition($(this));
        })
        //上传图片
        .on('click','#fileUpload',function(){
            _this.fileUpload($(this));
        })
        //编辑
        .on('click','[data-node="edit"]',function(){
            _this.edit($(this));
        })
        //保存
        .on('click','[data-node="save"]',function(){
            _this.save($(this));
        })
        //取消
        .on('click','[data-node="cancel"]',function(){
            _this.cancel($(this));
        })
        //查找高亮
        .on('keyup','[data-node="check"]',function(){
            _this.keyup();
        })
        //提交
        .on('click','[data-node="submit"]',function(){
            _this.submit();
        })


    };
//-------------------------------------------

//---广播事件绑定方法定义区------------------------
    var bindListener = function () {
    };
//-------------------------------------------

//---组件公开方法的定义区---------------------------
    // init.prototype.destroy = function () {
    //     if (_this) {
    //         $.foreach(_this.objs, function (o) {
    //             if (o && o.destroy) {
    //                 o.destroy();
    //             }
    //         });
    //         _this = null;
    //     }
    // };
//-------------------------------------------
//---组件的初始化方法定义区-------------------------
// var init = function() {
// };
//-------------------------------------------

//---组件公开属性或方法的赋值区----------------------
    module.exports = init;
//-------------------------------------------
})
;