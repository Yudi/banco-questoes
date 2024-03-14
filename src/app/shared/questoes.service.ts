import { Models } from 'appwrite';

export interface QuestaoType extends Models.Document {
  id: string;
  imagens: string[];
  textos: string[];
  enunciado: string;
  alternativas: string;
  tags: string[];
  public: boolean;
  resolucao: string;
  prova_id: string;
  numero: number;
  disciplinas_id: string;
  tipo: 'objetiva' | 'dissertativa';
}

export interface QuestaoParsedType extends Omit<QuestaoType, 'alternativas'> {
  alternativas: AlternativaType[];
}

export interface AlternativaType {
  texto: string;
  isResposta: boolean;
  letra: string;
}

export interface ProvaType {}
