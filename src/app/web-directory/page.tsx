import { fetchWebDirectoryCategories } from "@/services/graphql";
import { notFound } from "next/navigation";

export async function fetchWebDirectoryCategoriesData() {
  const categories = await fetchWebDirectoryCategories({ first: 50 })

  if (!categories) {
    return { error: 'No data found' };
  }

  return { categories };
}

export default async function WebDirectoryCategories() {
  const data = await fetchWebDirectoryCategoriesData();

  if (data.error) {
    return notFound();
  }

  if (data.categories) {
    <main id="web-directory-categories">
      <section className="web-directory-categories">
        <h1>Web Directory Categories</h1>
        <ul>
          {data.categories.map((category) => (
            <li key={category.key}>
              <a href={`/web-directory/${category.slug}`}>{category.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  }

  return notFound();
}
