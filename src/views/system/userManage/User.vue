<template>
    <div class="user-wrapper">
        <div class="tool-bar">
            <el-button type="primary" size="small" @click="onCreateClick">创建用户</el-button>
            <el-input
                v-model="searchValue"
                class="w-50 m-2"
                size="small"
                clearable
                placeholder="请输入用户名称"
                :suffix-icon="Search"
                style="width: 200px;"
                @change="onSearchUser"
                @clear="onSearchUser"
            />
        </div>

        <div class="list-content">
            <el-table
                :data="userList"
                border
                stripe
                size="small"
                table-layout="auto"
                empty-text="未查询到用户"
                style="width: 100%;height: 100%;"
            >
                <el-table-column prop="userName" label="用户名称" />
                <el-table-column prop="state" label="状态" />
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column prop="lastTime" label="最后登录时间" />
                <el-table-column label="操作" width="100">
                    <template #default>
                        <el-button link type="primary" size="small">编辑</el-button>
                        <el-button link type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination-bar">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :background="true"
                :small="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>

    <CmcWnd ref="cmcWnd" @on-update="loadUserList"></CmcWnd>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { getUserList } from '../../../api/userManageApi'

import CmcWnd from './CmcWnd.vue'

const searchValue = ref('')
const userList = ref([])

const cmcWnd = ref()

const currentPage = ref(1)
const pageSize = ref(20)
const userTotal = ref(0)

const loadUserList = async () => {
    const ret = await getUserList(searchValue.value)

    if (ret.code !== 0) {
        return
    }

    userList.value = ret.data
    userTotal.value = ret.data.length
}

onMounted(() => {
    loadUserList()
})

const onSearchUser = () => {
    loadUserList()
}

const handleSizeChange = (val: number) => {
    // let a = val
}

const handleCurrentChange = (val: number) => {
    // let a = val
}

const onCreateClick = () => {
    cmcWnd.value.show('create')
}
</script>

<style scoped lang="scss">
.user-wrapper {
    height: 100%;

    display: flex;
    flex-direction: column;
}

.tool-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 8px;
}

.list-content {
    flex: 1;
}

.pagination-bar {
    display: flex;
    justify-content: end;
    padding: 8px 0;
}
</style>