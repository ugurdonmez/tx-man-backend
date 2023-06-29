import { Controller, Get, Path, Route } from "tsoa";
import { Account } from "../entities/Account";
import { AccountService } from "../services/AccountService";

@Route("accounts")
export class AccountController extends Controller {
    @Get("{account_id}")
    public async getAccountById(@Path() account_id: string): Promise<Account | null> {
        return new AccountService().getById(account_id);
    }
}
