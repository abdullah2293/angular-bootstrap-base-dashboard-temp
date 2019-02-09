import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/storage/localstorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role:any;
  user:any;
  
  constructor(private storage:LocalstorageService) { }

  ngOnInit() {
    this.user = this.storage.getUser()
    this.role = this.storage.getRole()
  }

}
