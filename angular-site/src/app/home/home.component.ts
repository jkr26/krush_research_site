import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .sendGetRequest()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.posts = res.body;
      });
  }

  public firstPage() {
    this.posts = [];
    this.apiService
      .sendGetRequestToUrl(this.apiService.first)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.posts = res.body;
      });
  }
  public previousPage() {
    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.posts = [];
      this.apiService
        .sendGetRequestToUrl(this.apiService.prev)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.posts = res.body;
        });
    }
  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.posts = [];
      this.apiService
        .sendGetRequestToUrl(this.apiService.next)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.posts = res.body;
        });
    }
  }
  public lastPage() {
    this.posts = [];
    this.apiService
      .sendGetRequestToUrl(this.apiService.last)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.posts = res.body;
      });
  }
}
