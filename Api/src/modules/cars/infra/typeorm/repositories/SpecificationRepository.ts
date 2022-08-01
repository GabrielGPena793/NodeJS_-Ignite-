import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationRepository";
import { Specification } from "../entities/Specification";


class SpecificationRepository implements ISpecificationRepository {

  private repository: Repository<Specification>;

  constructor(){
    this.repository = getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
   
    const category = this.repository.create({
      name,
      description
    })

    return await this.repository.save(category)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);

    return specifications;
  }

}

export { SpecificationRepository };