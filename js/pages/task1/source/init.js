define(function(require, exports, module) {
    var $ = require('jquery');
    var task1 = require("../../../module/ui/task1.js");
    task1($);

    function init(){
        $('#timeTable').task1({
        	myTime:['2016-1-1','2016-2-2','2016-3-3','2017-6-6'],
        	othersTime:['2016-6-1','2016-10-1','2017-8-8']
        });
    }

    module.exports = init;
});
