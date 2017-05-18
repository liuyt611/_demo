/**
 * Created by zhangchuanliang on 2014/11/13.
 */
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
    var $ = require("jquery");
    // require("bootstrap");
    // require("jquery.table")($);
    // require("jquery.pages")($);
    // require ('moment');
    // require ('datetimepicker');
    // require('../../../module/ui/widget.timeRange')($);
    // var initSidebar = require("../../../module/ui/sidebar");
    // var fn = require("../../../module/data/fn")
    // var pop = require("../../../module/data/pop")
    // var autoHeight = require("../../../module/ui/widget.autoHeight.js");
    // var ajaxLock = true;

    //---常量定义区----------------------------------

    //----------------------------------------------

    //---构造函数----------------------------------
    function init() {
        // argsCheck();
        initPlugins();
        bindDOM();
        bindCustEvt();
        alert(123)
        bindListener();
    }

    //----------------------------------------------

    //---变量量定义区----------------------------------
    $choseProvince = $("#choseProvince")
    var _this = {
        areachosen:function(){console.log(999)
            //隐藏品牌车型的下拉菜单
            $brandModelsList.addClass("hide");
            $brandList.addClass("hide");
            //var times = 0;
            if($provinceList.hasClass("hide")){//如果省份列表隐藏
                //var _offset = {
                //    top:$choseProvince.offset().top,
                //    left:$choseProvince.offset().left
                //};
                $provinceList.removeClass("hide");
                checkSelect($provinceList,$choseCity,$cityList);
                //console.log($provinceList.attr("class"));
                //点击省份列表
                selectOne($provinceList,$cityList,$choseCity,"/ajax/get_city/parent_id/");
            }else{
                $provinceList.addClass("hide");
            }
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
    var argsCheck = function (node) {
        if (node == null) {
            throw "[]:argsCheck()-The param node is not a DOM node.";
        } else {
            _this.DOM = node;
        }
    };
//-------------------------------------------

//---模块的初始化方法定义区-------------------------
    var initPlugins = function () {
        //fn.chosen();
        

    };
//-------------------------------------------

//---DOM事件绑定方法定义区-------------------------
    var bindDOM = function () {
    };
//-------------------------------------------




//---自定义事件绑定方法定义区------------------------
    var bindCustEvt = function () {
        $('#choseProvince').on("click",function(){console.log(7878)
            _this.areachosen();
        });
        $('.aa').on("click",function(){console.log(88)
            // _this.areachosen();
        });

    };
//-------------------------------------------

//---广播事件绑定方法定义区------------------------
    var bindListener = function () {
    };
//-------------------------------------------

//---组件公开方法的定义区---------------------------
    init.prototype.destroy = function () {
        if (_this) {
            $.foreach(_this.objs, function (o) {
                if (o && o.destroy) {
                    o.destroy();
                }
            });
            _this = null;
        }
    };
//-------------------------------------------
//---组件的初始化方法定义区-------------------------
// var init = function() {
// };
//-------------------------------------------



//---组件公开属性或方法的赋值区----------------------
    module.exports = init;
//-------------------------------------------
});


