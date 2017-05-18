/**
 * Created by Veblin on 3/1/16.
 */
'use strict'
define(function (require, exports, module) {
    var $ = require('jquery');
    require("../../module/ui/metisMenu");
    var init = function(){
        var url = window.location;
        var element = $('ul.nav a').filter(function() {
            return this.href == url || url.href.indexOf(this.href) == 0;
        }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
        $("#side-menu").metisMenu();
    }
    module.exports = init;
})
 