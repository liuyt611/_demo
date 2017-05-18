/**
 * Created by Jils@ on 160219.
 *
 * 接收参数 o,  类型 obj, leftDom左容器选择器（querySelector）, rightDom右容器, pageHeadHeight头部高度；
 * 
 * 示例：
 *      autoHeight({
 *          'leftDom': '[node-type="autoHeightLeft"]',
 *          'rightDom': '[node-type="autoHeightRight"]',
 *          'pageHeadHeight': 150
 *      });
 *
 */


// 两栏布局自适应高度
define(function (require, exports, module) {

    var jQuery = require("jqueryui");
    ;(function($, window, document, undefined) {

    module.exports = function(o){
        window.onload = window.onresize = function(){
            var de = document.documentElement;
            var winHeight = self.innerHeight||(de && de.clientHeight)||document.body.clientHeight;
            var pageHeadHeight = o.pageHeadHeight;
            var leftDiv = document.querySelector(o.leftDom);
            if(leftDiv===null){
                $('nav').append('<div class="navbar-default sidebar" role="navigation" node-type="autoHeightLeft" style="height: 0px;">');
                leftDiv = document.querySelector(o.leftDom);
            }
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


        }
    }

    })(jQuery, window, document);
    
})