export interface CategoryI {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}

export interface MetadataI {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage?: number
}

export interface CategoryResponseI {
    results: number
    metadata: MetadataI
    data: CategoryI[]
}