import { AccountService } from '../services/AccountService';
import { Account } from '../entities/Account';

// Create a mock Repository instance
const mockRepository = {
    findOne: jest.fn(),
}; // <== Initialize mockRepository first

// Mock the TypeORM getRepository function and DataSource
jest.mock('typeorm', () => ({
    DataSource: jest.fn().mockImplementation(() => ({
        getRepository: () => mockRepository,
        initialize: jest.fn(),
    })),
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
}));

// Account service instance
const service = new AccountService();

// Reset all mocks before each test
beforeEach(() => {
    jest.resetAllMocks();
});

describe('AccountService', () => {
    describe('getById', () => {
        it('should return an account when it exists', async () => {
            // Mock account data
            const mockAccount: Account = {
                account_id: 'uuid1',
                balance: 1000,
            };

            // Set up mock repository function to return mock account
            mockRepository.findOne.mockResolvedValue(mockAccount);

            // Call the service method
            const result = await service.getById('uuid1');

            // Expect the result to equal the mock account
            expect(result).toEqual(mockAccount);

            // Ensure the findOne method was called with the correct id
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { account_id: 'uuid1' } });
        });

        it('should return null when an account does not exist', async () => {
            // Set up mock repository function to return null
            mockRepository.findOne.mockResolvedValue(null);

            // Call the service method
            const result = await service.getById('uuid1');

            // Expect the result to be null
            expect(result).toBeNull();

            // Ensure the findOne method was called with the correct id
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { account_id: 'uuid1' } });
        });
    });
});
