
export interface TarjetaDeck {
        id: string;
        nombre: string;
        empresa: string;
        cargo: string;
        logo: string;
}


export interface Tarjeta {
        id: Object;
        nombre: string;
        empresa: string;
        cargo: string;
        logo: string;
        foto: string;
        facebook: string;
        generalRate: number;
        twit: string;
        privade: boolean;
        telefono: string;
        www: string;
        ciudad: string;
        tags: [string];
        email: string;
        qr: string;
        geopoint: Object;
        twiter: string;
        direccion: string;
        instagram: string;
}
