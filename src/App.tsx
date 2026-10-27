import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { categories, categoryName, productCategory, productsInCategory, topCategories, type Product } from './data/catalog'

const asset = (src: string) => src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src

const homeImages = {
  hero: asset('/images/reference-3.jpg'),
  lighting: asset('/images/reference-2.jpg'),
  furniture: asset('/images/reference-5.jpg'),
}

function ProductImage({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>()
  if (!src || failedSrc === src) return <div className={`image-fallback ${className}`} role="img" aria-label={`${alt} image unavailable`}>Image unavailable</div>
  return <img className={className} src={asset(src)} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} />
}

function Header() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="draft-bar">Local Ethiopia draft for review · Not approved for launch</div>
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Maison Debrah Ethiopia home"><img src={asset('/images/logo.svg')} alt="Maison Debrah" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavLink to="/shop">Collection</NavLink><NavLink to="/about">Maison Debrah</NavLink><NavLink to="/projects">Projects</NavLink><NavLink to="/contact">Contact</NavLink>
      </nav>
      <div className="header-actions"><Link to="/shop" aria-label="Search collection" className="header-search">Search</Link><button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button></div>
    </header>
    {open && <div className="menu-shade" onClick={() => setOpen(false)}><nav className="mobile-nav" aria-label="Mobile navigation" onClick={(event) => { event.stopPropagation(); if (event.target instanceof Element && event.target.closest('a')) setOpen(false) }}>
      <div className="menu-top"><strong>Explore Maison Debrah</strong><button type="button" onClick={() => setOpen(false)} aria-label="Close menu">×</button></div>
      <Link to="/">Home</Link><Link to="/shop">All collections</Link>
      {topCategories.map((category) => <Link key={category.id} to={`/collection/${category.slug}`}>{categoryName(category.slug)}</Link>)}
      <Link to="/about">Maison Debrah</Link><Link to="/projects">Projects</Link><Link to="/contact">Contact</Link>
    </nav></div>}
  </>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <div className="footer-intro"><img src={asset('/images/logo.svg')} alt="Maison Debrah" /><p>Furniture, lighting and decoration for considered interiors.</p><small>Ethiopia website draft. Local business details require confirmation.</small></div>
    <div><h2>Explore</h2><Link to="/shop">All products</Link><Link to="/collection/meubilair">Furniture</Link><Link to="/collection/verlichting">Lighting</Link><Link to="/collection/decoratie">Decoration</Link></div>
    <div><h2>Discover</h2><Link to="/about">About Maison Debrah</Link><Link to="/projects">Projects</Link><Link to="/contact">Contact</Link></div>
    <div><h2>Before launch</h2><p>Local contact details, policies, newsletter and enquiry handling need approval.</p></div>
  </div><div className="footer-bottom">© Maison Debrah · Ethiopia draft for review</div></footer>
}

function ProductCard({ product }: { product: Product }) {
  return <Link className="product-card" to={`/product/${product.slug}`}><div className="product-image"><ProductImage src={product.images[0]?.thumbnail || product.images[0]?.src} alt={product.name} /></div><span className="product-category">{productCategory(product)}</span><h3>{product.name}</h3><span className="text-link">View product <span aria-hidden="true">↗</span></span></Link>
}

function Home({ products }: { products: Product[] }) {
  const featured = products.slice(0, 8)
  return <main>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(20,29,25,.65),rgba(20,29,25,.08)),url(${homeImages.hero})` }}><div className="hero-copy"><span className="eyebrow light">Maison Debrah · Ethiopia draft</span><h1>Interiors with character</h1><p>Explore the Maison Debrah collection of furniture, lighting and decoration.</p><Link className="button button-light" to="/shop">Explore the collection <span aria-hidden="true">↗</span></Link></div></section>
    <section className="editorial-grid" aria-label="Featured collections"><Link className="editorial-tile" to="/collection/verlichting" style={{ backgroundImage: `linear-gradient(0deg,rgba(17,26,21,.62),transparent 65%),url(${homeImages.lighting})` }}><span>Illuminate your space</span><h2>Discover lighting</h2><b>Explore collection ↗</b></Link><Link className="editorial-tile" to="/collection/meubilair" style={{ backgroundImage: `linear-gradient(0deg,rgba(17,26,21,.62),transparent 65%),url(${homeImages.furniture})` }}><span>The heart of an interior</span><h2>Explore furniture</h2><b>Explore collection ↗</b></Link></section>
    <section className="section featured"><div className="section-heading"><div><span className="eyebrow">The collection</span><h2>New and noteworthy</h2></div><Link className="text-link" to="/shop">View all products ↗</Link></div><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="story-split"><img src={asset('/images/reference-2.jpg')} alt="Maison Debrah interior with furniture and lighting" loading="lazy" /><div><span className="eyebrow">The brand</span><h2>Discover the world of Maison Debrah</h2><p>Explore the collection and the spaces that bring its furniture, lighting and decorative pieces together.</p><Link className="button" to="/about">About Maison Debrah <span aria-hidden="true">↗</span></Link></div></section>
    <section className="category-section section"><div className="section-heading"><div><span className="eyebrow">Browse by category</span><h2>Find your next piece</h2></div></div><div className="category-grid">{topCategories.map((category, index) => <Link className="category-tile" to={`/collection/${category.slug}`} key={category.id}><img src={[homeImages.furniture, homeImages.lighting, homeImages.hero][index]} alt="" loading="lazy" /><span>{categoryName(category.slug)} <b aria-hidden="true">↗</b></span></Link>)}</div></section>
    <section className="newsletter-draft"><div><span className="eyebrow light">Stay in touch</span><h2>News from Maison Debrah</h2><p>Newsletter signup will be connected after the approved privacy and CRM workflow is supplied.</p></div><form onSubmit={(event) => event.preventDefault()} aria-label="Newsletter preview"><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" placeholder="Email address" disabled /><button type="submit" disabled>Subscribe</button></div><small>Preview only. No information is collected.</small></form></section>
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

function ProductPage({ products }: { products: Product[] }) {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  if (!product) return <NotFound />
  return <ProductDetails key={product.slug} product={product} products={products} />
}

function ProductDetails({ product, products }: { product: Product; products: Product[] }) {
  const [imageIndex, setImageIndex] = useState(0)
  const category = product.categories[0]
  const related = products.filter((item) => item.id !== product.id && item.categories.some((cat) => product.categories.some((current) => current.id === cat.id))).slice(0, 4)
  return <main className="product-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/shop">Collection</Link>{category && <><span>/</span><Link to={`/collection/${category.slug}`}>{productCategory(product)}</Link></>}<span>/</span><span>{product.name}</span></nav><div className="product-detail"><div className="product-gallery"><div className="main-product-image"><ProductImage src={product.images[imageIndex]?.src || product.images[0]?.src} alt={`${product.name} view ${imageIndex + 1}`} /></div>{product.images.length > 1 && <div className="thumbnails">{product.images.map((image, index) => <button type="button" key={image.src} className={index === imageIndex ? 'selected' : ''} onClick={() => setImageIndex(index)} aria-label={`Show ${product.name} image ${index + 1}`}><ProductImage src={image.thumbnail} alt="" /></button>)}</div>}</div><div className="product-info"><span className="eyebrow">{productCategory(product)}</span><h1>{product.name}</h1>{product.sku && <p className="sku">Reference: {product.sku}</p>}{product.summary && <p className="product-summary">{product.summary}</p>}{product.dimensions && product.dimensions !== 'N/A' && <div className="detail-line"><strong>Dimensions</strong><span>{product.dimensions}</span></div>}{product.attributes.map((attribute) => <div className="detail-line" key={attribute.name}><strong>{attribute.name}</strong><span>{attribute.terms.join(', ')}</span></div>)}<div className="availability-note"><strong>Ethiopia availability and price</strong><p>To be confirmed by the local franchise before launch. This draft does not accept orders or enquiries.</p></div><Link className="button" to="/contact">Contact information <span aria-hidden="true">↗</span></Link></div></div>{related.length > 0 && <section className="section related"><div className="section-heading"><div><span className="eyebrow">More to discover</span><h2>Related pieces</h2></div></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</main>
}

function About() { return <main><section className="content-hero"><img src={asset('/images/reference-3.jpg')} alt="Maison Debrah interior setting" /><div><span className="eyebrow light">Maison Debrah</span><h1>Spaces with character</h1></div></section><section className="text-section"><span className="eyebrow">Discover the brand</span><h2>Furniture, lighting and decoration</h2><p>This local draft presents the Maison Debrah collection in English. Final brand wording, imagery and local service details will be reviewed with Maison Debrah before launch.</p><Link className="button" to="/shop">Explore the collection ↗</Link></section></main> }
function Projects() { return <main><section className="content-hero"><img src={asset('/images/editorial-4.jpg')} alt="Interior featuring Maison Debrah furniture" /><div><span className="eyebrow light">Inspiration</span><h1>Explore interior possibilities</h1></div></section><section className="text-section"><span className="eyebrow">Projects</span><h2>Design inspiration</h2><p>The reference site presents residential and hospitality projects. Project examples, services and claims for Ethiopia need local and brand approval before they appear here.</p><Link className="button" to="/shop">Browse products ↗</Link></section></main> }
function Contact() { return <main className="contact-page"><div className="page-intro"><span className="eyebrow">Get in touch</span><h1>Contact Maison Debrah Ethiopia</h1><p>This is a local website draft. Approved contact details and a secure enquiry system have not yet been supplied.</p></div><div className="contact-panel"><div><h2>Enquiries</h2><p>The official email, telephone, showroom address and opening hours will be added after verification by the franchisee.</p></div><div><h2>What happens next?</h2><p>Once Maison Debrah approves a CRM or secure lead workflow, this page can accept enquiries and provide a clear delivery confirmation.</p></div></div></main> }
function NotFound() { return <main className="not-found"><h1>Page not found</h1><p>That page is not in this local draft.</p><Link className="button" to="/">Return home</Link></main> }

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0) }, [pathname]); return null }
export default function App() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.BASE_URL}data/products.json`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`); return response.json() })
      .then((data: unknown) => { if (!Array.isArray(data)) throw new Error('Invalid catalogue'); setProducts(data as Product[]) })
      .catch((reason: unknown) => { if (!(reason instanceof DOMException && reason.name === 'AbortError')) setError(true) })
    return () => controller.abort()
  }, [])
  return <><ScrollToTop /><Header />{error ? <main className="load-state"><h1>Collection unavailable</h1><p>The local catalogue could not be loaded.</p><button className="button" onClick={() => window.location.reload()}>Try again</button></main> : !products ? <main className="load-state" role="status">Loading collection…</main> : <Routes><Route path="/" element={<Home products={products} />} /><Route path="/shop" element={<Catalog products={products} />} /><Route path="/collection/:slug" element={<Catalog products={products} />} /><Route path="/product/:slug" element={<ProductPage products={products} />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes>}<Footer /></>
}
