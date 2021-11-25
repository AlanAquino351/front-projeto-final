import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_tec = ''
  

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    idade: ''
  }

  constructor(
    private router : Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();


  }

  findById(): void {

    this.service.findById(this.id_tec).subscribe(resposta => {

      this.cliente = resposta;

    })
  }

  delete():void {
                        //id que passou na url
    this.service.delete(this.id_tec).subscribe(resposta => {

      this.router.navigate(['clientes'])
      this.service.message('Cliente deletato com sucesso!')

    }, err => {

      console.log(err)

    //  if(err.error.error.match('pussui Ordens de Serviço')) {

    //    this.service.message(err.error.error);
     
    // }
      
    })
  }

  cancel():void {
    this.router.navigate(['clientes'])
  }

}

