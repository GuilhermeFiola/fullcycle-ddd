import {Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo} from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import { OrderModel } from "./order.model";

@Table({
    tableName: "order_item",
    timestamps: false
})
export class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: ProductModel;

    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;
}