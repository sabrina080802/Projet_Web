export interface ProductCategory {
    id: number,
    name: string,
    selected: boolean
};

export const defaultCategory = { id: -1, name: 'Toutes les catégories', selected: true };