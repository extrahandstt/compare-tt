import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);


export default async function handler(req, res) {

  const { data: products, error } = await supabase
    .from("products")
    .select("slug");


  if (error) {
    res.status(500).send(error.message);
    return;
  }


  const baseUrl = "https://compare-tt.vercel.app";


  // ADD STORES HERE
  const stores = [
    "Massy Stores",
    "Better Deals",
    "Xtra Foods",
    "PriceMart",
    "SuperPharm",
    "Pennywise"
  ];


  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/about`,
    `${baseUrl}/shopping-list`,
    `${baseUrl}/deals`,

    // PRODUCT PAGES
    ...(products || []).map(
      (product) =>
        `${baseUrl}/product/${product.slug}`
    ),

    // STORE PAGES
    ...(stores.map(
      store =>
        `${baseUrl}/store/${encodeURIComponent(store)}`
    ))

  ];


  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.map(url => `
<url>
<loc>${url}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
</url>
`).join("")}

</urlset>`;


  res.setHeader(
    "Content-Type",
    "application/xml"
  );


  res.status(200).send(xml);

}