import useTranslation from "next-translate/useTranslation";

const Footer = () => {
    const { t } = useTranslation('common')

  return (
    <div className="text-white md:text-sm my-2">
        
        <div className="flex items-center font-bold border-b border-gray-500 py-7 justify-between">
            <h3 className="text-2xl md:text-4xl">{t("Start Trading Now")}</h3>
            <button className="bg-amber-600 px-2 md:px-5 p-1 rounded-md">{t("Get Started")}</button>
        </div>
        
        <div className="my-8 mb-24 grid grid-cols-1 space-y-10 md:space-y-0 md:grid-cols-6 md:gap-[7rem]">
            <div className="md:col-span-4">
                <ul className="flex md:space-x-6 flex-col md:flex-row space-y-5 md:space-y-0">
                    <li className="md:text-amber-600 whitespace-nowrap">
                        About Us
                        <ul className="hidden md:block text-white my-5">
                            <li>About CoinUnited.io</li>
                            <li>Contact Us</li>
                            <li>Community</li>
                            <li>Press</li>
                            <li>Careers</li>
                            <li>Security</li>
                            <li>Education</li>
                            <li>Venture Capital</li>              
                        </ul>
                    </li>
                    <li className="md:text-amber-600 whitespace-nowrap">
                        Product
                        <ul className="text-white hidden md:block my-5 space-y-2">
                            <li>Wallet</li>
                            <li>Stake and Earn</li>
                            <li>OTC Trading</li>
                            <li>ATM Network</li>
                            <li>NFT Gallery</li>
                            <li>Gifting Crypto</li>
                        </ul>
                    </li>
                    <li className="md:text-amber-600 whitespace-nowrap">
                        Support
                        <ul className="text-white my-5 hidden md:block space-y-2">
                            <li>User Feedback</li>
                            <li>FAQ</li>
                            <li>Submit a Request</li>
                            <li>Invite Friends</li>
                            <li>Affiliate Program</li>
                            <li>Download</li>
                        </ul>
                    </li>
                    <li className="md:text-amber-600 whitespace-nowrap">
                        Learn
                        <ul className="text-white my-5 hidden md:block space-y-2">
                            <li>Browse Crypto Prices</li>
                            <li>Buy Bitcoin</li>
                            <li>Buy Ethereum</li>
                            <li>Buy Solana</li>
                            <li>Buy BNB</li>
                            <li>Buy USDT / USDC</li>
                            <li>Buy Dogecoin</li>
                            <li>Buy SHIB Inu</li>
                            <li>Buy AVAX</li>
                            <li>Buy DOT</li>
                            <li>Buy MATIC</li>
                        </ul>
                    </li>
                    <li className="md:text-amber-600">
                        Contact Us
                        <ul className="text-white my-5 space-y-2 hidden md:block">
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