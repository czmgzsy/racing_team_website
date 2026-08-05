import { useSiteImages } from '@/contexts/SiteImagesContext';

/**
 * 赛事历程页 - Apple 风格
 * 时间线布局
 */
export default function CompetitionPage() {
  const { images } = useSiteImages();
  const { banner, timeline } = images.competition;

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

      {/* 时间线区域 */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              成长历程
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              每一步，都算数
            </p>
          </div>

          <div className="relative">
            {/* 时间线竖线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

            <div className="space-y-24">
              {timeline.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* 时间点 */}
                  <div className="absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 hidden md:block" />

                  {/* 图片 */}
                  <div className="w-full md:w-1/2">
                    <div className="group relative overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* 内容 */}
                  <div className="w-full md:w-1/2 md:px-8">
                    <div className={`${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                        阶段 {index + 1}
                      </span>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 赛事成绩展示 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              荣誉与成就
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              每一份荣誉，都是汗水的结晶
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-semibold text-primary mb-2">3</div>
              <div className="text-muted-foreground">参赛经历</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-semibold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">团队成员</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-semibold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">研发工时</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-semibold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">热爱与激情</div>
            </div>
          </div>
        </div>
      </section>

      {/* 展望未来 */}
      <section className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
            未完待续...
          </h2>
          <p className="text-background/70 text-lg leading-relaxed">
            我们的故事还在继续，
            <br />
            下一场赛事，下一个突破，
            <br />
            都在等待我们去书写。
          </p>
        </div>
      </section>
    </div>
  );
}
