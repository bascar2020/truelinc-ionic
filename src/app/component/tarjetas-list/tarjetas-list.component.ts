import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas-list',
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.scss']
})
export class TarjetasListComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() navigateTo: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  go(id: string) {
    this.router.navigateByUrl('/home/tabs/tarjetas/' + id);
  }
}
