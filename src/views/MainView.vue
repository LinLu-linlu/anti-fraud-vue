<script lang="ts" setup>
import {
    Postcard,
    User,
    House,
    Tickets
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
const router = useRouter();
const exit = () => {
    router.push({ name: 'login' })
}
const $CONST = getCurrentInstance().appContext.config.globalProperties.$CONST;
</script>
<template>
    <div class="common-layout">
        <el-header>
            <el-row width="100%">
                <el-col :span="1">
                    <div class="head_avatar_margin">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    </div>
                </el-col>
                <el-col :span="2">
                    <div style="line-height: 60px;">
                        <span class="text-large font-600 mr-3"> Admin </span>
                        <el-tag>管理员</el-tag>
                    </div>
                </el-col>
                <el-col :span="19" />
                <el-col :span="2">
                    <div class="head_exit_margin">
                        <el-button type="primary" class="ml-2" @click="exit">退出登录</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>

        <el-container>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="/main/idnex" class="el-menu-vertical-demo" router>
                        <el-menu-item index="/main/index">
                            <el-icon>
                                <House />
                            </el-icon>
                            <span>{{ $CONST.MANAGE_INDEX }}</span>
                        </el-menu-item>
                        <el-menu-item index="/main/articles-manage">
                            <el-icon>
                                <Postcard />
                            </el-icon>
                            <span>{{ $CONST.ARTICLE_MANAGE }}</span>
                        </el-menu-item>
                        <el-menu-item index="/main/users-manage">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>{{ $CONST.USER_MANAGE }}</span>
                        </el-menu-item>
                        <el-menu-item index="/main/questions-manage">
                            <el-icon>
                                <Tickets />
                            </el-icon>
                            <span>{{ $CONST.QUESTION_MANAGE }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.head_avatar_margin {
    margin: 10px;
}

.head_exit_margin {
    margin: 25px;
}
</style>