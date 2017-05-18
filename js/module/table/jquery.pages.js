(function($) {
    $.fn.extend({
        "pages": function(option) {
			option.totalPage = Math.ceil(option.totalPage/option.pageCount);
        	var that = this;
        	var _option = $.extend({
            	pageNum : 1,
            	pageCount : 20,
            	totalPage : 1,
            	lengthChange : function(){},
            	pageChange : function(){}
        	},option),
        	TPL = {
        		page : '<div class="row table-control">'
						+'    <div class="col-xs-6 pull-left">'
						+'        <div class="dataTables_length">'
						+'            <label>每页显示'
						+'                <select data-node="length">'
						+'                    <option value="10">10</option>'
						+'                    <option value="20">20</option>'
						+'                    <option value="50">50</option>'
						+'                    <option value="100">100</option>'
						+'                </select>条记录</label>'
						+'<span style="margin-left: 25px">'+option.totalShow+'</span>'
						+'        </div>'
						+'    </div>'
						+'    <div class="col-xs-6 pull-right">'
						+'        <div class="dataTables_paginate paging_bootstrap">'
						+'            <ul class="pagination">'
						+'            </ul>'
						+'        </div>'
						+'    </div>'
						+'</div>'
        	};

        	function init(){

        		that.append(TPL.page);
        		selectCount(_option.pageCount);
        		initPage();

        		that.off('change','[data-node="length"]');
        		that.off('click','.pagination a');

        		that.on('change','[data-node="length"]',function(e){
        			// console.log($(e.target).find('option:selected').val());
        			_option.lengthChange($(e.target).find('option:selected').val());
        		})

        		that.on('click','.pagination a',function(e){
					var $this = $(this),
						$parent = $this.parents("li");
					if($parent.hasClass('disabled') || $parent.hasClass('active')) return;
        			_option.pageChange($this.attr('data-num'));
        		})
        	}

        	function selectCount(num){
        		var _sel = that.find('option[value="' + num + '"]');
        		_sel.attr('selected','selected');
        	}

        	function initPage(){
        		if(_option.pageNum == 1){
        			var _str = '<li class="prev disabled"><a href="javascript:;" data-num="1" title="首页"><i class="fa fa-backward"></i></a></li>'
								+'<li class="prev disabled"><a href="javascript:;" data-num="' + (_option.pageNum - 1) +'" title="上一页"><i class="fa fa-caret-left"></i></a></li>';
        		}else{
			        var _str = '<li class="prev"><a href="javascript:;" data-num="1" title="首页"><i class="fa fa-backward"></i></a></li>'
								+'<li class="prev"><a href="javascript:;" data-num="' + (_option.pageNum - 1) +'" title="上一页"><i class="fa fa-caret-left"></i></a></li>';
        		}

				var _pageList = [];
				var _p = '';
				if(_option.totalPage < 6){
					for (var i = 0; i < _option.totalPage; i++) {
						if((i + 1) == _option.pageNum){
							_p = _p + '<li class="active"><a href="javascript:;" data-num="' + ( i + 1 ) + '">' + ( i + 1 ) + '</a></li>';

						}else{
							_p = _p + '<li class=""><a href="javascript:;" data-num="' + ( i + 1 ) + '">' + ( i + 1 ) + '</a></li>';
						}
					}
				}else{
					var _startN = _option.pageNum - 2;
					if(_startN < 1){
						_startN = 1;
					}else if(_startN + 4 > _option.totalPage){
						_startN = _option.totalPage - 4;
					}
					for (var i = 0; i < 5; i++) {
						if(_startN == _option.pageNum){
							_p = _p + '<li class="active"><a href="javascript:;" data-num="' + _startN + '">' + _startN + '</a></li>';

						}else{
							_p = _p + '<li class=""><a href="javascript:;" data-num="' + _startN + '">' + _startN + '</a></li>';
						}
						_startN++;
					};
				}
				_str += _p;
				if( _option.pageNum == _option.totalPage){
					_str = _str + '<li class="next disabled"><a href="javascript:;" data-num="' + (parseInt(_option.pageNum) + 1) +'" title="下一页"><i class="fa fa-caret-right"></i></a></li>'
							+ '<li class="next disabled"><a href="javascript:;" data-num="' + (_option.totalPage) +'" title="末页"><i class="fa fa-forward"></i></a></li>'
				}else{
					_str = _str + '<li class="next"><a href="javascript:;" data-num="' + (parseInt(_option.pageNum) + 1) +'" title="下一页"><i class="fa fa-caret-right"></i></a></li>'
							+ '<li class="next"><a href="javascript:;" data-num="' + (_option.totalPage) +'" title="末页"><i class="fa fa-forward"></i></a></li>'
				}

				$(_str).appendTo(that.find('.pagination'))
        	}

        	init();

        }
    })
})(jQuery);
