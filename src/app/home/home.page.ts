import { Component, OnInit } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';

import { menu, logInOutline } from 'ionicons/icons';

import { CardQuestaoComponent } from 'src/app/components/card-questao/card-questao.component';

import { databases } from 'src/lib/appwrite';

import { environment } from 'src/environments/environment';

import { Models, Query } from 'appwrite';
import { QuestaoType } from 'src/app/shared/questoes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterLink, CardQuestaoComponent, IonicModule],
})
export class HomePage implements OnInit {
  questoesList: Promise<Models.DocumentList<Models.Document>>;
  currentQuestao: QuestaoType | undefined;

  constructor() {
    addIcons({
      menu,
      logInOutline,
    });

    this.questoesList = databases.listDocuments(
      environment.databaseId,
      'questoes'
    );
  }

  ngOnInit() {
    this.questoesList.then((response) => {
      this.currentQuestao = response.documents[0] as QuestaoType;
    });
  }
}
