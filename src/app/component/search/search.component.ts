import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @Input() items: any[] = [];
  @Input() filteredProperty: string;

  @Output() searchCompleted = new EventEmitter();
  @Output() searchStarted = new EventEmitter();

  private searchSubject = new BehaviorSubject<string>('');
  constructor() { }

  handleSearch(event: any) {
    this.searchStarted.emit();
    this.searchSubject.next(event.target.value);
  }

  ngAfterViewInit() {

    this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(searchedText => {

      if (!this.items) { return this.searchCompleted.emit([]); }
      if (!searchedText) { return this.searchCompleted.emit(this.items); }

      const filteredItems = this.items.filter((item) => {
        return item[this.filteredProperty].toLowerCase().includes(searchedText.toLowerCase());
      });

      this.searchCompleted.emit(filteredItems);
    });
  }
}
