import useTranslation from "next-translate/useTranslation";

const Footer = () => {
    const { t } = useTranslation('common')

  return (
    <div className="text-white md:text-sm my-2">
        
        <div className="flex items-center font-bold border-b border-gray-500 py-7 justify-between">
            <h3 className="text-2xl md:text-4xl">{t("Start Trading Now")}</h3>
            <a href="https://wallet.coinunited.io/register" className="bg-amber-600 px-2 md:px-6 p-3 rounded-md">{t("Get Started")}</a>
        </div>
        
        <div className="my-8 mb-24 grid grid-cols-1 space-y-10 md:space-y-0 md:grid-cols-6 md:gap-[7rem]">
            <div className="md:col-span-4">
                <ul className="flex md:space-x-6 flex-col md:flex-row space-y-5 md:space-y-0">
                    <li className="md:text-amber-600 whitespace-nowrap">
                        <span className="font-bold">About Us</span>
                        <ul className="hidden md:block text-white my-5 md:space-y-3">
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/about-us">About CoinUnited.io</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/contact-us">Contact Us</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/community">Community</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/press">Press</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/careers">Careers</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/security">Security</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/education">Education</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/venture-capital">Venture Capital</a></li>              
                        </ul>
                    </li>
                    <li className="md:text-amber-600 whitespace-nowrap">
                    <span className="font-bold">Product</span>
                        <ul className="text-white hidden md:block my-5 md:space-y-3">
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/redirect">Wallet</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/staking">Stake and Earn</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/otc">OTC Trading</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/atm">ATM Network</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/nft">NFT Gallery</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/gifting-crypto">Gifting Crypto</a></li>
                        </ul>
                    </li>
                    <li className="md:text-amber-600 whitespace-nowrap">
                    <span className="font-bold">Support</span>
                        <ul className="text-white my-5 hidden md:block md:space-y-3">
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/user-feedback">User Feedback</a></li>
                            <li><a className="hover:text-amber-600" href="https://help.coinunited.io/">FAQ</a></li>
                            <li><a className="hover:text-amber-600" href="https://help.coinunited.io/hc/en-us/requests/new?ticket_form_id=7281034166809">Submit a Request</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/referral-friends">Invite Friends</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/affiliate-program">Affiliate Program</a></li>
                            <li><a className="hover:text-amber-600" href="https://coinunited.io/en/download">Download</a></li>
                        </ul>
                    </li>
                    <li className="md:text-amber-600 whitespace-nowrap">
                    <span className="font-bold">Learn</span>
                        <ul className="text-white my-5 hidden md:block md:space-y-3">
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-bitcoin-in-hong-kong">Browse Crypto Prices</a></li>
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-bitcoin-in-hong-kong">Buy Bitcoin</a></li>
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-etherum-in-hong-kong">Buy Ethereum</a></li>
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-solana-in-hong-kong">Buy Solana</a></li>
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-bnb-in-hong-kong">Buy BNB</a></li>
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-tether-in-hong-kong">Buy USDT / USDC</a></li>
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-dogecoin-in-hong-kong">Buy Dogecoin</a></li>
                            <li><a className="hover:text-amber-600" href="https://www.coinunited.io/en/buy-coin/buy-shib-in-hong-kong">Buy SHIB Inu </a></li>
                        </ul>
                    </li>
                    <li className="md:text-amber-600">
                    <span className="font-bold">Contact Us</span>
                        <ul className="text-white my-5 md:space-y-3 hidden md:block">
                            <li>Email: cs@coinunited.io </li>
                            <li>Courseway Bay Flagship Store: 2/F & 3/F , V Point 18 Tang Lung street Courseway Bay, Hong Kong</li>
                            <li>Tshim Sha Tsui Branch: 1/F, 2 House Floor Street, Tshim Sha Tsui, Kowloon</li>
                        </ul>
                    </li>

                </ul>
            </div>
            <div className="md:col-span-2">
                <img src="/img/cu_transparent.svg" className="md:w-100 w-1/2" alt="coinunited" />            
                <div className="items-center grid grid-cols-9 md:grid-cols-7 w-3/4 gap-3 md:gap-2 my-6">
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

        <div className="flex justify-center flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-12 text-xs md:text-sm">
                <p> &copy; 2020-{new Date().getFullYear()} CoinUnited.io. All rights reserved.</p>
                <p>{t("terms-of-service")}</p>
        </div>

    </div>
  )
}


export default Footer;