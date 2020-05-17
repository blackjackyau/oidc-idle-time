import { Component, OnInit } from '@angular/core';
import { Employee, RelyingPartyService } from './relying-party.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-relying-party',
  templateUrl: './relying-party.component.html',
  styleUrls: ['./relying-party.component.scss']
})
export class RelyingPartyComponent implements OnInit {

  employees$: Observable<Employee[]>;

  constructor(private relyingPartyService: RelyingPartyService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.employees$ = this.relyingPartyService.getEmployees();
  }

}
