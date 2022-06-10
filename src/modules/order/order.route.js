import { assignCourierHandler, createOrderHandler, getOneOrderHandler, getOrdersHandler, removeCourierHandler } from "./order.controller.js"
import { assignCourierParams, createOrderBody, getOneParams, removeCourierParams } from "./order.shcema.js"


const orderRoutes = async (server) => {
    // TODO: update post
    // server.put('/:id', {
    //     schema: {
    // params: {updateOrderParams}
    // body: {updateOrderBody}
    // },
    //     handler: updateOrderHandler
    // })

    // TODO: delete pos
    // server.delete('/:id', {
    //     schema: {params: {deleteOrderParams}},
    //     handler: deleteOrderHandler
    // })

    server.post('/', {
        schema: { body: createOrderBody },
        handler: createOrderHandler

    })
    server.get('/:id', {
        schema: { params: getOneParams },
        handler: getOneOrderHandler
    })
    server.get('/', getOrdersHandler)
    server.post('/:orderId/assignCourier', {
        schema: { params: assignCourierParams },
        handler: assignCourierHandler
    })
    server.post('/:id/removeCourier', {
        schema: { params: removeCourierParams },
        handler: removeCourierHandler
    })
}

export default orderRoutes