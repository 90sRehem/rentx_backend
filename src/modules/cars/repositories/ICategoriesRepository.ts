import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoryRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ description, name }: ICreateCategoryDTO): void;
}

export { ICreateCategoryDTO, ICategoryRepository };
