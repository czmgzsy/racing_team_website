import { useSiteImages } from '@/contexts/SiteImagesContext';

/**
 * 队员风采页 - Apple 风格
 */
export default function MemberPage() {
  const { images } = useSiteImages();
  const { banner, teamPhotos, lifePhotos } = images.member;

  return (
    <div className="bg-background">
      {/* Hero 区域 */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={banner.url}
          alt={banner.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            {banner.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light">
            {banner.description}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 团队分组介绍 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              团队架构
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              各司其职，默契配合
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {photo.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 队员生活照 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              日常风采
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              工作中我们是战友，生活中我们是朋友
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifePhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[3/4]'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold mb-1">{photo.title}</h3>
                  <p className="text-white/80 text-sm">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 团队文化 */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 tracking-tight">
            我们的故事
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              在这里，没有等级之分，只有共同的目标。
              我们一起熬夜赶工，一起分享外卖，一起为每一个小进步欢呼。
            </p>
            <p>
              在这里，犯错是被允许的，因为我们知道，
              每一次失败都是通往成功的必经之路。
            </p>
            <p>
              在这里，你不仅能学到专业知识和动手能力，
              更能收获一群志同道合的朋友，以及一段难忘的青春记忆。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
