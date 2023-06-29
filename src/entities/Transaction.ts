import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    transaction_id!: string;

    @Column({ type: "uuid" })
    account_id!: string;

    @Column()
    amount!: number;

    @CreateDateColumn()
    created_at!: Date;
}
