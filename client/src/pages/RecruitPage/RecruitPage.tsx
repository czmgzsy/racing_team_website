import { useSiteImages } from '@/contexts/SiteImagesContext';
import { Mail, MapPin, Users, Wrench } from 'lucide-react';

/**
 * 招新页面 - Apple 风格
 */
export default function RecruitPage() {
  const { images } = useSiteImages();
  const { banner, gallery } = images.recruit;

  const departments = [
    {
      icon: Wrench,
      title: '技术组',
      description: '负责赛车整体设计、三维建模、结构分析与技术研发',
      requirements: ['机械/汽车相关专业', '熟练使用 CAD 软件', '有创新思维'],
    },
    {
      icon: Users,
      title: '制造组',
      description: '负责赛车加工制造、装配调试与维护保养',
      requirements: ['动手能力强', '吃苦耐劳', '有机械加工经验优先'],
    },
    {
      icon: Mail,
      title: '运营组',
      description: '负责车队宣传、活动策划、赞助商对接与财务管理',
      requirements: ['沟通能力强', '有文案/设计基础', '责任心强'],
    },
  ];

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

      {/* 为什么加入我们 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              为什么加入我们
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              这里不只是一个社团，更是你成长的平台
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">实践机会</h3>
              <p className="text-muted-foreground leading-relaxed">
                亲手参与赛车设计与制造，将理论知识转化为实际能力
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">团队协作</h3>
              <p className="text-muted-foreground leading-relaxed">
                结识志同道合的伙伴，培养团队协作与沟通能力
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">赛事经历</h3>
              <p className="text-muted-foreground leading-relaxed">
                有机会代表学校参加全国性赛事，开阔眼界，增长见识
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 招聘部门 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              招聘部门
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              总有一个位置适合你
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div
                key={dept.title}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
                  <dept.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {dept.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {dept.description}
                </p>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">我们希望你：</h4>
                  <ul className="space-y-2">
                    {dept.requirements.map((req, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 报名方式 */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
            如何加入我们
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            期待你的加入，一起创造更多可能
          </p>

          <div className="bg-card rounded-2xl p-10 shadow-sm">
            <div className="space-y-8">
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">添加招新咨询群</h3>
                  <p className="text-muted-foreground">扫码加入QQ/微信招新群，获取最新招新资讯</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">填写报名表</h3>
                  <p className="text-muted-foreground">在群文件中下载并填写报名表，发送至指定邮箱</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">参加面试</h3>
                  <p className="text-muted-foreground">我们会通知符合条件的同学参加面试</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-muted-foreground mb-4">咨询邮箱：baha@example.edu.cn</p>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity duration-300">
                立即报名
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
