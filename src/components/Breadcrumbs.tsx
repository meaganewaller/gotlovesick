import Link from 'next/link';

function getPathFromUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch (e) {
    console.error('Invalid URL:', url);
    return url;
  }
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: { text: string, url: string }[] }) {
  return (
    <nav className="breadcrumb">
      <div className="breadcrumb-heading">You are here:</div>
      <ol itemScope itemType="http://schema.org/BreadcrumbList">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={index}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              {isLast ? (
                <span itemProp="name">{breadcrumb.text}</span>
              ) : (
                <Link itemProp="item" href={getPathFromUrl(breadcrumb.url)}>
                  <span itemProp="name">{breadcrumb.text}</span>
                </Link>
              )}
              <meta itemProp='position' content={`${index + 1}`} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
