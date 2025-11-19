import MainIntro from "./MainIntro";
import HomePageItem from "./HomePageItem";

export default function Page() {
  return (
    <div >
      
      
        <MainIntro  />
        <HomePageItem
          image="/assets/sectors/textile/explore/1.png"
          titleLeft="YOUR"
          titleRight="CAPACITY"
          desc={
            <p
              className="leading-[1.45] text-white font-light tracking-[-0.01em] text-[18px] pt-15"
              style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
            >
              We provide quality well understood service to our customers with our wide range 
              of production and our big team of professionals. 

              We have the experience to serve our customers in various fields such as 
              ironing-packaging, cutting-sewing, fabric production for special collection.

              Our production centre is also capable of knitting and weaving. Besides, we offer 
              production service of suits, shirts and coats for high value-added orders.
            </p>
            }
          scale={0.2}
          titleTranslateX={44}
          pinDurationMultiplier={2.8} // mesela 2.0 veya 2.2 deneyebilirsin
          imageTargetScale={1.08}
          leftFinalOffset="58%"
          rightFinalOffset="45%"
          />
          
          <HomePageItem
            image="/assets/sectors/textile/explore/2.png"
            titleLeft="PRODUCT"
            titleRight="RANGE"
            scale={0.2}
            titleTranslateX={44}
            pinDurationMultiplier={2.8} // mesela 2.0 veya 2.2 deneyebilirsin
            imageTargetScale={1.08}
            imageOffsetY={-20}
            leftFinalOffset="50%"
            rightFinalOffset="52%"
            desc={
            <>
              <p
                className="mb-6 leading-[1.4] text-white font-light tracking-[-0.01em] text-[18px]"
                style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
              >
                Our company shows a wide range of products made using both knitting and
                weaving techniques. Our product lines include:
              </p>

              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-[18px] text-white tracking-[-0.01em] mx-auto  "
                style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
              >
                <div className="space-y-1 text-center">
                  <div>Jackets</div>
                  <div>Sweatshirts</div>
                  <div>T-shirts</div>
                </div>

                <div className="space-y-1 text-center">
                  <div>Shirts</div>
                  <div>Pants</div>
                  <div>Tracksuits</div>
                </div>

                <div className="space-y-1 text-center">
                  <div>Bags</div>
                  <div>Scarves</div>
                  <div>Hats</div>
                </div>

                <div className="space-y-1 text-center">
                  <div>Berets</div>
                  <div>Accessories</div>
                  <div>Pants</div>
                </div>
              </div>
            </>
          }
          />


          <HomePageItem
            image="/assets/sectors/textile/explore/3.png"
            titleLeft="EMBROIDERY"
            titleRight="OPTIONS"
            scale={0.2}
            titleTranslateX={44}
            pinDurationMultiplier={2.8} // mesela 2.0 veya 2.2 deneyebilirsin
            imageTargetScale={1.08}
            imageOffsetY={-20}
            leftFinalOffset="47%"
            rightFinalOffset="55%"
            desc={
            <>
              <p
                className="mb-6 leading-[1.4] text-white font-light tracking-[-0.01em] text-[18px]"
                style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
              >
                Info always has a solution for challenging projects. We have the ability to apply various printing techniques and embroidery.
              </p>

              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-[18px] text-white tracking-[-0.01em] mx-auto  "
                style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
              >
                <div className="space-y-1 text-center">
                  <div>Eco-friendly printings</div>
                  <div>Water base screenprint</div>
                  <div>High density </div>
                </div>

                <div className="space-y-1 text-center">
                  <div>Flock print</div>
                  <div>Puff print</div>
                  <div>Reflective</div>
                </div>

                <div className="space-y-1 text-center">
                  <div>Transfer print</div>
                  <div>Digital prints</div>
                  <div>Sublimation prints</div>
                </div>

                <div className="space-y-1 text-center">
                  <div>Embroidery </div>
                  <div>3D embroidery</div>
                  <div>Embroidery + Applique</div>
                </div>
              </div>
            </>
          }


           />






          <HomePageItem
            image="/assets/sectors/textile/explore/4.png"
            titleLeft="CUSTOMER"
            titleRight="ANALYSIS"
            desc={
              <p
                className="leading-[1.45] text-white font-light tracking-[-0.01em] text-[18px] "
                style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
              >
                At Info Group Global, we’re excited about creativity, technology and all its possibilities in the textile sector. 
                Creating custom-made apparel is what we do best and what we’re the most passionate about. <br/>
                FABRICS AND COLORS: Choose from many fabrics and colors available in our collection.<br/>
                DECORATION: Customise your garment with decoration components.
                ACCESSORIES: Change your product with various additional accessories, for functional and decorative purposes.
              </p>
              }
            scale={0.2}
            titleTranslateX={44}
            pinDurationMultiplier={2.8} // mesela 2.0 veya 2.2 deneyebilirsin
            imageTargetScale={1.08}
            leftFinalOffset="50%"
            rightFinalOffset="54%"
          />
          <div className="pb-[200px] bg-[#000]">
                      <HomePageItem
            image="/assets/sectors/textile/explore/5.png"
            titleLeft="BRANDING"
            titleRight="SERVICES"
            desc={
              <p
                className="leading-[1.45] text-white font-light tracking-[-0.01em] text-[18px] "
                style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
              >
                We meticulously analyze and understand your unique needs, delivering not just clothing, but industry-specific, functional solutions designed to enhance productivity. 
                With our comprehensive A-Z collections, we offer a wide array of options at various price points and quality levels. Because your productivity is our priority.
              </p>
              }
            scale={0.2}
            titleTranslateX={44}
            pinDurationMultiplier={2.8} // mesela 2.0 veya 2.2 deneyebilirsin
            imageTargetScale={1.08}
            
          />
  
          </div>


      
        
    </div>
  );
}
