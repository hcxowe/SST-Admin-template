<template>
    <div class="tags-wrapper">
        <el-scrollbar
            ref="scrollbarRef"
            :vertical="false"
            view-style="text-align: left;white-space: nowrap;"
            @wheel.prevent="handleScroll"
        >
            <span
                v-for="tag in tagsViewStore.visitedViews"
                :key="tag.meta.path"
                :class="{ active: route.meta.path === tag.meta.path }"
                class="tags-view-item"
                @click="onTagClick(tag)"
                @contextmenu.prevent="openMenu(tag, $event)"
            >
                {{ tag.meta.title }}
                <el-icon :size="9" v-show="tag.meta.path != '/home'" @click.prevent.stop="closeSelectedTag(tag)"><Close /></el-icon>
            </span>
        </el-scrollbar>

        <Teleport to="body">
            <ul ref="tagMenu" v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
                <li>刷新</li>
                <li>关闭</li>
                <li>关闭其他</li>
                <li>关闭所有</li>
            </ul>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import { ElScrollbar } from 'element-plus'
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { Ref, watch, onMounted } from 'vue'
import { useTagsViewStore } from '../../store/tagsView'
import { useUserStore } from '../../store/user'

interface View {
    name: string,
    path: string,
    meta: {
        permission: string,
        title: string,
        hidden: boolean,
        path: string,
        noCache: boolean,
        affix: boolean
    }
}

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const tagsViewStore = useTagsViewStore()

const filterAffixTags = (routes: RouteRecordRaw[]) => {
    let tags: View[] = []

    routes.forEach(route => {
        if (route.meta && route.meta.affix) {
            tags.push({
                name: route.name as string,
                path: route.path,
                meta: {
                    permission: route.meta.permission as string,
                    title: route.meta.title as string,
                    hidden: route.meta.permission as boolean,
                    path: route.meta.path as string,
                    noCache: route.meta.noCache as boolean,
                    affix: route.meta.affix as boolean
                }
            })
        }

        if (route.children) {
            const tempTags = filterAffixTags(route.children)

            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags]
            }
        }
    })

    return tags
}

const initTags = () => {
    const affixTags = filterAffixTags(userStore.menuRouteList)

    for (const tag of affixTags) {
        if (tag.name) {
            tagsViewStore.addView(tag)
        }
    }
}

const addTags = () => {
    const { name, path, meta } = route

    if (name) {
        tagsViewStore.addView({
            name: name as string,
            path,
            meta: {
                permission: meta.permission as string,
                title: meta.title as string,
                hidden: meta.permission as boolean,
                path: meta.path as string,
                noCache: meta.noCache as boolean,
                affix: route.meta.affix as boolean
            }
        })
    }
}

const isActive = (tag: View) => {
    return tag.meta.path === route.meta.path
}

watch(route, () => {
    addTags()
})

onMounted(() => {
    initTags()
    addTags()
})

const onTagClick = (tag: View) => {
    addTags()
    router.push(tag.meta.path)
}

const closeSelectedTag = (tag: View) => {
    tagsViewStore.deView(tag)

    if (isActive(tag)) {
        const latestView = tagsViewStore.visitedViews.slice(-1)[0]

        if (latestView) {
            router.push(latestView.meta.path)
        } else {
            router.push('/')
        }
    }
}

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const handleScroll = (evt: WheelEvent) => {
    const eventDelta = -evt.deltaY
    const currentLeft = scrollbarRef.value!.wrapRef.scrollLeft
    scrollbarRef.value!.setScrollLeft(currentLeft + eventDelta)
}

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const tagMenu: Ref<null | HTMLElement> = ref(null)

const openMenu = (tag: View, evt: MouseEvent) => {
    top.value = evt.clientY
    left.value = evt.clientX

    visible.value = true
}

onClickOutside(tagMenu, () => {
    visible.value = false
})
</script>

<style scoped lang="scss">
.tags-wrapper {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}

.scroll-view-wrapper {
    text-align: left;
}

.tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
        margin-left: 10px;
    }

    &:last-of-type {
        margin-right: 10px;
    }

    &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        /* &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
        } */
    }
}

.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
            background: #eee;
        }
    }
}
</style>