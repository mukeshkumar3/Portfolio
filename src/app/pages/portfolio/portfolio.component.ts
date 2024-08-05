import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import * as AOS from 'aos';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from '../../services/http/http.service';
import { CustomEventService } from '../../services/custom-event.service';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
    
    public phares = ["Ui Deveploer", "FreeLancer", "Web Designer"];
    public pharesCount = 0;
    public pharesDisplay = this.phares[0];

    // Tabs
    public active: any = 2;

    // Time
    public time: any = {};
    public yearInWords: any;

    // Show image 
    public userPicture: any = "";

    // Show and hide 
    public locker:boolean = true;
    public toast:boolean = false;
    public before:boolean = true;

    // Forms
    public contactForm: FormGroup;
    public profileForm: FormGroup;
    public projectForm: FormGroup;

    // projects array
    public projects;

    constructor(
        public httpService: HttpService,
        public formBuilder: FormBuilder,
        public customEventService: CustomEventService

    ) {

        this.profileForm = this.formBuilder.group({
            password: ['', Validators.compose([
                Validators.required  
            ])],
        });

        this.projectForm = this.formBuilder.group({
            name: ['',Validators.compose([
                Validators.required  
            ])],
            role: ['',Validators.compose([
                Validators.required  
            ])],
            link: ['',Validators.compose([
                Validators.required  
            ])],
            image: ['']
        });

        this.contactForm = this.formBuilder.group({
            name: ['',Validators.compose([
                Validators.required
            ])],
            email: ['',Validators.compose([
                Validators.required
            ])],
            subject: ['',Validators.compose([
                Validators.required
            ])],
            message: ['',Validators.compose([
                Validators.required
            ])]
        });

        
    }

    ngOnInit(): void {
        AOS.init();
        this.getTime();
        let pathname = window.location.pathname;
        let x = pathname.split('/');
        if(x[1] == 'projects'){
            this.active = 1;
        }
        setInterval(() => {
            this.pharesCount = this.pharesCount + 1;
            this.pharesDisplay = this.phares[this.pharesCount];
            if (this.pharesCount == this.phares.length - 1) {
                this.pharesCount = -1;
            }
        }, 2000);

        this.httpService.get('getProject').subscribe(res => {
            this.projects = res;
        });
        this.scrollToId(x[1]);
    }

    // later i will check
    // ngOnChange(changes: any){
    //     this.customEventService.subscribeEvent('menuButtonCliked', this.scrollToId.bind(this));
    // }

    scrollToId(id: string) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth" });
    }

    tab(e) {
        this.active = e;
    }

    visit(e) {
        window.open(e);
    }

    getTime() {
        var x = setInterval(() => {
            var oldDays = new Date('04-03-2021 24:00:00').getTime();
            var newDays = new Date().getTime();
            var resultDays = newDays - oldDays;
            var finalDay = resultDays / (1000 * 3600 * 24);
            var semifinalDay = finalDay.toFixed(0);

            var oldYear = new Date('04-03-2021 24:00:00').getFullYear();
            var newYear = new Date().getFullYear();
            var resultYear = (newYear - oldYear);
            this.yearInWords = resultYear <= 1 ? 'Year' : 'Years';

            var time = new Date();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            this.time = { year: resultYear, days: semifinalDay, hour: hours > 9 ? hours : '0' + hours, minutes: minutes > 9 ? minutes : '0' + minutes, seconds: seconds > 9 ? seconds : '0' + seconds };
        }, 1000)
    }

    onSubmit() {
        if(this.profileForm.value.password == 'HarshOnly'){
            this.locker = false;
        }else{
            this.toast = !this.toast;
            this.profileForm.reset();
            setTimeout(() =>{
                this.toast = !this.toast;
            },1000)
        }
    }

    conatctFormSubmit(){
        this.httpService.post('contact/send',this.contactForm.value).subscribe(res => {});
        this.contactForm.reset()
    }

    projectFormSubmit(){
        const formData = new FormData();
        formData.append('file', this.projectForm.get('images').value);
        this.httpService.post('addProject', formData).subscribe(res => {});
        // this.projectForm.reset()
    }

    OnImageUpload(event) {
        const files = event.target.files;
        if (files.length === 0)
          return;
        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
          this.userPicture = reader.result;
        }
        this.before = false;
    }

    removePicture(event){
        this.userPicture = null;
        this.before = true;
    }
}