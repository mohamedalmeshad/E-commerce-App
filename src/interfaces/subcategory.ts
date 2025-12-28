export interface SubCategoryI {
    _id: string;
    name: string;
    slug: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubCategoryResponseI {
    results: number;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    data: SubCategoryI[];
}
