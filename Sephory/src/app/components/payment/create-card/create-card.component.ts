import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardsService } from '../../../services/cards.service';
import { Card } from '../../../models/card.model';

@Component({
  selector: 'app-create-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.scss'
})
export class CreateCardComponent {
  card_owner: string = '';
  card_number: string = '';
  card_expire: Date = new Date();
  card_cvc: string = '';

  @Output() stepChange = new EventEmitter<string>();
  @Output() methodChanged = new EventEmitter<Card>();

  constructor(private cards: CardsService) { }

  async onSubmit() {
    if (!this.card_number || !this.card_expire || !this.card_cvc)
      alert('Vous devez spécifier toutes les informations');
    else if (this.card_number.replaceAll(' ', '').trim().length != 16) {
      alert('Numéro de carte invalide');
    }
    else if (this.card_cvc.length != 3) {
      alert('CVC invalide');
    }
    else if (this.card_owner.length < 5 || !this.card_owner.includes(' ')) {
      alert('Le nom du propriétaire est mal renseigné');
    }
    else {
      const now = new Date();
      if (now.getTime() > this.card_expire.getTime()) {
        alert('Vous ne pouvez pas fournir une carte qui a déjà expiré');
        return;
      }

      const card = await this.cards.createCard(this.card_owner, this.card_number, this.card_cvc, this.card_expire);
      if (card.success) {
        this.methodChanged.emit(card.data);
        this.stepChange.emit('confirm-payment');
      }
      else {
        alert(card.error);
      }
    }
  }
  onBack() {
    this.stepChange.emit('select-method');
  }
}
