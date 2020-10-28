import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DAMService } from 'src/app/Services/DAMService';
import { Message } from 'src/app/Models/Message';

@Component({
  selector: 'contact-board',
  templateUrl: './contact-board.component.html',
  styleUrls: ['./contact-board.component.css']
})
export class ContactBoardComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private damService: DAMService,
    private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      message: ''
    });

    this.damService.logIp("contactsspage").subscribe();
  }

  ngOnInit() {
  }

  sendMessage() {
    let message: Message = {
      email: this.contactForm.value.email,
      firstname: this.contactForm.value.firstname,
      lastname: this.contactForm.value.lastname,
      message: this.contactForm.value.message
    }

    this.damService.postMessage(message).subscribe();
    this.contactForm.reset();
  }
}
