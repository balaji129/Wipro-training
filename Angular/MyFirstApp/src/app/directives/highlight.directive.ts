import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // Use as an attribute selector
  standalone: false // Mark as standalone directive
})
export class HighlightDirective {

  @Input() appHighlight = ''; // custom color passed from component

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || 'yellow'); // default yellow if no color passed
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }


  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
