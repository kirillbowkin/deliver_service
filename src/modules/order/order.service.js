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


export const assignCourier = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if (order.courierId != null) {
        throw new Error("Order already assigned")
    }

    const allCouriers = await prisma.courier.findMany({
        include: {
            _count: {
                select: {
                    order: true
                }
            }
        },
        orderBy: {
            order: {
                _count: 'asc'
            }
        }
    })


    //TODO: refactor nested ifs
    if (order != null) {
        const availableCouriers = allCouriers.filter(el => el._count.order < 3)
        if (availableCouriers != null && availableCouriers.length > 0) {
            const availableCourier = availableCouriers[0]

            const updOrder = await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    Courier: {
                        connect: {
                            id: availableCourier.id
                        }
                    }
                },
                include: {
                    Courier: true
                }
            })

            return updOrder


        } else {
            throw new Error("There are no available couriers")
        }
    } else {
        throw new Error("Wrong orderId")
    }

}

export const removeCourier = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if (order.courierId == null) {
        throw new Error("There is no courier assigned to this order")
    }

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
