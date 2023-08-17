import { defineStore } from 'pinia'

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

export const useTagsViewStore = defineStore('tagsView', {
    state: () => {
        return {
            visitedViews: [] as View[],
            cachedViews: [] as string[]
        }
    },
    actions: {
        addView(view: View) {
            if (!this.visitedViews.some(v => v.meta.path === view.meta.path)) {
                this.visitedViews.push(view)
            }

            if (!this.cachedViews.includes(view!.name)) {
                if (!view.meta.noCache) {
                    this.cachedViews.push(view!.name)
                }
            }
        },
        deView(view: View) {
            for (const [i, v] of this.visitedViews.entries()) {
                if (v.meta.path === view.meta.path) {
                    this.visitedViews.splice(i, 1)
                    break
                }
            }

            const index = this.cachedViews.indexOf(view.name)

            if (index > -1) {
                this.cachedViews.splice(index, 1)
            }
        },
        delOthersViews(view: View) {
            this.visitedViews = this.visitedViews.filter(v => {
                return v.meta.path === view.meta.path
            })

            const index = this.cachedViews.indexOf(view!.name)

            if (index > -1) {
                this.cachedViews = this.cachedViews.slice(index, index + 1)
            } else {
                this.cachedViews = []
            }
        },
        delAllViews() {
            this.visitedViews = []
            this.cachedViews = []
        }
    }
})