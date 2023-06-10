import prisma from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

export async function createProduct(data: CreateProductInput & { ownerId: number }) {
    const product = await prisma.product.create({
        data: data
    })

    return product
}

export async function findProducts() {
    const products = await prisma.product.findMany({
        select: {
            content: true,
            title: true,
            price: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })

    return products
}
