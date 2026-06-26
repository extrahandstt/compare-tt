import { supabase } from "../src/lib/supabase";

export default async function handler(req, res) {

  const { data: products } = await supabase
    .from("products")
    .select("slug");


  const baseUrl = "https://compare-tt.vercel.app";


  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/shopping-list`,
    `${baseUrl}/about`,
    ...(products || []).map(
      (p)=>`${baseUrl}/product/${p.slug}`
    )
  ];


  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.map(url=>`
<url>
<loc>${url}</loc>
</url>
`).join("")}

</urlset>
`;


  res.setHeader("Content-Type","application/xml");
  res.status(200).send(xml);

}