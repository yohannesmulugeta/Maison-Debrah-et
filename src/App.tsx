import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { categories, categoryName, productCategory, productsInCategory, topCategories, type Product } from './data/catalog'

const asset = (src: string) => src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src

const reference = (name: string) => asset(`/images/reference-home/${name}`)
const brochureUrl = 'https://online.flippingbook.com/view/1004331464/'
type Cart = Record<string, number>
function loadCart(): Cart {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('maison-debrah-cart') || '{}')
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {}
    return Object.fromEntries(Object.entries(saved).filter(([slug, quantity]) => slug.length > 0 && typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0).map(([slug, quantity]) => [slug, Math.min(99, quantity as number)]))
  } catch { return {} }
}

const menuGroups = [
  { label: 'Furniture', to: '/collection/meubilair', items: [
    ['Sofas & sectionals', 'banken-hoekbanken'], ['Armchairs & statement chairs', 'fauteuils-statement-stoelen'],
    ['Dining chairs & stools', 'eetkamerstoelen-barkrukken'], ['Dining tables', 'eetkamertafels'],
    ['Coffee tables', 'salontafels'], ['Side tables', 'bijzettafels'], ['Console tables', 'consoletafels'],
    ['Reception desks', 'balietafels'], ['Desks', 'bureaus'], ['Chests & bedside tables', 'commodes-nachtkastjes'],
    ['Sideboards', 'dressoires'], ['Consoles', 'consoles'], ['Bookcases & shelving', 'boekenkasten-planken'],
    ['Beds & headboards', 'bedden-hoofdborden'], ['TV cabinets', 'tv-meubels'], ['Pedestals', 'pilaren'],
  ].map(([label, slug]) => ({ label, to: `/collection/${slug}` })) },
  { label: 'Lighting', to: '/collection/verlichting', items: [
    ['Pendants & chandeliers', 'hanglampen-kroonluchters'], ['Ceiling lights', 'plafonnieres'],
    ['Table lamps', 'tafellampen'], ['Wall lamps', 'wandlampen'], ['Floor lamps', 'staande-lampen'],
  ].map(([label, slug]) => ({ label, to: `/collection/${slug}` })) },
  { label: 'Decoration', to: '/collection/decoratie', items: [
    ['Mirrors', 'spiegels'], ['Wall decoration', 'wanddecoratie'], ['Vases & planters', 'vazen-en-plantenbakken'],
  ].map(([label, slug]) => ({ label, to: `/collection/${slug}` })) },
  { label: 'Projects', to: '/projects', items: [
    { label: 'Interior projects', to: '/projects' }, { label: 'Hospitality', to: '/hospitality' }, { label: 'Home interiors', to: '/home-interiors' },
  ] },
  { label: 'About us', to: '/about', items: [{ label: 'Maison Debrah', to: '/about' }] },
  { label: 'Contact', to: '/contact', items: [
    { label: 'Customer service', to: '/customer-service' }, { label: 'Frequently asked questions', to: '/faq' },
  ] },
]

function Icon({ name }: { name: 'search' | 'account' | 'cart' }) {
  if (name === 'search') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.8" /><path d="m16 16 5 5" /></svg>
  if (name === 'account') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.3" /><path d="M4.5 21v-2.2a7.5 7.5 0 0 1 15 0V21" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h2l2.1 12.5h13.1l2-9.5H5" /><circle cx="8" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
}

function ProductImage({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>()
  if (!src || failedSrc === src) return <div className={`image-fallback ${className}`} role="img" aria-label={`${alt} image unavailable`}>Image unavailable</div>
  return <img className={className} src={asset(src)} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} />
}

