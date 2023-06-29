import { Transaction } from "../entities/Transaction";
import { Repository} from "typeorm";
import { appDataSource } from "../database";

export class TransactionService {

    private transactionRepository: Repository<Transaction>;

    constructor() {
        this.transactionRepository = appDataSource.getRepository(Transaction);
    }

    public async getAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    public async getById(id: string): Promise<Transaction | null> {
        return this.transactionRepository.findOne({ where: { transaction_id: id } });
    }

    public async create(transaction: Transaction): Promise<Transaction> {
        return this.transactionRepository.save(transaction);
    }
}
