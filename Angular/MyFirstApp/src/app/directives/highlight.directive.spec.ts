import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new HighlightDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
