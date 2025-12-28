"use server"
import { productService } from "@/services/product.service";
import { ProductI, BrandI, CategoryI, CategoryResponseI } from "@/interfaces";

export async function getProductsAction(params?: string): Promise<{ data: ProductI[] }> {
    const data = await productService.getProducts(params);
    return data;
}

export async function getProductByIdAction(id: string): Promise<{ data: ProductI }> {
    const data = await productService.getProductById(id);
    return data;
}

export async function getBrandsAction(): Promise<{ data: BrandI[] }> {
    const data = await productService.getBrands();
    return data;
}

export async function getBrandByIdAction(id: string): Promise<{ data: BrandI }> {
    const data = await productService.getBrandById(id);
    return data;
}

export async function getCategoriesAction(): Promise<{ data: CategoryI[] }> {
    const data = await productService.getCategories();
    return data;
}

export async function getCategoryByIdAction(id: string): Promise<{ data: CategoryI }> {
    const data = await productService.getCategoryById(id);
    return data;
}

export async function getSubcategoriesByCategoryIdAction(categoryId: string): Promise<{ data: CategoryI[] }> {
    const data = await productService.getSubcategoriesByCategoryId(categoryId);
    return data;
}

export async function getAllSubcategoriesAction(): Promise<CategoryResponseI> {
    const data = await productService.getAllSubcategories();
    return data;
}

export async function getSubcategoryByIdAction(id: string): Promise<{ data: CategoryI }> {
    const data = await productService.getSubcategoryById(id);
    return data;
}
