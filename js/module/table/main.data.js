$(function(){
    if (!!$('#breadcrumbs_yt').length && !!$('#breadcrumbs_yt').attr('data-module')) {
        var module_name = $('#breadcrumbs_yt').attr('data-module');
        var v = 000;
        function importJs(name) {
            var importScript = (function (oHead) {
                function loadError(oError) {
                    throw new URIError("The script " + oError.target.src + " is not accessible.");
                }

                return function (sSrc, fOnload) {
                    var oScript = document.createElement("script");
                    oScript.type = "text\/javascript";
                    oScript.onerror = loadError;
                    if (fOnload) {
                        oScript.onload = fOnload;
                    }
                    oHead.appendChild(oScript);
                    oScript.src = sSrc;
                }
            })(document.body || document.getElementsByTagName("body")[0]);
            //页面模块
            importScript("/themes/v1/assets/js/" + name + ".js?v=" + v);
        }
        //var v = (new Date()).getTime();
        if (module_name.indexOf(',') > -1) {
            var _modules = module_name.split(',')
            for (var i = 0; i < _modules.length; i++) {
                importJs(_modules[i])
            }
        } else {
            importJs(module_name)
        }

        
    }

})