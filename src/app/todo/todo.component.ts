import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', completed: false };
  todayDate: string = '';
  tasksInfo: string = '';

  ngOnInit(): void {
    this.getTasksLength();
  }



  addTask(): void {
    if (this.newTask.title && this.newTask.description) {
      this.newTask.id = new Date().getTime();
      this.tasks.push({ ...this.newTask });
      this.newTask = { id: 0, title: '', description: '', completed: false };
      this.getTasksLength();
    } else {
      alert('SVP veillez saisir tous les champs');
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.getTasksLength();
  }


  @Input() todo: any;
  @Input() checked: boolean = false;

  toggleCheck() {
    this.checked = !this.checked;
    let tache = document.getElementById('tache');
    if (this.checked) {
      tache?.classList.add('line-through');
      } else {
        tache?.classList.remove('line-through');
        }
  }
  getTasksLength(): void {
    const completedTasks = this.tasks.filter(task => task.completed);
    this.tasksInfo = `${this.tasks.length} Total, ${completedTasks.length} Complete,
     ${this.tasks.length - completedTasks.length} En attente`;
  }
}
