import Link from 'next/link';
import { TiChevronRight } from "react-icons/ti";


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
    <nav className="breadcrumbs">
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
                <span itemProp="name" dangerouslySetInnerHTML={{ __html: breadcrumb.text }} />
              ) : (
                  <div className="breadcrumb-group">
                    <Link itemProp="item" href={getPathFromUrl(breadcrumb.url)}>
                      <span dangerouslySetInnerHTML={{ __html: breadcrumb.text }} />
                    </Link>
                    <TiChevronRight className="icon" />
                  </div>
              )}
              <meta itemProp='position' content={`${index + 1}`} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
