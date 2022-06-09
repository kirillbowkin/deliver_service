import prisma from '../../utils/prisma.js'

export const createOrder = async (input) => {
    try {
        const order = prisma.order.create({
            data: input
        })

        return order
    } catch (e) {
        throw new Error("Error while creating order")
    }

}

export const getOneOrder = async (orderId) => {
    return prisma.order.findUnique({
        where: {
            id: orderId
        }
    })
}

export const getOrders = async () => {
    return prisma.order.findMany()
}


export const assignCourier = async (orderId, courierId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    const courier = await prisma.courier.findUnique({
        where: {
            id: courierId
        }
    })

    if (order != null && courier != null) {
        const updOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                Courier: {
                    connect: {
                        id: courierId
                    }
                }
            },
            include: {
                Courier: true
            }
        })

        return updOrder
    } else {
        throw new Error("Wrong orderId or courierId")
    }

}

export const removeCourier = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if (order != null) {
        const updOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                Courier: {
                    disconnect: true
                }
            },
            include: {
                Courier: true
            }
        })

        return updOrder
    } else {
        throw new Error("Wrong orderId")
    }

}
