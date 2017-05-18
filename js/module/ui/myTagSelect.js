define(function (require,exports,module){
    return function(jQuery){
        (function($){
            $.fn.myTagSelect = function(data){
                var _that = this;
                var _html = '<div class="chosen-container chosen-container-multi chosen-with-drop" style="width: 100%;" title="">'+
                            '<ul class="chosen-choices" node-type="selectTxt" selectid="">'+
                            '<li class="search-field">'+
                            '<input type="text" value="请选择标签" class="" autocomplete="off" readonly></li>'+
                            '</ul> '+
                            '<div class="chosen-drop">'+
                            '<div class="chosen-search"><input type="text" action-type="search" placeholder="搜索" autocomplete="off"></div>'+
                            '<ul class="chosen-results" action-type="list"></ul>'+
                            '</div>'+
                            '</div>'


                function init(){
                    _that.html(_html);

                    //添加下拉列表数据
                    var _list = _that.find('[action-type="list"]');
                    _list.html(addList(data.list));

                    //列表鼠标滑过，添加背景色
                    mouseEvent(_list);

                    //搜索及是否选择
                    operate();

                    //默认选中
                    if(data.select.length > 0){
                        for(var i = 0;i < data.select.length;i++){
                            _that.find('[labelid=' + data.select[i] + '] label input').trigger('click');
                        }
                    }
                    //展开收起 标签组
                    upGroup();
                }
                //添加下拉列表数据
                function addList(list){
                    var _liGroup = '',_li = '';
                    $.each(list,function(key,val){
                        _liGroup = '<li class="group-result open" action-type="group">' + key + '</li>';
                        var _liList = '';
                        for(var i = 0;i < val.length;i++){
                            _liList += '<li class="active-result group-option" labelId="'+ val[i].labelId +'"><label for="'+ val[i].labelId +'"><input type="checkbox" id="'+ val[i].labelId +'" name="list"> '+ val[i].labelName +'</li>'
                        }
                        _li += _liGroup + _liList;
                    })
                    return _li;
                }
                //列表鼠标滑过，添加背景色
                function mouseEvent(_list){
                    _list.on('mouseover','li',function(){
                        $(this).addClass('highlighted')
                    }).on('mouseout','li',function(){
                        $(this).removeClass('highlighted')
                    })
                }
                //搜索及是否选择
                function operate(){
                    //搜索  
                    var _li = _that.find('[action-type="list"] li');
                    var $li = $(_li);
                    _that.on('input','[action-type="search"]',function(){
                        var _searchVal = _that.find('[action-type="search"]').val();
                        for(var i = 0;i < $li.length; i++){
                            if($li.eq(i).text().search(_searchVal) != -1){
                                $li.eq(i).show();
                            }else{
                                $li.eq(i).hide();
                            }
                            //是否隐藏组名称
                            if($li.eq(i).hasClass('group-result')){
                                _searchVal == '' ? $li.eq(i).show() : $li.eq(i).hide();
                            }
                        }
                        
                    
                    })
                    //选中效果
                    _that.on('click','[action-type="list"] label input',function(){
                        var showList = _that.find('[node-type="selectTxt"]');
                        var defaultIpt = _that.find('[node-type="selectTxt"] .search-field');
                        var chosenLi = _that.find('[node-type="selectTxt"] li[labelid="'+ $(this).attr('id') +'"]');
                        var _length = _that.find('[node-type="selectTxt"] li').length;
                        
                        if($(this)[0].checked){
                            defaultIpt.hide();
                            var _li = '<li class="search-choice" labelid="'+ $(this).attr('id') +'"><span>'+ $(this).parents('li').text() +'</span></li>'
                            showList.append(_li);
                        }else{
                            if(_length == 2){
                                defaultIpt.show();
                                chosenLi.remove();
                            }else{
                                chosenLi.remove();
                            }
                        }
                        //获取选中的id
                        var chosenId = '';
                        var _liList = _that.find('.search-choice')
                        for(var i = 0;i < _liList.length;i++){
                            chosenId += _liList.eq(i).attr('labelid') + ',';
                        }
                        chosenId = chosenId.substring(0,(chosenId.length - 1))
                        $('[node-type="selectTxt"]').attr('selectid',chosenId)
                    })
                }
                //展开收起 标签组
                function upGroup(){
                    var _group = '';
                    _that.on('click','[action-type="group"]',function(){
                        if($(this).hasClass('open')){
                            $(this).removeClass('open');
                            _group = false;
                            open($(this).next(),_group);
                        }else{
                            $(this).addClass('open');
                            _group = true;
                            open($(this).next(),_group);
                        }
                    })

                    function open(dom,_group){
                        if(dom.hasClass('active-result')){
                            if(_group){
                                dom.show();
                            }else{
                                dom.hide();
                            }
                            open(dom.next(),_group)
                        }
                    }
                }


                init();
            }
        })(jQuery)
    }
})