/**
 * Created by Veblin on 2/25/16.
 * DOC WIKI URL:http://jw.tech.bitauto.com:8090/pages/viewpage.action?pageId=11894863
 */
define(function(require, exports, module) {
  	require ('mock');
  	Mock.mock(/\/media\/lists/, {
	    'data':[
	        {
	            'desc': "用于业务线/商家内部管理商品的唯一标识",
	            'field': "PId",
	            'fieldContent': "284",
	            'fieldName': "商品ID"
	        },  
	        {
	            'desc': "用于设置商品落地页",
	            'field': "AdLink",
	            'fieldContent': "http://item.yichemall.com/p_42.html",
	            'fieldName': "页面url"
	        },
	        {
	            'desc': "用于产品描述、广告宣传或者活动标语",
	            'field': "Slogan",
	            'fieldContent': "这是五个字这啦 惠买车团购 直降375000元 这是五个字字阿个字啦",
	            'fieldName': "广告/活动标语"
	        },
	        {
	            'desc': "产品相关的图片地址",
	            'field': "Img",
	            'fieldContent': "http://img2.bitautoimg.com/autoalbum/0225262_6.jpg",
	            'fieldName': "图片"
	        },
	        {
	            'desc': "推广开始时间:格式为yyyy/mm/dd hh:mm:ss、yyyy-mm-dd hh:mm:ss",
	            'field': "StartTime",
	            'fieldContent': "0000-00-00 00:00:00",
	            'fieldName': "推广开始时间"
	        },
	        {
	            'desc': "推广结束时间:格式为yyyy/mm/dd hh:mm:ss、yyyy-mm-dd hh:mm:ss",
	            'field': "EndTime",
	            'fieldContent': "0000-00-00 00:00:00",
	            'fieldName': "推广结束时间"
	        },
	        {
	            'desc': "用于填写移动链接地址",
	            'field': "Mlink",
	            'fieldContent': "填写移动链接地址",
	            'fieldName': "移动落地页"
	        },
	        {
	            'desc': "用于描述汽车品牌",
	            'field': "BrandName",
	            'fieldContent': "丰田",
	            'fieldName': "品牌"
	        },
	        {
	            'desc': "可填写省份或城市，多个地域可以用,分隔，须按照易车标准地域库ID填写",
	            'field': "RegionId",
	            'fieldContent': "201",
	            'fieldName': "地域ID"
	        }
	    ]
	});
	
	Mock.mock(/\/media\/img/, {
		info:'http://yiche.com/img.jpg'
	})
});









//（1）｜－媒体｜－－列表API
//Mock.mock(/\/media\/lists/, {
//'code': 200,
//    'msg': "访问成功！",
//    list: [{
//        id: "1000",
//        width: "logo宽",
//        height: "logo高",
//        based: "总部所在地",
//        coverage: "覆盖范围",
//        createtime: "创建时间",
//        creator: "创建者",
//        en_name: "英文名",
//        intro: "简称",
//        is_del: "是否删除",
//        logo: "logo地址",
//        logo_name: "logo名称",
//        media_type_name: "媒体类型名称",
//        media_type: "媒体类型",
//        name: "媒体名称",
//        web_site: "主页地址",
//        channel_num: "频道总数",
//        place_num: "广告位总数",
//        remark: "备注",
//        'type|1': ["0","1","2","媒体广告"],
//        'platefrom|1': ["0","1"],
//        'middle':{
//            0: "1", //手机
//            1: "2" //平板
//        },
//        'docking|1': ["0","1"],
//        'type_id|1': ["0","1","2","媒体广告"],
//        'platefrom_id|1': ["0","1"],
//        middle_id:{
//            0: "1", //手机
//            1: "2" //平板
//        },
//        'docking_id|1': ["0","1"],
//        'control': {
//            "1": 2,
//            "2": 1,
//            "3": 2
//        }
//    }],
//    page_index: 0,
//    page_size: 20,
//    totals: 99
//});
    //（2）｜－媒体/频道/广告位｜－－筛选数据API
//Mock.mock(/\/media\/screen_data/, {
//    code: '200',
//    'media_type|1-10': [{
//        'id|+1': 1,
//        'name|1-4': "媒体"
//    }],
//    'medias|1-10': [{
//        'id|+1': 1,
//        'name|+1': "媒体名称"
//    }],
//    'channels|1-10': [{
//        'id|+1': 1,
//        'name|+1': "频道名称"
//    }],
//    'platefroms|1-10': [{
//        'id|+1': 1,
//        'name|+1': "投放平台名称"
//    }],
//    'specifications|1-10': [],
//    'types|1-10': [{
//        'id|+1': 1,
//        'name|+1': "类型名称"
//    }]
//})

//（3）｜－媒体｜－－详情API
//Mock.mock(/\/media\/detail/, {
//    code: '200',
//    'list': [{
//        'id': 1,
//        based: "总部所在地",
//        coverage: "覆盖范围",
//        createtime: "创建时间",
//        creator: "创建者",
//        en_name: "英文名",
//        intro: "简称",
//        is_del: "是否删除",
//        logo: '@url("http")',//"logo地址",
//        media_name: "媒体类型名称",
//        media_type: '@integer(1, 5)',//"媒体类型ID",
//        name: "媒体名称",
//        web_site:'@url("http")',// "主页地址",
//        channel_num: "频道总数",
//        place_num: "广告位总数",
//        remark: "备注"
//    }]
//})

