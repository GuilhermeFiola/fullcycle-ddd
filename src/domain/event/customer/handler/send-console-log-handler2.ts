import EventHandlerInterface from "../../shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogHandler2 implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): Promise<void> {
        console.log("Second CustomerCreated event console.log")
        return undefined
    }
}