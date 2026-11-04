import { product } from './product-config';

export default function LicenseOptions() {
  return <div className="info-price-grid" aria-label="桌面端授权方案">
    {product.desktopLicenses.map(option => <article className="info-price-card" key={option.id}>
      <span>{option.name}</span>
      <strong>{option.price}</strong>
      <p className="license-duration">{option.duration}</p>
      <p>{option.devices}</p>
      <a className="home-button-primary" href={option.purchaseUrl} target="_blank" rel="noreferrer">购买{option.name} <span aria-hidden="true">↗</span></a>
    </article>)}
  </div>;
}
