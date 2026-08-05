import { useSiteImages } from '@/contexts/SiteImagesContext';

/**
 * 车队介绍页 - Apple 风格
 */
export default function AboutPage() {
  const { images } = useSiteImages();
  const { banner, teamPhotos, workshop } = images.about;

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

      {/* 车队简介 */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 tracking-tight">
            我们是谁
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              合肥经济技术职业学院巴哈车队成立于对汽车工程的热爱与追求。
              我们是一支由在校学生组成的年轻团队，专注于巴哈越野车的设计、制造与参赛。
            </p>
            <p>
              车队汇聚了来自机械、电子、汽车等多个专业的优秀学子，
              在专业老师的指导下，我们从零开始，亲手打造属于自己的赛车。
            </p>
            <p>
              我们相信，工程不仅是技术，更是梦想与激情的载体。
              每一次焊接、每一次调试、每一次失败与重来，都是我们成长的印记。
            </p>
          </div>
        </div>
      </section>

      {/* 团队照片展示 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              团队协作
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              一个人可以走得很快，一群人才能走得更远
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
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

      {/* 实验室与设备 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              专业设施
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              完善的实验设备，为创意提供无限可能
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshop.map((item, index) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 理念与价值观 */}
      <section className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              我们的理念
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-semibold mb-4 text-primary">01</div>
              <h3 className="text-xl font-semibold mb-3">匠心</h3>
              <p className="text-background/70 leading-relaxed">
                精益求精，追求卓越。每一个细节都倾注我们的心血。
              </p>
            </div>
            <div>
              <div className="text-5xl font-semibold mb-4 text-primary">02</div>
              <h3 className="text-xl font-semibold mb-3">协作</h3>
              <p className="text-background/70 leading-relaxed">
                团队的力量大于个人。我们彼此信任，共同成长。
              </p>
            </div>
            <div>
              <div className="text-5xl font-semibold mb-4 text-primary">03</div>
              <h3 className="text-xl font-semibold mb-3">创新</h3>
              <p className="text-background/70 leading-relaxed">
                勇于尝试，敢于突破。在实践中探索最优解。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
