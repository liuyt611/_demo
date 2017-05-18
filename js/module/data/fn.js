/**
 * Created by Veblin on 3/5/16.
 */
'use strict'
define(function (require, exports, module) {
    var $ = require('jquery');
    require("jquery.chosen");
    require("datetimepicker");
    var fn = {
        /**
         *
         * @param num{Number}
         * @returns str{String}
         */
        str2num: function (num) {
            var _str = num + '',
                _i = /(\d+)(\d{3})/;
            for (; _i.test(_str);) {
                _str = _str.replace(_i, "$1" + ',' + "$2");
            }
            return _str;
        },
        makePie: function (data) {
            var _data = {
                tooltip: {
                    trigger: 'item',
                    //formatter: "{a} <br/>{b} : {c} ({d}%)"
                    formatter: "{b} : {c}人 ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right: 20,
                    top: 'middle',
                    data: this.getLegend(data)
                },
                series: [
                    {
                        name: 'test',
                        type: 'pie',
                        radius: '75%',
                        center: ['40%', '50%'],
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }

            return _data;
        },
        /**
         *
         * @param data
         */
        makeXY:function(data){
            var _option = $.extend({
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[0];
                        return tar.seriesName + tar.name +  ' : ' + '<br/>'  + tar.value + '人';
                    }
                }
            },data)
            return _option;
        },
        tempReplace: function (template, obj, loc) {
            var _loc = (loc == 'i' || loc == 'g') ? loc : 'g',
                _temp = template;
            for (var _key in obj) {
                var _ex = new RegExp('{{' + _key + '}}', _loc);
                _temp = _temp.replace(_ex, obj[_key])
            }
            return _temp;
        },
        makeChinaMap: function (data, options) {
            var _options = $.extend(true,{
                name: 'test',
                bVisual: false,
                visualMax: 10000
            }, options);
            var _data = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}:{c}人'
                },

                series: [
                    {
                        name: '中国',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: {label: {show: true}},
                            emphasis: {label: {show: true}}
                        },
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: data
                    }
                ]
            }
            if (_options.bVisual) {
                _data['visualMap'] = {
                    min: 0,
                    max: _options.visualMax,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],
                    show: false
                    // 文本，默认为数值文本
                    //calculable : true
                }
            }
            return _data;
        },
        /**
         *
         * @param array{Array}
         */
        getLegend: function (array) {
            if (!$.isArray(array)) {
                return
            }
            var _arr = [];
            for (var i = 0; i < array.length; i++) {
                var _obj = array[i];
                _arr.push(_obj.name)
            }
            return _arr;
        },
        chosen:function(){
            $('[data-node="chosen"]').chosen(widgetOption.chosenDefault)
            $('[data-node="chosen-search"]').chosen(widgetOption.chosenSearch)
            $('[data-node="chosen-open"]').chosen(widgetOption.chosenOpen)
        },
        datatimepicker:function(){
            $('[data-node="datetimepicker"]').datetimepicker(widgetOption.datetimepicker);
        }
    }

    var widgetOption = {
        'datetimepicker':{
            dayViewHeaderFormat: 'YYYY MMMM',
            format: 'YYYY/MM/DD',
            useCurrent: false,
            maxDate: '2020-12-31',
            minDate: '2014-05-01'
            //isRTL:true,
        },
        'chosenDefault':{
            width:'100%',
            disable_search:true
        },
        'chosenSearch':{
            width:'100%'
        },
        'chosenOpen':{
            width:'100%',
            inherit_select_classes:true
        }
    };
    module.exports = fn;
})