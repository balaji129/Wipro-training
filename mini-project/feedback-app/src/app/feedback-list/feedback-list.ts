import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.services';
import { Feedback } from '../feedback.model';

@Component({
  selector: 'app-feedback-list',
  standalone:false,
  templateUrl: './feedback-list.html',
  styleUrls: ['./feedback-list.css']
})
export class FeedbackList implements OnInit {
  all: Feedback[] = [];
  term = '';
  minRating: number | '' = '';

  constructor(private store: FeedbackService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.all = this.store.all();
  }

  get filtered(): Feedback[] {
    return this.all.filter(item => {
      const matchesTerm =
        !this.term ||
        item.name.toLowerCase().includes(this.term.toLowerCase()) ||
        item.comment.toLowerCase().includes(this.term.toLowerCase()) ||
        item.email.toLowerCase().includes(this.term.toLowerCase());
      const matchesRating =
        this.minRating === '' || item.rating >= Number(this.minRating);
      return matchesTerm && matchesRating;
    });
  }

  remove(id: string) {
    this.store.delete(id);
    this.refresh();
  }

  clearAll() {
    if (confirm('Delete all feedback?')) {
      this.store.clearAll();
      this.refresh();
    }
  }
}
