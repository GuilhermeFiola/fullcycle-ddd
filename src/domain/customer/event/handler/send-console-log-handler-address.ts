import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendConsoleLogHandlerAddress implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: CustomerChangedAddressEvent): Promise<void> {
        console.log(`Address for Client: ${event.eventData.id}, ${event.eventData.name} changed to ${event.eventData.address.toString()}`);
        return undefined
    }
}