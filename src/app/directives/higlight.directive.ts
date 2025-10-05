import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appHiglight]'
})
export class HiglightDirective implements OnChanges{
  @Input() searchedWord: string;
  @Input() content: string;
  setTitle: boolean = false;

  constructor(private el: ElementRef, private rederer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.content) {
      return;
    }

    if (this.setTitle) {
      this.rederer.setProperty(this.el.nativeElement, 'title', this.content);
    }

    if (!this.searchedWord || !this.searchedWord.length) {
      this.rederer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        this.content
      );
    }

    this.rederer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'gi');
    return this.content.replace(re, `<span class="searchHighLight">$1</span>`);
  }
}
