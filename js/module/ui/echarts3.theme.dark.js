/**
 * Created by Veblin on 2/16/16.
 */
'use strict'
define(function (require, exports, module) {
    var option = {
        // 默认背景色
        backgroundColor: '#333',
        // 默认色板
        color: [
            '#62B5DE', '#8FB671', '#EFC17E', '#FE9C72', '#d87a80'
        ],
        // 提示框
        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.5)', // 提示背景颜色，默认为透明度为0.7的黑色
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: { // 直线指示器样式设置
                    color: '#008acd'
                },
                crossStyle: {
                    color: '#008acd'
                },
                shadowStyle: { // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.2)'
                }
            }
        },
        // 图表标题
        title: {
            textStyle: {
                color: '#fff'
            }
        },
        // 值域
        dataRange: {
            itemWidth: 15,
            color: ['#5ab1ef', '#e0ffff']
        },
        //色块说明
        legend: {
            textStyle: {
                color: '#fff'
            }
        },
        // 工具箱
        toolbox: {
            color: ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
            effectiveColor: '#ff4500'
        },
        //全局文本样式
        textStyle: {
            fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
            color: 'rgba(255, 255, 255, 0.3)'
        },
        //x轴样式
        xAxis: [
            {
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
                axisTick: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#ccc'
                    }
                }
            }
        ],
        //y轴样式
        yAxis: [
            {
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
                axisTick: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#ccc'
                    }
                }
            }
        ]
    }
    module.exports = option;
})