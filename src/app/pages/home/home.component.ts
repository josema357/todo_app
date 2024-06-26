import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'create project',
      completed: false
    },
    {
      id: Date.now(),
      title: 'create components',
      completed: false
    }
  ])

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^(?!\s*$).+')
    ]
  });

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value;
      if(value.trim().length !== 0){
        this.addTask(value.trim());
      }
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position)=> position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index){
          return {
            ...task,
            completed: !task.completed
          }
        };
        return task;
      })
    })
  }

  editingtask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index){
          return {
            ...task,
            editing: true
          }
        };
        return {
          ...task,
          editing: false
        };
      })
    })
  }

  updateTasktext(index: number, event: Event){
    const input = event.target as HTMLInputElement;

    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        };
        return task;
      })
    })
  }
}
