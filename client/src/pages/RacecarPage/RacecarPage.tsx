import { useSiteImages } from '@/contexts/SiteImagesContext';

/**
 * 赛车展示页 - Apple 风格
 * 大图展示 + 技术细节 + 多角度画廊
 */
export default function RacecarPage() {
  const { images } = useSiteImages();
  const { hero, gallery, details } = images.racecar;

  return (
    <div className="bg-background">
      {/* Hero 区域 */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <img
          src={hero.url}
          alt={hero.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light">
            {hero.description}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 赛车画廊 - 大图网格 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              全方位展示
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              每一个角度，都是工程美学的完美呈现
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术细节区域 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              技术亮点
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              精密设计，匠心打造
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {details.map((detail) => (
              <div
                key={detail.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={detail.url}
                    alt={detail.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {detail.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {detail.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 整车大图展示 */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={gallery[0]?.url || '/images/img_812.jpg'}
              alt="赛车整车"
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
