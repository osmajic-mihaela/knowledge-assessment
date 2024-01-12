import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "../../model/LoginRequest";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onLogin: EventEmitter<string> = new EventEmitter<string>();
  step = 0;
  rightActive:boolean = false
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  loginForm = new FormGroup({
    username: new FormControl<string | undefined>(undefined),
    password: new FormControl<string | undefined>(undefined)
  })

  constructor(private userService:UserService,private router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  activatePanel():void {
    this.rightActive = ! this.rightActive
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSignIn() {
    const user = new LoginRequest({
      username: this.loginForm.controls.username.value!,
      password: this.loginForm.controls.password.value!
    })

    this.userService.login(user).subscribe({
      next: response => {
        this.userService.saveCurrentLoggedUser(response)
        this.tokenStorage.saveToken(response.id);
        this.tokenStorage.saveUser(response);
        this.isLoggedIn = true
        //this.reloadPage();


        if(this.tokenStorage.getUser().role == "STUDENT") {
          this.router.navigate(['app-student-calendar']).then()
          this.onLogin.emit("STUDENT")
        }else {
          if(this.tokenStorage.getUser().role== "TEACHER"){
            this.router.navigate(['app-teacher-calendar']).then()
            this.onLogin.emit("TEACHER")
          }else{

          }
        }
      }
    })




  }
  reloadPage(){
    window.location.reload();
  }

  onSignUp() {

  }

  get passwordMatchError() {
    return (
        this.formGroup.getError('mismatch') &&
        this.formGroup.get('confirmPassword')?.touched
    );
  }

  formGroup = new FormGroup({
        name: new FormControl<string | undefined>(undefined,Validators.required),
        username:new FormControl<string | undefined>(undefined,Validators.required),
        surname:new FormControl<string | undefined>(undefined,Validators.required),
        password:new FormControl<string | undefined>(undefined,Validators.required),
        confirmPassword : new FormControl<string | undefined>(undefined,[Validators.required]),
        phone:new FormControl<string | undefined>(undefined,Validators.required),
        jmbg:new FormControl<string | undefined>(undefined,Validators.required),
        email:new FormControl<string | undefined>(undefined,[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]),
        gender: new FormControl<string | undefined>(undefined, Validators.required),
        role:new FormControl<string | undefined>("ROLE_CUSTOMER"),
        address: new FormGroup({
          city: new FormControl<string | undefined>(undefined,Validators.required),
          street: new FormControl<string | undefined>(undefined,Validators.required),
          country: new FormControl<string | undefined>(undefined,Validators.required),
          streetNumber:new FormControl<string | undefined>(undefined,Validators.required)
        }),
        profession: new FormGroup({
          professionStatus: new FormControl<string | undefined>(undefined,Validators.required),
          professionDescription: new FormControl<string | undefined>(undefined,Validators.required),
        })
      },
      //[CustomValidators.MatchValidator('password', 'confirmPassword')]
  );
}
