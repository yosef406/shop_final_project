export default interface cartType {
    _id: string,
    user_id: string,
    products: [string],
    total_price: number,
    open: boolean
}
