import {Bars3Icon ,ArrowLongRightIcon} from '@heroicons/react/24/solid'
import { Dropdown, DropdownItem } from "./utils/Dropdown";
import { ContainImage } from './OptimizedImage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation'


const Header = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const {locale:activeLocale, locales, asPath} = router;
  const availableLocales = locales?.filter((locale:string) => locale !== activeLocale);


  return (
    <div className='z-10 overflow-hidden'>
    <div className='flex items-center justify-between p-3 px-4'>
        <div className='flex items-center'>
          <Link href='/'><a> 
            <ContainImage src="/img/cu_logo.png" alt="coinunited logo" className="hidden w-40 h-10 ms:w-48 md:block" />            
            <ContainImage src="/img/cu_academy_logo.png" alt="coinunited logo" className="w-40 h-12 ms:w-48 md:hidden" />
            </a>
          </Link>
            <div className='flex items-center pt-1 mx-4 space-x-3 text-xs ms:text-sm opacity-90'>


            <div className='items-center hidden space-x-3 font-semibold md:flex ms:space-x-6'>

                <img src="/img/menu.png" alt="menu icon" className='w-4 h-4'/>

                <button className='hidden p-1 px-3 text-white rounded-md ms:inline-block bg-gradient-to-r from-sky-600 via-sky-500 to-sky-300'>{t('get-120-usd')}</button>
                
                <Dropdown label={t('buy-crypto')}>
                  <DropdownItem>
                    <span className='w-24 text-center'>{t('buy')}</span>
                  </DropdownItem>
                </Dropdown>

                <span>{t('markets')}</span>
                
                <Dropdown label={t('trade')}>
                <DropdownItem>
                    <span className='w-24 text-center'>{t('buy')}</span>
                  </DropdownItem>
                </Dropdown>
                
                <Dropdown label={t("earn")}>
                  <DropdownItem>
                    <span className='w-24 text-center'>{t('buy')}</span>
                  </DropdownItem>
                </Dropdown>
                <a href="#">{t('NFT')}</a>
            </div>  
          </div>
        </div>
        
        <Bars3Icon className="h-9 w-9 md:hidden" />


        <div className='items-center hidden space-x-3 text-sm font-semibold md:flex ms:space-x-4 opacity-90'>
              <a href="#">{t('login')}</a>
              <button className='p-1 px-4 text-white rounded-md bg-site-amber'>{t('register')}</button>

              <a href="#">{t('wallet')}</a>
              <Dropdown label={t("download")}>
                <DropdownItem>
                    <span className='text-center'>{t('buy')}</span>
                  </DropdownItem>
              </Dropdown>

              <Dropdown label={t("language")}>
                {
                  availableLocales?.map((locale:string) => {
                    let local_name;
                    switch (locale) {
                      case 'en':
                        local_name = 'English';
                        break;
                      case 'zh':
                        local_name = '中文 (中国)';
                        break;
                      default:
                        local_name = locale
                    }
                    
                    return <DropdownItem key={locale}>
                              <Link href={asPath} locale={locale}>
                                <a className='text-center'>{local_name}</a>
                              </Link>
                            </DropdownItem>}
                  )
                }
              </Dropdown>
        </div>
    </div>
   
   <div className='flex items-center justify-center p-3 font-semibold bg-site-orange'>
        <div className='flex items-center space-x-2 text-sm ms:space-x-3'>
            <span>{t('sign-up-for-120-bonus')}</span>
            <ArrowLongRightIcon  className='w-4 h-4'/>
            <button className='p-1 px-2 text-white rounded-md bg-site-amber ms:px-4'>{t('Register now')}</button>
        </div>
   </div>
  </div>
  )
}

export default Header;