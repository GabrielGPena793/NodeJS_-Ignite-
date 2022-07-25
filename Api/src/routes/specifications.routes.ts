import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecificaiton";


const specificationsRoutes = Router();
const specificationRepository = SpecificationRepository.getInstance();


specificationsRoutes.post("/", (request, response) => {
  createSpecificationController.handle(request, response);
})


specificationsRoutes.get("/", (request, response) => {

  const allSpecifications = specificationRepository.list();

  return response.status(200).send(allSpecifications)
})


export { specificationsRoutes };