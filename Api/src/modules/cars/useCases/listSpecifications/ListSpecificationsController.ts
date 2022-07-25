import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";



class ListSpecificationsController {

  constructor(private listSpecificationUseCase: ListSpecificationsUseCase){}

  handle(request: Request, response: Response): Response {
    
    const allSpecifications = this.listSpecificationUseCase.execute();

    return response.status(200).send(allSpecifications)
  }
}

export { ListSpecificationsController }