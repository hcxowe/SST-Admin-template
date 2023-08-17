<template>
    <div class="login-wrapper">
        <h1 class="title">赛斯特管理系统模块</h1>

        <div class="login-dialog">
            <h2 class="login-title">用户登录</h2>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="0px"
                class="demo-ruleForm"
                size="large"
                status-icon
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="ruleForm.username"
                        placeholder="请输入用户名称"
                        :maxlength="64"
                        :prefix-icon="User"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        v-model="ruleForm.password"
                        placeholder="请输入用户密码"
                        :maxlength="64"
                        :prefix-icon="Lock"
                        show-password
                    />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '../../store/user'
import { useRouter } from 'vue-router'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    username: 'admin007',
    password: 'abc@123!'
})

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '用户名称不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '用户密码不能为空', trigger: 'blur' }
    ]
})

const userStore = useUserStore()
const router = useRouter()

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return
    }

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const err = await userStore.login(ruleForm.username, ruleForm.password)

            if (typeof err !== 'undefined') {
                return
            }

            router.push('home')
        }
    })
}
</script>

<style scoped lang="scss">
.login-wrapper {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: url('../../assets/img/11.webp') no-repeat center;
    background-size: cover;
}

.title {
    font-size: 36px;
    font-weight: bold;
    color: #fff;
}

.login-dialog {
    width: 360px;
    margin-top: 60px;
    padding: 40px 40px;
    box-shadow: var(--el-box-shadow-dark);
    background: #ffffffe6;
    border-radius: 4px;
}

.login-title {
    margin-bottom: 40px;
    text-align: left;
    font-size: 20px;
    color: #827f7f;
}
</style>