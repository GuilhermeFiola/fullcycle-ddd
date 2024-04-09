import { Aggregate } from "../@shared/aggregate";
import CustomerChangedAddressEvent from "../event/customer/customer-changed-address.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import Address from "./address";

export default class Customer extends Aggregate {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();
        this.addEvent(new CustomerCreatedEvent({ id, name }));
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get Address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate();
        this.addEvent(new CustomerChangedAddressEvent({ id: this._id, name: this._name, address }));
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }
    
    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}