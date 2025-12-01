// src/constants/data.ts

import { ContentData } from './interfaces';


// Define la interfaz para los items de imagen
interface ImageItem {
  id: number;
  path: any;
}

/**
 * Lista de URIs para los videos. Usamos require() ya que son assets locales.
 */
export const VIDEOLIST: number[] = [
  require('../../assets/videos/videotest1.mp4'),
  require('../../assets/videos/videotest2.mp4'),
  require('../../assets/videos/videotest3.mp4'),
  require('../../assets/videos/videotest4.mp4'),
  require('../../assets/videos/videotest5.mp4'),
  require('../../assets/videos/videotest6.mp4'),
  require('../../assets/videos/videotest7.mp4'),
];

// Para React Native - usa require() para assets locales
export const imageList: ImageItem[] = [
  { 
    id: 1, 
    path: require('../../assets/images/PorfilePics/lebron-profile.png')
  },
  { 
    id: 2, 
    path: require('../../assets/images/PorfilePics/bochi-profile.png')
  },
  { 
    id: 3, 
    path: require('../../assets/images/PorfilePics/frieren-profile.png')
  },
  { 
    id: 4, 
    path: require('../../assets/images/PorfilePics/madeline-profile.png')
  },
  { 
    id: 5, 
    path: require('../../assets/images/PorfilePics/ricardo-profile.png')
  },
  { 
    id: 6, 
    path: require('../../assets/images/PorfilePics/rock-profile.png')
  }
];

/**
 * Datos de la superposición (overlay) para cada video.
 */
export const OVERLAY_DATA: ContentData[] = [
  {
    username: '@attack_fan',
    description: 'Levi limpiando todo a su paso. ¿Eres un titán? Lo siento, no hoy.',
    likes: '850K',
    comments: '32.7K',
  },
  {
    username: '@one_piece_news',
    description: 'Luffy usando el Gear 5 por primera vez. ¡El momento más esperado!',
    likes: '1.2M',
    comments: '65.4K',
  },
  {
    username: '@demon_slayer_off',
    description: 'Tanjiro vs Rui - La danza del dios del fuego nunca falla en emocionar.',
    likes: '720.3K',
    comments: '28.9K',
  },
  {
    username: '@jujutsu_kaisen',
    description: 'Goatjo despertando después del sello prisión. El regreso del más fuerte.',
    likes: '980K',
    comments: '41.2K',
  },
  {
    username: '@chainsaw_man',
    description: 'Denji transformándose en Chainsaw Man. ¡Qué manera de empezar un capítulo!',
    likes: '610.8K',
    comments: '22.1K',
  },
  {
    username: '@spy_x_family',
    description: 'Anyaconfusión al ver a Loid y Yor trabajando juntos. La familia perfecta.',
    likes: '550.5K',
    comments: '18.6K',
  },
  {
    username: '@blue_lock',
    description: 'Isagi decidiendo el partido con su visión directa. El ego gana partidos.',
    likes: '430.9K',
    comments: '16.8K',
  }
];