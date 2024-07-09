export const metadata = {
  title: 'post'
}

export default function Post({ params }: { params: { category: string; post: string }; }) {
  return (
    <div className='mx-auto my-12 flex flex-col gap-16 px-8'>
    <div className='prose'>
    <p>
    {params.category} / {params.post}
    </p>
    </div>
    </div>
  )
}
