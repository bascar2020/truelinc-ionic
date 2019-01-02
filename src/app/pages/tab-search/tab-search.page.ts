import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-search',
  templateUrl: './tab-search.page.html',
  styleUrls: ['./tab-search.page.scss'],
})
export class TabSearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getItems(ev: any) {
    const val = ev.target.value;
  }

}
