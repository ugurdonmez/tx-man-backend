import { Account } from "../entities/Account";
import { Repository } from "typeorm";
import { appDataSource } from "../database";

export class AccountService {

    private accountRepository: Repository<Account>;

    constructor() {
        this.accountRepository = appDataSource.getRepository(Account);
    }

    public async getById(id: string): Promise<Account | null> {
        return this.accountRepository.findOne({ where: { account_id: id } });
    }
}
