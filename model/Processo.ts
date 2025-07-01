// model/Processo.ts
export class Processo {
    public id: number = 0;
    public numero: string = '';
    public cliente: string = ''; 
    public status: string = '';
    public proximoPrazo: string = '';
    public ultimaMovimentacao: string = '';

    constructor(obj?: Partial<Processo>) {
        if (obj) {
            this.id = obj.id ?? this.id;
            this.numero = obj.numero ?? this.numero;
            this.cliente = obj.cliente ?? this.cliente;
            this.status = obj.status ?? this.status;
            this.proximoPrazo = obj.proximoPrazo ?? this.proximoPrazo;
            this.ultimaMovimentacao = obj.ultimaMovimentacao ?? this.ultimaMovimentacao;
        }
    }
}