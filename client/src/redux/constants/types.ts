
export type Session = {
    id: number,
    username: string,
    token: string,
    online: boolean
}

export interface Photo {
    id: number,
    name: string,
    description: string,
    url: string,
    user?: User
}

export interface User {
    id: number,
    username: string
}