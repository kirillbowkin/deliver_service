import dotenv from 'dotenv'
import Fastify from "fastify"
import orderRoutes from './modules/order/order.route.js'

dotenv.config()
const PORT = process.env.PORT

const server = Fastify({ logger: true }) //вызов конструктора сервера

server.get('/health', async (req, resp) => {
    return { health: "OK" }
})

const main = async () => {

    server.register(orderRoutes, { prefix: '/orders' }) //Пути 

    try {
        await server.listen({ port: PORT })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

main()