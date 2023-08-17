<template>
    <el-dialog
        v-model="isShow"
        draggable
        :title="title"
        :width="400"
        :close-on-click-modal="false"
    >
        <div class="diloag-wrapper">
            <template v-if="optType !== 'check'">
                <div class="pithy-item">
                    <span class="item-label">用户名称<span class="reqiure-text">*</span>：</span>
                    <el-input
                        v-model="customerInfo.name"
                        placeholder="必填，请输入用户名称"
                    />
                </div>

                <div class="pithy-item">
                    <span class="item-label">联系电话：</span>
                    <el-input
                        v-model="customerInfo.contactTelephone"
                        placeholder="选填，请输入联系电话"
                    />
                </div>

                <div class="pithy-item textarea-item">
                    <span class="item-label">描述：</span>
                    <el-input
                        size="small"
                        type="textarea"
                        :maxlength="150"
                        :autosize="{ minRows: 3, maxRows: 10 }"
                        show-word-limit
                        v-model="customerInfo.description"
                        placeholder="选填，描述最长150字"
                    />
                </div>
            </template>
            <template v-else>
                <div class="pithy-item">
                    <span class="item-label">用户名称：</span>
                    <el-input
                        :value="customerInfo.name"
                        placeholder="必填，请输入用户名称"
                        readonly
                    />
                </div>

                <div class="pithy-item">
                    <span class="item-label">联系电话：</span>
                    <el-input
                        :value="customerInfo.contactTelephone"
                        placeholder="选填，请输入联系电话"
                        readonly
                    />
                </div>

                <div class="pithy-item textarea-item">
                    <span class="item-label">描述：</span>
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 10 }"
                        :value="customerInfo.description"
                        show-word-limit
                        readonly
                    />
                </div>
            </template>
        </div>

        <template #footer>
            <div class="footer-wrapper">
                <el-button v-show="optType !== 'check'" type="primary" :loading="isLoading" @click="onSure">{{ optType === 'create' ? '新增' : '修改' }}</el-button>
                <el-button type="default" @click="hide">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { ElInput } from 'element-plus'

const emit = defineEmits(['on-update'])

const isShow = ref(false)
const optType = ref('create')
const isLoading = ref(false)
const nameInput = ref<InstanceType<typeof ElInput>>()

const customerInfo: Ref<UserInfo> = ref({
    name: '',
    contactTelephone: '',
    description: ''
})

const title = computed(() => {
    switch (optType.value) {
        case 'create':
            return '新增用户'

        case 'modify':
            return '修改用户'

        case 'check':
            return '查看用户'

        default:
            return ''
    }
})

const show = (type: 'create'|'modify'|'check' = 'create', userInfo: UserInfo) => {
    isShow.value = true
    optType.value = type

    if (type === 'create') {
        customerInfo.value = {
            name: '',
            contactTelephone: '',
            description: ''
        }
    } else {
        customerInfo.value = userInfo
    }
}

const hide = () => {
    isShow.value = false
}

const onSure = () => {
    if (optType.value === 'create') {
        emit('on-update')
    } else if (optType.value === 'modify') {
        emit('on-update')
    }

    hide()
}

defineExpose({
    show,
    hide
})
</script>

<style lang="scss" scoped>
.diloag-wrapper {
    padding: 20px 15px;
    font-size: 12px;
}

.pithy-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.pithy-item:last-child {
    margin-bottom: 0;
}

.item-label {
    flex: 75px 0 0;
}

.reqiure-text {
    color: red;
}

:deep {
    textarea {
        resize: none;
    }

    .upload-demo {
        flex: 1;
    }

    .el-upload {
        width: 100%;
    }
}

.footer-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.advanced-swtich {
    color: #2e6ad7;
    cursor: pointer;
}

.advanced-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.advanced-item:last-child {
    margin-bottom: 0;
}

.advanced-child {
    display: flex;
    align-items: center;
}

.half {
    width: 45%;
}

.textarea-item {
    align-items: flex-start;
}

.check-input {
    padding: 3px 7px;
    height: 24px;
    border-radius: 3px;
    background: #fff;
    flex: 1;
    line-height: 1.5;
    font-size: 12px;
    color: #515a6e;
    background-color: #fff;
    cursor: text;
}

.check-filelist {
    padding: 3px 7px;
    border-radius: 3px;
    background: #fff;
    flex: 1;
    line-height: 1.5;
    font-size: 12px;
    color: #515a6e;
    background-color: #fff;
    cursor: text;
}

.check-filelist p {
    margin: 2.5px;
}
</style>
