export type User1 = {
    token: string | undefined
}

// export class UserClass {
// export class User {
//     public token: string | undefined = undefined
//     public userName: string | undefined = undefined

//     public login(t: string, un: string) {
//         this.token = t
//         this.userName = un
//     }

//     public logout() {
//         this.token = undefined
//         this.userName = undefined
//     }

//     public get isAuthenticated() {
//         return this.token !== undefined
//     }
// }

// export const isAuthenticated = (user: User) => {
//     return user.token !== undefined
// }

// export class User {
//     public token: string | undefined = undefined
//     public userName: string | undefined = undefined

//     public constructor() {
//         this.token = localStorage.getItem('auth-token') ?? undefined
//     }

//     public login(t: string, un: string) {
//         this.token = t
//         this.userName = un
//         localStorage.setItem('auth-token', t)
//     }

//     public logout() {
//         this.token = undefined
//         this.userName = undefined
//         localStorage.removeItem('auth-token')
//     }

//     public get isAuthenticated() {
//         return this.token !== undefined
//     }
// }

export class UserAuth {
    public token: string | undefined = undefined

    public constructor() {
        this.token = localStorage.getItem('auth-token') ?? undefined
    }

    public login(t: string) {
        this.token = t
        localStorage.setItem('auth-token', t)
    }

    public logout() {
        this.token = undefined
        localStorage.removeItem('auth-token')
    }

    public get isAuthenticated() {
        return this.token !== undefined
    }
}

type UserDetails = {
    Email: string,
    DisplayName: string,
}