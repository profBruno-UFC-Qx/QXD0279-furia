import { NotFoundError } from "../errors/errors.ts";
import { pagWrapper } from "../utils/pagWrapper.ts";
import { AvaliacaoDTO } from "./dto/avaliacao.dto.ts";
import { AvaliacaoRepository } from "./avaliacao.repository.ts";

export class AvaliacaoService {
  constructor(private avaliacaoRepository: AvaliacaoRepository) {}

  async create(avaliacaoData: AvaliacaoDTO) {
    return await this.avaliacaoRepository.createAvaliacao(avaliacaoData);
  }

  async findAll(take: number, skip: number) {
    const total = await this.avaliacaoRepository.count();
    const data = await this.avaliacaoRepository.findAll(take, skip);
    return pagWrapper(data, take, skip, total);
  }

  async findById(id: number) {
    const avaliacao = await this.avaliacaoRepository.findById(id);

    if (!avaliacao) {
      throw new NotFoundError("Avaliação não encontrada");
    }

    return avaliacao;
  }

  async update(id: number, avaliacaoData: Partial<AvaliacaoDTO>) {
    const avaliacao = await this.findById(id);

    if (!avaliacao) {
      throw new NotFoundError("Avaliação não encontrada");
    }

    const updatedAvaliacao = await this.avaliacaoRepository.updateAvaliacao(
      id,
      avaliacaoData,
    );

    if (!updatedAvaliacao) {
      throw new NotFoundError("Avaliação não encontrada");
    }

    return updatedAvaliacao;
  }

  async delete(id: number) {
    const avaliacao = await this.findById(id);

    if (!avaliacao) {
      throw new NotFoundError("Avaliação não encontrada");
    }

    const deleted = await this.avaliacaoRepository.deleteAvaliacao(id);

    if (!deleted) {
      throw new NotFoundError("Nao foi possivel deletar a avaliacao");
    }

    return deleted;
  }
}
