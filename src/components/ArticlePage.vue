<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { ComponentSize, ElMessage } from 'element-plus'
import ArticleDialog from '@/components/ArticleDialog.vue';
import axios from 'axios'

const currentPage = ref(1)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const search = ref("")
const articleDialog = ref(null)
const $CONST = getCurrentInstance().appContext.config.globalProperties.$CONST;

let tableData = ref()
let tableTotal = ref()
let centerDialogVisible = ref(false)

var addOrUpdate = ref(true)
var articleId = ref()

onMounted(() => {
    search_page()
})

const search_page = () => {
    axios.post($CONST.AXIOS_API_FRONT + '/article/findPage',
        {
            currentPage: currentPage.value,
            pageSize: 10,
            queryString: search.value
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        // console.log(res.data);
        tableData.value = res.data.data
        tableTotal.value = res.data.total
        // console.log(tableData.value);
    })
}

const insert_article = () => {
    addOrUpdate.value = true
    articleDialog.value.dialogFormVisible = true
}
const update_article = (val: number) => {
    addOrUpdate.value = false
    articleId.value = val
    articleDialog.value.dialogFormVisible = true
}
const delete_article = (val: number) => {
    centerDialogVisible.value = true
    articleId.value = val
}
const delete_primray = () => {
    console.log(articleId.value);
    axios.get($CONST.AXIOS_API_FRONT + '/article/delete', {
        params: {
            id: articleId.value
        }
    }).then(res => {
        console.log(res);
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        centerDialogVisible.value = false
        search_page()
    }).catch(err => {
        console.error(err);
    })
}
const search_article = () => {
    search_page()
}
const filterType = (value: number, article: any) => {
    return article.type === value
}

const handleCurrentChange = (val: number) => {
    search_page()
}

</script>
<template>
    <h1>{{ $CONST.ARTICLE_MANAGE }}</h1>
    <div style="margin-top: 40px;">
        <el-input v-model="search" style="width: 240px;" size="small"
            :placeholder=$CONST.ARTICLE_SEARCH_PLACEHOLDER clearable />
        <el-button type="primary" style="margin-left: 20px;" size="small" @click="search_article">搜索</el-button>
        <el-button type="primary" plain style="margin-left: 30px;" size="small" @click="insert_article">添加</el-button>
    </div>
    <el-table :data="tableData" height="500" style="width: 100%;margin-top: 30px;" table-layout="auto">
        <el-table-column prop="title" :label=$CONST.ARTICLE_TITLE />
        <el-table-column prop="content" :label=$CONST.ARTICLE_CONTENT show-overflow-tooltip />
        <el-table-column prop="author_name" :label=$CONST.ARTICLE_AUTHOR />
        <el-table-column prop="dateTime" :label=$CONST.ARTICLE_DATETIME />
        <el-table-column prop="type" :label=$CONST.ARTICLE_TYPE
            :filters="[{ text: '资讯', value: 0 }, { text: '求助', value: 1 },]" :filter-method="filterType"
            filter-placement="bottom-end">
            <template #default="scope">
                <el-tag :type="scope.row.type === 0 ? 'primary' : 'success'" disable-transitions>
                    {{ scope.row.type === 0 ? '资讯' : '求助' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="operations" label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="update_article(scope.row.id)">
                    修改
                </el-button>
                <el-button size="small" type="danger" @click="delete_article(scope.row.id)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" :page-size="10" :size="size" :disabled="disabled"
        :background="background" layout="total, prev, pager, next,jumper" :total=tableTotal
        @current-change="handleCurrentChange" style="margin-top: 30px;" />
    <el-dialog v-model="centerDialogVisible" title="删除确认" width="500" align-center>
        <span>确定删除该条文章吗？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="delete_primray">
                    删除
                </el-button>
            </div>
        </template>
    </el-dialog>
    <ArticleDialog :articleId="articleId" :addOrUpdate="addOrUpdate" ref="articleDialog" @refresh="search_page" />
</template>
<style scoped></style>