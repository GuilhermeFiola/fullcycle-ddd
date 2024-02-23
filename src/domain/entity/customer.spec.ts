import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", ()=> {
    it("Should throw error when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "Guilherme");
        }).toThrow("Id is required");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            const customer = new Customer("1", "");
        }).toThrow("Name is required");
    });

    it("Should change name", () => {
        const customer = new Customer("1", "Guilherme");
        customer.changeName("João");
        
        expect(customer.name).toBe("João");
    });

    it("Should activate customer", () => {
        const customer = new Customer("1", "Guilherme");
        const address = new Address("Rua Teste", 1, "12345-123", "Ribeirão Preto");
        customer.changeAddress(address);

        customer.activate();
        
        expect(customer.isActive()).toBe(true);
    });

    it("Should deactivate customer", () => {
        const customer = new Customer("1", "Guilherme");

        customer.deactivate();
        
        expect(customer.isActive()).toBe(false);
    });

    it("Should throw error when address is undefined", () => {
       

        expect(() => {
            const customer = new Customer("1", "Guilherme");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    it("Should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
})