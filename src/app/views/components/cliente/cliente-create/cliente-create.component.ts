import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('',[Validators.minLength(5)])
  cpf = new FormControl('',[Validators.minLength(5)])
  telefone = new FormControl('',[Validators.minLength(5)])


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
      if (err.error.error.match('já cadastrado')) {
        console.log('Log', err.error.error);
        this.service.message(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.message(err.error.errors[0].message);
      }
    })
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 a 60 caracteres'
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O CPF deve ter entre 11 a 15 caracteres'
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O nome deve ter entre 11 a 18 caracteres'
    }
    return false;
  }
}
