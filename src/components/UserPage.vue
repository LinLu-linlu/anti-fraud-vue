<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import type { ComponentSize } from 'element-plus'
import UserDialog from '@/components/UserDialog.vue';
import axios from 'axios'

const currentPage = ref(1)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const search = ref("")
const centerDialogVisible = ref(false)
const userDialog = ref(null)
const $CONST = getCurrentInstance().appContext.config.globalProperties.$CONST;
var userId = ref()
var banOrUnban = ref()
interface User {
    id: number
    username: string
    password: string
    nickname: string
    score: number
    state: number
}
const filterType = (value: number, user: User) => {
    return user.state === value
}
let tableData = ref()
let tableTotal = ref()
const search_page = () => {
    axios.post($CONST.AXIOS_API_FRONT + '/user/findPage',
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
        // console.log("TableData",tableData.value);
    })
}
onMounted(() => {
    search_page()
    console.log(tableData);

})
const update_user = (val: number) => {
    // addOrUpdate.value = false
    userId.value = val
    userDialog.value.dialogFormVisible = true
}
const ban_user = (val: number, state: number) => {
    userId.value = val
    banOrUnban.value = state
    centerDialogVisible.value = true
}


const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
const search_user = () => {
    search_page()
}
const ban_user_primary = () => {
    axios.get($CONST.AXIOS_API_FRONT + (banOrUnban.value ? '/user/unBanUser' : '/user/banUser'),
        {
            params: {
                id: userId.value
            }
        }).then((res) => {
            search_page()
        })
    centerDialogVisible.value = false
}
</script>
<template>
    <h1>
        {{ $CONST.USER_MANAGE }}
    </h1>
    <div style="margin-top: 40px;">
        <el-input v-model="search" style="width: 240px;" size="small" :placeholder=$CONST.USER_SEARCH_PLACEHOLDER
            clearable />
        <el-button type="primary" style="margin-left: 20px;" size="small" @click="search_user">搜索</el-button>
    </div>
    <el-table :data="tableData" height="500" style="width: 100%;margin-top: 30px;" table-layout="auto">
        <el-table-column prop="username" :label=$CONST.USER_USERNAME />
        <el-table-column prop="nickname" :label=$CONST.USER_NICKNAME />
        <el-table-column prop="score" :label=$CONST.USER_SCORE />
        <el-table-column prop="state" :label=$CONST.USER_STATE width="100"
            :filters="[{ text: '正常', value: 0 }, { text: '封号', value: 1 },]" :filter-method="filterType"
            filter-placement="bottom-end">
            <template #default="scope">
                <el-tag :type="scope.row.state === 0 ? 'primary' : 'danger'" disable-transitions>
                    {{ scope.row.state == 0 ? '正常' : '封号' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="operations" label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="update_user(scope.row.id)">
                    修改
                </el-button>
                <el-button size="small" :type="scope.row.state === 0 ? 'danger' : 'warning'"
                    @click="ban_user(scope.row.id, scope.row.state)">
                    {{ scope.row.state === 0 ? '封号' : '解封' }}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" :page-size="10" :size="size" :disabled="disabled"
        :background="background" layout="total, prev, pager, next,jumper" :total=tableTotal
        @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 30px;" />
    <el-dialog v-model="centerDialogVisible" title="封号确认" width="500" align-center>
        <span>确定封禁该账号吗？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="ban_user_primary">
                    封禁
                </el-button>
            </div>
        </template>
    </el-dialog>
    <UserDialog ref="userDialog" :userId="userId" @refresh="search_page" />
</template>
<style scoped></style>