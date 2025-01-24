'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import classNames from 'classnames'

type PaginationProps = {
  slug: string
  currentPage: number
  totalPages: number
}

export function Pagination({ slug, currentPage, totalPages }: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (slug: string, page: number) => {
    router.push(`/categories/${slug}?page=${page}`);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(slug, currentPage - 1)}
        disabled={currentPage <= 1}
        className={classNames('pagination-button', { disabled: currentPage <= 1 })}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(slug, index + 1)}
          className={classNames('pagination-button', { active: currentPage === index + 1 })}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(slug, currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={classNames('pagination-button', { disabled: currentPage >= totalPages })}
      >
        Next
      </button>

    </div>
  )
}
