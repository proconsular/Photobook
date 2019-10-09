
export enum Methods {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
}

export class Request {
    method: Methods
    url: string
    token: string = ''

    constructor(method: Methods, url: string) {
        this.method = method
        this.url = url
    }

    public setToken(token: string) {
        this.token = `Bearer ${token}`
    }

    public async send(body?: any): Promise<Response> {
        let data: any = {
            method: this.method.toString().toUpperCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        if (body !== undefined) {
            data = {...data, body: JSON.stringify(body)}
        }
        if (this.token !== '') {
            data.headers.authorization = this.token
        }
        return fetch(this.url, data)
    }

    public async sendFile(body: any, file: Blob): Promise<Response> {
        let data: any = {
            method: this.method.toString().toUpperCase(),
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            },
        }
        if (body !== undefined) {
            const form = new FormData()
            for (const key of Object.keys(body)) {
                form.append(key, body[key])
            }
            form.append('file', file)
            data.body = form
        }
        if (this.token !== '') {
            data.headers.authorization = this.token
        }
        return fetch(this.url, data)
    }
}