/**
 * Optimiza una URL de Cloudinary añadiendo transformaciones automáticas
 * @param {string} url   - URL original de Cloudinary
 * @param {number} width - Ancho deseado en px (default 800)
 * @returns {string}     - URL optimizada
 */
export function optimizeImage(url, width = 800) {
  if (!url || !url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
}