import { Link } from 'react-router-dom'
import './SectorsList.css'

function SectorsList() {
  const sectors = [
    {
      title: 'Restaurantes y Cafeterías',
      description: 'Soluciones digitales completas para restaurantes, bares y cafeterías para atraer más clientes.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
      features: [
        'Reservas online',
        'Menú digital',
        'Gestión de pedidos',
        'Sistema de reserva de mesas',
        'Reseñas de clientes',
        'Integración con redes sociales'
      ],
      buttonColor: 'orange'
    },
    {
      title: 'Pequeños Negocios',
      description: 'Webs asequibles y efectivas para pequeñas y medianas empresas que quieren crecer.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
      features: [
        'Diseño profesional',
        'Formularios de contacto',
        'Presentación de servicios',
        'Testimonios de clientes',
        'Mapa de ubicación',
        'Diseño responsive'
      ],
      buttonColor: 'purple'
    },
    {
      title: 'Tiendas y Comercio',
      description: 'Tiendas online y plataformas e-commerce para vender tus productos globalmente.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
      features: [
        'Carrito de compra',
        'Pasarela de pago',
        'Catálogo de productos',
        'Gestión de inventario',
        'Integración de envíos',
        'Cuentas de clientes'
      ],
      buttonColor: 'pink'
    },
    {
      title: 'Gimnasios y Fitness',
      description: 'Webs modernas para gimnasios, estudios de yoga y centros de fitness para aumentar socios.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
      features: [
        'Horario de clases',
        'Planes de membresía',
        'Perfiles de entrenadores',
        'Reservas online',
        'Seguimiento de progreso',
        'Blog de nutrición'
      ],
      buttonColor: 'blue'
    }
  ]

  return (
    <section className="sectors-list-section">
      <div className="sectors-list-container">
        {sectors.map((sector, index) => (
          <div
            key={index}
            className={`sector-item ${index % 2 === 1 ? 'sector-item-reverse' : ''}`}
          >
            <div className="sector-image-container">
              <img
                src={sector.image}
                alt={sector.title}
                className="sector-image"
              />
            </div>
            <div className="sector-content">
              <h2 className="sector-title">{sector.title}</h2>
              <p className="sector-description">{sector.description}</p>
              <ul className="sector-features">
                {sector.features.map((feature, idx) => (
                  <li key={idx} className="sector-feature-item">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="8" stroke="#10b981" strokeWidth="2"/>
                      <path d="M5 9L8 12L13 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/portfolio"
                className={`sector-button sector-button-${sector.buttonColor}`}
              >
                Ver Proyectos Realizados
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectorsList
