import categoriesData from './categories.json'

export type Product = { id: number; name: string; slug: string; sku: string; summary: string; description: string; categories: { id: number; name: string; slug: string }[]; images: { src: string; thumbnail: string; alt: string }[]; dimensions: string; attributes: { name: string; terms: string[] }[]; price: number | null; shopOrder: number }
export type Category = (typeof categoriesData)[number]

export const categories: Category[] = categoriesData.filter((category) => category.slug !== 'uncategorized')
export const topCategories = ['meubilair', 'verlichting', 'decoratie'].map((slug) => categories.find((category) => category.slug === slug)).filter((category): category is Category => Boolean(category))

const categoryNames: Record<string, string> = {
  'meubilair': 'Furniture',
  'verlichting': 'Lighting',
  'decoratie': 'Decoration',
  'banken-hoekbanken': 'Sofas & sectionals',
  'bedden-hoofdborden': 'Beds & headboards',
  'benches': 'Benches',
  'bijzettafels': 'Side tables',
  'boekenkasten-planken': 'Bookcases & shelving',
  'bureaus': 'Desks',
  'commodes-nachtkastjes': 'Chests & bedside tables',
  'consoles': 'Consoles',
  'consoletafels': 'Console tables',
  'dressoires': 'Sideboards',
  'eetkamerstoelen-barkrukken': 'Dining chairs & stools',
  'eetkamertafels': 'Dining tables',
  'fauteuils-statement-stoelen': 'Armchairs & statement chairs',
  'hanglampen-kroonluchters': 'Pendants & chandeliers',
  'pendant-lamps': 'Pendant lamps',
  'pilaren': 'Pedestals',
  'salontafels': 'Coffee tables',
  'spiegels': 'Mirrors',
  'staande-lampen': 'Floor lamps',
  'tafellampen': 'Table lamps',
  'tv-meubels': 'TV cabinets',
  'vazen-en-plantenbakken': 'Vases & planters',
  'wandlampen': 'Wall lamps',
}

export function categoryName(slug: string, fallback?: string) {
  return categoryNames[slug] || fallback || slug
}

export function productsInCategory(products: Product[], slug: string) {
  const category = categories.find((item) => item.slug === slug)
  if (!category) return []
  const ids = new Set([category.id, ...categories.filter((item) => item.parent === category.id).map((item) => item.id)])
  return products.filter((product) => product.categories.some((item) => ids.has(item.id)))
}

export function productCategory(product: Product) {
  const category = product.categories[0]
  return category ? categoryName(category.slug, category.name) : 'Collection'
}
