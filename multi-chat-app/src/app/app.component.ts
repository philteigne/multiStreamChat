import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentsTemp } from './commentplaceholder.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'multi-chat-app';

  channelsForm = new FormGroup({
    youtubeID: new FormControl(''),
    twitchID: new FormControl(''),
    googleAPIKey: new FormControl(''),
  });

  commentsTemp = inject(CommentsTemp)
  
  constructor() {
  }
  
  submitData() {
    this.commentsTemp.submitData(
      this.channelsForm.value.youtubeID ?? '',
      this.channelsForm.value.twitchID ?? '',
      this.channelsForm.value.googleAPIKey ?? '',
    )
  }
}
