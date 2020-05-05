import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewsModel } from '../model/news.model';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { NewsStatusType } from '../types/news-status.enum';
import { NewsEvent, NewsEventType } from '../model/news-event.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input()
  news: NewsModel;
  
  @Input()
  context: string;

  @Output()
  newsEvent: EventEmitter<NewsEvent> = new EventEmitter<NewsEvent>();

  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=null;

  isImageLoading = true;

  constructor(
    private newsService: NewsService,
    private router: Router,
  ) { }

  ngOnInit(): void 
  {
    if(this.news.image===null || this.news.image===undefined)
    {
      this.imageUrl=null;
      this.isImageLoading=false;
    }
    else
    {
      console.log('Loading image from server for news '+ this.news.id+', image:'+this.news.image);
      this.getImageFromService();
    }
  }

  getImageFromService() 
  {
      this.isImageLoading = true;
      this.newsService.downloadImageFile(this.news).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  createImageFromBlob(image: Blob) 
  {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageUrl = reader.result;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
  }

  onShowNewsDetails()
  {
    this.router.navigate(['news', 'details', this.news.id, this.context]);
  }

  onShowNews(show: boolean)
  {
    const newStatus=this.evaluateNewsStatus(show);
    
    this.newsService.updateStatus(this.news, newStatus)
      .subscribe(
        res => {
          if(res!==null && res!==undefined)
            this.news.status=newStatus;
          else
            console.error('Unable to identify the news ');
        }
      );
  }

  evaluateNewsStatus(show: boolean): NewsStatusType
  {
    if(show) 
      return NewsStatusType.VISIBLE;
    else 
      return NewsStatusType.CACHEE;
  }

  isNewsVisible(): boolean
  {
    return this.news.status === NewsStatusType.VISIBLE;
  }

  onDeleteNews()
  {
    this.newsService.deleteNews(this.news)
    .subscribe(
      res => {
        console.log('news has been deleted', this.news);
        /*
        if(res!==null && res!==undefined)
          this.news.status=newStatus;
        else
          console.error('Unable to identify the news ');
          */

        this.newsEvent.emit(new NewsEvent(this.news.id, NewsEventType.DELETE));
      },
      err => console.error('Error when delete the news', err)
    );
  }

  onEditNews()
  {

  }

  onSetNewsTopPriority()
  {

  }
}