function Header({ count }: { count: number }) {
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navigate = useNavigate()
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpenMenu(null)
    const query = String(new FormData(event.currentTarget).get('q') || '').trim()
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop')
  }
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <div className="header-top">
        <form className="header-search" role="search" onSubmit={search}><Icon name="search" /><input name="q" type="search" placeholder="Search for a product" aria-label="Search for a product" /><button type="submit" aria-label="Search products"><Icon name="search" /></button></form>
        <Link className="brand" to="/" aria-label="Maison Debrah home"><img src={reference('MAISON_DEBRAH_LOGO_POS_RGB.svg')} alt="Maison Debrah" /></Link>
        <div className="header-actions"><Link to="/account" aria-label="My account"><Icon name="account" /></Link><Link to="/cart" aria-label={`Cart, ${count} items`}><Icon name="cart" />{count > 0 && <span className="cart-count">{count}</span>}</Link><button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button></div>
      </div>
      <nav className="desktop-nav" aria-label="Main navigation" onClick={(event) => { if ((event.target as Element).closest('a')) setOpenMenu(null) }}>
        <NavLink to="/" end>Home</NavLink>
        {menuGroups.slice(0, 5).map((group) => <div className="nav-menu" data-open={openMenu === group.label} key={group.label}><div className="nav-menu-trigger"><NavLink to={group.to}>{group.label}</NavLink><button type="button" aria-label={`Open ${group.label} menu`} aria-expanded={openMenu === group.label} onClick={() => setOpenMenu(openMenu === group.label ? null : group.label)}>⌄</button></div><div className="nav-dropdown"><Link to={group.to}>View all {group.label.toLowerCase()}</Link>{group.items.map((item) => <Link key={`${group.label}-${item.to}`} to={item.to}>{item.label}</Link>)}</div></div>)}
        <a href={brochureUrl} target="_blank" rel="noreferrer">Brochure</a>
        <div className="nav-menu" data-open={openMenu === 'Contact'}><div className="nav-menu-trigger"><NavLink to="/contact">Contact</NavLink><button type="button" aria-label="Open Contact menu" aria-expanded={openMenu === 'Contact'} onClick={() => setOpenMenu(openMenu === 'Contact' ? null : 'Contact')}>⌄</button></div><div className="nav-dropdown"><Link to="/contact">Contact</Link>{menuGroups[5].items.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div></div>
      </nav>
      {open && <div className="mobile-shade" onClick={() => setOpen(false)}><nav className="mobile-nav" aria-label="Mobile navigation" onClick={(event) => { if ((event.target as Element).closest('a')) setOpen(false); event.stopPropagation() }}><div className="mobile-top"><strong>Maison Debrah</strong><button type="button" onClick={() => setOpen(false)} aria-label="Close menu">×</button></div><Link to="/">Home</Link>{menuGroups.map((group) => <details key={group.label}><summary>{group.label}</summary><Link to={group.to}>View all {group.label.toLowerCase()}</Link>{group.items.map((item) => <Link to={item.to} key={`${group.label}-${item.to}`}>{item.label}</Link>)}</details>)}<a href={brochureUrl} target="_blank" rel="noreferrer">Brochure</a><Link to="/account">My account</Link><Link to="/cart">Cart ({count})</Link></nav></div>}
    </header>
  </>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-columns">
    <section><h2>Customer service</h2><Link to="/faq">Frequently asked questions</Link><Link to="/contact">Contact us</Link><Link to="/shipping">Ordering & shipping</Link><Link to="/returns">Returns</Link><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms & conditions</Link></section>
    <section><h2>Collection</h2><Link to="/collection/banken-hoekbanken">Sofas</Link><Link to="/collection/fauteuils-statement-stoelen">Chairs</Link><Link to="/collection/verlichting">Lighting</Link><Link to="/collection/eetkamertafels">Dining rooms</Link><Link to="/collection/dressoires">Cabinets</Link><Link to="/collection/salontafels">Coffee tables</Link><Link to="/collection/bedden-hoofdborden">Beds</Link><Link to="/collection/bedden-hoofdborden">Bed textiles</Link></section>
    <section><h2>Contact</h2><Link to="/catalogue-request">Request catalogue</Link><Link to="/design-consult">Design consultation</Link></section>
    <section><h2>Showroom</h2><p>Maison Debrah<br />Dorpsstraat 74<br />3641 ED Mijdrecht<br />Netherlands</p><div className="footer-social"><a href="https://www.instagram.com/maisondebrah_nl/" aria-label="Instagram">◎</a><a href="https://www.youtube.com/@MaisonDebrah" aria-label="YouTube">▶</a><a href="https://www.linkedin.com/in/maisondebrah/" aria-label="LinkedIn">in</a></div></section>
    <section><h2>Opening hours</h2><p>Monday: closed<br />Tuesday: 10:00 – 17:30<br />Wednesday: 10:00 – 17:30<br />Thursday: 10:00 – 17:30<br />Friday: 10:00 – 17:30<br />Saturday: 10:00 – 17:00<br />Sunday: closed</p></section>
  </div><div className="footer-bottom"><p>© Copyright · 2026 · Maison Debrah NL · Depuis 1996 · All rights reserved</p><p>Discover the world of Maison Debrah. Luxury designer furniture, lighting and home accessories for exceptional interiors. Visit our showroom or request a design consultation.</p></div></footer>
}

