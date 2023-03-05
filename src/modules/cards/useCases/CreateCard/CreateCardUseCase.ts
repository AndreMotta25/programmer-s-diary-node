import { inject, injectable } from 'tsyringe';

import { ICardRepository } from '../../repositories/ICardRepository';
import { ICreateCardDTO } from './ICreateCardDTO';

@injectable()
class CreateCardUseCase {
  private readonly repository: ICardRepository;

  constructor(@inject('ICardRepository') repository: ICardRepository) {
    this.repository = repository;
  }
  async execute(cardDTO: ICreateCardDTO) {
    const id = await this.repository.create(cardDTO);
    return id;
  }
}

export { CreateCardUseCase };
