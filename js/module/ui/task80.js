define(function (require,exports,module){
    return function(jQuery){
        (function($){
            $.fn.task8 = function(_option){
                var option = $.extend({
                    'startTime':'2015-6',//起始时间
                    'timeDelay':'12'//如12 则为12个月
                },_option)
                var _that = this;
                var _today = new Date();
                var _year = _today.getFullYear();//当前年
                var _Month = _today.getMonth() + 1;//当前月
                var startY = option.startTime.split('-')[0];//起始年
                var startM = option.startTime.split('-')[1];//起始月
                function init(){
                    _html = '<select name="time" data-node="startYear" action-type="time"></select>'+　
                            '<select name="time" data-node="startMonth" action-type="time"></select>'+　'<em>到</em>' +　
                            '<select name="time" data-node="endYear" action-type="time"></select>'+　
                            '<select name="time" data-node="endMonth" action-type="time"></select>'
                    _that.html(_html);

                    //分别起始年、结束年、起始月、结束月、四个下拉
                    var s_Y = $('[data-node="startYear"]');
                    var e_Y = $('[data-node="endYear"]');
                    var s_M = $('[data-node="startMonth"]');
                    var e_M = $('[data-node="endMonth"]');
                    var select_all = $('[action-type="time"]');
                    //生成年月
                    creatTime(_html,s_Y,e_Y,s_M,e_M,select_all);
                    //起始年change时
                    selectChange(s_Y,e_Y,s_M,e_M,select_all);
                    
                }
                function creatTime(_html,s_Y,e_Y,s_M,e_M,select_all){
                    //年
                    creatYear(s_Y,e_Y,s_M,e_M,select_all);
                    //月
                    creatMonth(s_M,e_M);
                    //初始化chosen
                    $('[action-type="time"]').chosen({
                        'disable_search':true
                    });
                }
                function creatYear(s_Y,e_Y,s_M,e_M,select_all,val){
                    var _optY = '<option value="0">请选择年</option>'
                    for(var i = startY;i <= _year;i++){
                        if(val){//起始年change时
                            if(i < val){
                                _optY += '<option disabled="disabled" value="'+ i +'">' + i + '年</option>';
                            }else{
                                _optY += '<option value="'+ i +'">' + i + '年</option>';
                            }
                        }else{//页面加载时
                            _optY += '<option value="'+ i +'">' + i + '年</option>';
                        }
                    }
                    if(!val){//页面加载时
                        s_Y.html(_optY).find('option[value="'+ startY +'"]').prop('selected',true);//设置起始年
                        e_Y.html(_optY).find('option[value="'+ _year +'"]').prop('selected',true);//设置起始年
                    }else{//起始年change时
                        e_Y.html(_optY).trigger('chosen:updated')//设置起始年
                    }
                    
                    
                }

                function creatMonth(s_M,e_M,val,load){
                    var _optM_start = '<option value="0">请选择月</option>';
                    var _optM_end = '<option value="0">请选择月</option>';
                    for(var i = 1;i <= 12;i++){
                        if(val){
                            if(val == startY){//等于起始年份时，
                                if(i < startM){//如果小于起始月份则置灰
                                    _optM_start += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                }else{
                                    _optM_start += '<option value="'+ i +'">' + i + '月</option>';
                                }
                            }else if(val == _year){//等于当前年份时，
                                if(i > _Month){//如果大于当前时间的月分则置灰
                                    _optM_start += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                }else{
                                    _optM_start += '<option value="'+ i +'">' + i + '月</option>';
                                }
                            }else{
                                _optM_start += '<option value="'+ i +'">' + i + '月</option>';
                            }
                            _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                        }else{
                            //起始月份
                            if(i < startM){//如果小于起始时间的月分则置灰
                                _optM_start += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                            }else if(i == startM){//默认显示起始时间的月分
                                if(load != 0){//页面加载时，月份为自定义月份
                                    _optM_start += '<option selected="selected" value="'+ i +'">' + i + '月</option>';
                                }
                            }else{
                                _optM_start += '<option value="'+ i +'">' + i + '月</option>';
                            }
                            
                            //结束月份
                            if(i > _Month){//如果大于当前时间的月分则置灰
                                _optM_end += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                            }else if(i == _Month){//默认显示当前时间的月分
                                if(load != 0){//页面加载时，月份为当前月份
                                    _optM_end += '<option selected="selected" value="'+ i +'">' + i + '月</option>';
                                }
                            }else{
                                _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                            }
                            
                        }
                    }
                    s_M.html(_optM_start).trigger("chosen:updated");
                    e_M.html(_optM_end).trigger("chosen:updated");
                }

                function selectChange(s_Y,e_Y,s_M,e_M,select_all){
                    //起始年change
                    _that.on('change','[data-node="startYear"]',function(){
                        var _val = $(this).find('option:selected').val();
                        if(_val == 0){//如果选中的是“请选择年”，则清空其余select
                            select_all.find('option[value="0"]').prop('selected',true);
                            //月份全部为可选
                            s_M.find('option').prop('disabled',false);
                            e_M.find('option').prop('disabled',false);

                            select_all.trigger("chosen:updated");
                        }else{
                            var load = 0;
                            creatMonth(s_M,e_M,_val,load);
                            creatYear(s_Y,e_Y,s_M,e_M,select_all,_val)
                        }
                    })
                    //结束年change
                    _that.on('change','[data-node="endYear"]',function(){
                        var _val = $(this).find('option:selected').val();
                        var _optM_end = '<option value="0">请选择月</option>';
                        var sM_val = s_M.find('option:selected').val();//起始月的val
                        var sY_val = s_Y.find('option:selected').val();//起始年的val
                        for(var i = 1;i <= 12;i++){
                            if((_val == startY || sY_val == _val) && _val != _year){//等于自定义年份或等于起始年份时(且不等于当前年)，
                                if(i < sM_val){//如果小于起始月份则置灰
                                    _optM_end += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                }else{
                                    _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                                }
                            }else if(_val == _year){//等于当前年份时，
                                if(sY_val == _year){//起始年等于结束年，小于起始月，大于当前月置灰
                                    if(i > _Month || i < sM_val){//如果大于当前时间的月分则置灰
                                        _optM_end += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                    }else{
                                        _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                                    }
                                }else{
                                    if(i > _Month){//如果大于当前时间的月分则置灰
                                        _optM_end += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                    }else{
                                        _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                                    }
                                }
                                
                            }else{
                                _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                            }
                        }
                        e_M.html(_optM_end).trigger("chosen:updated");
                    })

                    //起始月份change
                    _that.on('change','[data-node="startMonth"]',function(){
                        var _val = $(this).find('option:selected').val();
                        var sY_val = s_Y.find('option:selected').val();//起始年的val
                        var eY_val = e_Y.find('option:selected').val();//结束年的val
                        var _optM_end = '<option value="0">请选择月</option>';
                        for(var i = 1;i <= 12;i++){
                            if(sY_val == eY_val){//起始年 == 结束年
                                if(eY_val == _year){//结束年 == 当前年
                                    if(i > _Month || i < _val){//如果大于当前月小于起始月的则置灰
                                        _optM_end += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                    }else{
                                        _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                                    }
                                }else{
                                    if(i < _val){//如果大于当前月小于起始月的则置灰
                                        _optM_end += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                    }else{
                                        _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                                    }
                                }
                            }else{
                                if(eY_val == _year){//如果 结束年为当前年
                                    if(i > _Month){//如果大于当前月则置灰
                                        _optM_end += '<option disabled="disabled" value="'+ i +'">' + i + '月</option>';
                                    }else{
                                        _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                                    }
                                }else{
                                    _optM_end += '<option value="'+ i +'">' + i + '月</option>';
                                }
                            }
                        }
                        e_M.html(_optM_end).trigger("chosen:updated");
                        
                    })
                    
                }

                init();
            }
        })(jQuery)
    }
})