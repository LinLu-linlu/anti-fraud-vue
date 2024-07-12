<script lang="ts" setup>
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import QuestionDialog from '@/components/QuestionDialog.vue';
const currentPage = ref(1)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const search = ref("")
const centerDialogVisible = ref(false)
const questionDialog = ref(null)
var addOrUpdate = ref(true)
interface Question {
    id: Number
    type: number
    title: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    analysis: string
    answer: string
}
const insert_question = () => {
    addOrUpdate.value = true
    questionDialog.value.dialogFormVisible = true
}
const update_question = () => {
    addOrUpdate.value = false
    questionDialog.value.dialogFormVisible = true
}
const delete_question = () => {
    console.log("删除");
    centerDialogVisible.value = true
}
const filterType = (value: number, article: Question) => {
    return article.type === value
}
const tableData: Question[] = [
    {
        id: 1,
        type: 0,
        title: "QQ,微信伪装熟人诈骗",
        optionA: "骗子盗取被害人网络及时对话软件（如QQ、微信等）账号，",
        optionB: "user1",
        optionC: "2023-12-07 13:04:21",
        optionD: "",
        analysis: "",
        answer: "A"
    },
    {
        id: 2,
        type: 1,
        title: "QQ,微信伪装熟人诈骗",
        optionA: "骗子盗取被害人网络及时对话软件（如QQ、微信等）账号，",
        optionB: "user1",
        optionC: "2023-12-07 13:04:21",
        optionD: "",
        analysis: "",
        answer: "ABCD"
    },
    {
        id: 3,
        type: 2,
        title: "QQ,微信伪装熟人诈骗",
        optionA: "骗子盗取被害人网络及时对话软件（如QQ、微信等）账号，",
        optionB: "user1",
        optionC: "",
        optionD: "",
        analysis: "",
        answer: "A"
    },
]
const question_type = (question: Question) => {
    if (question.type === 0) {
        return "单选题"
    } else if (question.type === 1) {
        return "多选题"
    } else {
        return "判断题"
    }
}
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

</script>
<template>
    <h1>{{ this.$CONST.QUESTION_MANAGE }}</h1>
    <div style="margin-top: 40px;">
        <el-input v-model="search" style="width: 240px;" size="small"
            :placeholder=this.$CONST.QUESTION_SEARCH_PLACEHOLDER clearable />
        <el-button type="primary" style="margin-left: 20px;" size="small">搜索</el-button>
        <el-button type="primary" plain style="margin-left: 30px;" size="small" @click="insert_question">添加</el-button>
    </div>
    <el-table :data="tableData" height="500" style="width: 100%;margin-top: 30px;" table-layout="auto">
        <el-table-column prop="type" :label=this.$CONST.QUESTION_TYPE
            :filters="[{ text: '单选', value: 0 }, { text: '多选', value: 1 }, { text: '判断', value: 2 }]"
            :filter-method="filterType" filter-placement="bottom-end">
            <template #default="scope">
                <el-tag type="primary" disable-transitions>
                    {{ question_type(scope.row) }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="title" :label=this.$CONST.QUESTION_TITLE />
        <el-table-column prop="optionA" :label=this.$CONST.QUESITON_OPTION_A show-overflow-tooltip />
        <el-table-column prop="optionB" :label=this.$CONST.QUESITON_OPTION_B show-overflow-tooltip />
        <el-table-column prop="optionC" :label=this.$CONST.QUESITON_OPTION_C show-overflow-tooltip />
        <el-table-column prop="optionD" :label=this.$CONST.QUESITON_OPTION_D show-overflow-tooltip />
        <el-table-column prop="analysis" :label=this.$CONST.QUESTION_ANALYSIS show-overflow-tooltip />
        <el-table-column prop="answer" :label=this.$CONST.QUESTION_ANSWER />
        <el-table-column prop="operations" label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="update_question">
                    修改
                </el-button>
                <el-button size="small" type="danger" @click="delete_question">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" :page-size="10" :size="size" :disabled="disabled"
        :background="background" layout="total, prev, pager, next,jumper" :total=tableData.length
        @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 30px;" />
    <el-dialog v-model="centerDialogVisible" title="删除确认" width="500" align-center>
        <span>确定删除该题目吗？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="centerDialogVisible = false">
                    删除
                </el-button>
            </div>
        </template>
    </el-dialog>
    <QuestionDialog :addOrUpdate="addOrUpdate" ref="questionDialog" />
</template>
<style scoped></style>