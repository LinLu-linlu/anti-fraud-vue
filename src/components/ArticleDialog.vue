<script lang="ts" setup>
import { onMounted, ref, nextTick, getCurrentInstance } from 'vue'
import { ElInput } from 'element-plus'
import axios from 'axios'

const formLabelWidth = '120px'
const props = defineProps(['addOrUpdate', 'articleId'])
const $CONST = getCurrentInstance().appContext.config.globalProperties.$CONST;
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const emit = defineEmits(['refresh'])

let authors = ref()
let dynamicTags = ref([])
let dialogFormVisible = ref(false)
let articleForm = ref({
    id: null,
    title: '',
    content: '',
    uid: '',
    datetime: '',
    img: '',
    type: ''
})

const get_authors = () => {
    axios.get($CONST.AXIOS_API_FRONT + '/user/all',)
        .then((res) => {
            // console.log(res.data);
            authors.value = res.data.data
        })
}

const primary_btn = () => {
    // console.log(articleForm);
    // console.log(dynamicTags);
    axios.post($CONST.AXIOS_API_FRONT + (props.addOrUpdate ? '/article/add' : '/article/update'), {
        article: articleForm.value,
        tags: dynamicTags.value
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        emit('refresh')
        dialogFormVisible.value = false
    })
}

const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}


const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}

const open = () => {
    get_authors()
    // console.log(props.addOrUpdate);
    if (!props.addOrUpdate) {
        axios.get($CONST.AXIOS_API_FRONT + '/article/selectById', {
            params: {
                id: props.articleId
            }
        }).then((res) => {
            articleForm.value = res.data.data
        })
        axios.get($CONST.AXIOS_API_FRONT + '/article/selectTagById', {
            params: {
                id: props.articleId
            }
        }).then((res) => {
            dynamicTags.value = res.data.data
        })
    }
}

const close = () => {
    articleForm = ref({
        id: null,
        title: '',
        content: '',
        uid: '',
        datetime: '',
        img: '',
        type: ''
    })
    dynamicTags = ref([])
}

defineExpose({
    dialogFormVisible
})

</script>
<template>
    <el-dialog v-model="dialogFormVisible" :title='(addOrUpdate ? "发布" : "更新") + "文章"' width="500" @open="open"
        @close="close">
        <el-form :model="articleForm">
            <el-form-item :label=$CONST.ARTICLE_TITLE :label-width="formLabelWidth">
                <el-input v-model="articleForm.title" placeholder="请输入标题" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item :label=$CONST.ARTICLE_AUTHOR :label-width="formLabelWidth">
                <el-select v-model="articleForm.uid" filterable placeholder="请选择作者" style="width: 300px">
                    <el-option v-for="item in authors" :key="item.username" :label="item.nickname" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item :label=$CONST.ARTICLE_CONTENT :label-width="formLabelWidth">
                <el-input v-model="articleForm.content" style="width: 300px" :autosize="{ minRows: 2, maxRows: 10 }"
                    type="textarea" placeholder="请输入文章正文" />
            </el-form-item>
            <el-form-item :label=$CONST.ARTICLE_DATETIME :label-width="formLabelWidth">
                <el-date-picker v-model="articleForm.datetime" type="datetime" placeholder="日期和时间"
                    value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" style="width: 300px" />
            </el-form-item>
            <el-form-item :label=$CONST.ARTICLE_TYPE :label-width="formLabelWidth">
                <el-radio-group v-model="articleForm.type" size="small">
                    <el-radio value=0 border>资讯</el-radio>
                    <el-radio value=1 border>求助</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth">
                <div class="flex gap-2">
                    <el-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false"
                        @close="handleClose(tag)" style="margin-right: 8px">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small"
                        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">
                        + New Tag
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="primary_btn">
                    {{ addOrUpdate ? "发布" : "更新" }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>