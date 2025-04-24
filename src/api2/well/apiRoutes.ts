import type { NavTreeNode, VersionControlledDocumentHeader, Well2Model, Wellbore2Header, Wellbore2Model } from "@/stuff/dump"
import type { AddOrUpdateUserAccountInput, UserAccountModel, UserHeader } from "@/stuff/UserApiTypes"


export const fetchWellDetails = (wat: string) => {

    return fetch(`http://localhost:62629/api/well2/fetchWellDetails?a=${wat}`, {
        credentials: 'include'
    })
        .then(r => r.json())
        .then(json => json.Data as Well2Model)

}

export const fetchWellNavNodes = () => {
    return fetch('http://localhost:62629/api/well2/fetchWellNavNodes', {
        credentials: 'include'
    })
        .then(r => r.json())
        .then(json => json.Data as NavTreeNode[])
}



export const fetchWellboresOnWell = (wellId: string) => {
    return fetch('http://localhost:62629/api/wellbore2/fetchWellboreHeaders', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
            FilterByWell2ID: wellId,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(r => r.json())
        .then(json => json.Data.Headers as Wellbore2Header[])
}

export const fetchWellboreDetails = (wellboreAT: string) => {
    return fetch(`http://localhost:62629/api/wellbore2/fetchWellboreHeaders?a=${wellboreAT}`, {
        credentials: 'include',
        // method: 'POST',
        // body: JSON.stringify({
        //     FilterByWell2ID: wellId,
        // }),
        // headers: {
        //     "Content-Type": "application/json",
        // }
    })
        .then(r => r.json())
        .then(json => json.Data as Wellbore2Model)
}

export const fetchVcdHeaders = (wellAccessToken: string) => {
    return fetch('http://localhost:62629/api/vcd/fetchHeaders', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(wellAccessToken),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(r => r.json())
        .then(json => json.Data as VersionControlledDocumentHeader[])
}


export const fetchUserHeaders = () => {
    return fetch(`http://localhost:62629/api/setup/userAccount/getHeaders`, {
        credentials: 'include',
    })
        .then(r => r.json())
        // .then(json => json.Data as UserHeader[])
        .then(json => json.Data as (UserHeader | AddOrUpdateUserAccountInput)[])
}

export const fetchUserDetails = (userID: number, signal?: AbortSignal) => {
    return fetch(`http://localhost:62629/api/setup/userAccount/read?id=${userID}`, {
        credentials: 'include',
        signal,
    })
        .then(r => r.json())
        .then(json => json.Data as UserAccountModel)
}

export const postUpdateUserDetails = (user: UserAccountModel) => {
    return fetch(`http://localhost:62629/api/setup/userAccount/update`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const postCreateUser = (user: AddOrUpdateUserAccountInput) => {
    return fetch(`http://localhost:62629/api/setup/userAccount/create`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const postCreateUserWithProperError = (newUser: AddOrUpdateUserAccountInput) => postCreateUser(newUser).then(resp => resp.json()).then(d => {
  if (d.ErrorCode !== 0) {
    throw new Error()
  }
  return d
})