import classNames from 'classnames'
import Link from 'next/link'
import styles from './layout.module.scss'
import { useRouter } from 'next/router'

export default function Layout(props: any) {
  const { route } = useRouter()
  const isHome = route === '/home'
  const isCategory = route === '/category'
  const isContact = route === '/contact'
  const showTabbar = isHome || isCategory || isContact // 只有这三个页面显示 tabbar

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
            <Link href='/home' passHref scroll={false}>
              <a>
                <div
                  className={classNames(
                    {
                      'text-slate-800': !isHome,
                      'text-pink-600': isHome,
                    },
                    'flex flex-col leading-loose justify-center items-center'
                  )}
                >
                  <span className='iconfont icon-home text-2xl' />
                  <p className='text-xs'>home</p>
                </div>
              </a>
            </Link>
          </div>
          <div className='flex-1'>
            <Link href='/category'>
              <div
                className={classNames(
                  {
                    'text-slate-800': !isCategory,
                    'text-pink-600': isCategory,
                  },
                  'flex flex-col leading-loose justify-center items-center'
                )}
              >
                <span className='iconfont icon-category text-2xl' />
                <p className='text-xs'>category</p>
              </div>
            </Link>
          </div>
          <div className='flex-1'>
            <Link href='/contact' passHref scroll={false}>
              <a>
                <div
                  className={classNames(
                    {
                      'text-slate-800': !isContact,
                      'text-pink-600': isContact,
                    },
                    'flex flex-col leading-loose justify-center items-center'
                  )}
                >
                  <span className='iconfont icon-contact text-2xl' />
                  <p className='text-xs'>contact</p>
                </div>
              </a>
            </Link>
          </div>
        </footer>
      ) : null}
    </div>
  )
}
