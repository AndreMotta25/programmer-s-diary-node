import { inject, singleton } from 'tsyringe';
import { Repository } from 'typeorm';

import { appDataSource } from '../../../../database';
import { User } from '../../../accounts/entities/User';
import { IUserRepository } from '../../../accounts/repositories/IUserRepository';
import { Card } from '../../entities/Card';
import { ICreateCardDTO } from '../../useCases/CreateCard/ICreateCardDTO';
import { ICardRepository } from '../ICardRepository';

@singleton()
class CardRepository implements ICardRepository {
  private repositoryCard: Repository<Card>;
  private repositoryUser: IUserRepository;

  constructor(@inject('IUserRepository') repositoryUser: IUserRepository) {
    this.repositoryCard = appDataSource.getRepository(Card);
    this.repositoryUser = repositoryUser;
  }
  async getCards(userId: string): Promise<Card[]> {
    const user = (await this.repositoryUser.findById(userId)) as User;

    const cards = await this.repositoryCard.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
    return cards;
  }

  async create({
    code,
    description,
    language,
    name,
    userId,
  }: ICreateCardDTO): Promise<string> {
    const userFind = (await this.repositoryUser.findById(userId)) as User;

    const card = this.repositoryCard.create({
      code,
      description,
      language,
      name,
      user: userFind,
    });

    await this.repositoryCard.save(card);
    return card.id;
  }
}

export { CardRepository };
