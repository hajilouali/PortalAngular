import { Component, OnInit,ChangeDetectionStrategy ,Inject} from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import Swal from 'sweetalert2';
import { Factorattachment, ApiServiceService } from 'src/app/Services/api-service.service';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
@Component({
  selector: 'app-factor-attachment',
  templateUrl: './factor-attachment.component.html',
  styleUrls: ['./factor-attachment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactorAttachmentComponent implements OnInit {
Title='پیوست های فاکتور';
Factoridid;
reitem;
items: GalleryItem[];

respins:Factorattachment=null;
  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig,public gallery: Gallery,private api :ApiServiceService,private route:ActivatedRoute) { 
    this.route.queryParamMap.subscribe(res=>{this.Factoridid=res.get('id');});
   
  }
  
  ngOnInit(): void {
  
    this.api.GetFactorAttachment(this.Factoridid).subscribe(res=>{
      this.respins= res;
      this.items = this.respins.data.map(item =>
        new ImageItem({ src: `${this.appConfig.apiEndpoint}uploads/Factors/${this.Factoridid}/${item.fileName}`,
         thumb: `${this.appConfig.apiEndpoint}uploads/Factors/${this.Factoridid}/${item.fileName}`,
         id:item.id,
        Title:item.discription })
      );
      this.gallery.ref().load(this.items);
      const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      
      thumbPosition: ThumbnailsPosition.Top
    });
    
    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
  
      
     
   }
     );
    
    // // 1. Create gallery items
    // // this.data.forEach(element => {
    // //   this.items.push(
    // //     new ImageItem({ src: element.srcUrl, thumb: element.previewUrl })
    // //   )
    // // });
    // this.items = this.respins.data.map(item =>
    //   new ImageItem({ src: item.fileName, thumb: item.fileName,id:item.id })
    // );
    
    // // Load items into the lightbox
    // this.basicLightboxExample();

    // // Load item into different lightbox instance
    // // With custom gallery config
    // this.withCustomGalleryConfig();
    
  }
  basicLightboxExample() {
    this.gallery.ref().load(this.items);
    console.log('1');
  }
  removeimage(i){
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'اخطار',
      text: "آیا از پاک کردن این پیوست اطمینان دارید؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'پاک کن',
      cancelButtonText: 'انصراف',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.api.DeleteAttachment(i).subscribe(
          
         
          res=>{
            const element= document.getElementById(i);
            element.remove();
            console.log(this.items);
            
            swalWithBootstrapButtons.fire(
              'موفقیت!',
              'فایل پیوست با موفیت پاک شد',
              'success'
            );
            
          }

        )
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'انصراف',
          'دستور حذف پیوست مورد نظر کنسل شد. :)',
          'error'
        )
      }
    })
  }
  /**
   * Use custom gallery config with the lightbox
   */
  withCustomGalleryConfig() {

    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      
      thumbPosition: ThumbnailsPosition.Top
    });
    
    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
    console.log('2');
  }
}