// (function(){
//     $(document).ready(function(){
//         var $form = $("#groupAdd"),
//             $choseProvince = $("#choseProvince"),
//             $choseCity = $("#choseCity"),
//             $choseBrand = $("#choseBrand"),
//             $choseModels = $("#choseModels"),
//             $cityScroll = $("#cityScroll"),
//             $modlesScroll = $("#modelsScroll"),
//             $brandSubmit = $("#brandSubmit"),
//             $areaSubmit = $("#areaSubmit");
//         var $provinceList = $("#provinceList"),
//             $cityList = $("#cityList"),
//             $brandList = $("#brandList"),
//             $brandModelsList = $("#brandModelsList");
//             $brand_radio = $(".brand_radio");
//         //判断能否点击二级下拉
//         function checkSelect(parentList,child,childList){
//             if(parentList.find(":checked").length>0){
//                 child.attr("click","true");
//                 childList.removeClass("hide");
//             }else{
//                 childList.addClass("hide");
//             }
//         }
//         function toggleAll(elem){
//             var _this = $(elem),
//                 _dl = _this.parents("dl"),
//                 inputs = _dl.find("dd input");
//             if(_this.find("input")[0].checked){
//                 $.each(inputs,function(i,element){
//                     element.checked = false;
//                 });
//             }
//             else{
//                 $.each(inputs,function(i,element){
//                     element.checked = true;
//                 });
//             }
//         }
//         //二级下拉 点击标题统一勾选或取消勾选
//         function groupSelt(elements){
//             var _this = $(elements);
//             var $elemDt = _this.find("dt label"),
//                 $elemDd = _this.find("dd label");
//             $elemDt.on("mouseup", function () {
//                 toggleAll(this);
//             });
//             $elemDd.on("click",function(){
//                 var thisDd = $(this).parent(),
//                     thisDl = $(this).parents("dl");
//                 //console.log(thisDl.find("dt input").attr("checked"));
//                 if(thisDd.find("input:checked").length == 0){
//                     thisDl.find("dt input").attr("checked",false);
//                 }else{
//                     thisDl.find("dt input")[0].checked = true;
//                 }
//             });
//         }
//         //一级下拉选择效果
//         function selectOne(parentList,childList,child,url){//parentList:一级下拉 childList:二级下拉 child:二级点击区域  url:post提交的URL
//             var _inputType = parentList.find("label input").attr("type"),
//                 _ddInput = parentList.find("dd input");
//             parentList.find("label").off().on("mouseup",function(){
//                 var _this = $(this),
//                 //_provinceId = _this.find("input").attr(""),
//                     _thisChecked = _this.find("input");
//                 var provinceId = _this.find("input").attr("data-code");
//                 var spell      = _this.find("input").attr("data-spell");
//                 child.attr("click","true");
//                 if(_this[0].id == "allProvince"){
//                     //toggleAll(this);
//                     _ddInput.removeAttr("checked").attr("disabled","disabled");
//                     //if(_this.attr("class") == "cur") {
//                     //    //console.log(_this);
//                     //    _this.parents("dl").find("dd label").removeClass("cur");
//                     //}else{
//                     //    //console.log("_this");
//                     //    _this.parents("dl").find("dd label").addClass("cur");
//                     //}
//                 }
//                 if(_thisChecked[0].checked){
//                     if(_inputType == "checkbox"){
//                         if(_this.attr("id") == "allProvince"){
//                             childList.html("");
//                         }else{
//                             $("#p"+provinceId).remove();
//                         }
//                         _this.removeClass("cur");
//                         _ddInput.removeAttr("disabled");
//                     }
//                 }else if(_thisChecked[0].disabled){
//                     return false;
//                 }else{
//                     if(_inputType == "radio"){
//                         parentList.find("label.cur").removeClass("cur");
//                     }
//                     _this.addClass("cur");
//                     //if(_thisChecked.length>0){//如果选中 || times === 0
//                     childList.removeClass("hide");
//                     var t = new Date();
//                     $.post(url + provinceId +"?t="+t.getTime(),function(data){

//                         var _type = data.type;
//                         var _template = "",
//                             _loading = "<p class='loading align_c'><i class='ace-icon fa fa-spinner fa-spin orange bigger-125'></i>数据加载中</p>";
//                         childList.prepend(_loading);
//                         if(data.status === true){
//                                 //_resultTit = data.region_name;
//                             childList.find("p.loading").remove();
//                             $.each(data.result,function(i,cont){

//                                 var parentName = cont.name;
//                                 var _resultcontList = "";
//                                 var provinceId = cont.id;
//                                 $.each(cont.child,function(i,result){

//                                     if (_type == 'city') {
//                                         var data_name  = "area["+result.parent_id+"][]";
//                                         var data_value = result.id+'|'+parentName+'|'+result.name;
//                                     } else {
//                                         var data_name  = "brand["+cont.parent_id+']['+result.parent_id+"][]";
//                                         var data_value = result.id+'|'+result.brand_name+'|'+result.make_name+'|'+result.name+'|'+spell;
//                                     }
//                                     _resultcontList+="<label><input type='checkbox' checked name="+data_name+" value="+data_value+" data-code='"+result.id+"' />"+result.name+"</label>";
//                                 });

