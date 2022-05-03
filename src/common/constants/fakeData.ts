export interface TeamAttributes {
  name: string;
  description: string;
  facebookLink: string;
  shortHand: string;
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
