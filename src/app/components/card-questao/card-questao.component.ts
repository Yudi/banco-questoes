import { Component, Input, OnChanges } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {
  AlternativaType,
  QuestaoParsedType,
  QuestaoType,
} from 'src/app/shared/questoes.service';

import { storage } from 'src/lib/appwrite';

@Component({
  selector: 'app-card-questao',
  templateUrl: './card-questao.component.html',
  styleUrls: ['./card-questao.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule],
})
export class CardQuestaoComponent implements OnChanges {
  @Input() questao: QuestaoType | undefined;

  questaoParsed: QuestaoParsedType = {
    alternativas: [],
  };

  alternativas: AlternativaType[] = [];

  dataForm: FormGroup;

  showAnswer = false;

  images: URL[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.dataForm = this.formBuilder.group({
      resposta: [''],
    });
  }

  ngOnChanges() {
    if (this.questao) {
      if (this.questao.alternativas) {
        this.alternativas = this.parseAlternativas(this.questao.alternativas);
        console.log(this.alternativas);

        this.alternativas.forEach((alternativa) => {
          this.dataForm.addControl(
            alternativa.letra,
            this.formBuilder.control(null)
          );
        });
      }

      if (this.questao.imagens) {
        this.getImages(this.questao.imagens);
      }
    }
  }

  parseAlternativas(alternativas: string) {
    return JSON.parse(alternativas).sort((a: any, b: any) => {
      if (a.letter < b.letter) {
        return -1;
      }
      if (a.letter > b.letter) {
        return 1;
      }
      return 0;
    });
  }

  onSubmit() {
    this.showAnswer = true;
    this.alternativas.forEach((alternativa) => {
      document
        .getElementById(`radio-${alternativa.letra}`)
        ?.setAttribute('disabled', 'true');

      if (
        this.dataForm.value.resposta === alternativa.letra &&
        !alternativa.isResposta
      ) {
        document
          .getElementById(`item-${alternativa.letra}`)
          ?.setAttribute('color', 'danger');
      } else if (alternativa.isResposta) {
        document
          .getElementById(`item-${alternativa.letra}`)
          ?.setAttribute('color', 'success');
      }
    });
  }

  reset() {
    this.showAnswer = false;
    this.alternativas.forEach((alternativa) => {
      document
        .getElementById(`radio-${alternativa.letra}`)
        ?.removeAttribute('disabled');
      document
        .getElementById(`item-${alternativa.letra}`)
        ?.removeAttribute('color');
    });
  }

  getImages(imageIds: string[]) {
    imageIds.forEach((imageId) => {
      this.images.push(storage.getFileDownload('questoes-img', imageId));
    });
  }
}
