import { inject, injectable } from 'tsyringe';

import { ICardRepository } from '../../repositories/ICardRepository';
import { IUpdateCardDTO } from './IUpdateCardDTO';

@injectable()
class UpdateCardUseCase {
  private readonly repository: ICardRepository;

  constructor(@inject('ICardRepository') repository: ICardRepository) {
    this.repository = repository;
  }

  async execute(cardDTO: IUpdateCardDTO) {
    await this.repository.updateCard(cardDTO);
  }
}

export { UpdateCardUseCase };