//                                 if (_type == 'city') {
//                                     var parent_name = "area["+0+"][]";
//                                     var parent_val  = provinceId+"|"+parentName+"|"+parentName;
//                                 } else {
//                                     var parent_name = 'carBrandModels[]';
//                                     var parent_val  = provinceId+'|'+parentName;
//                                 }
//                                 _template += "<dl id='p"+provinceId+"' class='optgroup'>"+
//                                     "<dt><label><input type='checkbox' checked name='"+parent_name+"' data-code='"+provinceId+"' value="+parent_val+" />"+parentName+"</dt></label>"+
//                                     "<dd>"+_resultcontList+"</dd>"+
//                                     "</dl>";
//                             });
//                             if(_inputType == "checkbox"){
//                                 if(_this.attr("id") == "allProvince"){
//                                     childList.html(_template);
//                                 }else{
//                                     childList.prepend(_template);
//                                 }
//                             }else if(_inputType == "radio"){
//                                 if(_template != ""){
//                                     childList.html(_template);
//                                 }else{
//                                     childList.html("<p class='align_c'>此品牌暂无数据</p>");
//                                 }
//                             }
//                             groupSelt(childList.find("dl"));
//                         }else{
//                             //alert(data.info);
//                         }
//                     },'json');
//                     //}else{
//                     //    console.log("false");
//                     //    $("#p"+provinceId).remove();
//                     //    checkSelect();
//                     //}
//                 }
//                 //times++;
//             });
//         }
//         //二级下拉展示
//         function selectTwo(childList,showArea){//elem1:二级下拉 elem2:结果展示区域
//             var _searchResult = "",
//                 _province = childList.find("dl");
//             //console.log(_province);
//             $.each(_province,function(i,element){
//                 //console.log(i);
//                 var cont = $(element);
//                 var provName = cont.find("dt").text(),
//                     provId = cont.attr("id"),
//                     cityArr = cont.find("dd label");
//                 var cityLables = "";
//                 $.each(cityArr,function(i,element){
//                     var c = $(element);
//                     //console.log(cont);
//                     var cityName = c.text(),
//                         cityCode = c.find("input").attr("data-code"),
//                         cityChecked = c.find("input")[0].checked;
//                     //console.log(cityChecked);
//                     if(cityChecked){
//                         cityLables += "<span class='search_choice' data-code='"+cityCode+"'>"+cityName+"<i class='ace-icon fa fa-times'></i></span>";
//                     }
//                 });
//                 if(cityLables != ""){
//                     _searchResult += "<dl class='search_show' provid='"+provId+"'>"+
//                     "<dt>"+provName+"<i class='ace-icon fa fa-times'></i></dt>"+
//                     "<dd>"+cityLables+"</dd>"+
//                     "</dl>";
//                 }
//             });
//             showArea.html(_searchResult);
//         }
//         //编辑展示结果
//         function closeSearch(showArea,childList,parentList){//elem:展示区域标签
//             showArea.delegate("span.search_choice i","click",function(){
//                 var _this = $(this),
//                     choiceId = _this.parent().attr("data-code");
//                 _this.parent().remove();
//                 childList.find("[data-code="+choiceId+"]")[0].checked = false;
//             }).delegate("dt i.ace-icon","click",function(){
//                 var _this = $(this);
//                 var _provId = _this.parents("dl").attr("provid");
//                 var $focusElem = parentList.find("[data-code='"+_provId.slice(1)+"']");
//                 _this.parents("dl").remove();
//                 $("#"+_provId).find(":checked").removeAttr("checked");
//                 if($focusElem.length > 0){
//                     $focusElem[0].checked = false;
//                     $focusElem.parent().removeClass("cur");
//                 }
//             });
//         }
//         //$(document).bind("click",function(e){
//             //var target = $(e.target);
//             //console.log(target.attr("id"));
//             //console.log($provinceList.hasClass("hide"));
//             //if(target.parents("#provinceList") && target.parents("#choseProvince")){
//             //    $provinceList.addClass("hide");
//             //}
//             //if(target.attr("id") != "cityList" || target.attr("id") != "choseCity"){
//             //    $cityList.addClass("hide");
//             //}
//             //if(target.attr("id") != "brandList" || target.attr("id") != "choseBrand"){
//             //    $brandList.addClass("hide");
//             //}
//             //if(target.attr("id") != "brandModelsList" || target.attr("id") != "choseModels"){
//             //    $brandModelsList.addClass("hide");
//             //}
//         //});
//         $choseProvince.off().on("click",function(){
//             //隐藏品牌车型的下拉菜单
//             $brandModelsList.addClass("hide");
//             $brandList.addClass("hide");
//             //var times = 0;
//             if($provinceList.hasClass("hide")){//如果省份列表隐藏
//                 //var _offset = {
//                 //    top:$choseProvince.offset().top,
//                 //    left:$choseProvince.offset().left
//                 //};
//                 $provinceList.removeClass("hide");
//                 checkSelect($provinceList,$choseCity,$cityList);
//                 //console.log($provinceList.attr("class"));
//                 //点击省份列表
//                 selectOne($provinceList,$cityList,$choseCity,"/ajax/get_city/parent_id/");
//             }else{
//                 $provinceList.addClass("hide");
//             }
//         });

