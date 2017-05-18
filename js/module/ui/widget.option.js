/**
 * Created by Veblin on 2/14/16.
 */
define(function (require, exports, module) {
    var options = {
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
        }
    };
    module.exports = options;
})