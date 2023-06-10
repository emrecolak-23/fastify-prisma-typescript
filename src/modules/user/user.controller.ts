import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

export async function registerUserHandler(request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply) {
    const body = request.body

    try {
        const user = await createUser(body)
        return reply.code(201).send(user)
    } catch (err) {
        console.log(err)
        return reply.code(500).send(err)
    }
}


export async function loginHandler(request: FastifyRequest<{
    Body: LoginInput
}>, reply: FastifyReply) {
    const body = request.body

    // find user by email
    const user = await findUserByEmail(body.email)
    if (!user) {
        return reply.code(401).send({
            message: 'Invalid email or password'
        })
    }

    // verify password
    const correntPassword = verifyPassword({
        candidatePassword: body.password,
        salt: user.salt,
        hash: user.password
    })

    // generate access token

    if (correntPassword) {
        const { password, salt, ...rest } = user

        return { accessToken: server.jwt.sign(rest) }
    }

    // respond
    return reply.code(401).send({
        message: 'Invalid password'
    })

}


export async function getUserHandler() {
    const users = await findUsers()

    return users
}