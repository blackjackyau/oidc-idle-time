import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material.module';
import { RelyingPartyComponent } from './relying-party/relying-party.component';

@NgModule({
  imports: [CommonModule, AppMaterialModule],
  declarations: [RelyingPartyComponent],
  exports: [RelyingPartyComponent]
})
export class AppSharedModule { }
