import Tema from './Tema'
import Usuario from './Usuario';

interface Postagem{
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    privacidade: string;
    anexo: string;
    tema?: Tema|null
    // usuario?: Usuario|null
}

export default Postagem;