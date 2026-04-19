'use server';

import {convertToPlainObject} from "../utils";
import {LATEST_PRODUCTS_LIMIT} from "../constants";
import prisma from "@/db/prisma";

export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' }
    });

    const formattedData = data.map((product) => ({
        ...product,
        price: product.price.toString(), // السعر كـ string
        rating: Number(product.rating),  // التقييم كـ number
    }));

    return convertToPlainObject(formattedData);
}

//Get single product by it`s slug
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({where: {slug}});
}