import { assignCourierHandler, createOrderHandler, getOneOrderHandler, getOrdersHandler, removeCourierHandler } from "./order.controller.js"
import { assignCourierParams, createOrderBody, getOneParams, removeCourierParams } from "./order.shcema.js"

const orderRoutes = async (server) => {
    server.post('/', {
        schema: { body: createOrderBody },
        handler: createOrderHandler

    })
    server.get('/:id', {
        schema: { params: getOneParams },
        handler: getOneOrderHandler
    })
    server.get('/', getOrdersHandler)
    server.post('/:orderId/assignCourier/:courierId', {
        schema: { params: assignCourierParams },
        handler: assignCourierHandler
    })
    server.post('/:id/removeCourier', {
        schema: { params: removeCourierParams },
        handler: removeCourierHandler
    })
}

export default orderRoutes