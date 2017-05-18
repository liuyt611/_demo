;define(function (require, exports, module) {

    var jQuery = require("jqueryui");

    ;(function($, window, document, undefined) {

        //左导菜单
        $('body').on('click','#side-menu>li>a',function(){
            var that = $(this);
            var soDom = that.parent('li');
            $('#side-menu>li').removeClass('active');
            soDom.addClass('active');

        });

    })(jQuery, window, document);

});



// 备份以往需求代码（点击当前跳到第一个）

// ;define(function (require, exports, module) {

//     var jQuery = require("jqueryui");

//     ;(function($, window, document, undefined) {

//         //左导菜单
//         var that = $('#side-menu>li.active>a');
//         var soDom = that.parent('li');
//         var liDom = soDom.clone(true, true);
//         $('#side-menu').prepend(liDom);
//         soDom.remove();

//         $('body').on('click','#side-menu>li>a',function(){
//             var that = $(this);
//             var soDom = that.parent('li');
//             var liDom = soDom.clone(true);
//             $('#side-menu>li').removeClass('active');
//             $('#side-menu>li>ul').addClass('collapse');
//             liDom.addClass('active');
//             liDom.find('ul').removeClass('collapse');
//             $('#side-menu').prepend(liDom);
//             soDom.remove();
//         });

//     })(jQuery, window, document);

// });