import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'; 
import { TareaService } from '../../services/tarea/tarea.service';
import { TareaModel } from '../../models/tarea/tarea.model';
import { UserModel } from '../../models/user/user.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [ButtonModule, DropdownModule, DialogModule, TableModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tarea-list.component.html',
  animations: [
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
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent {
  tareas: TareaModel[] = [];
  displayDialog: boolean = false;
  tareaForm!: FormGroup;
  usuarios: UserModel[] = [];
  isEditing : boolean = false;

  constructor(private fb: FormBuilder, private tareaService: TareaService, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.tareaForm = this.fb.group({
      idTarea: [null], //campo oculto para el ID
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      completada: [false],
      usuarioo: [null, Validators.required],
    });

    this.loadTareas();
    this.loadUsuarios();
  }

  loadTareas() {
    console.log("Metodo loadtareas ");
    this.tareaService.getTareas().subscribe((data) => {
      this.tareas = data;
      console.log(this.tareas);
    });
  }

  loadUsuarios(){
    console.log("Metodo loadtareas ");
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      console.log(this.usuarios);
  }
)};

  openDialog(tarea ?: any)  {
    this.displayDialog = true;
    this.isEditing = tarea;
    if(tarea){
      this.tareaForm.patchValue(tarea);
    } else{
      this.tareaForm.reset();
    }
  }

saveTarea() { 

  if(this.tareaForm.valid) {
    const tareeData = this.tareaForm.value;

    if(this.isEditing) {
      this.updateTarea(tareeData);
    } else {
      this.createTarea(tareeData);
    }
  }
}

  createTarea(tareeData:any){
    this.tareaService.createTareas({
      tarea: tareeData.tarea,
      descripcion : tareeData.descripcion,
      idUsuario : tareeData.usuarioo?.idUsuario
    }).subscribe(()=> {
      this.loadTareas();
      this.displayDialog = false;
    })
  }



  updateTarea(tareaData: any) {
    this.tareaService.updateTareas(tareaData.idTarea, {
      tarea : tareaData.tarea,
      descripcion: tareaData.descripcion,
    }).subscribe(() => {
      this.loadTareas();
      this.displayDialog = false;
    });
  }


deleteTarea(id: number) {
  this.tareaService.deleteTarea(id).subscribe(()=> {
    this.loadTareas();
  });
}



  finishTarea(tarea: any){
    tarea.completada = !tarea.completada;
    this.tareaService.finishTarea(tarea.idTarea).subscribe(()=> {
      this.loadTareas();
    });
  }
}
