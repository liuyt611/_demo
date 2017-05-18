$(function(){
    $('.fullpage').fullpage({
        sectionsColor: ['#f2de3e', '#8fc2e', '#dd97ed0', '#dd97ed0', '#dd97ed0', 'ef9e72'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '3rdPage', '3rdPage', '4thpage'],
        menu: '#menu',
        slidesNavigation:true,//显示左右滑动的导航
        loopHorizontal:false,//左右不循环滑动
        controlArrows:false//去掉slide层的左右按钮
    })
})