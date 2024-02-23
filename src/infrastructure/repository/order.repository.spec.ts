import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "../db/sequelize/model/order.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository unit tests", () => {
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequilize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    orderId: order.id,
                    productId: orderItem.productId
                }
            ]
        })
    });

    it("should update a order", async () => {
        const orderId = "1";
        const orderItemId = "1";
        
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(orderItemId, product.name, product.price, product.id, 2);
        const order = new Order(orderId, customer.id, [orderItem]);

        const newCustomer = new Customer("2", "Customer 2");
        const newAddress = new Address("Street 2", 2, "Zipcode 2", "City 2");
        newCustomer.changeAddress(newAddress);
        await customerRepository.create(newCustomer);

        const newProduct = new Product("2", "Product 2", 20);
        await productRepository.create(newProduct);
        
        const newOrderItem = new OrderItem(orderItemId, newProduct.name, newProduct.price, newProduct.id, 3);
        const newOrder = new Order(orderId, newCustomer.id, [newOrderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        let orderModel = await OrderModel.findOne({
            where: { id: orderId },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderId,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    orderId: orderId,
                    productId: orderItem.productId
                }
            ]
        })

        await orderRepository.update(newOrder);

        orderModel = await OrderModel.findOne({
            where: { id: orderId },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderId,
            customerId: newCustomer.id,
            total: newOrder.total(),
            items: [
                {
                    id: newOrderItem.id,
                    name: newOrderItem.name,
                    price: newOrderItem.price,
                    quantity: newOrderItem.quantity,
                    orderId: orderId,
                    productId: newOrderItem.productId
                }
            ]
        })
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderFound = await orderRepository.find(order.id);

        expect(orderFound).toStrictEqual(order)
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);

        const newCustomer = new Customer("2", "Customer 2");
        const newAddress = new Address("Street 2", 2, "Zipcode 2", "City 2");
        newCustomer.changeAddress(newAddress);
        await customerRepository.create(newCustomer);

        const newProduct = new Product("2", "Product 2", 20);
        await productRepository.create(newProduct);
        
        const newOrderItem = new OrderItem("2", newProduct.name, newProduct.price, newProduct.id, 3);
        const newOrder = new Order("2", newCustomer.id, [newOrderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        await orderRepository.create(newOrder);

        const ordersFound = await orderRepository.findAll();

        expect(ordersFound).toHaveLength(2);
        expect(ordersFound).toContainEqual(order);
        expect(ordersFound).toContainEqual(newOrder);
    });
});