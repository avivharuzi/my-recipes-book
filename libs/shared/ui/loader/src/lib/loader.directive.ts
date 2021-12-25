import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

import { LoaderComponent } from './loader.component';

@Directive({
  selector: '[sharedLoader]',
})
export class LoaderDirective {
  @Input()
  get sharedLoader(): boolean {
    return this._sharedLoader;
  }
  set sharedLoader(sharedLoader: boolean) {
    this._sharedLoader = sharedLoader;
    this.renderLoader();
  }

  private _sharedLoader = false;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef
  ) {}

  private renderLoader(): void {
    const parentElement = (this.elementRef.nativeElement as HTMLElement)
      .parentElement;

    if (this.sharedLoader) {
      this.renderer.setStyle(parentElement, 'position', 'relative');
      this.viewContainerRef.createComponent<LoaderComponent>(LoaderComponent);
    } else {
      this.renderer.removeStyle(parentElement, 'position');
      this.viewContainerRef.clear();
    }
  }
}
