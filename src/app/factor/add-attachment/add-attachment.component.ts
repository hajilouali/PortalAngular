import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { HttpClient ,HttpEventType} from '@angular/common/http';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.css']
})
export class AddAttachmentComponent implements OnInit {
  Factoridid;
  SelectedFile:File=null;
  dstr='';
  
  
  constructor(private api :ApiServiceService,private route:ActivatedRoute,private http:HttpClient,private rout : Router) { 
    this.route.queryParamMap.subscribe(res=>{this.Factoridid=res.get('id');});
  }
  doTextareaValueChange(ev){
    try {
      this.dstr = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
  ngOnInit(): void {
  }
  onFileSelected(event){

    this.SelectedFile=<File>event.target.files[0];
    
    if(this.SelectedFile.size>5242880||this.validateee(this.SelectedFile.name)===false){
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'تنها فایل های مورد قبول با پسوند jpg,png,jpge,gif با حداکثر حجم 5 مگ میباشد',
      });
      this.SelectedFile = null;
    }

  }
  validateee(image){
    var ext = image.substring(image.lastIndexOf('.') + 1);
    const filtypevalidate=['jpg','png','jpge','gif'];
    let result = false;
    filtypevalidate.forEach(element => {
      if(element===ext.toLowerCase())
      {
        result = true;
        
        
      }
    });
   if(result){
    return true;
   }else{
    return false;
   }

    
        
    
  }
  onUpload(){
    
    if(this.SelectedFile.size<=5242880 && this.validateee(this.SelectedFile.name)===true && this.SelectedFile!=null){
      const fd = new FormData();
      fd.append('Image',this.SelectedFile,this.SelectedFile.name);
     
      
      this.api.AddAttachment(this.Factoridid,fd).subscribe(event=>{
        
        if(event.type===HttpEventType.UploadProgress){
          
              console.log('upload progress' + Math.round(event.loaded / event.total * 100) +"%" );
              
        }else if(event.type===HttpEventType.Response){
          const m = <any>event.body;
          const modeld = {
             id: m.data.id,
             discription:this.dstr
               }
               
          this.api.AddDiscriptionAttachment(modeld).subscribe(res=>this.rout.navigate([`/FactorAttachment`],{ queryParams: { id: this.Factoridid } }),error=>console.log('ناموغفیت'));
          
         }  
       
        
      })
    }else if(this.SelectedFile.size>5242880||this.validateee(this.SelectedFile.name)===false||this.SelectedFile==null){
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'تنها فایل های مورد قبول با پسوند jpg,png,jpge,gif با حداکثر حجم 5 مگ میباشد',
      })
    }
    
    
  }
  
}
