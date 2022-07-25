import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    
    if(!CategoriesRepository.INSTANCE){
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return this.INSTANCE;
  }

  create({name, description}: ICreateCategoryDTO): void {

    //instanciando o objeto
    const category = new Category();

    //setando todos os valores do objeto
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category{
    return this.categories.find(category => category.name === name)
  }
}

export { CategoriesRepository };
