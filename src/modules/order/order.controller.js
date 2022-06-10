import { assignCourier, createOrder, getOneOrder, getOrders, removeCourier } from "./order.service.js"

export const createOrderHandler = async (req, resp) => {
    const orderInput = req.body
    try {
        const order = await createOrder(orderInput)
        return order
    } catch (e) {
        resp.code(400).send({
            error: e.message
        })
    }
}

export const getOneOrderHandler = async (req, resp) => {
    const { id } = req.params
    return getOneOrder(id)
}

export const getOrdersHandler = async (req, resp) => {
    return getOrders()
}

export const assignCourierHandler = async (req, resp) => {
    const { orderId } = req.params

    try {
        const updOrder = await assignCourier(orderId)
        return updOrder
    } catch (e) {
        resp.code(400).send({
            error: e.message
        })

    }
}

export const removeCourierHandler = async (req, resp) => {
    const { id } = req.params

    try {
        const updOrder = await removeCourier(id)
        return updOrder
    } catch (e) {
        resp.code(400).send({
            error: e.message
        })
    }
}

