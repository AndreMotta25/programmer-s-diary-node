import { inject, injectable } from 'tsyringe';

import { ICardRepository } from '../../repositories/ICardRepository';

@injectable()
class GetCardUseCase {
  private readonly repository: ICardRepository;

  constructor(@inject('ICardRepository') repository: ICardRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const cards = await this.repository.getCards(id);
    return cards;
  }
}

export { GetCardUseCase };
