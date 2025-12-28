import { MetadataI } from "./category"

export interface BrandI {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}

export interface BrandResponseI {
    results: number
    metadata: MetadataI
    data: BrandI[]
}