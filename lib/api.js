import fetch from 'isomorphic-unfetch'

export async function fetchAPI() {
    const data = await fetch(`https://mweb-api.circleboom.com/helps`)
    const pagesdata = await data.json()

    return pagesdata
}


export async function fetchAPIByPageId(id) {
    const data = await fetch(`https://mweb-api.circleboom.com/helps/${id}`)
    const pagesdata = await data.json()

    return pagesdata
}