import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", ()=> {
    it("Should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "2", []);
        }).toThrow("Id is required");
    });

    it("Should throw error when customerId is empty", () => {
        expect(() => {
            const order = new Order("1", "", []);
        }).toThrow("CustomerId is required");
    });

    it("Should throw error when no items", () => {
        expect(() => {
            const order = new Order("1", "2", []);
        }).toThrow("Items are required");
    });

    it("Should calculate total", () => {
        const item1 = new OrderItem("1", "Item 1", 10, "Id1", 1);
        const item2 = new OrderItem("2", "Item 2", 20, "Id2", 2);
        const order1 = new Order("1", "2", [item1]);
        
        let total = order1.total();

        expect(total).toBe(10);

        const order2 = new Order("2", "2", [item1, item2]);

        total = order2.total();

        expect(total).toBe(50);
    });

    it("Should throw error if quantity is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("1", "Item", 10, "Id", 0);
            const order = new Order("1", "2", [item]);
        }).toThrow("Quantity must be greater than zero");
    });
})