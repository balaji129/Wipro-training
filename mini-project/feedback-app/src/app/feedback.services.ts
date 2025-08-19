import { Injectable } from '@angular/core';
import { Feedback } from './feedback.model';

const KEY = 'feedback_items_v1';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private load(): Feedback[] {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Feedback[] : [];
  }

  private save(items: Feedback[]) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  add(item: Omit<Feedback, 'id' | 'createdAt'>): Feedback {
    const list = this.load();
    const newItem: Feedback = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    list.unshift(newItem);
    this.save(list);
    return newItem;
  }

  all(): Feedback[] {
    return this.load().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  delete(id: string) {
    const list = this.load().filter(f => f.id !== id);
    this.save(list);
  }

  clearAll() {
    this.save([]);
  }
}
