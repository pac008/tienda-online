export interface Usuario {
    token: string;
    usuario: {
        correo: string;
        estado: boolean;
        google: boolean;
        img   : string;
        nombre: string;
        rol   : string;
        uid   : string;
    }
}