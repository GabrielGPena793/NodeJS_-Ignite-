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

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
   
    const category = this.repository.create({
      name,
      description
    })

    await this.repository.save(category)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}

export { SpecificationRepository };