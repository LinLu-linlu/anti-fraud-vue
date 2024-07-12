<script lang="ts" setup>
import { reactive, ref, nextTick, getCurrentInstance } from 'vue'
import { ElInput } from 'element-plus'
import axios from 'axios'
import { id } from 'element-plus/es/locale';
const $CONST = getCurrentInstance().appContext.config.globalProperties.$CONST;
let dialogFormVisible = ref(false)
const formLabelWidth = '120px'
const props = defineProps(['userId'])
let userForm = ref({
    id: null,
    username: '',
    nickname: '',
    score: null
})
const emit = defineEmits(['refresh'])
const primary_btn = () => {
    axios.post($CONST.AXIOS_API_FRONT + '/user/update',
        {
            id: userForm.value.id,
            username: userForm.value.username,
            nickname: userForm.value.nickname,
            score: userForm.value.score
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        dialogFormVisible.value = false
    })
}
defineExpose({
    dialogFormVisible
})
const open = () => {
    // console.log(props.userId);
    axios.get($CONST.AXIOS_API_FRONT + '/user/selectById', {
        params: {
            id: props.userId
        }
    }).then((res) => {
        userForm.value = res.data.data
    })
}
const close = () => {
    emit('refresh')
    userForm = ref({
        id: null,
        username: '',
        nickname: '',
        score: null
    })
}
</script>
<template>
    <el-dialog v-model="dialogFormVisible" title="更新用户信息" width="500" @open="open" @close="close">
        <el-form :model="userForm">
            <el-form-item :label=$CONST.USER_USERNAME :label-width="formLabelWidth">
                <el-input v-model="userForm.username" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item :label=$CONST.USER_NICKNAME :label-width="formLabelWidth">
                <el-input v-model="userForm.nickname" autocomplete="off" style="width: 300px" />
            </el-form-item>
            <el-form-item :label=$CONST.USER_SCORE :label-width="formLabelWidth">
                <el-input v-model="userForm.score" autocomplete="off" style="width: 300px" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="primary_btn">
                    更新
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>