function ProductCard({ product, image, promo = false }: { product: Product; image?: string; promo?: boolean }) {
  return <Link className={promo ? 'product-card promo-card' : 'product-card'} to={`/product/${product.slug}`}><div className="product-image"><ProductImage src={image || product.images[0]?.thumbnail || product.images[0]?.src} alt={product.name} /></div><h3>{product.name}</h3>{!promo && <span className="product-category">{productCategory(product)}</span>}</Link>
}

const featuredImages: Record<string, string> = {
  caslen: 'Caslen-600x600.png', ravlen: 'Ravlen-600x600.png', savel: 'Savel-1-600x600.png',
  marenza: 'Marenza-1-600x600.png', orvella: 'Orvella-600x600.png', 'vin-gris': 'Vin-Gris-600x600.png',
  chasson: 'Chasson-600x600.png', 'arvis-2': 'Arvis-600x600.png',
}
const chairImages: Record<string, string> = {
  falion: 'RC25203-1200x1200-1-400x400.jpg', aloura: 'DC231221-1-400x400.jpg',
  avelisse: 'DC242431-1-400x400.jpg', cerlin: 'DC25039-B-2572-1200x1200-1-400x400.jpg',
  elowen: 'ADC200451-400x400.jpg',
}

function Home({ products }: { products: Product[] }) {
  const featured = ['caslen', 'ravlen', 'savel', 'marenza', 'orvella', 'vin-gris', 'chasson', 'arvis-2'].map((slug) => products.find((item) => item.slug === slug)).filter((item): item is Product => Boolean(item))
  const chairs = ['falion', 'aloura', 'avelisse', 'cerlin', 'elowen'].map((slug) => products.find((item) => item.slug === slug)).filter((item): item is Product => Boolean(item))
  const [newsletterStatus, setNewsletterStatus] = useState('')
  return <main id="main-content">
    <section className="reference-hero" style={{ backgroundImage: `linear-gradient(100deg,rgba(42,53,47,.4) 30%,rgba(102,93,86,.1)),url(${reference('DSCF7872.jpg')})` }}><div><h1>View the Autumn Collection 2026</h1><Link className="reference-button" to="/shop">Shop now <span aria-hidden="true">→</span></Link></div></section>
    <section className="reference-editorials" aria-label="Featured collections"><Link to="/collection/verlichting" style={{ backgroundImage: `linear-gradient(100deg,rgba(42,53,47,.4),rgba(102,93,86,.1)),url(${reference('4.jpg')})` }}><span>Create an interior with character</span><h2>Discover the lighting collection</h2><b>Discover →</b></Link><Link to="/collection/banken-hoekbanken" style={{ backgroundImage: `linear-gradient(100deg,rgba(42,53,47,.4),rgba(102,93,86,.1)),url(${reference('7.jpg')})` }}><span>The heart of your interior</span><h2>Explore sofas and sectionals</h2><b>View →</b></Link></section>
    <section className="reference-featured"><h2>New & popular</h2><div className="reference-featured-grid">{featured.map((product) => <ProductCard key={product.id} product={product} image={reference(featuredImages[product.slug])} promo />)}</div></section>
    <section className="reference-banner" style={{ backgroundImage: `linear-gradient(100deg,rgba(42,53,47,.4),rgba(102,93,86,.1)),url(${reference('maison-1.jpg')})` }}><div><span>Learn more about Maison Debrah</span><h2>Request the catalogue</h2><Link className="reference-button" to="/catalogue-request">View <span aria-hidden="true">→</span></Link></div></section>
    <section className="reference-chairs"><div className="reference-section-heading"><h2>Armchairs</h2><Link to="/collection/fauteuils-statement-stoelen">View more armchairs &gt;&gt;&gt;</Link></div><div className="reference-chair-grid">{chairs.map((product) => <ProductCard key={product.id} product={product} image={reference(chairImages[product.slug])} promo />)}</div></section>
    <section className="reference-callouts"><a href="mailto:info@maisondebrah.nl?subject=Visit%20the%20showroom" style={{ backgroundImage: `linear-gradient(100deg,rgba(42,53,47,.4),rgba(102,93,86,.1)),url(${reference('10.jpg')})` }}><span>Experience the world of Maison Debrah</span><h2>Visit the showroom</h2><b>Visit →</b></a><Link to="/design-consult" style={{ backgroundImage: `linear-gradient(100deg,rgba(42,53,47,.4),rgba(102,93,86,.1)),url(${reference('11.jpg')})` }}><span>Bring your interior vision to life</span><h2>Request a design consultation</h2><b>Request →</b></Link></section>
    <section className="reference-newsletter" style={{ backgroundImage: `linear-gradient(100deg,rgba(42,53,47,.5),rgba(42,53,47,.2)),url(${reference('DSCF2467-1.jpg')})` }}><div><span>Stay up to date with Maison Debrah</span><h2>Sign up for the newsletter</h2></div><form onSubmit={(event) => { event.preventDefault(); setNewsletterStatus('Newsletter delivery is not connected to this preview.') }}><input type="email" required aria-label="Email address" placeholder="Email address *" /><p>(*) This field is required. Only forms with all required fields can be processed.</p><button className="reference-button" type="submit">Sign up</button>{newsletterStatus && <p role="status">{newsletterStatus}</p>}</form></section>
  </main>
}

