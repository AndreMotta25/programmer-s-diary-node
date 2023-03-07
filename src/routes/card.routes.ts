import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCardController } from '../modules/cards/useCases/CreateCard/CreateCardController';
import { DeleteCardController } from '../modules/cards/useCases/DeleteCard/DeleteCardController';
import { GetCardController } from '../modules/cards/useCases/GetCard/GetCardController';
import { UpdateCardController } from '../modules/cards/useCases/UpdateCard/UpdateCardController';

const cardRouter = Router();

const createController = new CreateCardController();
const getController = new GetCardController();
const updateController = new UpdateCardController();
const deleteController = new DeleteCardController();

cardRouter.use(ensureAuthenticated);

cardRouter.post('/', createController.handler);
cardRouter.get('/', getController.handler);
cardRouter.put('/:id', updateController.handler);
cardRouter.delete('/:id', deleteController.handler);

export { cardRouter };
