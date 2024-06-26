import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import { CustomerService } from "./domain/customer/service/customer.service";

async function createCustomer(): Promise<Customer> {
    const customerService = new CustomerService();
    return await customerService.create("Guilherme");
}

async function changeCustomerAddress(customer: Customer, address: Address): Promise<void> {
    const customerService = new CustomerService();
    return await customerService.changeAddress(customer, address);
}

createCustomer()
    .then(customer => {
        console.log(customer.name);
        return customer;
    })
    .then(customer => 
        changeCustomerAddress(
            customer, 
            new Address("Street 1", 1, "Zipcode 1", "City 1")
        )
    );
