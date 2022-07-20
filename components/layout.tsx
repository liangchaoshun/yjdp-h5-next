import classNames from 'classnames'
import Link from 'next/link'
import styles from './layout.module.scss'
import { useRouter } from 'next/router'

// 只有这三个页面显示 tabbar
const showTabbarRoutes = ['/home', '/category', '/contact']

export default function Layout(props: any) {
  const { route } = useRouter()
  const showTabbar = showTabbarRoutes.includes(route)
  return (
    <div className='w-screen min-h-screen bg-slate-100 flex flex-col'>
      <main
        className={classNames(
          { [styles.section]: showTabbar, 'h-screen': !showTabbar },
          'overflow-y-auto'
        )}
      >
        {props.children}
      </main>
      {showTabbar ? (
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
      ) : null}
    </div>
  )
}
