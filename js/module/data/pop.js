/**
 * Created by Veblin on 3/5/16.
 */
'use strict'
define(function (require, exports, module) {
    var $ = require("jquery");
    require("bootstrap");
    // require("jquery.fileupload");
    // require("jquery.iframe-transport");
    var fn = require("./fn");
    var ajaxLock = true;
    var pop = {
        /**
         *
         * @param num{Number}
         * @returns str{String}
         */
        //全选
        allCheck:function(){
            $(document).on('click', 'table thead [data-node="all"]', function() {
                var that = this;
                $(this).closest('table').find('tr > td:first-child input:checkbox')
                    .each(function() {
                        this.checked = that.checked;
                        $(this).closest('tr').toggleClass('selected');
                    });
            });
        },
        //数据指标说明
        hoverPop:function(){
            $('.data-inf').mouseover(function(){
                $('.data-inf .popbox').show();
            }).mouseout(function(){
                $('.data-inf .popbox').hide();
            })
        },
        //最多输入n个汉字
        maxString:function(dom,n){
            if($(dom).val()){
                if($.trim($(dom).val()).length > n){
                    $(dom).css('border-color','#ff5a5f').addClass('iptError');
                }
            }else{
                $(dom+'.required').css('border-color','#ff5a5f').addClass('iptError');
            }
        },
        //添加前后缀时，最多键入30个汉字
        maxkeyup:function(dom,n){
            if($(dom).val().length > n){
                $(dom).css('border-color','#ff5a5f').addClass('iptError');
            }else{
                $(dom).css('border-color','#d7d7d9').removeClass('iptError');
            }
        },
        //添加子商品---提交前台验证
        
        addSubmit:function(){
            pop.maxString('[data-class="string30"]',30);
            pop.maxString('[data-class="string50"]',50);
            //字段类型
            var _select = 'select[data-id="string-type"]';
            var _stringcon = '[data-class="stringcon"]';
            var _url = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            if($(_select).val() == 0){
                $(_select).next('.chosen-container').find('.chosen-single').css('border-color','#ff5a5f').addClass('iptError');
            }else if($(_select).val() == 1){//字符串时
                if(isNaN($(_stringcon).val()) == false || _url.test($(_stringcon).val()) == true){
                    $(_stringcon).css('border-color','#ff5a5f').addClass('iptError');
                }
            }else if($(_select).val() == 2){//为非负整数
                if(isNaN($(_stringcon).val()) || $(_stringcon).val() < 0 || $(_stringcon).val() - parseInt($(_stringcon).val()) > 0){
                    $(_stringcon).css('border-color','#ff5a5f').addClass('iptError');
                }
            }else if($(_select).val() == 3){//URl
                var val = $('[data-class="stringcon"]').val();
                if(_url.test(val) == false){
                    $(_stringcon).css('border-color','#ff5a5f').addClass('iptError');
                }
            }
            $('body').on('change',_select,function(){
                $(this).next('.chosen-container').find('.chosen-single').css('border-color','#d7d7d9').removeClass('iptError');
                $('[data-class="stringcon"]').val('').css('border-color','#d7d7d9').removeClass('iptError');
            })
            //字段内容
            if(!$(_stringcon).val()){
                $(_stringcon).css('border-color','#ff5a5f').addClass('iptError');
            }
        },
        //添加子商品弹层中，上传图片按钮的显示与隐藏
        upload:function(){
            if($('select[data-id="string-type"]').val() == 3){
                $('[data-class="upload"]').css('display','inline-block');
                $('[data-class="upload"]').next('input').css('display','inline-block');
                setTimeout(function(){
                    $('[data-class="stringcon"]').focus().val('http://');
                },50)
            }else{
                $('[data-class="upload"]').css('display','none');
                $('[data-class="upload"]').next('input').css('display','none');
            }
        },
        //批量操作标签
        allotTabAll:function(){
            $('#myModal .modal-content').empty().append('<div class="allot-taball">'+
                '<div class="modal-header">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                    '<h4 class="modal-title" id="myModalLabel">分配标签批量操作</h4>'+
                '</div>'+
                '<div class="modal-body">'+
                    '<div class="table-list">'+
                        '<div id="tabActiveTable">'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<span class="replace">替换为</span>'+
                        '<div class="allot-chosen">'+
                            '<select id="replaceChosen" class="chosen chosen-with-drop chosen-container-active" multiple data-node="chosen-open">'+
                                
                            '</select>'+
                            '<a class="new-tab">新建标签</a>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<a href="javascript:;" class="submit" node-type="modTab-submit">提交</a>'+
                    '</div>'+
                '</div>'+
                '<div class="modal-footer">'+
                    '<a href="javascript:void(0)" data-class="save" class="btn btn-primary" node-type="modTab-save">保存</a>'+
                    '<a href="javascript:void(0)" class="btn btn-default" data-dismiss="modal">取消</a>'+
                '</div>'+
            '</div>')
            $('.modal-dialog').css('width','800px').find('.modal-content').css('height','auto');

            pop.chosen();
            //分配标签下拉始终显示
            // $('select[data-node="chosen-open"]').trigger('chosen:open');
            $('select[data-node="chosen-open"]').on('chosen:hiding_dropdown',function(){
                $(this).next('.chosen-container').addClass('chosen-with-drop chosen-container-active');
            })
        },
        //添加子商品
        addGoods:function(){
            $('#myModal .modal-content').empty().append('<div class="add-goods">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" id="myModalLabel">添加子商品</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div class="table-list">'+
                            '<div id="addTable">'+
                            '</div>'+
                        '</div>'+
                        '<div class="add-list">'+
                            '<div class="add-title">添加新字段</div>'+
                            '<div class="add-form">'+
                                '<form action="">'+
                                    '<div class="form-group">'+
                                        '<span><b>*</b> 字段名称</span><input data-class="string30" class="required" type="text" placeholder="至多输入30个汉字" />'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<span>字段描述</span><input data-class="string50" type="text" placeholder="至多输入50个汉字" />'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<span><b>*</b> 字段类型</span><div class="chosen-type">'+
                                        '<select class="chosen" data-node="chosen" data-id="string-type">'+
                                            '<option value="0">请选择字段类型</option>'+
                                            '<option value="1">字符串</option>'+
                                            '<option value="2">非负整数</option>'+
                                            '<option value="3">URL</option>'+
                                        '</select>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group upload-position clearfix">'+
                                        '<span><b>*</b> 字段内容</span><input data-class="stringcon" type="text" class="iptcon" placeholder="与字段类型保持一致" /><a data-class="upload" class="upload">上传图片</a><input data-id="uploadImg" class="upImg" type="file" >'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<a href="javascript:void(0)" data-syspid="" data-pid="" data-addNum="0" data-id="" data-max="" data-class="addgood-submit" class="submit">提交</a>'+
                                        '<span data-subnum="num" style="display:none;"></span>'+
                                    '</div>'+
                                '</form>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<a href="javascript:void(0)" data-class="addsave" class="btn btn-primary">保存</a>'+
                        '<a href="javascript:void(0)" class="btn btn-default" data-dismiss="modal">取消</a>'+
                    '</div>'+
                '</div>')
            $('.modal-dialog').css('width','800px').find('.modal-content').css('height','auto');
            pop.chosen();
        },
        //分配标签
        allotTab:function(){
            $('#myModal .modal-content').empty().append('<div class="allot-tab">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" id="myModalLabel">分配标签</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div class="allot-chosen">'+
                            // '<select id="allotChosen" class="chosen" multiple data-node="chosen-open">'+
                            // '</select>'+
                            '<div id="tagSelect"></div>'+
                            '<a class="new-tab" data-id="">新建标签</a>'+
                        '</div>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<a href="javascript:void(0)" data-id="" data-class="allotSave" class="btn btn-primary">保存</a>'+
                        '<a href="javascript:void(0)" class="btn btn-default"  data-dismiss="modal">取消</a>'+
                    '</div>'+
                '</div>');
            $('.modal-dialog').css('width','800px').find('.modal-content').css('height','auto');
            pop.chosen();
            //分配标签下拉始终显示
            $('select[data-node="chosen-open"]').on('chosen:hiding_dropdown',function(){
                $(this).next('.chosen-container').addClass('chosen-with-drop chosen-container-active');
                // $(this).trigger('chosen:updated');
            })

        },
        //新建标签
        newTab:function(){
            $('#myModal .modal-content').empty().append('<div class="modal-newtab">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" id="myModalLabel">新建标签</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div class="add-list">'+
                            '<div class="add-form">'+
                                '<form action="">'+
                                    '<div class="form-group">'+
                                        '<span><b>*</b> 标签名称</span><input class="required" data-class="string30" type="text" placeholder="至多30个汉字" />'+
                                    '</div>'+
                                    '<div class="form-group clearfix">'+
                                        '<span>所属标签组</span><div class="chosen-type">'+
                                            '<select id="newLab" class="chosen" data-node="chosen-search">'+
                                                
                                            '</select>'+
                                            '<input type="text"  id="newlabIpt" data-iptId="" class="newlabIpt" placeholder="快速新建/选择标签组" />'+
                                            '<div class="chosenLabgroup">选择</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<span>描述</span><input type="text" class="iptcon"data-class="string50" placeholder="至多50个汉字" />'+
                                    '</div>'+
                                '</form>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<a href="javascript:void(0)" data-class="save" data-id="" class="btn btn-primary" edit-id="">保存</a>'+
                        '<a href="javascript:void(0)" class="btn btn-default" data-dismiss="modal">取消</a>'+
                    '</div>'+
                '</div>')
            $('.modal-dialog').css('width','800px').find('.modal-content').css('height','auto');

            pop.chosen();
        },
        //查看
        check:function(){
            $('#myModal .modal-content').empty().append('<div class="modal-check">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" id="myModalLabel">商品信息详情</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div class="table-list">'+
                                '<div id="addTable">'+
                                '</div>'+
                            '</div>'+
                    '</div>'+
                '</div>')
            $('.modal-dialog').css('width','800px').find('.modal-content').css('height','auto');
        },
        //开始暂停投放提示弹层
        tips:function(){
            if($('#dataTable tbody input:checked').length < 1){
                $('#myModal .modal-content').empty().append('<div class="modal-tips">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" id="myModalLabel"></h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div class="tips-pop" data-node="tipsPop">'+
                            
                        '</div>'+
                    '</div>'+
                '</div>')
            }
            $('.modal-tips').parents('.modal-dialog').css('width','400px').find('.modal-content').css('height','218px');
        },
        //批量操作下拉公用
        batchOperation:function(_option,title){
            $('#myModal .modal-content').empty().append('<div class="modal-addactive">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" id="myModalLabel">'+ title +'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        _option +
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<a href="javascript:void(0)" data-class="save" class="btn btn-primary">保存</a>'+
                        '<a href="javascript:void(0)" class="btn btn-default" data-dismiss="modal">取消</a>'+
                    '</div>'+
                '</div>')
            $('.modal-dialog').css('width','800px').find('.modal-content').css('height','auto');
        },
        
        uploadImg:function(){
            $('[data-id="uploadImg"]').fileupload({
                url:"/tool/ProductOperation/Index/addPic",//文件上传地址，当然也可以直接写在input的data-url属性内
                // formData:{_token:$('#hidden_token').val()},//如果需要额外添加参数可以在这里添加
                done:function(e,result){

                    var _result = $.parseJSON(result.result);
                    if(_result.status == 0){
                        $('[data-class="stringcon"]').val(_result.info);
                        $('[data-class="addgood-submit"]').attr('data-max',_result.max)
                    }else{
                        pop.saveTips({
                            text:_result.info
                        },'.modal .modal-dialog');
                        $('#result').addClass('false');
                        $('#result.false b').addClass('glyphicon glyphicon-exclamation-sign'); 
                    }

                    // //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
                    // //注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
                    // //返回的数据在result.result中，假设我们服务器返回了一个json对象
                    // console.log(JSON.stringify(result.result));
                }
            });
        },

        //保存提示弹层
        saveTips: function (option,dom) {
            var _option = $.extend({
                    'text': '',
                    'time': 1, //停留页面的时长  
                    'easeTime': 0.5//渐显渐隐的时间
                }
                , option)
            var _tpl = '<div id="result"style="display: none;opacity:0;transition:opacity ' + _option.easeTime + 's ease;"><b></b>' + _option.text + '</div>'

            $(_tpl).appendTo(dom).show().css('opacity', '1');
            setTimeout(function () {
                var __pop = $('#result');
                __pop.css('opacity', '0')
                setTimeout(function () {
                    __pop.remove()
                }, _option.easeTime * 1000)
                if (!!_option.fn && typeof _option.fn == 'function') {
                    _option.fn();
                }
            }, _option.time * 1000)
        },

        //弹层中错误提示
        poperrorTips:function(_text){
            pop.saveTips({
                text:_text
            },'.modal .modal-dialog');
            $('#result').addClass('false');
            $('#result.false b').addClass('glyphicon glyphicon-exclamation-sign');
        },
        //删除

        del:function(){
            $('#myModal .modal-content').empty().append('<div class="modal-del">'+
                '<div class="modal-header">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                    '<h4 class="modal-title" id="myModalLabel"></h4>'+
                '</div>'+
                '<div class="modal-body">'+
                    '<div class="sure-del" data-node="sureDel">'+
                        '您确定删除该标签？'+
                    '</div>'+
                '</div>'+
                '<div class="modal-footer">'+
                    '<a href="javascript:void(0)" data-class="sure" class="btn btn-primary del" data-sureid="">确定</a>'+
                    '<a href="javascript:void(0)" class="btn btn-default" data-dismiss="modal">取消</a>'+
                '</div>'+
            '</div>')
            $('.modal-del').parents('.modal-dialog').css('width','400px').find('.modal-content').css('height','auto');
        },
        //加载表格，重新计算高度。
        resetHeight: function(){
            var o = {
                'leftDom': '[node-type="autoHeightLeft"]',
                'rightDom': '[node-type="autoHeightRight"]',
                'pageHeadHeight': 160
            }
            var de = document.documentElement;
            var winHeight = self.innerHeight||(de && de.clientHeight)||document.body.clientHeight;
            var pageHeadHeight = o.pageHeadHeight;
            var leftDiv = document.querySelector(o.leftDom);
            var rightDiv = document.querySelector(o.rightDom);
            leftDiv.style.height = rightDiv.style.height = 'auto';
            var leftDivHeight = leftDiv.offsetHeight;
            var rightDivHeight = rightDiv.offsetHeight;

            if (leftDivHeight < winHeight-pageHeadHeight && rightDivHeight < winHeight-pageHeadHeight) {
                leftDiv.style.height = rightDiv.style.height = (winHeight-pageHeadHeight-1)+'px';
                if(document.documentElement.clientWidth < 768){
                    leftDiv.style.height = 'auto';
                    rightDiv.style.height = (winHeight-pageHeadHeight-1+60)+'px';
                }
                return false;
            }

            if (leftDivHeight < rightDivHeight) {
                leftDiv.style.height = rightDivHeight+'px';
                if(document.documentElement.clientWidth < 768){
                    leftDiv.style.height = 'auto';
                    rightDiv.style.height = rightDivHeight+60+'px';
                }
                return false;
            }

            if (rightDivHeight < leftDivHeight) {
                rightDiv.style.height = leftDivHeight+'px';
                if(document.documentElement.clientWidth < 768){
                    leftDiv.style.height = 'auto';
                    rightDiv.style.height = leftDivHeight+60+'px';
                }
                return false;
            }
        },
        //datatimepicker显示时分秒
        datatimepicker:function(){
            $('[data-node="datetimepicker"]').datetimepicker({
                dayViewHeaderFormat: 'YYYY MMMM',
                format: 'YYYY/MM/DD hh:mm:ss',
                useCurrent: false,
                maxDate: '2020-12-31',
                minDate: '2014-05-01',
                // widgetParent: ".modal-dialog"
                widgetParent: "#addTable"
            });
        },
        //chosen  添加模糊搜索功能
        chosen:function(){
            $('[data-node="chosen"]').chosen({
                width:'100%',
                disable_search:true,
                search_contains:true
            })
            $('[data-node="chosen-search"]').chosen({
                width:'100%',
                search_contains:true
            })
            $('[data-node="chosen-open"]').chosen({
                width:'100%',
                inherit_select_classes:true,
                search_contains:true
            })
        },


        
    }

    module.exports = pop;
})