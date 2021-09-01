import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'country-filter',
  templateUrl: './countryFilter.component.html',
  styleUrls: ['./countryFilter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CountryFilter implements OnInit {
  @Input() countryList: string[];

  _searchList: string[];

  @ViewChild("appInput", {static: true})
  appInput: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._searchList = this.countryList;
    fromEvent(this.appInput.nativeElement, "input").pipe(
      debounceTime(300),
      map((event: any) => event.target.value),
      distinctUntilChanged()
    ).subscribe((searchString: string) => {
        searchString ?
          this._searchList = this.countryList.filter(country => country.toLowerCase().includes(searchString.toLowerCase())) :
          this._searchList = this.countryList;
          this.cdr.markForCheck();
    });
  }

}
