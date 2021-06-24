export interface Producto {
    total:     number;
    productos: ProductoElement[];
}

export interface ProductoElement {
    precio:     number;
    disponible?: boolean;
    descripcion: string;
    _id?:        string;
    nombre:     string;
    usuario?:    Categoria;
    categoria:  string | Categoria;
    img:       string;
}

export interface Categoria {
    _id:    string;
    nombre: string;
    usuario?: {
        _id: string,
        nombre: string
    }
}

export interface Categorias {
    total:     number;
    categorias: Categoria[];
}