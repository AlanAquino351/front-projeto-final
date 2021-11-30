import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cli = ''
  

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
  }

  nome = new FormControl('',[Validators.minLength(5)])
  cpf = new FormControl('',[Validators.minLength(11)])
  telefone = new FormControl('',[Validators.minLength(10)])
  dataNascimento = new FormControl('',[Validators.minLength(10)])

  constructor(
    private router : Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById();

  }

  update(): void {

    this.service.update(this.cliente).subscribe((resposta) => {

      this.router.navigate(['clientes'])
      this.service.message('Cliente atualizado com sucesso!')

    }, err => {
      if (err.error.error.match('já cadastrado')) {
        console.log('Log', err.error.error);
        this.service.message(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.message(err.error.errors[0].message);
      }
    })
  }

  findById(): void {

    this.service.findById(this.id_cli).subscribe(resposta => {

      this.cliente = resposta;

    })
  }

  cancel():void {
    this.router.navigate(['clientes'])
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return 'O campo deve ter no minimo 5 letras e não é permitido caracteres especiais'
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O campo deve ter 11 números'
    }
    return false;
  }

  errorValidDataNascimento() {
    if (this.dataNascimento.invalid) {
      return 'O campo deve ter 8 números'
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }
}
