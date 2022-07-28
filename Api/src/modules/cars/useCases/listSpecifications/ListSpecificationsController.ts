import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { container } from  "tsyringe"



class ListSpecificationsController {

  async handle(request: Request, response: Response): Promise<Response> {

    const listSpecificationUseCase = container.resolve(ListSpecificationsUseCase)
    
    const allSpecifications = await listSpecificationUseCase.execute();

    return response.status(200).send(allSpecifications)
  }
}

export { ListSpecificationsController }