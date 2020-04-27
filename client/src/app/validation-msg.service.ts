import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationMsgService {
  public getValidationMsg(validationId: string):string{
    return this.errorMessages[validationId];
  }

  private errorMessages = {
    'name-required-msg': "Name is a required field",
    'name-minlenght-msg': "Name must have at least 5 characters",
    'name-maxlenght-msg': "Name can have maximum 20 characters",

    'password-required-msg': "Password is a required field",
    'password-minlenght-msg': "Password must have at least 5 characters",
    'password-maxlenght-msg': "Password can have maximum 20 characters",

    'email-required-msg': "Email is a required field",
    'email-email-msg': "Email is not in valid format"
  }
  constructor() { }
}
