import Order from "../../../../domain/checkout/entity/order"
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface"
import { OrderItemModel } from "./order-item.model"
import { OrderModel } from "./order.model"
import { Op } from "sequelize";

export default class OrderRepository implements OrderRepositoryInterface {
    async update(order: Order): Promise<void> {
        await OrderModel.update({
            customerId: order.customerId,
            total: order.total(),
        }, {
            where: {
                id: order.id
            },
        });

        await Promise.all(order.items.map(async (item) => {
            await OrderItemModel.upsert({
                id: item.id,
                orderId: order.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            });
        }));

        await OrderItemModel.destroy({
            where: {
                orderId: order.id,
                id: { [Op.notIn]: order.items.map(item => item.id) }
            }
        });
    }
    
    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: {
                id: id
            },
            include: ["items"],
            rejectOnEmpty: true
        });

        const order = new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map(item => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.productId,
                    item.quantity
                )
            })
        );

        return order;
    }
    
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });
        const orders = orderModels.map(orderModel => {
            let order = new Order(
                orderModel.id,
                orderModel.customerId,
                orderModel.items.map(item => {
                    return new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.productId,
                        item.quantity
                    )
                })
            );
            return order;
        });
        return orders;
    }

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