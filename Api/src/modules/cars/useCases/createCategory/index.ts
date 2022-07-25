import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

//repository
const categoriesRepository = CategoriesRepository.getInstance();

//service
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

//controller
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };
