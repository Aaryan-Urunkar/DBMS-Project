
import BgImage from "../img/auction-house.webp";
import Card from "../components/Card"

export default function Home() {
  return (
    <>
    
    <div
        className="h-screen w-screen flex flex-wrap justify-center content-center carousel-background"
        style={{
          backgroundImage: `url(${BgImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card />
      </div>
    
    </>
  );
}
