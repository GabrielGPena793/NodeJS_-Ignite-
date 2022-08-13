import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';


const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)

export { rentalRoutes }