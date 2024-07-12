<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'
import { getCurrentInstance } from 'vue';
const router = useRouter()
let username = ref(null)
let password = ref("")
const $CONST = getCurrentInstance().appContext.config.globalProperties.$CONST;
var login = () => {
    axios.post($CONST.AXIOS_API_FRONT + '/admin/login',
        {
            username: username.value,
            password: md5(md5(password.value))
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        ElMessage({
            message: res.data.message,
            type: res.data.flag == true ? 'success' : 'error',
        })
        console.log(res.data);
        if (res.data.flag == true) {
            router.push('/main')
        }
    })
    router.push('/')
}
</script>

<template>
    <div id="black-hid">
        <form id="login" class="login">
            <div class="content">
                <div class="input"><input type="text" placeholder="输入账号" v-model="username"></div>
                <div class="input"><input type="password" placeholder="输入密码" v-model="password"></div>
            </div>
            <div class="login_btn">
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </form>
    </div>
</template>

<style scoped>
#black-hid {
    width: 100vw;
    height: 100vh;
    background-color: #0a0a0a;
    opacity: 0.6;
    z-index: -2;
    padding-top: 15rem;
}

.login {
    position: relative;
    width: 640px;
    height: 330px;
    background-color: #fff;
    margin: auto;
    border-radius: 0.1cm;
}

.content {
    position: absolute;
    width: 612px;
    height: 150px;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.input {
    height: 60px;
    width: 522px;
    margin-top: 25px;
    margin-left: 40px;
    border: none;
}

.content input {
    height: 60px;
    width: 522px;
    text-indent: 1em;
    font-size: 18px;
    letter-spacing: .2em;
    font-weight: 700;
    outline: none;
    border: none;
    box-shadow: inset 0px 0px 2px rgb(207, 206, 206);
    box-shadow: 0px 0px 4px rgb(207, 206, 206);
    border-radius: 0.1cm;

}

.content input::placeholder {
    opacity: 0.4;
}

.login_btn {
    position: absolute;
    top: 220px;
    width: 612px;
    height: 60px;
    left: 50%;
    transform: translateX(-50%);
}

.login_btn button {
    position: absolute;
    width: 522px;
    height: 60px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    border: none;
    font-size: 20px;
    letter-spacing: 0.1em;
    background-color: rgb(54, 54, 61);
    color: rgb(215, 210, 180);
    font-weight: 700;
    border-radius: .1cm;
    box-shadow: 0px 0px 3px 1px #969595;
}

.login_btn button:hover {
    color: #d6c194;
}
</style>