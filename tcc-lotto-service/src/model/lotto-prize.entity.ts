import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./base.entity";

@Entity({name: 'LottoPrize'})
export class LottoPrizeEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('int')
    periodNo: number;

    @Column({type: "time without time zone",})
    periodDate: Date

    @Column('varchar')
    lottoNo: string

    @Column('int')
    digit: number

    @Column('int')
    prizeId:number
}