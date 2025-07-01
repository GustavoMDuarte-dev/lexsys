
export class Cliente {
    
    public id: number = 0;
    public nome: string = '';
    public email: string = '';
    public telefone: string = '';
    public status: string = '';
    public tags: string = '';

    constructor(obj?: Partial<Cliente>) {
        if (obj) {
           
            this.id = obj.id ?? this.id;
            this.nome = obj.nome ?? this.nome;
            this.email = obj.email ?? this.email;
            this.telefone = obj.telefone ?? this.telefone;
            this.status = obj.status ?? this.status;
            
            const tagsOriginais = obj.tags ?? '';
            this.tags = Array.isArray(tagsOriginais) ? tagsOriginais.join(',') : tagsOriginais;
        }
    }
}