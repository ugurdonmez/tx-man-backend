import { Body, Controller, Get, Path, Post, Route, SuccessResponse } from "tsoa";
import { Transaction } from "../entities/Transaction";
import { TransactionService } from "../services/TransactionService";

@Route("transactions")
export class TransactionController extends Controller {
    @Get()
    public async getTransactions(): Promise<Transaction[]> {
        return new TransactionService().getAll();
    }

    @Get("{transaction_id}")
    public async getTransactionById(@Path() transaction_id: string): Promise<Transaction | null> {
        return new TransactionService().getById(transaction_id);
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createTransaction(@Body() requestBody: Transaction): Promise<Transaction> {
        this.setStatus(201); // set return status 201
        return new TransactionService().create(requestBody);
    }
}


