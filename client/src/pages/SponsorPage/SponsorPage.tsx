import { useSiteImages } from '@/contexts/SiteImagesContext';
import { Handshake, TrendingUp, Users } from 'lucide-react';

/**
 * 赞助商页面 - Apple 风格
 */
export default function SponsorPage() {
  const { images } = useSiteImages();
  const { banner } = images.sponsor;

  const benefits = [
    {
      icon: TrendingUp,
      title: '品牌曝光',
      description: '赛车涂装、队服、宣传物料等多渠道品牌展示，覆盖赛事现场与线上传播',
    },
    {
      icon: Users,
      title: '精准触达',
      description: '直接触达高校学生群体，建立年轻消费者品牌认知，培养未来用户',
    },
    {
      icon: Handshake,
      title: '深度合作',
      description: '可定制化合作方案，从产品测试到技术交流，实现双赢价值',
    },
  ];

  const partners = [
    { name: '合作伙伴 A', level: '钻石赞助商' },
    { name: '合作伙伴 B', level: '白金赞助商' },
    { name: '合作伙伴 C', level: '黄金赞助商' },
    { name: '合作伙伴 D', level: '白银赞助商' },
    { name: '合作伙伴 E', level: '白银赞助商' },
    { name: '合作伙伴 F', level: '白银赞助商' },
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

      {/* 合作价值 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              合作价值
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              与我们合作，开启品牌新征程
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作伙伴展示 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              合作伙伴
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              感谢以下合作伙伴对我们的大力支持
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center aspect-[4/3] hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-muted-foreground text-2xl font-semibold">
                    {partner.name.charAt(partner.name.length - 1)}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作方案 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              合作方案
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              灵活多样的合作方式，总有一款适合您
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 白银赞助 */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border-2 border-border">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">白银赞助</h3>
                <p className="text-muted-foreground text-sm">基础合作方案</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  官网与宣传物料 logo 展示
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  社交媒体鸣谢
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  队服小 logo 印制
                </li>
              </ul>
            </div>

            {/* 黄金赞助 */}
            <div className="bg-card rounded-2xl p-8 shadow-md border-2 border-primary relative transform scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  推荐
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">黄金赞助</h3>
                <p className="text-muted-foreground text-sm">高性价比之选</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  包含白银赞助全部权益
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  赛车车身 logo 展示
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  赛事现场品牌曝光
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  年度合作证书
                </li>
              </ul>
            </div>

            {/* 钻石赞助 */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border-2 border-border">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">钻石赞助</h3>
                <p className="text-muted-foreground text-sm">深度战略合作</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  包含黄金赞助全部权益
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  主赞助商冠名权
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  定制化技术合作
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">✓</span>
                  校园招聘绿色通道
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 联系合作 */}
      <section className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
            期待与您合作
          </h2>
          <p className="text-background/70 text-lg mb-8">
            如需了解更多合作详情，请联系我们
          </p>
          <p className="text-background/70 mb-8">
            合作邮箱：sponsor@example.edu.cn
            <br />
            联系电话：xxx-xxxx-xxxx
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity duration-300">
            获取合作方案
          </button>
        </div>
      </section>
    </div>
  );
}
