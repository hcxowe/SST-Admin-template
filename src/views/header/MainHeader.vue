<template>
    <div class="header-wrapper">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-dropdown trigger="click" @command="onUserCommand">
            <span class="el-dropdown-link">
                测试用户
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>

            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '../../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const onUserCommand = (command: string) => {
    if (command === 'logout') {
        userStore.logout().then(() => {
            router.replace('/login')
        })
    }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    border-bottom: 1px solid var(--el-border-color);
}

.el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--el-color-primary);
}

.el-icon--right {
    margin-left: 5px;
}
</style>