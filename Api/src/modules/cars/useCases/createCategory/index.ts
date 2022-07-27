import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {
  //repository
  const categoriesRepository = new CategoriesRepository();

  //service
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  //controller
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
