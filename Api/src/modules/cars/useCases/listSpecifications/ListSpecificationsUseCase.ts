import { Specification } from "../../model/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";


class ListSpecificationsUseCase{

  constructor(private specificationRepository: ISpecificationRepository){}

  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase }; 