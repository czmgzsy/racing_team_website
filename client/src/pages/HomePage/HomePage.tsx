import { NavLink } from 'react-router-dom';
import { useSiteImages } from '@/contexts/SiteImagesContext';
import { ChevronRight } from 'lucide-react';

/**
 * 首页 - Apple 风格设计
 * 大留白 + 毛玻璃 + 纤细字体 + 全宽大图
 */
export default function HomePage() {
  const { images } = useSiteImages();
  const { hero, features, gallery } = images.home;

  return (
    <div className="bg-background">
      {/* Hero 区域 - 全宽大图，居中文字 */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <img
          src={hero.url}
          alt={hero.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 半透明遮罩，确保文字可读 */}
        <div className="absolute inset-0 bg-black/30" />
        {/* 居中文字 */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-white mb-4 tracking-tight">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 font-light">
            {hero.description}
          </p>
          <NavLink
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            了解更多
            <ChevronRight size={18} />
          </NavLink>
        </div>
        {/* 底部渐变过渡 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 特色展示区域 - 三列卡片，Apple 风格 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              为什么选择我们
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              专业、专注、专心，我们用工程实力诠释速度与激情
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={feature.url}
                    alt={feature.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 图片画廊区域 - 大图展示 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              精彩瞬间
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              记录我们奋斗的每一个时刻
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 各板块入口区域 - Apple 风格导航卡片 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              探索更多
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              了解我们的赛车、团队与赛事
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 赛车展示 */}
            <NavLink
              to="/racecar"
              className="group relative h-80 overflow-hidden rounded-2xl"
            >
              <img
                src={images.racecar.gallery[0]?.url || '/images/img_812.jpg'}
                alt="赛车展示"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">赛车展示</h3>
                <p className="text-white/80 mb-4">探索我们的战车设计与技术细节</p>
                <span className="inline-flex items-center gap-1 text-sm">
                  了解更多 <ChevronRight size={16} />
                </span>
              </div>
            </NavLink>

            {/* 队员风采 */}
            <NavLink
              to="/member"
              className="group relative h-80 overflow-hidden rounded-2xl"
            >
              <img
                src={images.member.teamPhotos[0]?.url || '/images/img_807.jpg'}
                alt="队员风采"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">队员风采</h3>
                <p className="text-white/80 mb-4">认识这群热爱工程的年轻人</p>
                <span className="inline-flex items-center gap-1 text-sm">
                  了解更多 <ChevronRight size={16} />
                </span>
              </div>
            </NavLink>

            {/* 赛事历程 */}
            <NavLink
              to="/competition"
              className="group relative h-80 overflow-hidden rounded-2xl"
            >
              <img
                src={images.competition.timeline[0]?.url || '/images/img_796.jpg'}
                alt="赛事历程"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">赛事历程</h3>
                <p className="text-white/80 mb-4">回顾我们的征程与荣耀</p>
                <span className="inline-flex items-center gap-1 text-sm">
                  了解更多 <ChevronRight size={16} />
                </span>
              </div>
            </NavLink>

            {/* 加入我们 */}
            <NavLink
              to="/recruit"
              className="group relative h-80 overflow-hidden rounded-2xl"
            >
              <img
                src={images.recruit.gallery[0]?.url || '/images/img_811.jpg'}
                alt="加入我们"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">加入我们</h3>
                <p className="text-white/80 mb-4">成为车队的一员，开启你的工程梦想</p>
                <span className="inline-flex items-center gap-1 text-sm">
                  了解更多 <ChevronRight size={16} />
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
            准备好加入我们了吗？
          </h2>
          <p className="text-background/70 text-lg mb-8">
            无论你是技术达人还是创意新星，这里都有属于你的舞台
          </p>
          <NavLink
            to="/recruit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity duration-300"
          >
            立即报名
            <ChevronRight size={18} />
          </NavLink>
        </div>
      </section>
    </div>
  );
}
