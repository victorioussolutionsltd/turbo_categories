import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn().mockReturnValue(['cat1', 'cat2']),
      update: jest.fn().mockReturnValue({ updated: 2 }),
    };

    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockService },
        { provide: getRepositoryToken(Categories), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('CategoriesService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', async () => {
    expect(await controller.findAll()).toEqual(['cat1', 'cat2']);
  });

  it('should update categories', async () => {
    expect(await controller.update({ '1': 2, '2': 3 })).toEqual({ updated: 2 });
  });
});