function Catalog({ products }: { products: Product[] }) {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const selected = categories.find((category) => category.slug === slug)
  const query = (params.get('q') || '').trim().toLowerCase()
  const sort = params.get('sort') || 'featured'
  const page = Math.max(1, Number(params.get('page') || '1') || 1)
  const filtered = useMemo(() => {
    const base = slug ? productsInCategory(products, slug) : products
    const result = base.filter((product) => !query || `${product.name} ${product.sku} ${product.categories.map((item) => categoryName(item.slug, item.name)).join(' ')}`.toLowerCase().includes(query))
    if (sort === 'name') return result.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'name-desc') return result.sort((a, b) => b.name.localeCompare(a.name))
    return result
  }, [products, slug, query, sort])
  const pageSize = 24
  const pageCount = Math.ceil(filtered.length / pageSize)
  const shown = filtered.slice((Math.min(page, Math.max(pageCount, 1)) - 1) * pageSize, Math.min(page, Math.max(pageCount, 1)) * pageSize)
  const update = (key: string, value: string) => { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); if (key !== 'page') next.delete('page'); setParams(next) }
  return <main className="catalog-page"><div className="page-intro"><span className="eyebrow">Maison Debrah collection</span><h1>{selected ? categoryName(selected.slug, selected.name) : 'Explore the collection'}</h1><p>Browse the reference collection. Product availability and prices for Ethiopia have not been confirmed.</p></div><div className="catalog-layout"><aside className="catalog-sidebar" aria-label="Product categories"><h2>Categories</h2><Link className={!slug ? 'current' : ''} to="/shop">All products <span>{products.length}</span></Link>{topCategories.map((category) => <div className="sidebar-group" key={category.id}><Link className={slug === category.slug ? 'current' : ''} to={`/collection/${category.slug}`}>{categoryName(category.slug)}</Link>{categories.filter((item) => item.parent === category.id).map((item) => <Link className={`sidebar-child ${slug === item.slug ? 'current' : ''}`} to={`/collection/${item.slug}`} key={item.id}>{categoryName(item.slug, item.name)}</Link>)}</div>)}</aside><div className="catalog-main"><div className="catalog-tools"><form key={params.get('q') || ''} onSubmit={(event) => { event.preventDefault(); update('q', String(new FormData(event.currentTarget).get('q') || '').trim()) }}><label htmlFor="product-search">Search products</label><div className="search-row"><input id="product-search" name="q" type="search" defaultValue={params.get('q') || ''} placeholder="Search by product or code" /><button type="submit" aria-label="Search products">Search</button></div></form><label className="sort-control">Sort by <select value={sort} onChange={(event) => update('sort', event.target.value)}><option value="featured">Featured</option><option value="name">Name A–Z</option><option value="name-desc">Name Z–A</option></select></label></div><p className="result-count">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}{query && <> matching “{params.get('q')}”</>}</p>{shown.length ? <div className="product-grid catalog-products">{shown.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="empty-state"><h2>No products found</h2><p>Try another name or category.</p><Link to="/shop">View all products</Link></div>}{pageCount > 1 && <nav className="pagination" aria-label="Product pages">{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} type="button" aria-label={`Page ${number}`} aria-current={number === page ? 'page' : undefined} onClick={() => update('page', String(number))}>{number}</button>)}</nav>}</div></div></main>
}

