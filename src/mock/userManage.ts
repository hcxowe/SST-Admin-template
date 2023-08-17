import { MockMethod } from 'vite-plugin-mock'

export interface requestParams {
    method: string,
    body: any,
    headers?: {
        authorization?: string
    },
    query: any
}

export default [
    {
        url: '/api/userList',
        method: 'post',
        rawResponse: async (req, res) => {
            const ret = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        code: 0,
                        message: 'success',
                        data: [
                            { userName: '冯波', state: '正常', createTime: '2023-01-13 12:12:12', lastTime: '2023-3-13 14:14:14' },
                            { userName: '代皓', state: '正常', createTime: '2023-01-13 12:12:12', lastTime: '2023-8-13 14:14:14' },
                            { userName: '程美云', state: '正常', createTime: '2023-01-13 12:12:12', lastTime: '2023-7-13 14:14:14' },
                            { userName: '李豪', state: '正常', createTime: '2022-10-13 13:02:10', lastTime: '2023-5-13 14:14:14' },
                            { userName: '王海洋', state: '正常', createTime: '2023-01-13 12:12:12', lastTime: '2023-6-13 14:14:14' }
                        ]
                    })
                }, 1000)
            })

            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.statusCode = 200
            res.end(JSON.stringify(ret))
        }
    }
] as MockMethod[]