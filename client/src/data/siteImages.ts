/**
 * 网站图片配置
 * 所有页面的图片都集中在这里管理，方便后台统一修改
 */

export interface ImageItem {
  id: string;
  url: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SiteImagesConfig {
  // Logo 配置
  logos: {
    schoolLogo: ImageItem;
    teamLogo: ImageItem;
  };

  // 首页
  home: {
    hero: ImageItem;
    features: ImageItem[];
    gallery: ImageItem[];
  };

  // 车队介绍
  about: {
    banner: ImageItem;
    teamPhotos: ImageItem[];
    workshop: ImageItem[];
  };

  // 赛车展示
  racecar: {
    hero: ImageItem;
    gallery: ImageItem[];
    details: ImageItem[];
  };

  // 赛事历程
  competition: {
    banner: ImageItem;
    timeline: ImageItem[];
  };

  // 队员风采
  member: {
    banner: ImageItem;
    teamPhotos: ImageItem[];
    lifePhotos: ImageItem[];
  };

  // 招新
  recruit: {
    banner: ImageItem;
    gallery: ImageItem[];
  };

  // 赞助商
  sponsor: {
    banner: ImageItem;
  };

  // 联系我们
  contact: {
    banner: ImageItem;
  };
}

/**
 * 默认图片配置
 * 使用本地图片作为初始默认值
 */
export const defaultSiteImages: SiteImagesConfig = {
  logos: {
    schoolLogo: {
      id: 'school-logo',
      url: '/images/school_logo.png',
      alt: '合肥经济技术职业学院校徽',
    },
    teamLogo: {
      id: 'team-logo',
      url: '/images/team_logo.png',
      alt: '巴哈车队队徽',
    },
  },

  home: {
    hero: {
      id: 'home-hero',
      url: '/images/img_812.jpg',
      alt: '巴哈赛车整车展示',
      title: '速度与激情，工程与梦想',
      description: '合肥经济技术职业学院巴哈车队',
    },
    features: [
      {
        id: 'home-feature-1',
        url: '/images/img_799.jpg',
        alt: '赛车悬挂系统细节',
        title: '精密工程',
        description: '每一个零件都经过精心设计与调校',
      },
      {
        id: 'home-feature-2',
        url: '/images/img_807.jpg',
        alt: '团队协作造车',
        title: '团队协作',
        description: '汇聚各专业精英，共同打造卓越赛车',
      },
      {
        id: 'home-feature-3',
        url: '/images/img_801.jpg',
        alt: '夜间调试赛车',
        title: '日夜兼程',
        description: '为了梦想，我们从不停止前进的脚步',
      },
    ],
    gallery: [
      {
        id: 'home-gallery-1',
        url: '/images/img_798.jpg',
        alt: '赛车户外调试',
      },
      {
        id: 'home-gallery-2',
        url: '/images/img_804.jpg',
        alt: '赛车前悬挂细节',
      },
      {
        id: 'home-gallery-3',
        url: '/images/img_809.jpg',
        alt: '发动机安装',
      },
      {
        id: 'home-gallery-4',
        url: '/images/img_811.jpg',
        alt: '实验室工作场景',
      },
    ],
  },

  about: {
    banner: {
      id: 'about-banner',
      url: '/images/img_807.jpg',
      alt: '团队协作造车场景',
      title: '关于我们',
      description: '一支充满激情与创造力的年轻团队',
    },
    teamPhotos: [
      {
        id: 'about-team-1',
        url: '/images/img_807.jpg',
        alt: '团队集体造车',
        title: '齐心协力',
        description: '来自不同专业的我们，因为同一个梦想聚在一起',
      },
      {
        id: 'about-team-2',
        url: '/images/img_808.jpg',
        alt: '团队工作场景',
        title: '专注投入',
        description: '每一个细节都倾注了我们的心血与热情',
      },
    ],
    workshop: [
      {
        id: 'about-workshop-1',
        url: '/images/img_812.jpg',
        alt: '实验室全景',
        title: '专业实验室',
        description: '配备完善的工程实验室，支持全方位研发',
      },
      {
        id: 'about-workshop-2',
        url: '/images/img_802.jpg',
        alt: '夜间工作场景',
        title: '日夜奋战',
        description: '为了共同的目标，我们日夜兼程',
      },
    ],
  },

  racecar: {
    hero: {
      id: 'racecar-hero',
      url: '/images/img_798.jpg',
      alt: '巴哈赛车整车',
      title: '赛车展示',
      description: '匠心打造，每一处都是工程美学',
    },
    gallery: [
      {
        id: 'racecar-gallery-1',
        url: '/images/img_812.jpg',
        alt: '赛车实验室全景',
      },
      {
        id: 'racecar-gallery-2',
        url: '/images/img_798.jpg',
        alt: '赛车户外展示',
      },
      {
        id: 'racecar-gallery-3',
        url: '/images/img_804.jpg',
        alt: '赛车前悬挂',
      },
      {
        id: 'racecar-gallery-4',
        url: '/images/img_805.jpg',
        alt: '赛车前部细节',
      },
    ],
    details: [
      {
        id: 'racecar-detail-1',
        url: '/images/img_799.jpg',
        alt: '悬挂系统细节',
        title: '高性能悬挂',
        description: '专业越野悬挂系统，应对各种复杂路况',
      },
      {
        id: 'racecar-detail-2',
        url: '/images/img_809.jpg',
        alt: '发动机细节',
        title: '强劲动力',
        description: '经过精心调校的发动机，提供澎湃动力',
      },
      {
        id: 'racecar-detail-3',
        url: '/images/img_804.jpg',
        alt: '减震器细节',
        title: '精准调校',
        description: '每一个参数都经过反复测试与优化',
      },
    ],
  },

  competition: {
    banner: {
      id: 'competition-banner',
      url: '/images/img_801.jpg',
      alt: '夜间调试赛车',
      title: '赛事历程',
      description: '每一次出征，都是对自我的超越',
    },
    timeline: [
      {
        id: 'competition-1',
        url: '/images/img_796.jpg',
        alt: '赛车组装',
        title: '赛车组装阶段',
        description: '从零开始，亲手打造我们的战车',
      },
      {
        id: 'competition-2',
        url: '/images/img_807.jpg',
        alt: '团队调试',
        title: '调试优化阶段',
        description: '反复测试，不断优化每一个性能参数',
      },
      {
        id: 'competition-3',
        url: '/images/img_801.jpg',
        alt: '夜间奋战',
        title: '赛前冲刺',
        description: '日夜兼程，只为赛场那一刻的绽放',
      },
    ],
  },

  member: {
    banner: {
      id: 'member-banner',
      url: '/images/img_811.jpg',
      alt: '队员工作场景',
      title: '队员风采',
      description: '一群热爱工程、追逐梦想的年轻人',
    },
    teamPhotos: [
      {
        id: 'member-team-1',
        url: '/images/img_807.jpg',
        alt: '团队工作照',
        title: '技术组',
        description: '负责赛车设计与技术研发',
      },
      {
        id: 'member-team-2',
        url: '/images/img_808.jpg',
        alt: '团队协作',
        title: '制造组',
        description: '负责赛车制造与装配调试',
      },
      {
        id: 'member-team-3',
        url: '/images/img_796.jpg',
        alt: '队员调试赛车',
        title: '测试组',
        description: '负责赛车测试与性能优化',
      },
    ],
    lifePhotos: [
      {
        id: 'member-life-1',
        url: '/images/img_800.jpg',
        alt: '队员开心大笑',
        title: '欢乐时光',
        description: '工作之余，我们也是一群快乐的年轻人',
      },
      {
        id: 'member-life-2',
        url: '/images/img_794.jpg',
        alt: '队员休息',
        title: '累并快乐着',
        description: '疲惫的身影，是奋斗最美的印记',
      },
      {
        id: 'member-life-3',
        url: '/images/img_810.jpg',
        alt: '队员休息',
        title: '片刻休憩',
        description: '短暂的休息，是为了更好地出发',
      },
    ],
  },

  recruit: {
    banner: {
      id: 'recruit-banner',
      url: '/images/img_811.jpg',
      alt: '实验室场景',
      title: '加入我们',
      description: '在这里，开启你的工程梦想之旅',
    },
    gallery: [
      {
        id: 'recruit-gallery-1',
        url: '/images/img_807.jpg',
        alt: '团队协作',
      },
      {
        id: 'recruit-gallery-2',
        url: '/images/img_796.jpg',
        alt: '动手实践',
      },
      {
        id: 'recruit-gallery-3',
        url: '/images/img_800.jpg',
        alt: '欢乐氛围',
      },
      {
        id: 'recruit-gallery-4',
        url: '/images/img_812.jpg',
        alt: '专业设备',
      },
    ],
  },

  sponsor: {
    banner: {
      id: 'sponsor-banner',
      url: '/images/img_812.jpg',
      alt: '赛车展示',
      title: '合作伙伴',
      description: '感谢每一位支持我们的伙伴',
    },
  },

  contact: {
    banner: {
      id: 'contact-banner',
      url: '/images/img_798.jpg',
      alt: '赛车户外展示',
      title: '联系我们',
      description: '期待与您的交流与合作',
    },
  },
};

export default defaultSiteImages;
