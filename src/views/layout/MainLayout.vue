<template>
    <el-container class="height-fit">
        <el-aside width="250px">
            <Sider></Sider>
        </el-aside>

        <el-container>
            <el-header height="74px" style="padding: 0;">
                <Header></Header>
                <TagsView></TagsView>
            </el-header>

            <el-main>
                <router-view v-slot="{ Component, route }">
                    <keep-alive :include="tagsViewStore.cachedViews">
                        <component :is="Component" :key="route.meta.path || route.path" />
                    </keep-alive >
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from '../header/MainHeader.vue'
import Sider from '../sider/MainSider.vue'
import TagsView from '../layout/TagsView.vue'

import { useTagsViewStore } from '../../store/tagsView'

const tagsViewStore = useTagsViewStore()
</script>

<style lang="scss" scoped>
:deep(.el-main) {
    --el-main-padding: 10px;
}
</style>