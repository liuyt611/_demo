define(function(require, exports, module) {
    var $ = require('jquery');
    require('chosen');
    var task8 = require("../../../module/ui/task8.js");
    task8($);

    function init(){
        $('#timePicker').task8({
            'startTime':'2013-6',//设置起始时间
            'timeDelay':'12'//可选的时间区间（如：12 即为12个月）
        });
    }

    module.exports = init;
});
