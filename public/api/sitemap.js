import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);


export default async function handler(req,res){

const {data:products,error}=await supabase
.from("products")
.select("slug");


console.log(products,error);


const base="https://compare-tt.vercel.app";


const urls=[
`${base}/`,
`${base}/shopping-list`,
`${base}/about`,
`${base}/deals`,
...(products || []).map(
p=>`${base}/product/${p.slug}`
)
];


const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.map(url=>`
<url>
<loc>${url}</loc>
</url>
`).join("")}

</urlset>`;


res.setHeader(
"Content-Type",
"application/xml"
);

res.status(200).send(xml);

}