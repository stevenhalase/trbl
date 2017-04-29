import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {
  
  constructor() { 
    this.initVideo().then(() => {
      $('video').css({'object-fit': 'cover'})
    })
  }

  ngOnInit() {
  }

  initVideo(): Promise<any> {
    return new Promise((resolve,reject) => {
        this.waitForEl('.heropanel--video', () => {
          $('.heropanel--video').vide({
            mp4: '../../../assets/Walking-Heads',
            poster: '../../../assets/Walking-Heads'
          }, {
            posterType: 'jpg', 
            loop: true, 
            muted: true, 
            position: '0% 0%'
          })
          resolve();
        })
    })
  }


  waitForEl(selector, callback) {
    if ($(selector).length) {
      callback();
    } else {
      setTimeout(() => {
        this.waitForEl(selector, callback);
      }, 10);
    }
  };

}
