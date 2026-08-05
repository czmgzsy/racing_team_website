import { useSiteImages } from '@/contexts/SiteImagesContext';
import { Mail, MapPin, Phone } from 'lucide-react';

/**
 * 联系我们页面 - Apple 风格
 */
export default function ContactPage() {
  const { images } = useSiteImages();
  const { banner } = images.contact;

  const contactInfo = [
    {
      icon: Mail,
      title: '电子邮箱',
      value: 'baha@example.edu.cn',
      description: '工作时间24小时内回复',
    },
    {
      icon: Phone,
      title: '联系电话',
      value: 'xxx-xxxx-xxxx',
      description: '工作日 9:00 - 18:00',
    },
    {
      icon: MapPin,
      title: '车队地址',
      value: '合肥经济技术职业学院',
      description: '工程实训中心巴哈车队工作室',
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero 区域 */}
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden">
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

      {/* 联系方式 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              联系方式
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              有任何问题或合作意向，欢迎随时联系我们
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <info.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {info.title}
                </h3>
                <p className="text-lg text-primary font-medium mb-2">{info.value}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 留言表单 */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              给我们留言
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              填写下方表单，我们会尽快与您联系
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    电话
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="请输入您的电话"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="请输入您的邮箱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  主题
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                  <option>请选择咨询类型</option>
                  <option>招新咨询</option>
                  <option>商务合作</option>
                  <option>媒体采访</option>
                  <option>其他问题</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  留言内容
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  placeholder="请输入您想说的话..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity duration-300"
              >
                提交留言
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 地址地图占位 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              找到我们
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              欢迎来我们的工作室参观交流
            </p>
          </div>

          <div className="bg-muted rounded-2xl aspect-[21/9] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">合肥经济技术职业学院</p>
              <p className="text-muted-foreground text-sm">工程实训中心 巴哈车队工作室</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
