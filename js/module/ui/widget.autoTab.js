/**
 * Created by Jils@ on 160224.
 * o.width 为tab显示的宽度
 *
 */

// 可左右翻页的Tab  {width:600}
define(function (require, exports, module) {
    module.exports = function(o){
        var $ = require("jqueryui");
        var prev = $('[node-type="prev"]'),
            next = $('[node-type="next"]'),
            item = $('[node-typt="autoTab"] li'),
            len = $('[node-typt="autoTab"] li').length -1 ,
            nowcnt = $('li.cur').index(),
            tabwrap = $('[node-typt="autoTab"] .tabwrap'),
            ul = $('[node-typt="autoTab"] ul'),
            tabContent = $('[node-typt="tabContent"]');
            
        var ulWidth = 0;
        $.each(item, function(i, e) {
             ulWidth+=$(e).width()
        });

        tabwrap.width(o.width);
        ul.width(ulWidth+1);

        $('[node-typt="autoTab"]').on('click','li',function(){
            var that = $(this),
                index = that.index();
            that.addClass('cur').siblings('li').removeClass('cur');
            nowcnt = $('li.cur').index();
            tabContent.addClass('hide').eq(index).removeClass('hide');
        })

        
        prev.on('click',function(){
            if(nowcnt===0){
                return false;
            }
            nowcnt --;
            var thisItemLeft = item.eq(nowcnt).position().left;
            var ulLeft = ul.position().left;
            if( ulLeft<0 && thisItemLeft< -(ulLeft)){
                ul.css('left',-thisItemLeft)
            }
            item.eq(nowcnt).addClass('cur').siblings('li').removeClass('cur');
            tabContent.addClass('hide').eq(nowcnt).removeClass('hide');
        })

        next.on('click',function(){
            if(nowcnt===len){
                return false;
            }
            nowcnt ++;
            var thisItemRight = item.eq(nowcnt).position().left + item.eq(nowcnt).width();
            if(thisItemRight > o.width){
                ul.css('left',-item.eq(nowcnt).position().left)
            }
            item.eq(nowcnt).addClass('cur').siblings('li').removeClass('cur');
            tabContent.addClass('hide').eq(nowcnt).removeClass('hide');
        })
    } 
})