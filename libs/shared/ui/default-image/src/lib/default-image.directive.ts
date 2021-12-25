import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[sharedDefaultImage]',
})
export class DefaultImageDirective implements OnInit {
  @Input() sharedDefaultImage: string;

  private readonly defaultImage = '/assets/images/defaults/default-image.png';

  @HostBinding('src')
  @Input()
  src?: string;

  @HostListener('error')
  onError(): void {
    this.src = this.sharedDefaultImage;
  }

  constructor() {
    this.sharedDefaultImage = this.defaultImage;
  }

  ngOnInit(): void {
    if (!this.sharedDefaultImage) {
      this.sharedDefaultImage = this.defaultImage;
    }
  }
}
