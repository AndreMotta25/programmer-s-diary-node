import { Card } from '../entities/Card';
import { ICreateCardDTO } from '../useCases/CreateCard/ICreateCardDTO';

interface ICardRepository {
  create(card: ICreateCardDTO): Promise<string>;
  getCards(userId: string): Promise<Card[]>;
}

export { ICardRepository };
