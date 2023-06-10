import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, findProducts } from "./product.service";
import { CreateProductInput } from "./product.schema";

export async function createProductHandler(request: FastifyRequest<{
    Body: CreateProductInput
}>, reply: FastifyReply) {
    const product = await createProduct({
        ...request.body,
        ownerId: request.user.id
    })

    return product
}

export async function getProductsHandler(request: FastifyRequest, reply: FastifyReply) {
    const products = await findProducts()

    return products
}