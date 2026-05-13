export interface Experience {
  name: string;
  cn: string;
  img: string;
}

export interface ItineraryActivity {
  timeOfDay: string;
  description: string;
}

export interface ItineraryDay {
  title: string;
  img: string;
  alt: string;
  label: string;
  activities: ItineraryActivity[];
}

export interface CityData {
  slug: string;
  name: string;
  nameCn: string;
  tag: string;
  type: string[];
  heroImage: string;
  experiences: Experience[];
  itinerary: ItineraryDay[];
}

const cities: CityData[] = [
  {
    slug: "beijing",
    name: "Beijing",
    nameCn: "北京",
    tag: "Ancient Capital, Modern Heartbeat",
    type: ["History & Culture", "Urban", "Food"],
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80",
    experiences: [
      { name: "Forbidden City", cn: "故宫", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Great Wall", cn: "长城", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Temple of Heaven", cn: "天坛", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Summer Palace", cn: "颐和园", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Nanluoguxiang", cn: "南锣鼓巷", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Peking Duck", cn: "北京烤鸭", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Imperial Grandeur",
        img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80",
        alt: "Forbidden City",
        label: "🏯 Forbidden City",
        activities: [
          { timeOfDay: "Morning", description: "Forbidden City (¥60, book 7 days ahead)" },
          { timeOfDay: "Afternoon", description: "Jingshan Park for panoramic views" },
          { timeOfDay: "Evening", description: "Wangfujing Night Market" },
        ],
      },
      {
        title: "Day 2: The Great Wall",
        img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
        alt: "Great Wall",
        label: "🧱 Great Wall",
        activities: [
          { timeOfDay: "Full Day", description: "Badaling Great Wall (¥40, leave by 7am)" },
          { timeOfDay: "Transport", description: "HSR from Qinghe Station to Badaling (20min)" },
        ],
      },
      {
        title: "Day 3: Temples & Hutongs",
        img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=800&q=80",
        alt: "Temple of Heaven",
        label: "⛩️ Temple of Heaven",
        activities: [
          { timeOfDay: "Morning", description: "Temple of Heaven (¥34)" },
          { timeOfDay: "Afternoon", description: "Summer Palace (¥30)" },
          { timeOfDay: "Evening", description: "Nanluoguxiang hutongs + local dinner" },
        ],
      },
    ],
  },
  {
    slug: "shanghai",
    name: "Shanghai",
    nameCn: "上海",
    tag: "The Pearl of the Orient",
    type: ["Urban", "Food", "Technology"],
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80",
    experiences: [
      { name: "The Bund", cn: "外滩", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Shanghai Museum", cn: "上海博物馆", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Oriental Pearl", cn: "东方明珠", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Yu Garden", cn: "豫园", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Wukang Road", cn: "武康路", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Soup Dumplings", cn: "小笼包", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: The Bund & Old Shanghai",
        img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80",
        alt: "The Bund",
        label: "🌉 The Bund",
        activities: [
          { timeOfDay: "Morning", description: "The Bund (Free — best at dusk, but the morning light is gorgeous too)" },
          { timeOfDay: "Afternoon", description: "Yu Garden (¥30, grab Nanxiang soup dumplings nearby)" },
          { timeOfDay: "Evening", description: "Nanjing Road pedestrian street + Huangpu Ferry night cruise" },
        ],
      },
      {
        title: "Day 2: Modern Shanghai",
        img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=800&q=80",
        alt: "Shanghai Museum",
        label: "🏛️ Shanghai Museum",
        activities: [
          { timeOfDay: "Morning", description: "Shanghai Museum (Free, book via WeChat mini-program 3 days ahead)" },
          { timeOfDay: "Afternoon", description: "Oriental Pearl Tower (¥199, book via Trip.com)" },
          { timeOfDay: "Evening", description: "Lujiazui skyline walk + dinner in the French Concession" },
        ],
      },
      {
        title: "Day 3: Culture & Food",
        img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
        alt: "Wukang Road",
        label: "🌳 Wukang Road",
        activities: [
          { timeOfDay: "Morning", description: "Wukang Road stroll (Free, great cafes and photo spots)" },
          { timeOfDay: "Afternoon", description: "Soup dumplings at Jia Jia Tang Bao (¥15-30) + Tianzifang craft market" },
          { timeOfDay: "Evening", description: "Shanghai-style cuisine at Lu Bo Lang (¥80-150/person)" },
        ],
      },
    ],
  },
  {
    slug: "guangzhou",
    name: "Guangzhou",
    nameCn: "广州",
    tag: "Cantonese Food Capital",
    type: ["Food", "Urban"],
    heroImage: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=1200&q=80",
    experiences: [
      { name: "Canton Tower", cn: "广州塔", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Chen Clan Academy", cn: "陈家祠", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Shangxiajiu Street", cn: "上下九步行街", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Shamian Island", cn: "沙面岛", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Baiyun Mountain", cn: "白云山", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Dim Sum", cn: "点心", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Canton Tower & Pearl River",
        img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=800&q=80",
        alt: "Canton Tower",
        label: "🗼 Canton Tower",
        activities: [
          { timeOfDay: "Afternoon", description: "Canton Tower (¥150, visit at sunset for the best views)" },
          { timeOfDay: "Evening", description: "Shangxiajiu Pedestrian Street (Free, best for Cantonese snacks)" },
          { timeOfDay: "Night", description: "Pearl River night cruise — the LED light show runs 7-10pm" },
        ],
      },
      {
        title: "Day 2: History & Culture",
        img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
        alt: "Chen Clan Academy",
        label: "🏛️ Chen Clan Academy",
        activities: [
          { timeOfDay: "Morning", description: "Chen Clan Academy (¥10, don’t miss the rooftop ceramics)" },
          { timeOfDay: "Afternoon", description: "Shamian Island (Free, rent a bike for colonial-era architecture)" },
          { timeOfDay: "Evening", description: "Dim Sum at Tao Tao Ju (¥50-100/person)" },
        ],
      },
      {
        title: "Day 3: Nature & Food",
        img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=800&q=80",
        alt: "Baiyun Mountain",
        label: "⛰️ Baiyun Mountain",
        activities: [
          { timeOfDay: "Morning", description: "Baiyun Mountain (¥5, take cable car up ¥25, morning is cooler)" },
          { timeOfDay: "Afternoon", description: "Char Siu at Bing Sheng (¥40-80) + Wonton Noodles at Bao Yuan Dian (¥15-25)" },
          { timeOfDay: "Evening", description: "Claypot Rice at Superstar (¥20-40)" },
        ],
      },
    ],
  },
  {
    slug: "xian",
    name: "Xi’an",
    nameCn: "西安",
    tag: "Ancient Capital of 13 Dynasties",
    type: ["History & Culture", "Food"],
    heroImage: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=1200&q=80",
    experiences: [
      { name: "Terracotta Warriors", cn: "兵马俑", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Xi’an City Wall", cn: "西安城墙", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Muslim Quarter", cn: "回民街", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Big Wild Goose Pagoda", cn: "大雁塔", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Mount Huashan", cn: "华山", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Biang Biang Noodles", cn: "裤带面", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Terracotta Warriors",
        img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
        alt: "Terracotta Warriors",
        label: "🏺 Terracotta Warriors",
        activities: [
          { timeOfDay: "Morning", description: "Terracotta Warriors (¥120, book 7 days ahead, go straight to Pit 1)" },
          { timeOfDay: "Transport", description: "Bus 306 from Xi’an Railway Station (¥7, 1h ride)" },
          { timeOfDay: "Evening", description: "Muslim Quarter (Free — legendary food street for dinner)" },
        ],
      },
      {
        title: "Day 2: City Wall & Culture",
        img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=800&q=80",
        alt: "Xi’an City Wall",
        label: "🧱 Xi’an City Wall",
        activities: [
          { timeOfDay: "Morning", description: "Xi’an City Wall (¥54, rent a bike ¥45 and cycle the full 14km at golden hour)" },
          { timeOfDay: "Afternoon", description: "Big Wild Goose Pagoda (¥50, night fountain show at 8pm)" },
          { timeOfDay: "Evening", description: "Yangrou Paomo at Tongsheng Xiang (¥25-40)" },
        ],
      },
      {
        title: "Day 3: Mountain & Noodles",
        img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
        alt: "Biang Biang Noodles",
        label: "🍜 Biang Biang Noodles",
        activities: [
          { timeOfDay: "Optional", description: "Mount Huashan day trip (¥160, HSR from Xi’an North 30min ¥54)" },
          { timeOfDay: "Afternoon", description: "Biang Biang Noodles at Old Wang’s (¥15-25) + Liangpi (¥8-15)" },
          { timeOfDay: "Evening", description: "Suan Tang Jiaozi at De Fa Chang (¥30-60)" },
        ],
      },
    ],
  },
  {
    slug: "chengdu",
    name: "Chengdu",
    nameCn: "成都",
    tag: "Panda Sanctuary & Slow Living",
    type: ["Food", "Leisure", "Nature"],
    heroImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
    experiences: [
      { name: "Panda Base", cn: "大熊猫基地", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Jinli Ancient Street", cn: "锦里古街", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Wuhou Shrine", cn: "武侯祠", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Dujiangyan", cn: "都江堰", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Leshan Giant Buddha", cn: "乐山大佛", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Sichuan Hotpot", cn: "四川火锅", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Pandas & Ancient Streets",
        img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=800&q=80",
        alt: "Panda Base",
        label: "🐼 Panda Base",
        activities: [
          { timeOfDay: "Morning", description: "Panda Base (¥55, arrive by 8am — pandas are most active in the morning)" },
          { timeOfDay: "Transport", description: "Metro Line 3, Panda Avenue Station + shuttle bus" },
          { timeOfDay: "Evening", description: "Jinli Ancient Street (Free, best when red lanterns light up)" },
        ],
      },
      {
        title: "Day 2: History & Engineering",
        img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
        alt: "Wuhou Shrine",
        label: "⛩️ Wuhou Shrine",
        activities: [
          { timeOfDay: "Morning", description: "Wuhou Shrine (¥50, the red wall corridor is the most photogenic spot)" },
          { timeOfDay: "Afternoon", description: "Dujiangyan Irrigation System (¥80, HSR 30min ¥30 — 2,200-year-old marvel)" },
          { timeOfDay: "Evening", description: "Mapo Tofu at Chen Mapo Tofu (¥25-35) + Dan Dan Noodles (¥10-15)" },
        ],
      },
      {
        title: "Day 3: Buddha & Hotpot",
        img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80",
        alt: "Leshan Giant Buddha",
        label: "🗿 Leshan Giant Buddha",
        activities: [
          { timeOfDay: "Full Day", description: "Leshan Giant Buddha (¥80, take the boat ¥70 for the full view)" },
          { timeOfDay: "Transport", description: "HSR from Chengdu South to Leshan (45min, ¥54)" },
          { timeOfDay: "Evening", description: "Sichuan Hotpot at Huangcheng Laoma (¥80-150/person)" },
        ],
      },
    ],
  },
  {
    slug: "chongqing",
    name: "Chongqing",
    nameCn: "重庆",
    tag: "8D Futuristic Mountain City",
    type: ["Food", "Urban", "Nature"],
    heroImage: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=1200&q=80",
    experiences: [
      { name: "Hongya Cave", cn: "洪崖洞", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Yangtze Cableway", cn: "长江索道", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Ciqikou Ancient Town", cn: "磁器口古镇", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Jiefangbei", cn: "解放碑", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Wulong Bridges", cn: "武隆天生三桥", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Chongqing Hotpot", cn: "重庆火锅", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Cyberpunk City",
        img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
        alt: "Hongya Cave",
        label: "🏮 Hongya Cave",
        activities: [
          { timeOfDay: "Afternoon", description: "Hongya Cave (Free, go at dusk for illuminated skyline — take the elevator from Floor 1 to Floor 11)" },
          { timeOfDay: "Evening", description: "Yangtze River Cableway (¥20, ride south-to-north for the best views)" },
          { timeOfDay: "Night", description: "Jiefangbei area (Free, hidden hotpot joints in the alleyways)" },
        ],
      },
      {
        title: "Day 2: Ancient Town & Hotpot",
        img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
        alt: "Ciqikou",
        label: "🏘️ Ciqikou Ancient Town",
        activities: [
          { timeOfDay: "Morning", description: "Ciqikou Ancient Town (Free, go on a weekday to avoid crowds)" },
          { timeOfDay: "Afternoon", description: "Chongqing Noodles (Xiaomian) at any street stall (¥10-15)" },
          { timeOfDay: "Evening", description: "Chongqing Hotpot at Peijie Old Hotpot (¥80-150/person)" },
        ],
      },
      {
        title: "Day 3: Nature Excursion",
        img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80",
        alt: "Wulong",
        label: "🌉 Wulong Three Natural Bridges",
        activities: [
          { timeOfDay: "Full Day", description: "Wulong Three Natural Bridges (¥125, filming location for Transformers 4)" },
          { timeOfDay: "Transport", description: "Bus or train from city center to Wulong (2-2.5h)" },
          { timeOfDay: "Evening", description: "Hot & Sour Rice Noodles at Hao You Lai (¥12-18) + Jianghu Cuisine (¥60-120)" },
        ],
      },
    ],
  },
  {
    slug: "guilin",
    name: "Guilin",
    nameCn: "桂林",
    tag: "Legendary Karst Landscapes",
    type: ["Nature & Scenery", "Leisure"],
    heroImage: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80",
    experiences: [
      { name: "Li River Cruise", cn: "漓江", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Yangshuo West Street", cn: "阳朔西街", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Longji Rice Terraces", cn: "龙脊梯田", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Elephant Trunk Hill", cn: "象鼻山", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Reed Flute Cave", cn: "芦笛岩", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Guilin Rice Noodles", cn: "桂林米粉", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Li River & Yangshuo",
        img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
        alt: "Li River",
        label: "🚢 Li River Cruise",
        activities: [
          { timeOfDay: "Morning", description: "Li River Cruise (¥320, Guilin-Yangshuo — misty karst views at dawn are legendary)" },
          { timeOfDay: "Transport", description: "Bus from Guilin to Mopanshan Pier (¥20)" },
          { timeOfDay: "Evening", description: "Yangshuo West Street (Free, explore on e-bike ¥40/day)" },
        ],
      },
      {
        title: "Day 2: Longji Rice Terraces",
        img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80",
        alt: "Longji Rice Terraces",
        label: "🌾 Longji Rice Terraces",
        activities: [
          { timeOfDay: "Full Day", description: "Longji Rice Terraces (¥80, best in May-June or September-October)" },
          { timeOfDay: "Transport", description: "Bus from Guilin to Longji (2.5h, ¥65)" },
          { timeOfDay: "Stay", description: "Yao minority guesthouse among the terraces for an unforgettable sunrise" },
        ],
      },
      {
        title: "Day 3: City Highlights",
        img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=800&q=80",
        alt: "Elephant Trunk Hill",
        label: "🐘 Elephant Trunk Hill",
        activities: [
          { timeOfDay: "Morning", description: "Elephant Trunk Hill (¥55, best photo from across the river)" },
          { timeOfDay: "Afternoon", description: "Reed Flute Cave (¥90, colorful stalactites, cool inside even in summer)" },
          { timeOfDay: "Evening", description: "Guilin Rice Noodles at Rice Noodle Street (¥8-15) + Beer Fish at Xie Sanjie’s (¥50-80)" },
        ],
      },
    ],
  },
  {
    slug: "lijiang",
    name: "Lijiang",
    nameCn: "丽江",
    tag: "Ancient Town & Hidden Paradise",
    type: ["Culture", "Nature", "Leisure"],
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80",
    experiences: [
      { name: "Old Town of Lijiang", cn: "丽江古城", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Jade Dragon Mountain", cn: "玉龙雪山", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Tiger Leaping Gorge", cn: "虎跳峡", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Shuhe Ancient Town", cn: "束河古镇", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Lashihai Lake", cn: "拉市海", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Crossing Bridge Noodles", cn: "过桥米线", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Old Town Charm",
        img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80",
        alt: "Old Town of Lijiang",
        label: "🏘️ Old Town of Lijiang",
        activities: [
          { timeOfDay: "Morning", description: "Old Town of Lijiang (Free, wander the canals at dawn before the crowds)" },
          { timeOfDay: "Afternoon", description: "Shuhe Ancient Town (Free, quieter and more authentic than Dayan)" },
          { timeOfDay: "Evening", description: "Crossing Bridge Noodles at Naxi Family Restaurant (¥25-45) + Naxi Cuisine (¥50-80)" },
        ],
      },
      {
        title: "Day 2: Snow Mountain Adventure",
        img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=800&q=80",
        alt: "Jade Dragon Snow Mountain",
        label: "🏔️ Jade Dragon Snow Mountain",
        activities: [
          { timeOfDay: "Full Day", description: "Jade Dragon Snow Mountain (¥100 + ¥120 cable car, book 3 days ahead on WeChat)" },
          { timeOfDay: "Transport", description: "Bus from Old Town (1h, ¥20) or Didi (¥100)" },
          { timeOfDay: "Tip", description: "Oxygen cans sold at base (¥20) — take the cable car up, walk down slowly" },
        ],
      },
      {
        title: "Day 3: Gorge & Lake",
        img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
        alt: "Tiger Leaping Gorge",
        label: "🏞️ Tiger Leaping Gorge",
        activities: [
          { timeOfDay: "Morning", description: "Tiger Leaping Gorge (¥45, one of the world’s deepest gorges)" },
          { timeOfDay: "Transport", description: "Bus from Lijiang (2h, ¥60) — upper trail is doable in a day" },
          { timeOfDay: "Afternoon", description: "Lashihai Lake (Free, horse riding ¥200-300 for 2h)" },
        ],
      },
    ],
  },
  {
    slug: "hangzhou",
    name: "Hangzhou",
    nameCn: "杭州",
    tag: "Picturesque Water Town",
    type: ["Nature", "Leisure", "History & Culture"],
    heroImage: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=1200&q=80",
    experiences: [
      { name: "West Lake", cn: "西湖", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
      { name: "Lingyin Temple", cn: "灵隐寺", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Longjing Tea Village", cn: "龙井村", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Hefang Street", cn: "河坊街", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Xixi Wetland Park", cn: "西溪湿地", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Dongpo Pork", cn: "东坡肉", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: West Lake & Tea Culture",
        img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=800&q=80",
        alt: "West Lake",
        label: "🌊 West Lake",
        activities: [
          { timeOfDay: "Morning", description: "West Lake (Free, rent a bike and cycle the 10km lake loop)" },
          { timeOfDay: "Afternoon", description: "Longjing Tea Village (Free, visit a plantation for tea tasting)" },
          { timeOfDay: "Transport", description: "Bus 27 from West Lake area (30min) to Longjing Village" },
        ],
      },
      {
        title: "Day 2: Temples & Streets",
        img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
        alt: "Lingyin Temple",
        label: "⛩️ Lingyin Temple",
        activities: [
          { timeOfDay: "Morning", description: "Lingyin Temple (¥45, the flying peak grottoes are just as impressive as the temple)" },
          { timeOfDay: "Afternoon", description: "Hefang Street (Free, try the stinky tofu — it’s surprisingly good)" },
          { timeOfDay: "Evening", description: "Dongpo Pork at Lou Wai Lou (¥60-100)" },
        ],
      },
      {
        title: "Day 3: Wetlands & Food",
        img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=800&q=80",
        alt: "Xixi Wetland",
        label: "🌿 Xixi Wetland Park",
        activities: [
          { timeOfDay: "Morning", description: "Xixi Wetland Park (¥80, take the boat tour through the waterways)" },
          { timeOfDay: "Afternoon", description: "Longjing Shrimp at Grandma’s House (¥80-120) + Beggar’s Chicken (¥70-100)" },
          { timeOfDay: "Evening", description: "West Lake Vinegar Fish at Zhi Wei Guan (¥60-90)" },
        ],
      },
    ],
  },
  {
    slug: "kunming",
    name: "Kunming",
    nameCn: "昆明",
    tag: "Spring City, Gateway to Yunnan",
    type: ["Nature & Scenery", "Culture", "Leisure"],
    heroImage: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=1200&q=80",
    experiences: [
      { name: "Stone Forest", cn: "石林", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
      { name: "Dianchi Lake", cn: "滇池", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
      { name: "Flower & Bird Market", cn: "花鸟市场", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
      { name: "Yuantong Temple", cn: "圆通寺", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
      { name: "Dongchuan Red Land", cn: "东川红土地", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
      { name: "Crossing Bridge Noodles", cn: "过桥米线", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
    ],
    itinerary: [
      {
        title: "Day 1: Stone Forest Adventure",
        img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
        alt: "Stone Forest",
        label: "🪨 Stone Forest",
        activities: [
          { timeOfDay: "Full Day", description: "Stone Forest (Shilin) — ¥130, UNESCO site with surreal karst formations" },
          { timeOfDay: "Transport", description: "HSR from Kunming South to Shilin West (20min, ¥18)" },
          { timeOfDay: "Tip", description: "Take the electric cart (¥25) to save walking" },
        ],
      },
      {
        title: "Day 2: City & Lake",
        img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=800&q=80",
        alt: "Dianchi Lake",
        label: "🌊 Dianchi Lake",
        activities: [
          { timeOfDay: "Morning", description: "Dianchi Lake & Western Hills (Free, cable car ¥70 for panoramic views)" },
          { timeOfDay: "Afternoon", description: "Yuantong Temple (¥6, oldest Buddhist temple in Kunming, peaceful carp pond)" },
          { timeOfDay: "Evening", description: "Flower & Bird Market (Free, Kunming is China’s flower capital)" },
        ],
      },
      {
        title: "Day 3: Nature & Food",
        img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80",
        alt: "Dongchuan Red Land",
        label: "🌅 Dongchuan Red Land",
        activities: [
          { timeOfDay: "Optional", description: "Dongchuan Red Land (Free, best in November — bus 4h ¥80)" },
          { timeOfDay: "Afternoon", description: "Crossing Bridge Noodles at Jian Xing Yuan (¥20-50) + Steam Pot Chicken (¥50-80)" },
          { timeOfDay: "Evening", description: "Flower Cake at Panxianglou (¥5-10) + Erkuai from street stalls (¥8-15)" },
        ],
      },
    ],
  },
];

export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}

export default cities;
