<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'

// 创建一个响应式的引用，用于引用模板中的DOM元素  
const weekHelp = ref(null);
const mostTag = ref(null)
const $CONST = getCurrentInstance().appContext.config.globalProperties.$CONST;
// 在组件挂载后初始化ECharts图表  
onMounted(() => {
    if (weekHelp.value) {
        const weekHelpCategory = echarts.init(weekHelp.value);
        // 指定图表的配置项和数据  
        axios.get($CONST.AXIOS_API_FRONT + '/charts/week_count_article',)
            .then((res) => {
                const option = {
                    title: {
                        text: '近一周文章发布情况',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: res.data.data.name
                    },
                    yAxis: {
                        type: 'value'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            animation: false,
                            label: {
                                backgroundColor: '#ccc',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                // color: '#222'
                            }
                        },
                    },
                    series: [
                        {
                            data: res.data.data.value,
                            type: 'line',
                            smooth: true,
                            areaStyle: {}
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表  
                weekHelpCategory.setOption(option);
            })
    }
    if (mostTag.value) {
        const mostTagPie = echarts.init(mostTag.value);
        axios.get($CONST.AXIOS_API_FRONT + '/charts/most_tag',)
            .then((mostTagResult) => {
                console.log(mostTagResult.data.data);
                // 指定图表的配置项和数据  
                const option = {
                    title: {
                        text: '最常用的标签统计',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '10%',
                        left: 'center'
                    },
                    series: [
                        {
                            // name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            top: '10%',
                            padAngle: 5,
                            itemStyle: {
                                borderRadius: 10
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: 40,
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: mostTagResult.data.data.mostTags
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表  
                mostTagPie.setOption(option);
            })
    }
});

</script>

<template>

    <el-row>
        <el-col :span="12">
            <div ref="weekHelp" style="width: 600px; height: 400px;"></div>
        </el-col>
        <el-col :span="12">
            <div ref="mostTag" style="width: 400px; height: 400px;"></div>
        </el-col>
    </el-row>


</template>

<style scoped></style>