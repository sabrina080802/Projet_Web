export interface Card {
    id: number,
    card_owner: string,
    card_number: string,
    cvc: string,
    expire_date: Date,
    selected: boolean
}