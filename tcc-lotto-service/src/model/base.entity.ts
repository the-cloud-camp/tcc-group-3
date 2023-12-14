import {Column, CreateDateColumn, Entity, UpdateDateColumn} from "typeorm";


export abstract class BaseEntity {

    @Column({type: 'varchar', length: 100})
    createdBy: string

    @CreateDateColumn({type: "time without time zone", default: () => 'CURRENT_TIMESTAMP'})
    createdDateTime: Date

    @UpdateDateColumn({type: "time without time zone", onUpdate: "CURRENT_TIMESTAMP", nullable: true})
    updatedDateTime: Date

    @Column({type: "boolean", default: false})
    isDeleted: boolean

}