import { Genre, BookRec } from "@/types";
import { nestGenres } from "@/utils/helpers";
import "@/styles/pages/recs.css";
import Image from "next/image";

export const BookRecommendation = ({ rec }: { rec: BookRec }) => {
  let nestedGenres: Genre[];

  if (rec && rec.genres?.nodes) {
    nestedGenres = nestGenres(rec.genres.nodes);

    if (nestedGenres) {
      return (
        <section id="book-recommendation">

          <h1>{rec.bookRecDetails.bookTitle} <span>by: {rec.bookRecDetails.author}</span></h1>
          <span><strong>Age Range:</strong> {rec.bookRecDetails.ageRange[1]}</span>
          <span><strong>Year Published:</strong> {String(rec.bookRecDetails.year)}</span>
          <span><strong>Rating:</strong> {String(rec.bookRecDetails.rating)}/5</span>
          {rec.bookRecDetails?.bookCover &&
            <figure>
              <Image
                src={rec.bookRecDetails.bookCover.node.sourceUrl}
                width={rec.bookRecDetails.bookCover.node.mediaDetails.width}
                height={rec.bookRecDetails.bookCover.node.mediaDetails.height}
                alt={rec.bookRecDetails.bookCover.node.altText || `Cover of ${rec.bookRecDetails.bookTitle}`}
              />
            </figure>
          }
          {rec.bookRecDetails.contentWarnings && (
            <div dangerouslySetInnerHTML={{ __html: rec.bookRecDetails.contentWarnings }} />
          )}
          <ul>
            {nestedGenres.map((genre) => (
              <li key={genre.name}>{genre.name}
                {genre?.children && <ul>
                  {genre.children.map((cgenre) => (
                    <li key={cgenre.databaseId}>
                      {cgenre.name}
                    </li>
                  ))}
                </ul>}
              </li>
            ))}
          </ul>

          {rec.content && <article dangerouslySetInnerHTML={{ __html: rec.content }} />}
        </section>
      )
    }
  }
}

