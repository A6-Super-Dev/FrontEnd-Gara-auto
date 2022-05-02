export interface TeamAttributes {
  name: string;
  description: string;
  facebookLink: string;
  shortHand: string;
}

export interface BrandAttributes {
  img: string;
  name: string;
  description: string;
}

export interface CarOfBrandAttributes {
  img: string;
  name: string;
  price: string;
  seat: number;
}

export const OUR_TEAMS: TeamAttributes[] = [
  {
    name: 'Nguyễn Đức Quang',
    description: 'Team lead, Frontend Developer, Dev-ops',
    facebookLink: 'https://www.facebook.com/profile.php?id=100080053136869',
    shortHand: 'Quang',
  },
  {
    name: 'Bùi Trung Hùng',
    description: 'Data design, Data fetcher, Backend Developer',
    facebookLink: 'https://www.facebook.com/BTHung.2807',
    shortHand: 'Hung',
  },
  {
    name: 'Viết Minh Hiếu',
    description: 'Frontend Developer, Backend Developer',
    facebookLink: 'https://www.facebook.com/profile.php?id=100005054109835',
    shortHand: 'Hieu',
  },
  {
    name: 'Trần Quang Khiêm',
    description: 'Tester, Quality Assurance',
    facebookLink: 'https://www.facebook.com/khiemquangtran2312',
    shortHand: 'Khiem',
  },
  {
    name: 'Trần Hậu',
    description: 'Graphic design, UX/UI designer',
    facebookLink: 'https://www.facebook.com/tranhau.17',
    shortHand: 'Hau',
  },
];

export const OUR_RECOMMENDATIONS: BrandAttributes[] = [
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Bentley/Bentley%20Continental%20GT/mau-xe-bentley-continental-gt-black.jpg',
    name: 'Bentley',
    description: 'Bentley là thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/bmw/bmw%20x5/mau-sac/bmw-x5-mau-den-bong-tinbanxe.png',
    name: 'BMW',
    description: 'BMW ra đời các mẫu xe luôn làm giới mộ xe hơi phải thổn thức và đứng ngồi không yên.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Mercedes/Mercedes-GLS-500/mau-xe-mercedes-gls-500-black-obsidian-metallic.png',
    name: 'Mercedes',
    description: 'Mercedes-Benz là một trong những hãng xe chất lượng tốt rất được ưa chuộng ở bất cứ nơi nào.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Porsche/porsche-911-carrera-s-cabriolet/Blue_082243.jpg',
    name: 'Porsche',
    description: 'Porsche là một trong những thương hiệu xe ô tô nổi tiếng nhất hiện nay.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Rolls%20royce/rolls-royce-cullinan/rolls-royce-cullinan-mau-do.png',
    name: 'Rolls Royce',
    description: 'Rolls Royce là một thương hiệu siêu xe nổi tiếng trên toàn thế giới.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Bugatti/Bugatti%20Veyron/IMG_1149_1994_1583491182.jpg',
    name: 'Bugatti',
    description: 'Bugatti là những chiếc siêu xe tốc độ lướt gió và thiết kế vô cùng sang chảnh.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Lamborghini/Lamborghini%20Veneno/A9_Veneno_GE-removebg-preview.png',
    name: 'Lamborghini',
    description: 'Lamborghini là thương hiệu siêu xe nổi tiếng của Đức với các “chiến binh” hàng đầu thế giới',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/150/images/Tesla/tesla-model-s-2020.png',
    name: 'Tesla',
    description: 'Tesla chinh phục được người dùng bởi kiểu dáng thiết kế đẹp mắt, hoạt động êm ái.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Ferrari/ferrari-f12berlinetta/ferrari-f620-gt-argento-nurburgring.jpg',
    name: 'Ferrari',
    description: 'Ferrari luôn nổi bật với phong cách thể thao, khỏe khoắn được ví như “chiếc phản lực mặt đất.',
  },
  {
    img: 'https://img.tinbanxe.vn/thumb/250//images/Vinfast/vinfast%20president/CE11.png',
    name: 'Vinfast',
    description: 'Vinfast đều có kiểu dáng sang trọng và đẳng cấp nhưng vẫn giữ được nét Việt Nam rất riêng biệt.',
  },
];

export const CAR_OF_BRAND: CarOfBrandAttributes[] = [
  {
    img: 'https://img.tinbanxe.vn/webp/images/Bentley/Bentley%20Bentayga/khac/an-toan-bentley-bentayga.jpg',
    name: 'Bentley Bentayga',
    price: '183,425 USD',
    seat: 5,
  },
  {
    img: 'https://img.tinbanxe.vn/webp/images/Bentley/Bentley%20Continental%20GT/khac/an-toan-bentley-continental-gt.jpg',
    name: 'Bentley Continental GT',
    price: '23,000,000,000 VND',
    seat: 4,
  },
  {
    img: 'https://img.tinbanxe.vn/webp/images/Bentley/Bentley%20Flying%20Spur/khac/an-toan-bentley-flying-spur.jpg',
    name: 'Bentley Flying Spur',
    price: '16,868,000,000 VND',
    seat: 5,
  },
  {
    img: 'https://img.tinbanxe.vn/webp/images/Bentley/Bentley%20Mulsanne/khac/an-toan-bentley-mulsanne.jpg',
    name: 'Bentley Mulsanne',
    price: '307,000 USD',
    seat: 5,
  },
];
