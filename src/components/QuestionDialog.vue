<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import { ElInput } from 'element-plus'
let dialogFormVisible = ref(false)
const formLabelWidth = '120px'
const questionForm = reactive({
    id: '',
    type: 2,
    title: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    analysis: ''
})
const answer = ref([])
const primary_btn = () => {
    dialogFormVisible.value = false
    console.log(questionForm);
}
defineExpose({
    dialogFormVisible
})
const props = defineProps(['addOrUpdate'])

</script>
<template>
    <el-dialog v-model="dialogFormVisible" :title='(addOrUpdate ? "添加" : "更新") + "题目"' width=" 500">
        <el-form :model="questionForm">
            <el-form-item :label=this.$CONST.QUESTION_TYPE :label-width="formLabelWidth">
                <el-radio-group v-model="questionForm.type" size="small">
                    <el-radio value=0 border>单选</el-radio>
                    <el-radio value=1 border>多选</el-radio>
                    <el-radio value=2 border>判断</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label=this.$CONST.QUESTION_TITLE :label-width="formLabelWidth">
                <el-input v-model="questionForm.title" placeholder="请输入题目" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item :label=this.$CONST.QUESITON_OPTION_A :label-width="formLabelWidth">
                <el-input v-model="questionForm.optionA" placeholder="请输入选项A" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item :label=this.$CONST.QUESITON_OPTION_B :label-width="formLabelWidth">
                <el-input v-model="questionForm.optionB" placeholder="请输入选项B" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item v-if="questionForm.type != 2" :label=this.$CONST.QUESITON_OPTION_C
                :label-width="formLabelWidth">
                <el-input v-model="questionForm.optionC" placeholder="请输入选项C" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item v-if="questionForm.type != 2" :label=this.$CONST.QUESITON_OPTION_D
                :label-width="formLabelWidth">
                <el-input v-model="questionForm.optionD" placeholder="请输入选项D" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item :label=this.$CONST.QUESTION_ANSWER :label-width="formLabelWidth">
                <el-radio-group v-if="questionForm.type != 1" v-model="answer[0]" size="small">
                    <el-radio value='A' border>A</el-radio>
                    <el-radio value='B' border>B</el-radio>
                    <el-radio v-if="questionForm.type != 2" value='C' border>C</el-radio>
                    <el-radio v-if="questionForm.type != 2" value='D' border>D</el-radio>
                </el-radio-group>
                <el-checkbox-group v-else v-model="answer" size="small">
                    <el-checkbox label="A" value="A" border />
                    <el-checkbox label="B" value="B" border />
                    <el-checkbox label="C" value="C" border />
                    <el-checkbox label="D" value="D" border />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label=this.$CONST.QUESTION_ANALYSIS :label-width="formLabelWidth">
                <el-input v-model="questionForm.analysis" style="width: 300px" :autosize="{ minRows: 2, maxRows: 10 }"
                    type="textarea" placeholder="请输入题目解析" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="primary_btn">
                    {{ addOrUpdate ? "添加" : "更新" }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>