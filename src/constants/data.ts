// src/constants/data.ts

import { ContentData } from './interfaces';

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
  require('../../assets/videos/videotest8.mp4'),
  require('../../assets/videos/videotest9.mp4'),
  require('../../assets/videos/videotest10.mp4'),
  require('../../assets/videos/videotest11.mp4'),
  require('../../assets/videos/videotest12.mp4'),
  require('../../assets/videos/videotest13.mp4')
];

/**
 * Datos de la superposición (overlay) para cada video.
 */
export const OVERLAY_DATA: ContentData[] = [
  {
    username: '@frieren_anime',
    description: 'Sisi, abuela, Himmel era todo un heroe, ya comase su avena.',
    likes: '120.5K',
    comments: '4.2K',
  },
  {
    username: '@himel_hero',
    description: 'Recuerdos del héroe Himmel. ¡Nunca olvidaremos al valiente grupo!',
    likes: '300K',
    comments: '8.1K',
  },
  {
    username: '@fern_magic',
    description: 'Fern, la aprendiz de Frieren, mostrando su poder. El futuro de la magia.',
    likes: '450.2K',
    comments: '15.5K',
  },
];