//         $choseCity.off().on("click",function(){
//             //隐藏品牌车型的下拉菜单
//             $brandModelsList.addClass("hide");
//             $brandList.addClass("hide");
//             if($cityList.hasClass("hide")){
//                 var _clickstatus = $choseCity.attr("click");
//                 if(_clickstatus == "true"){
//                     $cityList.removeClass("hide");
//                 }
//             }else{
//                 $cityList.addClass("hide");
//             //    //下拉交互
//             //    selectTwo($cityList,$cityScroll);
//             //    //点击X掉选项及二级下拉选项
//             //    closeSearch($cityScroll);
//             }
//         });
//         $areaSubmit.click(function(){
//             $cityList.addClass("hide");
//             $provinceList.addClass("hide");
//             //下拉交互
//             selectTwo($cityList,$cityScroll);
//             //点击X掉选项及二级下拉选项
//             closeSearch($cityScroll,$cityList,$provinceList);
//         });
//         $choseBrand.off().on("click",function(){
//             //隐藏活动范围的下拉菜单
//             $cityList.addClass("hide");
//             $provinceList.addClass("hide");
//             if($brandList.hasClass("hide")){//如果省份列表隐藏
//                 $brandList.removeClass("hide");
//                 checkSelect($brandList,$choseModels,$brandModelsList);
//                 selectOne($brandList,$brandModelsList,$choseModels,'/ajax/get_models/brand_id/');
//             }else{
//                 $brandList.addClass("hide");
//             }
//         });
//         $choseModels.off().on("click",function(){
//             //隐藏活动范围的下拉菜单
//             $cityList.addClass("hide");
//             $provinceList.addClass("hide");
//             if($brandModelsList.hasClass("hide")){
//                 var _clickstatus = $choseModels.attr("click");
//                 if(_clickstatus == "true"){
//                     $brandModelsList.removeClass("hide");
//                 }
//             }else{
//                 $brandModelsList.addClass("hide");
//             //    //下拉交互
//             //    selectTwo($brandModelsList,$modlesScroll);
//             //    //点击X掉选项及二级下拉选项
//             //    closeSearch($modlesScroll);
//             }
//         });
//         //车型品牌提交
//         $brandSubmit.click(function(){
//             $brandModelsList.addClass("hide");
//             $brandList.addClass("hide");
//             //下拉交互
//             selectTwo($brandModelsList,$modlesScroll);
//             //点击X掉选项及二级下拉选项
//             closeSearch($modlesScroll,$brandModelsList,$brandList);
//         });
//         var $chevronDown = $("#chevronDown"),
//             $chevronUp = $("#chevronUp"),
//             $letterList = $("div.letter_list"),
//             $car_brand_list = $("#car_brand_list");
//         $chevronDown.click(function(){
//             $letterList.find("ul").css("top",268 - $letterList.find("ul").height());
//         });
//         $chevronUp.click(function(){
//             $letterList.find("ul").css("top",30);
//         });
//         $letterList.find("li").click(function(){
//             var nowScroT = $car_brand_list.scrollTop();
//             var _this = $(this),
//                 letterId = $(_this.find("a").attr("href"));
//             $car_brand_list.find("div.bg").removeClass("bg");
//             _this.addClass("cur").siblings("li").removeClass("cur");
//             var pos = letterId.position();
//             $car_brand_list.animate({scrollTop:nowScroT+pos.top},300);
//             letterId.addClass("bg");
//             return false;
//         });
//         $brand_radio.click(function(){
//             $("#brandName").val($(this).attr('data-name'));
//         });
//         //时间选择器
//         function selectTimeStart(){
//             WdatePicker({
//                 doubleCalendar:false,
//                 dateFmt:'yyyy-MM-dd HH:mm:ss',
//                 el:'startDate',
//                 //disabledDays:[1,2,3,4,5],
//                 //minDate:'%y-%M-%d',
//                 onpicked:function(dp){innerWeek($dp.cal.getNewDateStr("D"))}
//             });
//         }
//         function selectTimeEnd(){
//             WdatePicker({
//                 doubleCalendar:false,
//                 dateFmt:'yyyy-MM-dd HH:mm:ss',
//                 el:'endDate',
//                 minDate:'#F{$dp.$D(\'startDate\');}'
//             });
//         }
//         function innerWeek(week){
//             $("div.frequency").find("label em").text("周"+week);
//         }
//         $("#groupStartTime").on("mousedown",function(){
//             selectTimeStart();
//         });
//         $("#groupEndTime").on("mousedown",function(){
//             selectTimeEnd();
//         });
//         //表单验证
//         $form.find(":submit").on("click",function(){
//             var $areaCheck = $cityList.find(":checked"),
//                 $brandCheck = $brandList.find(":checked"),
//                 $groupStartTime = $("#startDate"),
//                 $groupEndTime = $("#endDate"),
//                 $frequency = $("div.frequency").find(":checked");

//             if($areaCheck.length > 0 &&
//                 $brandCheck.length > 0 &&
//                 $groupStartTime.val() != "" &&
//                 $groupEndTime.val() != "" &&
//                 $frequency.length > 0
//                 ){

//             }else{
//                 alert("请检查必填项");
//                 return false;
//             }
//         });
//     });
// }());