function ProductPage({ products, addToCart }: { products: Product[]; addToCart: (slug: string, quantity: number) => void }) {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  if (!product) return <NotFound />
  return <ProductDetails key={product.slug} product={product} products={products} addToCart={addToCart} />
}

function ProductDetails({ product, products, addToCart }: { product: Product; products: Product[]; addToCart: (slug: string, quantity: number) => void }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const category = product.categories[0]
  const related = products.filter((item) => item.id !== product.id && item.categories.some((cat) => product.categories.some((current) => current.id === cat.id))).slice(0, 4)
  return <main id="main-content" className="product-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link>{category && <><span>/</span><Link to={`/collection/${category.slug}`}>{productCategory(product)}</Link></>}<span>/</span><span>{product.name}</span></nav><div className="product-detail"><div className="product-gallery"><div className="main-product-image"><ProductImage src={product.images[imageIndex]?.src || product.images[0]?.src} alt={`${product.name} view ${imageIndex + 1}`} /></div>{product.images.length > 1 && <div className="thumbnails">{product.images.map((image, index) => <button type="button" key={image.src} className={index === imageIndex ? 'selected' : ''} onClick={() => setImageIndex(index)} aria-label={`Show ${product.name} image ${index + 1}`}><ProductImage src={image.thumbnail} alt="" /></button>)}</div>}</div><div className="product-info"><h1>{product.name}</h1>{product.sku && <p className="sku">SKU: {product.sku}</p>}{product.summary && <p className="product-summary">{product.summary}</p>}{product.dimensions && product.dimensions !== 'N/A' && <p>Dimensions: {product.dimensions}</p>}{product.attributes.map((attribute) => <p key={attribute.name}>{attribute.name}: {attribute.terms.join(', ')}</p>)}<div className="add-cart"><label htmlFor="product-quantity">Quantity</label><input id="product-quantity" type="number" min="1" max="99" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))} /><button className="reference-button" type="button" onClick={() => { addToCart(product.slug, quantity); setAdded(true) }}>Add to cart</button></div>{added && <p role="status" className="added-message">Added to your cart. <Link to="/cart">View cart →</Link></p>}<p className="commerce-note">This preview keeps a cart in your browser. Checkout and payment are not connected.</p></div></div><section className="product-description"><h2>Description</h2><p>{product.description || product.summary || 'No description is available for this product.'}</p></section>{related.length > 0 && <section className="related-products"><h2>Related products</h2><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</main>
}

function About() { return <StandardPage title="About Maison Debrah" image="maison-1.jpg"><h2>Discover the world of Maison Debrah</h2><p>Maison Debrah presents luxury furniture, lighting and decoration for distinctive interiors.</p><Link className="reference-button" to="/shop">Explore the collection</Link></StandardPage> }
function Projects() { return <StandardPage title="Interior projects"><div className="page-image"><img src={asset('/images/editorial-4.jpg')} alt="Interior featuring Maison Debrah furniture" /></div><h2>Interior projects</h2><p>Project details from the reference site have not yet been captured for this preview.</p><Link className="reference-button" to="/hospitality">Explore hospitality</Link></StandardPage> }
function Contact() { return <StandardPage title="Contact"><h2>Contact Maison Debrah</h2><p>Netherlands showroom: Dorpsstraat 74, 3641 ED Mijdrecht.</p><PreviewForm kind="contact" /></StandardPage> }

