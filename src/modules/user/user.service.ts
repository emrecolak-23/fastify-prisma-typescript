import { hashPassword } from "../../utils/hash"
import prisma from "../../utils/prisma"
import { CreateUserInput } from "./user.schema"

export async function createUser(userData: CreateUserInput) {

    const { password, ...rest } = userData

    const { hash, salt } = hashPassword(password)


    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash }
    })

    return user
}

export async function findUserByEmail(email: string) {

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })


    return user
}

export async function findUsers() {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    })

    return users
}