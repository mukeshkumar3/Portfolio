import { Component, OnInit, HostListener } from '@angular/core';
import * as AOS from 'aos';
import { CustomEventService } from '../../services/custom-event.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public scrollValue:any;
    public mobile:boolean = window.innerWidth <= 900 ? true : false;
    public menuItems = ['contact','profile','projects'];

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.mobile = window.innerWidth <= 900 ? true : false;
    }

    constructor(
        public customEventService : CustomEventService
    ) {}

    ngOnInit(): void {
        AOS.init();
    }

    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll() {
        this.scrollValue = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    menuClicked(){
        this.scrollValue = 10;
    }

    menuItemClicked(e){
        this.customEventService.dispatchEvent('menuButtonCliked', { type:'clicked', value : e });
    }

}