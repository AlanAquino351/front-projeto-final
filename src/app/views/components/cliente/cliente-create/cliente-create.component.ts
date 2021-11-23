import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: 'Teste2 create',
    cpf: '856.768.050-64',
    telefone: '(00) 90000-4500'
  }

  constructor(
    private router : Router,
    private service: ClienteService) { }

  ngOnInit(): void {
    console.log('Init')
  }

  cancel():void {
    this.router.navigate(['clientes'])
  }

  create():void {
    console.log('Creating')
    this.service.create(this.cliente).subscribe((resposta) => {      
      this.router.navigate(['clientes'])
      this.service.message('Cliente cadastrado com Sucesso! :)')
    }, err => {
      console.log(err);

      console.log('Log', err.error.error);
      this.service.message(err.error.error);
    })
  }
}
