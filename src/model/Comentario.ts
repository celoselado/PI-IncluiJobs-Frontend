import Postagem from './Postagem';
import Usuario from './Usuario';
export interface Comentario {
  id: number;
  texto: string;
  postagem?: Postagem | null;
  usuario?: Usuario | null
}