import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'app/interfaces/message';
import { MessageService } from 'app/services/message/message.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public message: Message;
  public array_message: Array<Message> = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("tableMessage") paginator: MatPaginator;
  public dataSource: MatTableDataSource<Message>;
  public displayedColumns: string[] = [
    "Nº",
    "Fecha",
    "Hora",
    "Email",
    "Nombre",
    "Teléfono",
    "Ver",
  ];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.message = {};
    this.getMessages();
  }

  public getMessages() {
    this.messageService.getMessages().pipe(take(1)).subscribe((messages) => {
      this.array_message = messages;
       this.dataSource = new MatTableDataSource<Message>(messages);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    })
  }

  /**
  * *** Function para filtar en data table ***
  * @param event
  */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public viewMessage(message: Message) {
    this.message = message;
  }

}
