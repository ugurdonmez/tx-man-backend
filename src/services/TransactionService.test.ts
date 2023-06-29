import { TransactionService } from '../services/TransactionService';
import { Transaction } from '../entities/Transaction';

// Mock Repository
const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
};

// Mock TypeORM
jest.mock('typeorm', () => ({
    DataSource: jest.fn().mockImplementation(() => ({
        getRepository: () => mockRepository,
        initialize: jest.fn(),
    })),
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
    CreateDateColumn: () => {},
}));

// Transaction service instance
const service = new TransactionService();

// Reset all mocks before each test
beforeEach(() => {
    jest.resetAllMocks();
});

describe('TransactionService', () => {
    describe('getAll', () => {
        it('should return all transactions', async () => {
            const mockTransactions: Transaction[] = [
                { transaction_id: 'uuid1', account_id: 'uuid2', amount: 200, created_at: new Date() },
                { transaction_id: 'uuid3', account_id: 'uuid4', amount: 300, created_at: new Date() },
            ];

            mockRepository.find.mockResolvedValue(mockTransactions);

            const result = await service.getAll();

            expect(result).toEqual(mockTransactions);
            expect(mockRepository.find).toHaveBeenCalled();
        });
    });

    describe('getById', () => {
        it('should return a transaction when it exists', async () => {
            const mockTransaction: Transaction = { transaction_id: 'uuid1', account_id: 'uuid2', amount: 200, created_at: new Date() };

            mockRepository.findOne.mockResolvedValue(mockTransaction);

            const result = await service.getById('uuid1');

            expect(result).toEqual(mockTransaction);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { transaction_id: 'uuid1' } });
        });

        it('should return null when a transaction does not exist', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const result = await service.getById('uuid1');

            expect(result).toBeNull();
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { transaction_id: 'uuid1' } });
        });
    });

    describe('create', () => {
        it('should create a transaction successfully', async () => {
            const mockTransaction: Transaction = { transaction_id: 'uuid1', account_id: 'uuid2', amount: 200, created_at: new Date() };

            mockRepository.save.mockResolvedValue(mockTransaction);

            const result = await service.create(mockTransaction);

            expect(result).toEqual(mockTransaction);
            expect(mockRepository.save).toHaveBeenCalledWith(mockTransaction);
        });
    });
});
