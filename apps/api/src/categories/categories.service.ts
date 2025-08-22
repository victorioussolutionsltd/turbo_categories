import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: string) {
    return this.categoriesRepository.findBy({ id });
  }

  async update(connections: { [key: number]: number | undefined }) {
    await Promise.all(
      Object.entries(connections).map(([id, value]) =>
        this.categoriesRepository.update(Number(id), { parent_id: value }),
      ),
    );
    return { updated: Object.keys(connections).length };
  }

  async remove(id: string) {
    return await this.categoriesRepository.delete(id);
  }
}
