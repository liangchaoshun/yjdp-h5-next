import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className='container min-h-screen bg-slate-100 flex flex-col'>
      <main className='flex-1'>{children}</main>
      <footer className='h-12 leading-loose bg-white'>
        <Link className='leading-loose' href='/home'>
          home
        </Link>
        <Link className='leading-loose' href='/category'>
          category
        </Link>
        <Link className='leading-loose' href='/contact'>
          contact
        </Link>
      </footer>
    </div>
  )
}
