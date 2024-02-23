import Order from "../../domain/entity/order"
import { OrderItemModel } from "../db/sequelize/model/order-item.model"
import { OrderModel } from "../db/sequelize/model/order.model"


export default class OrderRepository {
    async create(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: order.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            }))
        }, 
        {
            include: [{ model: OrderItemModel }]
        })
    }
     
}