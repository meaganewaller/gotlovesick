'use client'

import { fetchCommentsList } from "@/services/graphql/fetchers/comments"
import { useState, useEffect } from 'react'
import Loader from '@/components/loader'
import Image from 'next/image'
import Link from 'next/link'

import { formatDateAsString } from '@/utils/helpers'
import { HiOutlineHeart, HiOutlineReply } from 'react-icons/hi'

export function CommentsList({ post }: { post: string }) {
  const [comments, setComments] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedComments = await fetchCommentsList({ first: po
      }
    }
  })
}
