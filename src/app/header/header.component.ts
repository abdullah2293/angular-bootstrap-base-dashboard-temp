import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/storage/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private storage:LocalstorageService) { }

  ngOnInit() {
  }

  logout(){
    this.storage.remove()
    window.location.reload()
  }
}