function StandardPage({ title, children, image }: { title: string; children: React.ReactNode; image?: string }) {
  return <main id="main-content" className="standard-page"><div className="page-heading"><p><Link to="/">Home</Link> / {title}</p><h1>{title}</h1></div>{image && <div className="page-image"><img src={reference(image)} alt="Maison Debrah interior" /></div>}<div className="page-body">{children}</div></main>
}

function PreviewForm({ kind }: { kind: 'contact' | 'catalogue' | 'consult' }) {
  const [status, setStatus] = useState('')
  return <form className="reference-form" onSubmit={(event) => { event.preventDefault(); setStatus('This form is a preview. No information was sent.') }}><div className="form-pair"><label>First name *<input name="firstName" required /></label><label>Last name *<input name="lastName" required /></label></div><div className="form-pair"><label>Email address *<input name="email" type="email" required /></label><label>Telephone<input name="phone" type="tel" /></label></div><label>Message *<textarea name="message" rows={5} required /></label><button className="reference-button" type="submit">{kind === 'catalogue' ? 'Request catalogue' : kind === 'consult' ? 'Request consultation' : 'Send message'}</button>{status && <p role="status">{status}</p>}</form>
}

function CartPage({ products, cart, setCart }: { products: Product[]; cart: Cart; setCart: (cart: Cart) => void }) {
  const items = products.filter((product) => cart[product.slug] > 0)
  const update = (slug: string, amount: number) => { const next = { ...cart }; if (amount <= 0) delete next[slug]; else next[slug] = Math.min(99, amount); setCart(next) }
  return <StandardPage title="Your cart">{items.length ? <><div className="cart-table">{items.map((product) => <div className="cart-line" key={product.slug}><ProductImage src={product.images[0]?.thumbnail} alt={product.name} /><Link to={`/product/${product.slug}`}>{product.name}</Link><label>Quantity <input type="number" min="1" max="99" value={cart[product.slug]} onChange={(event) => update(product.slug, Number(event.target.value) || 1)} /></label><button type="button" onClick={() => update(product.slug, 0)} aria-label={`Remove ${product.name}`}>×</button></div>)}</div><div className="cart-actions"><Link className="reference-button" to="/shop">Continue shopping</Link><Link className="reference-button" to="/checkout">Proceed to checkout</Link></div><p className="commerce-note">Items stay in this browser only. Prices and checkout are not connected to an ordering service.</p></> : <div className="empty-state"><p>Your cart is currently empty.</p><Link className="reference-button" to="/shop">Return to shop</Link></div>}</StandardPage>
}

function AccountPage() { return <StandardPage title="My account"><div className="account-columns"><section><h2>Login</h2><label>Username or email address *<input type="text" /></label><label>Password *<input type="password" /></label><button className="reference-button" type="button" disabled>Log in</button><p>Account access is not connected to this React preview.</p></section><section><h2>Register</h2><label>Email address *<input type="email" /></label><button className="reference-button" type="button" disabled>Register</button><p>Registration needs the approved account service and access rules.</p></section></div></StandardPage> }
function CheckoutPage() { return <StandardPage title="Checkout"><p>Your cart is available for review, but checkout and payment are not connected to this preview.</p><Link className="reference-button" to="/cart">Return to cart</Link></StandardPage> }

function ReferenceContentPage({ type }: { type: string }) {
  const pages: Record<string, { title: string; image?: string; body: string }> = {
    hospitality: { title: 'Hospitality', image: '11.jpg', body: 'Project details from the reference site have not yet been captured for this preview.' },
    'home-interiors': { title: 'Home interiors', image: '4.jpg', body: 'Project details from the reference site have not yet been captured for this preview.' },
    'customer-service': { title: 'Customer service', body: 'Contact Maison Debrah for customer service questions.' },
    faq: { title: 'Frequently asked questions', body: 'The reference site’s answers have not yet been captured for this preview.' },
    shipping: { title: 'Ordering & shipping', body: 'The reference site’s delivery terms have not yet been captured for this preview.' },
    returns: { title: 'Returns', body: 'The reference site’s return terms have not yet been captured for this preview.' },
    privacy: { title: 'Privacy policy', body: 'Approved privacy text is required before this preview collects personal information.' },
    terms: { title: 'Terms & conditions', body: 'Approved terms are required before this preview accepts transactions.' },
    'catalogue-request': { title: 'Request a catalogue', image: 'maison-1.jpg', body: 'Request the Maison Debrah catalogue.' },
    'design-consult': { title: 'Design consultation', image: '11.jpg', body: 'Bring your interior vision to life.' },
  }
  const page = pages[type]
  if (!page) return <NotFound />
  const formKind = type === 'catalogue-request' ? 'catalogue' : type === 'design-consult' ? 'consult' : null
  return <StandardPage title={page.title} image={page.image}><h2>{page.title}</h2><p>{page.body}</p>{formKind && <PreviewForm kind={formKind} />}</StandardPage>
}

