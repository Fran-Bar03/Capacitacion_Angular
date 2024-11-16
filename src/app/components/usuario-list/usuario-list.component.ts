import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'; 
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CreateUserModel } from '../../models/user/createusuarios';
import { UserModel } from '../../models/user/user.model';
@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [ButtonModule, DropdownModule, DialogModule, TableModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-list.component.html',
  providers: [DialogService],
  animations:[
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms 0s ease-in')
      ]),
      transition(':leave', [
        animate('500ms 0s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ],
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent { 
  usuarios: UserModel[] = [];
  displayDialog: boolean = false;
  usuarioForm!: FormGroup;
  isEditing : boolean = false;

  constructor(private fb:FormBuilder , private usuarioservice : UsuarioService) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      idUsuario: [null],
      names: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loadUsuarios();
  }

  openDialog(user ?: any)  {
    this.displayDialog = true;
    this.isEditing = user;
    if(user){
      this.usuarioForm.patchValue({
        idUsuario: user.idUsuario,
        names: user.nombre,
        userName: user.usuario,
        password: ''
      });
    } else{
      this.usuarioForm.reset();
    }
  }



  loadUsuarios(){
    console.log("Metodo loadusers ");
    this.usuarioservice.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      console.log(this.usuarios);
  }
)};



  createUser( userData : UserModel){
    this.usuarioservice.createUser({
      names : userData.nombre,
      username : userData.usuario,
      password : userData.contrasena
    }).subscribe(()=> {

      this.loadUsuarios();
      this.displayDialog = false;
    })
  }



  updateUser(userData: UserModel) {
    this.usuarioservice.updateUser(userData.idUsuario, {
      names : userData.nombre,
      username : userData.usuario,
      password : userData.contrasena
    }).subscribe(() => {
      this.loadUsuarios();
      this.displayDialog = false;
    });
  }


  deleteUser(idUsuario: number) {
    this.usuarioservice.deleteUser(idUsuario).subscribe(()=> {
      this.loadUsuarios();
    });
  }

  
  saveUser() { 

    if(this.usuarioForm.valid) {
      const userData = this.usuarioForm.value;
  
      if(this.isEditing) {
        this.updateUser(userData);
      } else {
        this.createUser(userData);
      }
    }
  }




}
