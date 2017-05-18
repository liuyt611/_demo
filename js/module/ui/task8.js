define(function (require,exports,module){
    return function(jQuery){
        (function($){
            $.fn.task8 = function(_option){
                var option = $.extend({
                    'startTime':'2015-6',//起始时间
                    'timeDelay':''//如12 则为12个月
                },_option)
                var _that = this;
                var _today = new Date();
                var _time = {
                    sY:option.startTime.split('-')[0],//起始年
                    sM:option.startTime.split('-')[1],//起始月
                    eY:_today.getFullYear(),//当前年
                    eM:_today.getMonth() + 1,//当前月
                    newTime_Y : '',//设置时间差后，结束时间的年份
                    newTime_M : ''//设置时间差后，结束时间的余月份
                }
                _time.newTime_Y = timeDelay(option.startTime).split('-')[0];
                _time.newTime_M = timeDelay(option.startTime).split('-')[1];
                

                function init(){
                    _html = '<select name="time" data-node="startYear" action-type="time"></select>'+　
                            '<select name="time" data-node="startMonth" action-type="time"></select>'+　
                            '<em>到</em>' +　
                            '<select name="time" data-node="endYear" action-type="time"></select>'+　
                            '<select name="time" data-node="endMonth" action-type="time"></select>'
                    _that.html(_html);
                    
                    //生成年月
                    creatTime(_time);
                }

                function creatTime(time){
                    //分别起始年、结束年、起始月、结束月、四个下拉
                    var $s_Y = $('[data-node="startYear"]');
                    var $e_Y = $('[data-node="endYear"]');
                    var $s_M = $('[data-node="startMonth"]');
                    var $e_M = $('[data-node="endMonth"]');
                    var $select_all = $('[action-type="time"]');
                    var _optY = '<option value="0">请选择年</option>';
                    var _optM = '<option value="0">请选择月</option>';
                    //开始年
                    defaultSelect(time.sY,time.eY,_optY,$s_Y,time);
                    //开始月
                    defaultSelect(1,12,_optM,$s_M,time);
                    //结束年
                    defaultSelect(time.sY,time.eY,_optY,$e_Y,time);
                    //结束月
                    defaultSelect(1,12,_optM,$e_M,time);

                    //设置默认显示的日期
                    $s_Y.find('option[value="'+ time.sY +'"]').prop('selected',true);
                    $s_M.find('option[value="'+ time.sM +'"]').prop('selected',true);
                    if(option.timeDelay != ''){//设置了时间区间
                        if(new Date(timeDelay(option.startTime)).getTime() > _today.getTime()){//如果新计算的大于当前日期，则结束日期为当前日期
                            $e_Y.find('option[value="'+ _time.eY +'"]').prop('selected',true);
                            $e_M.find('option[value="'+ _time.eM +'"]').prop('selected',true);
                        }else{
                            $e_Y.find('option[value="'+ _time.newTime_Y +'"]').prop('selected',true);
                            $e_M.find('option[value="'+ _time.newTime_M +'"]').prop('selected',true);
                        }
                    }else{
                        $e_Y.find('option[value="'+ time.eY +'"]').prop('selected',true);
                        $e_M.find('option[value="'+ time.eM +'"]').prop('selected',true);
                    }

                    //select change
                    _that.on('change','[action-type="time"]',function(e){
                        change(e.target,$s_Y,$e_Y,$s_M,$e_M);
                        $select_all.trigger('chosen:updated');
                    })
                    
                    
                    //初始化chosen
                    $select_all.chosen({
                        'disable_search':true
                    })
                }

                function defaultSelect(start,end,opt,dom,time){
                    for(var i = start;i <= end;i++){
                        if(option.timeDelay != ''){//设置了时间区间
                            if(new Date(timeDelay(option.startTime)).getTime() > _today.getTime()){//如果新计算的大于当前日期，则结束日期为当前日期
                                var endYear = _today.getFullYear();
                                var endMonth = _today.getMonth() + 1;
                            }else{
                                var endYear = _time.newTime_Y;
                                var endMonth = _time.newTime_M;
                            }
                            
                        }else{
                            var endYear = time.eY;
                            var endMonth = time.eM;
                        }

                        if(start == 1){//如果是月份
                            if(dom.attr('data-node') == 'startMonth'){//如果是开始月
                                if(endYear == time.sY ){//如果开始年等于结束年
                                    if(i < time.sM || i > endMonth){
                                        opt += '<option disabled="disabled" value="'+ i +'">'+ i +'月</option>';
                                    }else{
                                        opt += '<option value="'+ i +'">'+ i +'月</option>';
                                    }
                                }else if(i < time.sM){
                                    opt += '<option disabled="disabled" value="'+ i +'">'+ i +'月</option>';
                                }else{
                                    opt += '<option value="'+ i +'">'+ i +'月</option>';
                                }
                            }else if(dom.attr('data-node') == 'endMonth'){//如果是结束月
                                if(endYear == time.sY ){//如果开始年等于结束年
                                    if(i > endMonth || i < time.sM){
                                        opt += '<option disabled="disabled" value="'+ i +'">'+ i +'月</option>';
                                    }else{
                                        opt += '<option value="'+ i +'">'+ i +'月</option>';
                                    }
                                }else if(i > endMonth){
                                    opt += '<option disabled="disabled" value="'+ i +'">'+ i +'月</option>';
                                }else{
                                    opt += '<option value="'+ i +'">'+ i +'月</option>';
                                }
                                
                            }else{
                                opt += '<option value="'+ i +'">'+ i +'月</option>';
                            }
                        }else{//如果是年份
                            if(i > endYear && dom.attr('data-node') == 'endYear'){//如果是结束年
                                opt += '<option disabled="disabled" value="'+ i +'">'+ i +'月</option>';
                            }else if(i > endYear && dom.attr('data-node') == 'startYear'){//如果是开始年
                                opt += '<option disabled="disabled" value="'+ i +'">'+ i +'月</option>';
                            }else{
                                opt += '<option value="'+ i +'">'+ i +'年</option>';
                            } 
                        }
                    }
                    dom.html(opt);
                }
                function change(target,$sY,$eY,$sM,$eM){
                    var limitTime = {
                        minsY:_time.sY,
                        maxsY:_time.eY,
                        mineY:_time.sY,
                        maxeY:_time.eY,
                        minsM:1,
                        maxsM:12,
                        mineM:1,
                        maxeM:12
                    } 

                    var sy_val = $sY.find('option:selected').val();//开始年
                    var ey_val = $eY.find('option:selected').val();//结束年
                    var sm_val = $sM.find('option:selected').val();//开始月
                    var em_val = $eM.find('option:selected').val();//结束月

                    if($(target).attr('data-node') == 'startYear'){//开始年改变
                        startY(limitTime,ey_val,em_val,$sY);//改变开始年
                        startM(limitTime,sy_val,ey_val,sm_val,em_val,$sM);//改变开始月
                        endY(limitTime,sy_val,sm_val,$eY);//改变结束年
                        endM(limitTime,sy_val,ey_val,sm_val,em_val,$eM);//改变结束月

                    }else if($(target).attr('data-node') == 'endYear'){//结束年改变
                        startY(limitTime,ey_val,em_val,$sY);//改变开始年
                        startM(limitTime,sy_val,ey_val,sm_val,em_val,$sM);//改变开始月
                        endM(limitTime,sy_val,ey_val,sm_val,em_val,$eM);//改变结束月
                        endY(limitTime,sy_val,sm_val,$eY)//改变结束年
                    }else if($(target).attr('data-node') == 'startMonth'){//开始月改变
                        endM(limitTime,sy_val,ey_val,sm_val,em_val,$eM);//改变结束月
                    }else{
                        startM(limitTime,sy_val,ey_val,sm_val,em_val,$sM);//改变开始月
                    }
                }
                //设置时间差后的年月
                function timeDelay(time){
                    var _date = new Date(time);
                    _newDate = new Date(_date.setMonth(parseInt(_date.getMonth()) + parseInt(option.timeDelay)));//转化成秒
                    _time.newTime_Y = _newDate.getFullYear();
                    _time.newTime_M = _newDate.getMonth();
                    var newTime = _time.newTime_Y + '-' + _time.newTime_M;
                    return newTime;
                }

                function startY(limitTime,ey_val,em_val,$sY){

                    
                    // var newTime = _time.newTime_Y + '-' + _time.newTime_M;
                    // return newTime;
                    if(option.timeDelay != ''){//设置了时间区间
                        if(em_val != 0 ){
                            if($('[data-node="startYear"]').val() != 0){console.log(434)
                                 var _date = new Date(ey_val +'-' + em_val);
                                _newDate = new Date(_date.setMonth(parseInt(_date.getMonth()) - parseInt(option.timeDelay)));//转化成秒
                                _time.newTime_Y = _newDate.getFullYear();
                                _time.newTime_M = _newDate.getMonth();
                                if(_time.newTime_Y < _time.sY){//如果计算的日期小于起始年
                                    limitTime.minsY = _time.sY;//为起始年
                                }else{
                                    limitTime.minsY = _time.newTime_Y;
                                    console.log(666+'='+limitTime.minsY)
                                }
                            }
                        }else{
                            if(_time.newTime_Y > _time.eY){
                                limitTime.minsY = _time.eY
                            }else{
                                limitTime.minsY = _time.newTime_Y//parseInt(ey_val) - 1;
                                console.log(888+'='+limitTime.minsY)
                            }
                        }
                    }
                    // else{
                        if(ey_val != 0){//如果结束年不为0
                            limitTime.maxsY = ey_val;//最大为结束年
                        }else{
                            limitTime.maxsY = _time.eY;//最大为当前年
                            limitTime.minsY = _time.newTime_Y;//最小为起始年
                            console.log(limitTime.minsY)
                        }
                    // }
                    
                    disabledSelect(limitTime.minsY,limitTime.maxsY,$sY);
                }
                function startM(limitTime,sy_val,ey_val,sm_val,em_val,$sM){
                    if(sy_val == ey_val && sy_val != 0){//开始年等于结束年
                        if(sy_val == _time.sY){//开始年等于起始年
                            limitTime.minsM = _time.sM;
                            if(em_val != 0 && parseInt(em_val) >= parseInt(_time.sM)){//如果结束月不等于0且结束月da于起始月
                                limitTime.maxsM = em_val;
                            }
                        }else{
                            limitTime.minsM = 1;
                            if(em_val != 0 && parseInt(em_val) >= parseInt(sm_val)){//如果结束月不等于0且结束月大于开始月
                                limitTime.maxsM = em_val;
                            }else{
                                if(sy_val == _time.eY){//开始年等于当前年
                                    limitTime.maxsM = _time.eM;
                                }
                            }
                        }
                    }else{
                        if(sy_val == _time.sY){//如果开始年等于起始年
                            limitTime.minsM = _time.sM;//最小月为开始月
                        }else if(sy_val == _time.eY){//如果开始年等于当前年
                            limitTime.maxsM = _time.eM;//最大月为当前月
                        }
                    }
                    disabledSelect(limitTime.minsM,limitTime.maxsM,$sM);
                }
                function endY(limitTime,sy_val,sm_val,$eY){
                    if(option.timeDelay != ''){//设置了时间区间
                        if($('[data-node="startYear"]').val() != 0){
                            limitTime.maxeY = timeDelay(sy_val +'-' + sm_val).split('-')[0];
                        }
                    }
                    limitTime.mineY = sy_val;//开始年
                    disabledSelect(limitTime.mineY,limitTime.maxeY,$eY);
                }
                function endM(limitTime,sy_val,ey_val,sm_val,em_val,$eM){
                    if(sy_val == ey_val && sy_val != 0){//开始年等于结束年
                        if(sy_val == _time.sY){//开始年等于起始年
                            if(sm_val != 0){//如果开始月不等于0
                                limitTime.mineM = sm_val;//最小为开始月
                            }else{
                                limitTime.mineM = _time.sM;//最小为起始月
                            }
                        }else{
                            // if(parseInt(em_val) >= parseInt(sm_val)){
                                limitTime.mineM = sm_val;//最小为开始月
                            // }
                            if(sy_val == _time.eY){//开始年等于当前年
                                limitTime.maxeM = _time.eM;//最大为当前月
                            }
                        }
                    }else{
                        // var newTime = new Date(timeDelay(option.startTime)).getTime();
                        var newTime = new Date(timeDelay(sy_val+'-'+sm_val)).getTime();
                        if(ey_val == _time.eY){//如果结束年等于当前年
                            if(option.timeDelay != ''){
                                if(newTime > _today.getTime()){//如果计算的日期大于当前日期
                                    limitTime.maxeM = _time.eM;//最大月为当前月
                                }else{
                                    if($('[data-node="startYear"]').val() != 0){
                                        limitTime.maxeM = timeDelay(sy_val +'-'+sm_val).split('-')[1];//最大月为计算后的值
                                    }else{
                                        limitTime.maxeM = _time.eM;//最大月为当前月
                                    }
                                }
                            }else{
                                limitTime.maxeM = _time.eM;//最大月为当前月
                            }
                        }else if(ey_val == _time.sY){//如果结束年等于起始年
                            limitTime.mineM = _time.sM;//最小月为起始月
                        }else{
                            if(option.timeDelay != ''){
                                if(newTime < _today.getTime()){//如果计算的日期小于当前日期
                                    if($('[data-node="startYear"]').val() != 0 && $('[data-node="endYear"]').val()){
                                        limitTime.maxeM = timeDelay(sy_val +'-'+sm_val).split('-')[1];//最大月为计算后的值
                                    }
                                }
                            }
                        }
                    }
                    disabledSelect(limitTime.mineM,limitTime.maxeM,$eM);
                }
                function disabledSelect(min,max,dom){
                    for(var i = 0;i < dom.find('option').length;i++){
                        var _opt = dom.find('option').eq(i);
                        if(_opt.val() != 0){
                            if(parseInt(_opt.val()) < min || parseInt(_opt.val()) > max){
                                _opt.prop('disabled','disabled');
                            }else{
                                _opt.prop('disabled',false);
                            }
                        }
                    } 
                    //如果不在范围内，则清空
                    var selectedVal = dom.find('option:selected').val()
                    if(dom.find('option[value="'+ selectedVal +'"]').attr('disabled') == 'disabled'){
                        dom.find('option[value="0"]').prop('selected','selected');
                    }
                }
                
                init();
            }
        })(jQuery)
    }
})