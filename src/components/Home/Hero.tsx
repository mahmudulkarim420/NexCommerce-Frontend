import PremiumHero from "./PremiumHero";
import Ads from "./Ads";
import Categories from "./Categories";
import PopularProducts from "./popularProducts";
import ChatBoot from "./ChatBoot";

function Hero() {
  return (
    <div>
      {/* Premium Hero Section */}
      <PremiumHero />

      {/* Rest of the page content */}
      <Categories />
      <Ads />
      <PopularProducts />
      <ChatBoot />
    </div>
  );
}

export default Hero;
