import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base.entity";

@Entity({name: 'LottoPurchase'})
export class LottoPurchaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('int')
    periodNo: number;

    @Column('varchar')
    lottoNo: string;

    @Column('int')
    digit: number

    @Column('decimal')
    creditAmount: number

    @Column({type: "time without time zone", default: () => 'CURRENT_TIMESTAMP'})
    purchaseDate: Date

    @Column('uuid')
    userId: string

    @Column('int')
    prizeId: number

    @Column('decimal')
    prizeAmount: number

    @Column('int')
    transactionId: number

    @Column('varchar')
    status: string
}