function FloatingTools({ cart, products }: { cart: Cart; products: Product[] }) {
  const [open, setOpen] = useState(false)
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const items = products.filter((product) => cart[product.slug] > 0)
  return <><div className="language-switch"><a href="https://staging5.nl.maisondebrah.com/" aria-label="Dutch reference"><img src={reference('nl.svg')} alt="Dutch" /></a><span aria-label="English version"><img src={reference('en.svg')} alt="English" /></span></div><button className="to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Go to top">⌃</button><div className="floating-cart"><span>{count}</span><button type="button" aria-label="Open cart preview" onClick={() => setOpen(!open)}><Icon name="cart" /></button></div>{open && <div className="cart-preview" role="dialog" aria-label="Cart preview"><button className="cart-preview-close" type="button" onClick={() => setOpen(false)} aria-label="Close cart preview">×</button><h2>Your cart</h2>{items.length ? <>{items.map((product) => <p key={product.slug}>{cart[product.slug]} × <Link to={`/product/${product.slug}`} onClick={() => setOpen(false)}>{product.name}</Link></p>)}<Link className="reference-button" to="/cart" onClick={() => setOpen(false)}>View cart</Link></> : <><p>Your cart is empty</p><Link to="/shop" onClick={() => setOpen(false)}>Return to shop</Link></>}</div>}</>
}
function NotFound() { return <main id="main-content" className="not-found"><h1>Page not found</h1><p>This page is not available.</p><Link className="reference-button" to="/">Return home</Link></main> }

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0) }, [pathname]); return null }
export default function App() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState(false)
  const [cart, setCart] = useState<Cart>(loadCart)
  useEffect(() => { localStorage.setItem('maison-debrah-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.BASE_URL}data/products.json`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`); return response.json() })
      .then((data: unknown) => { if (!Array.isArray(data)) throw new Error('Invalid catalogue'); setProducts(data as Product[]) })
      .catch((reason: unknown) => { if (!(reason instanceof DOMException && reason.name === 'AbortError')) setError(true) })
    return () => controller.abort()
  }, [])
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const addToCart = (slug: string, quantity: number) => setCart((current) => ({ ...current, [slug]: Math.min(99, (current[slug] || 0) + quantity) }))
  return <><ScrollToTop /><Header count={count} />{error ? <main id="main-content" className="load-state"><h1>Collection unavailable</h1><p>The local catalogue could not be loaded.</p><button className="reference-button" onClick={() => window.location.reload()}>Try again</button></main> : !products ? <main id="main-content" className="load-state" role="status">Loading collection…</main> : <Routes><Route path="/" element={<Home products={products} />} /><Route path="/shop" element={<Catalog products={products} />} /><Route path="/collection/:slug" element={<Catalog products={products} />} /><Route path="/product/:slug" element={<ProductPage products={products} addToCart={addToCart} />} /><Route path="/cart" element={<CartPage products={products} cart={cart} setCart={setCart} />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/account" element={<AccountPage />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/contact" element={<Contact />} />{['hospitality', 'home-interiors', 'customer-service', 'faq', 'shipping', 'returns', 'privacy', 'terms', 'catalogue-request', 'design-consult'].map((path) => <Route path={`/${path}`} element={<ReferenceContentPage type={path} />} key={path} />)}<Route path="*" element={<NotFound />} /></Routes>}<Footer />{products && <FloatingTools cart={cart} products={products} />}</>
}
