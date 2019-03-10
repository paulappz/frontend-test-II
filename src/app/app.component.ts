import { Component } from '@angular/core';
import { GiphyService } from './service/giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // declare and initialize variables
  public chat_msg: string;
  public chat_msgs: any[] = [];
  private gif_prefix = '@';
  public avatar: string = 'https://media.licdn.com/dms/image/C4E03AQElqDgrYQQK5Q/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=lHnQ5FJ140rXBzVGtNwz6bwjIwzGACAGRzqvfFaei_M'

  constructor(private giphyService: GiphyService) { }

  title = 'giphy-api';

  // method to check if git is been needed
  public isGifAdded() {
    if (this.chat_msg) {
      //check if message has the gif prefix @
      if (this.chat_msg.includes(`${this.gif_prefix}`)) {
        // strip message of git prefix @
        const search_string = this.chat_msg.split(`${this.gif_prefix}`)[1];
        // console.log(search_string)
        // call getGif method to seearch for gif string
        this.getGif(search_string);
      } else {
        // if message has no gif prefix @ push to message array
        this.chat_msgs.push({
          text: this.chat_msg.split(`${this.gif_prefix}`).join(''),
          gif: '',
          time: this.getTime(),
          avatar: this.avatar
        });
        // reset input area
        this.clearInputarea();
      }
    }
  }

  private getGif(search_term) {
    // call giphy api service
    this.giphyService.getGiphyGif(search_term).subscribe(
      (res) => {
        this.chat_msgs.push({
          text: this.chat_msg.split(`${this.gif_prefix}`).join(''),
          gif: res['data'].images.original.url,
          time: this.getTime(),
          avatar: this.avatar
        });
        this.clearInputarea();
      }, (err) => {
      });
  }


  // method to realtime chat is sent
  private getTime() {
    let date = new Date();
    let hour = date.getHours() - (date.getHours() >= 12 ? 12 : 0);
    let period = date.getHours() >= 12 ? 'PM' : 'AM';
    return hour + ':' + date.getMinutes() + ' ' + period + ', Today';
  }

  private clearInputarea() {
    this.chat_msg = '';
    const lists = document.getElementsByTagName('li');
    setTimeout(() => lists[lists.length - 1].scrollIntoView({ behavior: 'smooth' }), 0);
  }
}



