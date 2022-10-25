import useTranslation from "next-translate/useTranslation";

const Footer = () => {
    const { t } = useTranslation('common')

  return (
    <div className="my-2 text-white md:text-sm">
        
        <div className="flex items-center justify-between font-bold border-b border-gray-500 py-7">
            <h3 className="text-2xl md:text-4xl">{t("Start Trading Now")}</h3>
            <a href="https://wallet.coinunited.io/register" className="p-3 px-2 rounded-md bg-site-amber md:px-6">{t("Get Started")}</a>
        </div>
        
        <div className="my-8 mb-24 grid grid-cols-1 space-y-10 md:space-y-0 md:grid-cols-6 md:gap-[7rem]">
            <div className="md:col-span-4">
                <ul className="flex flex-col space-y-5 md:space-x-6 md:flex-row md:space-y-0">
                    <li className="md:text-site-amber whitespace-nowrap">
                        <span className="font-bold">About Us</span>
                        <ul className="hidden my-5 text-white md:block md:space-y-3">
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/about-us">About CoinUnited.io</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/contact-us">Contact Us</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/community">Community</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/press">Press</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/careers">Careers</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/security">Security</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/education">Education</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/venture-capital">Venture Capital</a></li>              
                        </ul>
                    </li>
                    <li className="md:text-site-amber whitespace-nowrap">
                    <span className="font-bold">Product</span>
                        <ul className="hidden my-5 text-white md:block md:space-y-3">
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/redirect">Wallet</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/staking">Stake and Earn</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/otc">OTC Trading</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/atm">ATM Network</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/nft">NFT Gallery</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/gifting-crypto">Gifting Crypto</a></li>
                        </ul>
                    </li>
                    <li className="md:text-site-amber whitespace-nowrap">
                    <span className="font-bold">Support</span>
                        <ul className="hidden my-5 text-white md:block md:space-y-3">
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/user-feedback">User Feedback</a></li>
                            <li><a className="hover:text-site-amber" href="https://help.coinunited.io/">FAQ</a></li>
                            <li><a className="hover:text-site-amber" href="https://help.coinunited.io/hc/en-us/requests/new?ticket_form_id=7281034166809">Submit a Request</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/referral-friends">Invite Friends</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/affiliate-program">Affiliate Program</a></li>
                            <li><a className="hover:text-site-amber" href="https://coinunited.io/en/download">Download</a></li>
                        </ul>
                    </li>
                    <li className="md:text-site-amber whitespace-nowrap">
                    <span className="font-bold">Learn</span>
                        <ul className="hidden my-5 text-white md:block md:space-y-3">
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-bitcoin-in-hong-kong">Browse Crypto Prices</a></li>
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-bitcoin-in-hong-kong">Buy Bitcoin</a></li>
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-etherum-in-hong-kong">Buy Ethereum</a></li>
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-solana-in-hong-kong">Buy Solana</a></li>
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-bnb-in-hong-kong">Buy BNB</a></li>
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-tether-in-hong-kong">Buy USDT / USDC</a></li>
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-dogecoin-in-hong-kong">Buy Dogecoin</a></li>
                            <li><a className="hover:text-site-amber" href="https://www.coinunited.io/en/buy-coin/buy-shib-in-hong-kong">Buy SHIB Inu </a></li>
                        </ul>
                    </li>
                    <li className="md:text-site-amber">
                    <span className="font-bold">Contact Us</span>
                        <ul className="hidden my-5 text-white md:space-y-3 md:block">
                            <li>Email: cs@coinunited.io </li>
                            <li>Courseway Bay Flagship Store: 2/F & 3/F , V Point 18 Tang Lung street Courseway Bay, Hong Kong</li>
                            <li>Tshim Sha Tsui Branch: 1/F, 2 House Floor Street, Tshim Sha Tsui, Kowloon</li>
                        </ul>
                    </li>

                </ul>
            </div>
            <div className="md:col-span-2">
                <img src="/img/cu_transparent.svg" className="w-1/2 md:w-100" alt="coinunited" />            
                <div className="grid items-center w-3/4 grid-cols-9 gap-3 my-6 md:grid-cols-7 md:gap-2">
                    <img src="/img/fb.svg" alt="facebook" className="w-8 h-8"/>
                    <img src="/img/insta.svg" alt="instagram" className="w-8 h-8"/>
                    <img src="/img/twitter.svg" alt="twitter" className="w-8 h-8"/>
                    <img src="/img/linkedin.svg" alt="linkedin" className="w-8 h-8"/>
                    <img src="/img/reddit.svg" alt="reddit" className="w-8 h-8"/>
                    <img src="/img/tg.svg" alt="telegram" className="w-8 h-8"/>
                    <img src="/img/youtube.svg" alt="youtube" className="w-8 h-8"/>
                    <img src="/img/discord.svg" alt="discord" className="w-8 h-8"/>
                    <img src="/img/line.svg" alt="line" className="w-8 h-8"/>
                </div>                
            </div>  
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 text-xs md:flex-row md:space-y-0 md:space-x-12 md:text-sm">
                <p> &copy; 2020-{new Date().getFullYear()} CoinUnited.io. All rights reserved.</p>
                <p>{t("terms-of-service")}</p>
        </div>

    </div>
  )
}


export default Footer;