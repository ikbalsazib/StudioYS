import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from 'src/datas';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements AfterViewInit, OnInit {

  videos: Array<{title: string, description: string, category: string, videoLink: string, _id: string, __v: number}> = [];

  showOverlay = false;
  currentVideo: any = null;

  constructor(private elRef: ElementRef, private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get(`${backUrl}projects`).subscribe((paisi: any) => {
        console.log(paisi);
        this.videos = paisi
      })
  }

  ngAfterViewInit() {
    this.makeDraggable();
  }

  makeDraggable() {
    const slider = this.elRef.nativeElement.querySelector('.carousel-container');
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    slider.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  hoverPlay(videoElement: HTMLVideoElement) {
    videoElement.muted = true; // Adding mute property
    videoElement.play();
  }

  hoverPause(videoElement: HTMLVideoElement) {
    videoElement.pause();
  }

  openOverlay(video: any) {
    this.showOverlay = true;
    this.currentVideo = video;
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  
}
