import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string, 
  description: string
}

@injectable()  //Disponibilizando no container a classe para injeção
class CreateCategoryUseCase { 
  constructor(
    @inject("CategoriesRepository")  //injetando através do constructor
    private categoriesRepository: ICategoriesRepository
    ) {}

  async execute({name, description} : IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
      throw new Error("Category already exists!")
    }
  
    this.categoriesRepository.create({ name, description})
  }
} 

export { CreateCategoryUseCase }