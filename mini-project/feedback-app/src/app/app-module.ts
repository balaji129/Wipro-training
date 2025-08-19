import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { App } from './app';
import { FeedbackForm } from './feedback-form/feedback-form';
import { FeedbackList } from './feedback-list/feedback-list';

import { RatingEmojiPipe } from './rating-emoji-pipe';

const routes: Routes = [
  { path: '', component: FeedbackForm, title: 'Give Feedback' },
  { path: 'list', component: FeedbackList, title: 'Feedback List' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    App,
    FeedbackForm,
    FeedbackList,
    RatingEmojiPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
