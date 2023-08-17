<template>
    <template v-if="item.meta && item.children">
        <el-sub-menu index="2">
            <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>

            <SidebarItem v-for="child in item.children" :item="child" :key="child.meta.path"></SidebarItem>
        </el-sub-menu>
    </template>

    <el-menu-item v-else-if="!item.meta" :index="item.children[0].meta.path">
        <el-icon><icon-menu /></el-icon>
        <span>{{ item.children[0].meta.title }}</span>
    </el-menu-item>

    <el-menu-item v-else :index="item.meta.path">
        <el-icon><icon-menu /></el-icon>
        <span>{{ item.meta.title }}</span>
    </el-menu-item>
</template>

<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

defineProps({
    item: Object
})
</script>