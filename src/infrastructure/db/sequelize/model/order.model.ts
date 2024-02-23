import {Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { CustomerModel } from "./customer.model";
import { OrderItemModel } from "./order-item.model";

@Table({
    tableName: "order",
    timestamps: false
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customerId: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({allowNull: false})
    declare total: number;
}