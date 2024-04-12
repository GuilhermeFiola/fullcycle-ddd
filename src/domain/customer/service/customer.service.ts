import { v4 as uuid} from "uuid";
import Customer from "../entity/customer";
import SendConsoleLogHandler1 from "../event/handler/send-console-log-handler1";
import SendConsoleLogHandler2 from "../event/handler/send-console-log-handler2";
import SendConsoleLogHandlerAddress from "../event/handler/send-console-log-handler-address";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";

export class CustomerService {
    async create(name: string): Promise<Customer> {
        const customer = new Customer(uuid(), name);

        const eventDispatcher = new EventDispatcher();
        const sendConsoleLogHandler1 = new SendConsoleLogHandler1();
        const sendConsoleLogHandler2 = new SendConsoleLogHandler2();
  
        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLogHandler1);
        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLogHandler2);
        
        customer.getEvents().forEach(event => {
            eventDispatcher.notify(event);
        });

        customer.clearEvents();

        return customer;
    }

    async changeAddress(customer: Customer, address: Address): Promise<void> {
        customer.changeAddress(address);

        const eventDispatcher = new EventDispatcher();
        const sendConsoleLogAddress = new SendConsoleLogHandlerAddress();
        eventDispatcher.register("CustomerChangedAddressEvent", sendConsoleLogAddress);
        
        customer.getEvents().forEach(event => {
            eventDispatcher.notify(event);
        });

        customer.clearEvents();
    }
}