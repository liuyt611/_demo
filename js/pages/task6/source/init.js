define(function(require, exports, module) {
    var $ = require('jquery');

    function init(){
        var abc = [{
                first: 'a',
                second: 'ab',
                name: '1'
            }, {
                first: 'a',
                second: 'ab',
                name: '2'
            }, {
                first: 'b',
                second: 'bb',
                name: '3'
            }, {
                first: 'b',
                second: 'bb',
                name: '4'
            }, {
                first: 'a',
                second: 'ac',
                name: '1'
            }, {
                first: 'a',
                second: 'ac',
                name: '2'
            }, {
                first: 'a',
                second: 'ac',
                name: '3'
            }, {
                first: 'a',
                second: 'ac',
                name: '4'
            }]

            var def = [{
                'name': 'a',
                'children': [{
                    'name': 'ab',
                    'children': [{
                        'name': '1'
                    },{
                        'name': '2'
                    }]
                }, {
                    'name': 'ac',
                    'children': [{
                        'name': '1'
                    },{
                        'name': '2'
                    },{
                        'name': '3'
                    },{
                        'name': '4'
                    }]
                }]
            },{
                'name':'b',
                'children':[{
                    'name' : 'bb',
                    'children' : [{
                        'name': '3'
                    },{
                        'name': '4'
                    }]
                }]
            }]


            var arr = ['first','second','children'];












            //数组去重
            Array.prototype.unique = function(){
                var res = [];
                var json = {};
                for(var i = 0; i < this.length; i++){
                    if(!json[this[i]]){
                        res.push(this[i]);
                        json[this[i]] = 1;
                    }
                }
                return res;
            }

            //循环abc将first去重组成新数组_first=[a,b]
            var _first =  [];
            var _second =  [];
            var _name =  [];
            var def = [];
            for(var i = 0;i < abc.length; i++){
                _first[i] = abc[i].first;
                _second[i] = abc[i].second;
                _name[i] = abc[i].name;
            }
            _first = _first.unique();//去重
            _second = _second.unique();//去重
            _name = _name.unique();//去重
            //循环—first=[a,b]
            for(var j = 0;j < _first.length;j++){//循环—first=[a,b]
                //循环生成def=[{name:a}{name:b}]
                def[j] = {'name':_first[j]};
                def[j]['children'] = [];
                for(var i = 0;i < abc.length; i++){//循环abc
                    if(abc[i].first == _first[j]){
                        for(var k = 0;k < _second.length;k++){//循环_second=[ab,bb,ac]
                            if(abc[i].second == _second[k]){//生成children
                                def[j]['children'][k] = {'name':abc[i].second};
                                def[j]['children'][k]['children'] = [];
                                for(var v = 0;v < _name.length;v++){//循环_name=[1,2,3,4]
                                    if(abc[i].name == _name[v]){//生成二级children
                                        def[j]['children'][k]['children'][v] = {'name':abc[i].name};
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log(def)



            var _order = ['project', 'module', 'name'];

            function TreeDate(list) {
                var _result = [];
                for (var i = 0; i < list.length; i++) {
                    var _array;
                    var _father=[];
                    for (var j = 0; j < _order.length; j++) {
                        if (j == 0) {
                            _array = _result;
                        } else {
                            _array = getChildrenArray(_array, list[i][_order[j - 1]]);
                        }
                        createObj(_array, list[i][_order[j]], j == _order.length - 1,_father.toString(),list[i])
                        _father.push(list[i][_order[j]])
                    }
                }
                return _result;
            }
            // console.log(TreeDate(_data));
            _result = {
                data: TreeDate(_data)
            }

            function getChildrenArray(array, name) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].name == name) {
                        return array[i].children;
                    }
                }
            }

            function createObj(array, name, isChildren,_father,allData) {
                var i = 0;
                var _isExist = false;
                do {
                    if (array.length == 0) break;
                    if (array[i].name == name) {
                        _isExist = true;
                        break;
                    }
                    i++;
                } while (i < array.length)

                if (!_isExist) {
                    if (isChildren) {
                        array.192.push({
                            name: name,
                            id:allData.id,
                            __father:_father
                        })
                    } else {
                        array.push({
                            name: name,
                            __father:_father,
                            children: []
                        })

                    }
                }
            }

    }

    module.exports = init;
});
