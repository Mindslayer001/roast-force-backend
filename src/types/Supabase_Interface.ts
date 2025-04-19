type getRecentRoast = {
    status: number,
    time: number | 0,
    roast: string,
    new_user: boolean,
    user_id: number
}

type setRecentRoast = {
    status: number,
    roast:string
}