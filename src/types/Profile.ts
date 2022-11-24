export type Profile = {
    [key in
        | 'name'
        | 'email'
        | 'gender'
        | 'address'
        | 'DoB'
        | 'photo'
        | 'userTag']: string
}
