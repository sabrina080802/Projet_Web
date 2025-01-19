import { Component, EventEmitter, Output } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { Card } from '../../../models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-method',
  imports: [CommonModule],
  templateUrl: './select-method.component.html',
  styleUrl: './select-method.component.scss'
})
export class SelectMethodComponent {
  cards: Card[] = [];
  @Output() methodChanged = new EventEmitter<Card>();
  @Output() stepChange = new EventEmitter<string>();

  constructor(private cardsService: CardsService) { }

  async ngOnInit() {
    this.cards = (await this.cardsService.getCards()).data;
  }

  getExpiryDate(card: Card): string {
    const date = new Date(card.expire_date);
    return (date.getMonth() + 1) + '/' + date.getFullYear();
  }
  onNewCard() {
    this.stepChange.emit('create-card');
  }
  onSelectCard(card: Card) {
    this.cards.forEach(c => {
      c.selected = c == card;
    });
  }
  onValidate() {
    const selected = this.cards.find(x => x.selected);
    if (!selected)
      return;

    this.methodChanged.emit(selected);
    this.stepChange.emit('confirm-payment');
  }
  async removeCard(card: Card) {
    this.cardsService.deleteCard(card);
    this.cards.splice(this.cards.findIndex(x => x.id == card.id), 1);
  }
}
