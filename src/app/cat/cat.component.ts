import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {
  private rot: number;

  constructor() { }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    let eye = document.querySelectorAll('.cat-eye');
    eye.forEach((eye) => {
      let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
      let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      this.rot = (radian * (180 / Math.PI) * -1 + 230);
    })
  }

  ngOnInit(): void {

  }

  get transformStyle(): string {
    return "rotate(" + this.rot + "deg)";
  }
}
