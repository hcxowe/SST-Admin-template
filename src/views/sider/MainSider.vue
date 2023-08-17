<template>
    <div class="sider-wrapper">
        <div class="sider-title">赛斯特管理平台</div>

        <div class="el-menu-vertical">
            <el-scrollbar height="100%">
                <el-menu
                    :default-active="route.path"
                    router
                    class="el-menu-vertical"
                >
                    <SidebarItem v-for="item in menuList" :item="item" :key="item.path"></SidebarItem>
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import { useUserStore } from '../../store/user'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const menuList = userStore.menuRouteList

const route = useRoute()
</script>

<style lang="scss" scoped>
.sider-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--el-border-color);

    :deep(.el-menu) {
        border-right: none;
    }
}

.sider-title {
    padding-left: 24px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid var(--el-border-color);
}

.el-menu-vertical {
    flex: 1;
    overflow: hidden;
}
</style>