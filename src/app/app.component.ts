import { Component, OnInit } from '@angular/core';
import { Mall, MallService } from './mall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  malls: Mall[] = [];
  newMall: Mall = {
    mallName: '',
    location: '',
    totalShops: 0,
    areaSqFt: 0
  };

  constructor(private mallService: MallService) {}

  ngOnInit(): void {
    this.loadMalls();
  }

  loadMalls(): void {
    this.mallService.getAll().subscribe(data => this.malls = data);
  }

  addMall(): void {
    this.mallService.create(this.newMall).subscribe(() => {
      this.newMall = { mallName: '', location: '', totalShops: 0, areaSqFt: 0 };
      this.loadMalls();
    });
  }

  deleteMall(id: number): void {
    this.mallService.delete(id).subscribe(() => this.loadMalls());
  }
}