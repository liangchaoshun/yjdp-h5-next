import Link from 'next/link'

export default function Layout(props: any) {
  return (
    <div className='w-screen min-h-screen bg-slate-100 flex flex-col'>
      <main className='flex-1'>{props.children}</main>
      <footer className='h-12 leading-loose bg-white flex flex-row justify-between'>
        <div className='flex-1'>
          <Link href='/home' className='text-slate-800'>
            <div className='flex flex-col leading-loose justify-center items-center'>
              <span className='iconfont icon-home text-2xl' />
              <p className='text-xs'>home</p>
            </div>
          </Link>
        </div>
        <div className='flex-1'>
          <Link href='/category' className='text-slate-800'>
            <div className='flex flex-col leading-loose justify-center items-center'>
              <span className='iconfont icon-category text-2xl' />
              <p className='text-xs'>category</p>
            </div>
          </Link>
        </div>
        <div className='flex-1'>
          <Link href='/contact' className='text-slate-800'>
            <div className='flex flex-col leading-loose justify-center items-center'>
              <span className='iconfont icon-contact text-2xl' />
              <p className='text-xs'>contact</p>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  )
}
