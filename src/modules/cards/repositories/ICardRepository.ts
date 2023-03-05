import { ICreateCardDTO } from '../useCases/CreateCard/ICreateCardDTO';

interface ICardRepository {
  create(card: ICreateCardDTO): Promise<string>;
}

export { ICardRepository };
