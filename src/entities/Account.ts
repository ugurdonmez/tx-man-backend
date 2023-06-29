import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    account_id!: string;

    @Column()
    balance!: number;
}
