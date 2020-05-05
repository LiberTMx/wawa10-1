import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NewsModel } from '../model/news.model';
import { environment } from '../../../../../environments/environment';
import { AuthenticatedUserModel } from '../../../auth/model/authenticated-user.model';
import { NewsStatusType } from '../types/news-status.enum';
import { MessageModel } from '../../../../common/model/message.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  findById(newsId: number): Observable<NewsModel>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/news/findById/${newsId}`;
    return this.httpClient.get<NewsModel>(apiUrl);
  }

  /*

  this.newsForm = this.formBuilder.group({
        title: ['', Validators.required],
        presentation: ['', Validators.required],
        status: ['', Validators.required],
        externalLink: [''],
        showOrder: ['', Validators.required],
        avatar: [null],
        pdf: [''],
        image: [''],
        avatarPdf: [null],
      });
  */
  createNews(newsFormValue: any, user: AuthenticatedUserModel): Observable<any> 
  {
    const apiUrl=`${environment.apiUrl}/news/create`;
    const postData = new FormData();
    postData.append('title' , newsFormValue.title );
    postData.append('presentation' , newsFormValue.presentation );
    postData.append('status' , newsFormValue.status );
    postData.append('externalLink' , newsFormValue.externalLink );
    postData.append('showOrder' , newsFormValue.showOrder );
    postData.append('avatar' , newsFormValue.avatar );
    postData.append('pdf' , newsFormValue.pdf );
    postData.append('image' , newsFormValue.image );
    postData.append('avatarPdf' , newsFormValue.avatarPdf );
    postData.append('auteurId' , String(user.getId()) );
    return this.httpClient.post<any>(apiUrl,  postData);
  }

  getNewsList(readAll: boolean): Observable<Array<NewsModel>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/news/liste?readAll=${readAll}`;
    return this.httpClient.get<Array<NewsModel>>(apiUrl);
  }

  downloadImageFile(news: NewsModel): Observable<any>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/news/downloadImage/${news.id}`;
    return this.httpClient.get(apiUrl, {responseType: /*ResponseContentType.Blob*/ 'blob'});
  }

  downloadDocumentFile(news: NewsModel): Observable<any>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/news/downloadDocument/${news.id}`;
    return this.httpClient.get(apiUrl, {responseType: /*ResponseContentType.Blob*/ 'blob'});
  }

  updateStatus(news: NewsModel, newStatus: NewsStatusType): Observable<NewsModel>
  {
    const apiUrl=`${environment.apiUrl}/news/updateStatus`;
    return this.httpClient.post<NewsModel>(apiUrl,  { newsId: news.id, newStatus});
  }

  deleteNews(news: NewsModel): Observable<MessageModel>
  {
    const apiUrl=`${environment.apiUrl}/news/delete`;
    return this.httpClient.post<MessageModel>(apiUrl,  { newsId: news.id });
  }
}
