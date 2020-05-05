import { Component, OnInit, Input } from '@angular/core';
import { EntrainementClasseModel } from '../../model/entrainement-classe.model';
import { EntrainementsService } from '../../services/entrainements.service';

@Component({
  selector: 'app-entrainement-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  @Input()
  classe: EntrainementClasseModel;
  
  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=null;

  isImageLoading = true;

  constructor(
    private entrainementsService: EntrainementsService,
  ) { }

  ngOnInit(): void 
  {
    if(this.classe.imageFilename===null || this.classe.imageFilename===undefined)
    {
      this.imageUrl=null;
      this.isImageLoading=false;
    }
    else
    {
      console.log('Loading image from server for classe '+ this.classe.id+', image:'+this.classe.imageFilename);
      this.getImageFromService();
    }
  }

  getImageFromService() 
  {
      this.isImageLoading = true;
      this.entrainementsService.downloadClasseImageFile(this.classe).subscribe(data => {
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

  onShowClasseDetails()
  {
    
  }
}
