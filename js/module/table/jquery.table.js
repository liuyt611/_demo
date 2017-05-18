(function($) {
    $.fn.extend({
        "table": function(data) {
            var that = this;
            var TPL = {
                "table": '<div class="table-radius-border clearfix"><table class="table table-striped table-bordered table-hover dataTable">',
                "tableEnd": "</table></div>",
                "thead": '<thead>' + '<tr>{{th}}</tr>' + '</thead>',
                "th": '<th class="{{isCenter}} {{isSorting}}" sortName="{{sortName}}">{{content}}</th>',
                "tbody": '<tbody>{{td}}</tbody>',
                "td": '<td class="{{isCenter}} {{isAdd}}">{{content}}</td>',
                "add": '<a add-id="{{addID}}" style="cursor:pointer;"><span class="ui-icon ace-icon fa fa-plus center bigger-110 blue"></span></a>'
            }
            var opt = $.extend({
                'addFunction': function() {},
                'sortFunction': function() {},
                'pageChange': function() {},
                'lengthChange': function() {}
            }, data);

            var colLength;

            function checkData(data) {
                createTable(data);
            }

            // 创建table
            function createTable(data) {
                colLength = data.th.length;
                that.html(TPL.table + checkTpl(TPL.thead, checkTh(data.th)) + checkTpl(TPL.tbody, checkTd(data.td)) + TPL.tableEnd);

                //展开表格定宽
                if (data['addWidth'] != undefined) {
                    that.off('mousewheel');
                    that.find('thead').remove();
                    that.find('table').css({
                        'table-layout': 'fixed',
                        'margin': '-1px'
                    })
                    var _l = $(that.find('tr')[0]).find('td');
                    for (var i = 0; i < _l.length; i++) {
                        $(_l[i]).css({
                            'width': data['addWidth'][i],
                            'table-layout': 'fixed'
                        })
                    };
                    var _table = that.find('table');
                    var _height = _table.height();
                    if(_height > 400){
                        _table.css({
                            'position' : 'absolute'
                        })
                        that.css({
                            'height' : '400px'
                        })
                    }

                    var _scrollHeight = 0;

                    that.on('mousewheel',function(e,delta){
                        var speed = 10;
                        var $e = $(e.target).parents('div:first').find('table');

                        var _h = $e.height() - $(e.target).parents('div:first').height();

                        if(delta > 0){
                            _scrollHeight += speed;
                        }else{
                            _scrollHeight -= speed;
                        }

                        if(_scrollHeight > 0){
                            _scrollHeight = 0;
                        }else if(_scrollHeight < -_h){
                            _scrollHeight = -_h;
                        }else{
                            e.preventDefault();
                        }

                        $e.animate({
                            top : _scrollHeight + 'px'
                        },10)

                    })
                }

                var _curTh;
                that.off('click', 'th');
                that.off('click', '.fa');

                //th排序点击事件
                that.on('click', 'th', function(e) {
                    if (!($(e.target).hasClass('sorting')) && !($(e.target).hasClass('sorting_asc')) && !($(e.target).hasClass('sorting_desc'))) return;
                    if (_curTh == undefined && $(e.target).hasClass('sorting')) {
                        _curTh = $(e.target);
                    } else if (_curTh != undefined && _curTh[0] != $(e.target)[0]) {
                        _curTh.removeClass('sorting sorting_asc sorting_desc');
                        _curTh.addClass('sorting');
                        _curTh = $(e.target);
                    }
                    var _sortType,
                        _sortName = $(e.target).attr('sortname');
                    if ($(e.target).hasClass('sorting') || $(e.target).hasClass('sorting_asc')) {
                        // $(e.target).removeClass('sorting');
                        // $(e.target).addClass('sorting_asc');
                        _sortType = 'desc';
                        // } else if ($(e.target).hasClass('sorting_desc')) {
                        // $(e.target).removeClass('sorting_desc')
                        // $(e.target).addClass('sorting_asc');
                        // _sortType = 'asc';
                    } else if ($(e.target).hasClass('sorting_desc')) {
                        // $(e.target).removeClass('sorting_asc')
                        // $(e.target).addClass('sorting_desc');
                        _sortType = 'asc';
                    }
                    opt.sortFunction(_sortType, _sortName);
                })
                
                // 展点按钮事件添加
                that.on('click', '.fa', function(e) {
                    if ($(e.target).hasClass('fa-plus')) {
                        that.find('.ui-addtr').remove();
                        that.find('table .fa').removeClass('fa-minus');
                        that.find('table .fa').addClass('fa-plus');

                        $(e.target).removeClass('fa-plus');
                        $(e.target).addClass('fa-minus');
                        var _c = '<tr class="ui-addtr"><td></td><td class="nopadding" colspan="' + ($(e.target).parents('tr').find('td').length - 1) + '"><div style="position:relative;overflow:hidden;"></div></td></tr>';
                        var _addTR = $(_c).insertAfter($(e.target).parents('tr'));

                        //获取上级表格td宽度
                        var _tr = $(e.target).parents('tr');
                        var _l = _tr.children('td').length;
                        var _width = [];
                        for (var i = 1; i < _l; i++) {
                            var __width = _tr.children('td')[i].offsetWidth;
                            _width.push(__width);
                            _tr.children('td').eq(i).css({
                                width: __width
                            })
                        }
                        opt.addFunction(_addTR.find('div'), $(e.target).parent().attr('add-id'), _width);

                    } else if ($(e.target).hasClass('fa-minus')) {
                        $(e.target).removeClass('fa-minus');
                        $(e.target).addClass('fa-plus');
                        $(e.target).parents('tr').next().remove();
                        var _tr = $(e.target).parents('tr');
                        var _l = _tr.children('td').length;
                        for (var i = 1; i < _l; i++) {
                            _tr.children('td').eq(i).css({
                                width: ''
                            })
                        }
                    }
                })
            }

            function checkTd(data) {
                var _td = '';
                if (data == '') {
                    _td = '<tr><td colspan="' + colLength + '" class="center">暂无数据</td></tr>'
                    return {
                        td: _td
                    };
                }
                for (var i = 0; i < data.length; i++) {
                    _td = _td + '<tr>' + checkTpl(TPL.td, data[i]) + '</tr>';
                };
                return {
                    td: _td
                }
            }

            function checkTh(data) {
                // isSorting : ('',,sorting,sorting_desc,sorting_asc)
                return {
                    th: checkTpl(TPL.th, data)
                }
            }

            // 替换模版
            function checkTpl(tpl, data) {
                var _str = '';
                if (data instanceof Array) {
                    for (var i = 0; i < data.length; i++) {
                        var _s = tpl
                        for (key in data[i]) {
                            if (data[i][key] == '{{add}}') {
                                data[i][key] = TPL.add;
                                data[i]['isAdd'] = 'addwidth';
                                _s = (_s.replace('{{isAdd}}', 'addwidth'));
                            }
                            _s = (_s.replace('{{' + key + '}}', data[i][key]));
                        }
                        _str += _s;
                    };
                } else {
                    var _s = tpl
                    for (key in data) {
                        if (data[key] == '{{add}}') {
                            data[key] = TPL.add;
                        }
                        _s = (_s.replace('{{' + key + '}}', data[key]));
                    }
                    _str += _s;
                }
                return _str;
            }

            // 初始化页码
            function initPlugins(data) {
                if (data.totalPage == undefined) return;
                that.pages({
                    pageNum: data['pageNum'],
                    totalPage: data['totalPage'],
                    pageCount: data['pageCount'],
                    totalShow:data['totalShow'] || '',
                    pageChange: function(num) {
                        opt.pageChange(num);
                    },
                    lengthChange: function(num) {
                        opt.lengthChange(num);
                    }
                })
            }

            checkData(opt);
            initPlugins(opt);
        }
    })
})(jQuery);
