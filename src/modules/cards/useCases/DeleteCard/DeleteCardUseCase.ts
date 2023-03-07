import { inject, injectable } from 'tsyringe';

import { ICardRepository } from '../../repositories/ICardRepository';

@injectable()
class DeleteCardUseCase {
  private readonly repository: ICardRepository;

  constructor(@inject('ICardRepository') repository: ICardRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    await this.repository.deleteCard(id);
  }
}

export { DeleteCardUseCase };
