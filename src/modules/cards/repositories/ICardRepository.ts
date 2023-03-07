import { Card } from '../entities/Card';
import { ICreateCardDTO } from '../useCases/CreateCard/ICreateCardDTO';
import { IUpdateCardDTO } from '../useCases/UpdateCard/IUpdateCardDTO';

interface ICardRepository {
  create(card: ICreateCardDTO): Promise<string>;
  getCards(userId: string): Promise<Card[]>;
  updateCard(card: IUpdateCardDTO): Promise<void>;
  deleteCard(id: string): Promise<void>;
}

export { ICardRepository };
