import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export function SEO({ 
  title = "Платформа знань - підготовка до НМТ 2026 | Тести, відеоуроки, подкасти",
  description = "Платформа знань для підготовки до НМТ 2026. Актуальні тести, відеоуроки, подкасти, питання та навчальні матеріали. Знайди тести за темами та дисциплінами. Реєструйся для повного доступу!",
  keywords = "НМТ 2026, підготовка до НМТ, тести онлайн, відеоуроки, подкасти, платформа знань, тестування, компетенції, прогрес, навчальні матеріали, ЗНО",
  url = "https://zno-nmt.com.ua"
}: SEOProps) {
  return (
    <Helmet>
      <html lang="uk" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="ZNO-NMT" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Платформа знань" />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:image" content="https://zno-nmt.com.ua/preview.webp" /> 
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
    </Helmet>
  );
}
