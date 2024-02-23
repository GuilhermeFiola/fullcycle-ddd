import Address from './domain/entity/address';
import Customer from './domain/entity/customer';
import Order from './domain/entity/order';
import OrderItem from './domain/entity/order_item';

let custumer = new Customer("1", "Guilherme");
const address = new Address("Rua Teste", 1, "12345-123", "Ribeirão Preto");
custumer.changeAddress(address);
custumer.activate();

const item1 = new OrderItem("1", "Item 1", 12, "Id1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "Id2", 2);

const order = new Order("1", "1", [item1, item2]);