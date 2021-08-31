import { ApplicationRef, Component, OnInit } from '@angular/core';

import { SwUpdate, SwPush } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PWA-Project';
  private publicKey = "BOGJ3y09Gb2jQcvqHCsuj04AWombIIBiHceWkWMz_5n1kUPp0wmhwYkY7qdpSy3rpgUue8-wsOwzlY-msrXm8ME"
  constructor(private update: SwUpdate,
    private appRef: ApplicationRef,
    private toastr: ToastrService,
    private swPush: SwPush) { }

  ngOnInit() {

    // this.showSuccess();

    this.pushSubscription();

    this.swPush.messages.subscribe((message: any) => {
      let msg = message.notification.data;
      console.log('message------->>', msg);
      this.toastr.success(msg.title, msg.url);
    }
    );

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });

  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        // Make a post call to serve
        console.log(JSON.stringify(sub));
      })
      .catch((err) => console.log(err));
  }

}