//（4）｜－ 频道｜－－列表API
//Mock.mock(/\/channel\/lists/, {
//    code: '200',
//    'list|1-10': [{
//        'id|+1': 1,
//        name: "频道名称",
//        remark: "备注",
//        createtime: "创建时间",
//        creator: "创建者",
//        place_num: "广告位总数",
//        web_site: '@url("http")',//"页面url",
//        media_name: "媒体名称",
//        media_id: "媒体ID",
//        control: {
//            1: 2,
//            2: 1,
//            3: 2,
//            4: 1
//        }
//    }],
//    page_index: 1,
//    page_size: 20,
//    totals: Random.integer(30, 100)
//})


//（5）｜－频道｜－－详情API
//Mock.mock(/\/channel\/detail/, {
//    code: '200',
//    'list|1-10': [{
//        'id|+1': 1,
//        id: "频道ID",
//        name: "频道名称",
//        remark: "备注",
//        createtime: "创建时间",
//        creator: "创建者",
//        place_num: "广告位总数",
//        web_site: '@url("http")'//"页面url"
//    }]
//})


//（6）｜－ 广告位｜－－列表API
//Mock.mock(/\/place\/lists/, {
//    code: 200,
//    'list|1-10': [{
//        'id|+1': 1,
//        advertiser_name: "测试专用",
//        channel_id: "频道ID",
//        channel_name: "频道名称",
//        code: "广告位代码",
//        createtime: "创建时间",
//        creator: "创建者",
//        height: "高",
//        is_del: "是否删除",
//        kanli_price: "刊例价格",
//        kanli_threshold: "刊例最低阈值",
//        kanli_type: "刊例类型",
//        media_id: "媒体ID",
//        media_name: "媒体名称",
//        name: "广告位名称",
//        place_size: "200*500",
//        platefrom: "投放平台",
//        remark: "备注",
//        title_max_num: "文字限制最大",
//        title_min_num: "文字限制最小",
//        type: "类型",
//        url: "页面URL",
//        width: "宽",
//        control: {
//            1: 2,
//            2: 1,
//            3: 2,
//            4: 1
//        }
//    }],
//    page_index: 1,
//    page_size: 20,
//    totals: Random.integer(30, 100)
//})

//（7）｜－ 广告位｜－－批量获取代码API
// 下载

//（8）｜－ 媒体/频道/广告位｜－－面包屑API
//Mock.mock(/\/media\/crumbs/, {
//    code: '200',
//    'list': {
//        media_id: "媒体ID",
//        media_name: "媒体名称",
//        channel_id: "频道ID",
//        channel_name: "频道名称",
//        place_id: "广告位ID",
//        place_name: "广告位名称"
//    }
//})


//（9）｜－ 媒体｜－－新增API
//Mock.mock(/\/media\/add/, {
//    code: '200',
//    id: '123'
//})


//（10）｜－ 媒体｜－－编辑API

//Mock.mock(/\/media\/mod/, {
//    code: '200'
//})

//（11）｜－ 媒体｜－－删除API
//
//Mock.mock(/\/media\/del/, {
//    code: '200'
//})

//（12）｜－ 频道｜－－新增API
//Mock.mock(/\/channel\/add/, {
//    code: '200',
//    id: '123'
//})
//
////（13）｜－ 频道｜－－编辑API
//Mock.mock(/\/channel\/mod/, {
//    code: '200'
//})
//
////（14）｜－ 频道｜－－删除API
//Mock.mock(/\/channel\/del/, {
//    code: '200'
//})
//
//
////（15）｜－ 广告位｜－－新增API
//Mock.mock(/\/place\/add/, {
//    code: '200',
//    id: '123'
//})
//
////（16）｜－ 广告位｜－－编辑API
//Mock.mock(/\/place\/mod/, {
//    code: '200'
//})
//
////（17）｜－ 广告位｜－－删除API
//Mock.mock(/\/place\/del/, {
//    code: '200'
//})

//八、操作日志
//（1）｜－投放日志｜－－列表API

//Mock.mock(/\/log\/delivery_lists/, {
//    code: '200',
//    'list|1-20': [{
//        'id|+1': 1,
//        op_name: "操作对象名称",
//        'op_time|1':[ "2016/02/24 11:19", "2016/02/23 11:19", "2016/02/22 11:19", "2016/02/25 11:19"],
//        op_type: "操作类型",
//        'op_value|1': ["媒体","频道","广告位","媒体广告"],
//        oper: "操作人",
//        remark: "操作备注"
//    }],
//    page_index: 1,
//    page_size: 20,
//    totals: Random.integer(30, 100)
//})

//（2）｜－资源日志｜－－列表API
//Mock.mock(/\/log\/media_lists/, {
//    code: '200',
//    'list|1-20': [{
//        'id|+1': 1,
//        op_name: "操作对象名称",
//        op_time: Random.now('yyyy-MM-dd HH:mm'),
//        op_type: "操作类型",
//        'op_value|1': ["媒体","频道","广告位","媒体广告"],
//        oper: "操作人",
//        remark: "操作备注"
//    }],
//    page_index: 1,
//    page_size: 20,
//    totals: Random.integer(30, 100)
//})