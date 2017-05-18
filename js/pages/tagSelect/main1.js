/**
 * Author: 张磊(zhanglei8)
 *
 * tab 选择
 *
 * 依赖库： jQuery jQuery.pages jQuery.mousewheel
 *
 * demo: <a href="/apps/demo/_demo/jQuery.table2.html" target="_blank">点击查看</a>
 * 
 * Examples:
 *
 * <pre><code>
 * 
 * </code></pre>
 */

define(function(require, exports, module) {
    return function(jQuery) {
        (function($) {
            $.fn.extend({
                "tagSelect": function(data) {
                    var _that = this;
                    var _select = [],
                        _isSearch = false;

                    var TPL = {
                        wrap: '<div class="chosen-container chosen-container-multi chosen chosen-with-drop" style="width: 100%;" title="">' +
                            '<ul class="chosen-choices" node-type="selectTxt">' +
                            '<li class="search-field">' +
                            '<input type="text" value="请选择标签" readonly="readonly" class=""></li>' +
                            '</ul>' +
                            '<div class="chosen-drop">' +
                            '<div class="chosen-search">' +
                            '<input type="text" class="ng-pristine ng-valid ng-touched"  node-type="search" placeholder="搜索">' +
                            '</div>' +
                            '<ul class="chosen-results" action-type="list">' +
                            '</ul>' +
                            '</div>' +
                            '</div>'
                    }

                    function init() {
                        _that.html(TPL.wrap);
                        var _list = _that.find('[action-type="list"]');
                        _list.html(setList(data.list));

                        addEvent();
                        var _l = data.select.length;
                        if (_l > 0) {
                            var _ul = _that.find('[action-type="list"]');
                            for (var i = 0; i < _l; i++) {
                                _ul.find('[labelId=' + data.select[i] + ']').trigger('click');
                            }
                        }
                    }

                    function setList(list) {
                        var _list = list;
                        var _li = '';
                        for (var key in _list) {
                            var __list = _list[key];
                            _li = _li + '<li class="group-result" action-type="group">' + key + '</li>';
                            for (var i = 0, _l = __list.length; i < _l; i++) {
                                _li = _li + '<li class="active-result group-option" labelId="' + __list[i].labelId + '">' + __list[i].labelName + '</li>'
                            }
                        }
                        return _li;
                    }

                    function addEvent() {
                        _that.on('input', '[node-type="search"]', function() {
                            var _li = _that.find('[action-type="list"] li');
                            var _txt = $(this).val();
                            if (_txt == '') {
                                _isSearch = false;
                            } else {
                                _isSearch = true;
                            }
                            for (var i = 0, _l = _li.length; i < _l; i++) {
                                var $li = $(_li[i]);
                                if ($li.text().search(_txt) != -1) {
                                    $li.show();
                                } else {
                                    $li.hide();
                                }
                                if ($li.hasClass('group-result')) {
                                    (_txt == '') ? $li.show(): $li.hide();
                                }
                            }
                        })

                        _that.find('[node-type="selectTxt"]').on('click', '[action-type="del"]', function() {
                            var _li = $(this).parents('li');
                            var _id = _li.attr('labelid');
                            _that.find('[action-type="list"]').find('[labelId=' + _id + ']').trigger('click');
                            _li.remove();
                            setStatus();
                        })
                        _that.find('[action-type="list"]').on('click', 'li', function() {
                            if (!$(this).hasClass('group-result')) {
                                if ($(this).hasClass('result-selected')) {
                                    $(this).removeClass('result-selected');
                                    setSelectTxt($(this).text(), $(this).attr('labelId'), false)
                                } else {
                                    $(this).addClass('result-selected');
                                    setSelectTxt($(this).text(), $(this).attr('labelId'), true)
                                }
                            }
                            setStatus();
                        }).on('mouseover', 'li', function() {
                            if ($(this).hasClass('result-selected')) return;
                            $(this).addClass('highlighted');
                        }).on('mouseout', 'li', function() {
                            $(this).removeClass('highlighted');
                        }).on('click', '[action-type="group"]', function() {
                            if (_isSearch) return;
                            if ($(this).hasClass('groupChecked')) {
                                $(this).removeClass('groupChecked')
                                checkOption($(this).next(), false)
                            } else {
                                $(this).addClass('groupChecked')
                                checkOption($(this).next(), true)
                            }
                        })
                    }

                    function setStatus() {
                        var _ul = _that.find('[node-type="selectTxt"]');
                        var _li = _ul.find('li');
                        var _length = _li.length;
                        if (_length > 1) {
                            _that.find('.search-field').hide();
                        } else {
                            _that.find('.search-field').show();
                        }
                        var _array = [];
                        for (var i = 1; i < _length; i++) {
                            _array.push($(_li[i]).attr('labelid'));
                        }
                        _ul.attr('selectID', _array.toString());
                    }

                    function checkOption(dom, isF) {
                        if (dom.hasClass('active-result')) {
                            if (isF) {
                                dom.hide();
                            } else {
                                dom.show();
                            }
                            checkOption(dom.next(), isF);
                        }
                    }

                    function setSelectTxt(txt, id, isAdd) {
                        var _input = _that.find('[node-type="selectTxt"]');
                        if (isAdd) {
                            var _li = '<li class="search-choice" labelid="' + id + '"><span>' + txt + '</span><a class="search-choice-close" action-type="del"></a></li>';
                            _input.append(_li);
                        } else {
                            var _li = _input.find('[labelid=' + id + ']');
                            _li.remove();
                        }


                    }
                    init();
                }
            })
        })(jQuery);
    }
})
