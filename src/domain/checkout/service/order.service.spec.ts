import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("Should place an order", () => {
        const customer = new Customer("C1", "Customer 1");
        const orderItem1 = new OrderItem("I1", "Item 1", 10, "P1", 1);

        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    })

    it("Should get total of all orders", () => {
        const orderItem1 = new OrderItem("1", "Item 1", 100, "P1", 1);
        const orderItem2 = new OrderItem("2", "Item 2", 200, "P2", 2);

        const order1 = new Order("O1", "C1", [orderItem1]);
        const order2 = new Order("O2", "C2", [orderItem2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });
})