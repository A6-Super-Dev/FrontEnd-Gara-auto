import {
  Autocomplete,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Chip,
} from '@mui/material';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import './BrandItem.scss';
import {
  ColorSchema,
  ContainerGrey,
  SecondContainerWhite,
  TransparentBrandButton,
} from '../../../components/MuiStyling/MuiStyling';
import { CAR_OF_BRAND } from '../../../common/constants/fakeData';

const allBrand = [
  { label: 'Bentley' },
  { label: 'BMW' },
  { label: 'Mercedes' },
  { label: 'Porsche' },
  { label: 'Rolls Royce' },
  { label: 'Bugatti' },
  { label: 'Lamborghini' },
  { label: 'Tesla' },
  { label: 'Ferrari' },
  { label: 'Vinfast' },
];

const allBodyType = [
  { label: 'Convertible' },
  { label: 'SUV' },
  { label: 'Sedan' },
  { label: 'Coupe' },
  { label: 'Hatchback' },
];
const allPrice = [
  { label: 'Under 1,000,000,000VNĐ' },
  { label: 'From 1,000,000,000VNĐ to 3,000,000,000VNĐ' },
  { label: 'From 3,000,000,000VNĐ to 5,000,000,000VNĐ' },
  { label: 'From 5,000,000,000VNĐ to 10,000,000,000VNĐ' },
  { label: 'From 10,000,000,000VNĐ to 20,000,000,000VNĐ' },
  { label: 'Over 20,000,000,000VNĐ' },
];

const allSeat = [{ label: '2' }, { label: '4' }, { label: '5' }, { label: '7' }];

const SHORT_DESCRIPTION = [
  {
    img: 'https://mpng.subpng.com/20180609/czq/kisspng-bentley-car-volkswagen-logo-porsche-5b1b5d23817852.0426719115285199715303.jpg',
    des: '\n<p><strong>Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. </strong></p>\n<p>Chính vì thế mà giá thành của những chiếc xe Bentley cũng không phải là rẻ. Để thuận tiện hơn cho việc lựa chọn mua những chiếc xe thuộc thương hiệu này, bạn cần cập nhật bảng&nbsp;<strong>giá xe Bentley</strong> mới nhất tháng&nbsp;04/2022.</p>\n<p><span style="font-size:24px"><strong>Bentley Mulsanne</strong></span></p>\n<p>Thiết kế của chiếc xe thuộc dòng <strong>Bentley Mulsanne</strong> rất độc đáo. Cảm nhận chung của mọi người về Bentley Mulsanne chính là sự <strong>lịch lãm và thời thượng</strong> ở ngoại thất.&nbsp;Các đường nét thiết kế ngoại thất của Bentley Mulsanne vừa sắc sảo, vừa tinh tế nhờ những nét uốn lượn từ nhôm siêu bền.</p>\n<p>Cùng với các chi tiết cần làm điểm nhấn như nắp capo hay trần và cốp xe được sơn màu nổi bật.&nbsp;<strong>Bentley Mulsanne</strong> được thiết kế đậm chất cổ điển và có phong thái đẳng cấp hoàng tộc.&nbsp;</p>\n<div style="text-align:center">\n<figure class="image" style="display:inline-block"><img alt="Bentley Mulsanne" height="478" src="https://tinbanxe.vn/uploads/news/gia-xe/bentley-mulsanne-4.jpg" width="850">\n<figcaption><strong><em>Giá xe Bentley Mulsanne tại châu Âu: Từ 307.000 USD.</em></strong></figcaption>\n</figure>\n</div>\n<p>Bentley Mulsanne sử dụng khối<strong> động cơ V8 6.0L </strong>với công suất tối đa 505 mã lực và mô-men xoắn cực đại đạt 1020 Nm. Hộp số xe Bentley Mulsanne tự động 8 cấp, có hệ dẫn động cầu sau. Tốc độ xe đạt mức 296 km/h là tối đa.</p>\n<p>Bentley Mulsanne còn được trang bị đầy đủ mọi tính năng an toàn cho những khách hàng như 4 túi khí, hệ thống bó cứng phanh ABS, phanh điện tử ERD, cân bằng điện tử ESC và dây đai an toàn. Tại thị trường châu Âu Bentley Mulsanne được bán với giá từ 307.000 USD. &nbsp;</p>\n<p><span style="font-size:24px"><strong>Bentley Mulsanne Extended Wheelbase</strong></span></p>\n<p>Kiểu dáng thiết kế của xe <strong>Bentley Mulsanne Extended Wheelbase</strong> có thể nói là hoàn hảo. Sự kết hợp một cách tinh tế và cân bằng giữa những nét hiện đại và cổ điển đã khiến Bentley Mulsanne Extended Wheelbase mê hoặc những kẻ mê xe trên thế giới.&nbsp;</p>\n<div style="text-align:center">\n<figure class="image" style="display:inline-block"><img alt="Bentley Mulsanne Extended Wheelbase" height="478" src="https://tinbanxe.vn/uploads/news/gia-xe/bentley-mulsanne-extended-wheelbase-2.jpg" width="850">\n<figcaption><strong><em>Giá xe Bentley Mulsanne Extended Wheelbase tại châu Âu: Từ 350.000 USD.</em></strong></figcaption>\n</figure>\n</div>\n<p><strong>Mulsanne Extended Wheelbase</strong> cũng được nhà sản xuất ưu ái tăng thêm chiều dài cơ sở 25 cm, nhờ vậy tăng thêm không gian cho khoang sau, giúp nâng tầm đẳng cấp và sự sang trọng. Nhiều chi tiết được thiết kế vô cùng tỉ mỉ, ví dụ như cửa gió lớn, ốp viền hay tay nắm cửa mạ crom sáng bóng, hệ thống ghế ngồi bọc da cao cấp.&nbsp;</p>\n<p>Kết hợp với điều này chính là những tiện ích siêu tiện lợi như cửa sổ trời có kích thước lớn hơn, rèm điện 2 bên và ghế ngồi có thể ngả ra. Nhờ vậy mang đến cảm giác tận hưởng thoải mái nhất cho những người ngồi trong xe.&nbsp;Giá xe Bentley Mulsanne Extended Wheelbase tại châu Âu: Từ 350.000 USD.</p>\n<p><span style="font-size:24px"><strong>Bentley Mulsanne Speed</strong></span></p>\n<p>Thiết kế của<strong> Bentley Mulsanne Speed đậm chất cổ điển</strong> hơn nhiều so với những dòng sản phẩm khác của thương hiệu này. Đặc biệt là phần đầu xe được thiết kế tỉ mỉ đậm chất hoài cổ, còn phần thân xe thì thuôn dài, làm người xem như trở về với những chiếc xe của đầu thế kỷ trước.&nbsp;</p>\n<div style="text-align:center">\n<figure class="image" style="display:inline-block"><img alt="Bentley Mulsanne Speed" height="586" src="https://tinbanxe.vn/uploads/news/gia-xe/bentley-mulsanne-speed-3.jpg" width="850">\n<figcaption><em><strong>Giá xe Bentley Mulsanne Speed&nbsp;tại châu Âu chỉ từ 339.000 USD.</strong></em></figcaption>\n</figure>\n</div>\n<p>Động cơ của Bentley Mulsanne Speed là khối <strong>động cơ V8 twin-turbocharged &nbsp;6.0L</strong>, công suất của xe đạt 535 mã lực tối đa, mô-men xoắn cực đại 1100 Nm và hộp số tự động 8 cấp giúp chiếc xe vận hành bền bỉ và mạnh mẽ. Theo những số liệu thống kế, tốc độ tối đa của Bentley Mulsanne Speed đạt mức 305 km/h.&nbsp;Giá xe Bentley Mulsanne Speed tại châu Âu chỉ từ 339.000 USD.</p>\n<p><span style="font-size:24px"><strong>Bentley Flying Spur</strong></span></p>\n<p>Trong khi những dòng xe khác của Bentley mang đến cảm giác của những quý ông châu Âu&nbsp;lịch lãm thế kỷ trước thì thiết kế của <strong>Bentley Flying Spur</strong> lại mang đến cho người xem sự ấn tượng về độ <strong>nam tính và thể thao</strong>.</p>\n<p>Tuy nhiên, những nét hoài cổ được điểm xuyến cực kỳ khéo léo trên thiết kế của Bentley Flying Spur sẽ khiến cho người xem liên tưởng đến một quý ông truyền thống, vừa mạnh mẽ vừa lịch sự.&nbsp;<strong>Giá xe&nbsp;Bentley Flying Spur </strong>sẽ được <strong>Tin bán xe</strong> cập nhật ngay dưới đây.</p>\n<div style="text-align:center">\n<figure class="image" style="display:inline-block"><img alt="bentley flying spur 2" height="529" src="https://tinbanxe.vn/uploads/news/gia-xe/bentley-flying-spur-2.jpg" width="850">\n<figcaption><em><strong>Giá xe Bentley Flying Spur các phiên bản tại châu Âu</strong></em></figcaption>\n</figure>\n</div>\n<table align="center" border="1" cellpadding="1" cellspacing="1">\n<tbody>\n<tr>\n<td colspan="2"><strong>Bảng báo giá xe Bentley Flying Spur</strong></td>\n</tr>\n<tr>\n<td><strong>Tên sản phẩm</strong></td>\n<td><strong>Giá thành (tại châu Âu)</strong></td>\n</tr>\n<tr>\n<td>Bentley Flying Spur 4.0 V8</td>\n<td>Từ 191.725 USD</td>\n</tr>\n<tr>\n<td>Bentley Flying Spur 4.0 V8 S</td>\n<td>Từ 207.725 USD</td>\n</tr>\n<tr>\n<td>Bentley Flying Spur W12 6.0</td>\n<td>Từ 227.225 USD</td>\n</tr>\n<tr>\n<td>Bentley Flying Spur W12 6.0 S</td>\n<td>Từ 247.323 USD</td>\n</tr>\n</tbody>\n</table>\n<p><span style="font-size:24px"><strong>Bentley Continental GT</strong></span></p>\n<p><strong>Bentley Continental GT</strong> là sự trung hòa giữa <strong>nét thể thao và sự lịch lãm</strong>. Và giống như những dòng Bentley khác, Continental GT vẫn làm người ta nhớ đến sự <strong>hoài cổ trong từng thiết kế</strong>. Đồng thời nhờ những bánh hợp kim 21 inch được khắc chạm nổi, Bentley Continental GT đã tạo nên sự ấn tượng về một chiếc xe sang trọng và thời thượng.</p>\n<div style="text-align:center">\n<figure class="image" style="display:inline-block"><img alt="Bentley Continental GT" height="525" src="https://tinbanxe.vn/uploads/news/gia-xe/bentley-continental-gt-3.jpg" width="850">\n<figcaption><em><strong>Giá xe Bentley Continental GT các phiên bản tại châu Âu</strong></em></figcaption>\n</figure>\n</div>\n<p>Điểm khiến Continental GT nhận được sự yêu thích của giới đua xe chính là <strong>khối động cơ mạnh mẽ</strong>, giúp xe đạt công suất tối đa là 505 - 633 mã lực và mô-men xoắn cực đại 660-820 Nm. Hộp số xe tự động 8 cấp ZF và hệ dẫn động 4 bánh có lực đẩy mạnh mẽ. Xe có thể đạt tốc độ tối đa là 305 - 331 km/h. Cùng chúng tôi cập&nbsp; nhật <strong>giá xe</strong>&nbsp;<strong>Bentley Continental GT </strong>ngay sau đây nhé.</p>\n<table align="center" border="1" cellpadding="1" cellspacing="1">\n<tbody>\n<tr>\n<td colspan="2"><strong>Bảng báo giá xe Bentley Continental GT&nbsp;</strong></td>\n</tr>\n<tr>\n<td><strong>Tên sản phẩm</strong></td>\n<td><strong>Giá thành&nbsp;</strong></td>\n</tr>\n<tr>\n<td>Bentley Continental GT 2018-2019</td>\n<td>Khoảng 25 tỷ VNĐ</td>\n</tr>\n<tr>\n<td>Bentley Continental GT Speed Convertible 2017</td>\n<td>267.025 USD</td>\n</tr>\n<tr>\n<td>Bentley Continental GT Speed Coupe 2017</td>\n<td>243.025 USD</td>\n</tr>\n</tbody>\n</table>\n<p><span style="font-size:24px"><strong>Bentley Bentayga</strong></span></p>\n<p>Thiết kế của <strong>Bentley Bentayga </strong>được đánh giá là phiên bản<strong> sang trọng đẳng cấp</strong> bậc nhất trong số những dòng xe thương hiệu Bentley. Toàn bộ thân xe là sự kết hợp hoàn hảo của những nét đỉnh nhất ở các phiên bản trước làm cho mọi người đều cực kỳ ấn tượng.&nbsp;</p>\n<p>Xét về độ mạnh mẽ của động cơ xe thì <strong>Bentayga</strong> có công suất tối đa là&nbsp;606 mã lực, mô-men xoắn cực đại 900 Nm kết hợp với hộp số tự động 8 cấp và hệ dẫn động 4 bánh mượt mã. Nhờ vậy mà Bentayga <strong>vận hành rất ổn định và khá nhanh</strong>, khi tốc độ tối đa có thể đạt từ 270 - 301 km/h.<strong>&nbsp;Giá xe&nbsp;<strong>Be</strong>ntley Bentayga </strong>tại thị&nbsp;trường Châu Âu sẽ được chúng tôi cập nhật liên tục.</p>\n<div style="text-align:center">\n<figure class="image" style="display:inline-block"><img alt="bentley bentayga 3" height="481" src="https://tinbanxe.vn/uploads/news/gia-xe/bentley-bentayga-3.jpg" width="850">\n<figcaption><em><strong>Giá xe Bentley Bentayga các phiên bản tại châu Âu</strong></em></figcaption>\n</figure>\n</div>\n<table align="center" border="1" cellpadding="1" cellspacing="1">\n<tbody>\n<tr>\n<td colspan="2"><strong>Bảng báo giá xe Bentley Bentayga&nbsp;</strong></td>\n</tr>\n<tr>\n<td><strong>Tên sản phẩm</strong></td>\n<td><strong>Giá thành tại châu Âu</strong></td>\n</tr>\n<tr>\n<td>Bentley Bentayga W12</td>\n<td>Từ 232.000 - 300.000 USD</td>\n</tr>\n<tr>\n<td>Bentley Bentayga V8</td>\n<td>Dự kiến khoảng 16 – 18 tỷ đồng</td>\n</tr>\n<tr>\n<td>Bentley Bentayga Hybrid</td>\n<td>Đang cập nhật</td>\n</tr>\n</tbody>\n</table>\n<p>Trên đây là bảng báo<strong> giá xe Bentley </strong>các loại. Giá thành trên chỉ mang tính tham khảo vì sẽ biến động theo thời gian. Tuy nhiên đây là những mức giá chuẩn và mới được cập nhật trong thời gian gần đây nhất. Do đó xin mời các bạn tham khảo và lựa chọn chiếc xe phù hợp nhất cho mình.&nbsp;</p>\n<p>Theo dõi tin bán xe để nhận những thông tin xác thực nhất về <strong>giá xe ô tô</strong>, tin tức <strong>đánh giá xe</strong> của chuyên gia và người dùng các thương hiệu xe hơi nổi tiếng trên thị trường trong và ngoài nước.</p>\n',
  },
];

export const BrandItem: React.FC = () => {
  const { brandName } = useParams<string>();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleBrandName = () => {
    if (brandName === 'bmw') return 'BMW';
    if (brandName === 'rolls-royce') return 'Rolls Royce';
    return capitalizeFirstLetter(brandName as string);
  };

  const shortcutDescription = (des: string) => {
    if (des.length >= 400) return des.slice(0, 400) + '...';
    return des + '...';
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const myRef = useRef<HTMLElement>(null);

  // const executeScroll = () => {
  //   if (myRef !== null && myRef.current !== null) myRef.current.scrollIntoView({ behavior: 'smooth' });
  // };
  // console.log('myRef', myRef);

  return (
    <Container maxWidth={false} className="brand_item-container mt-12">
      <SecondContainerWhite>
        <div className="brand_item-introduction">
          <div className="all-brand-body_type py-4">
            <Autocomplete
              disablePortal
              sx={{ width: '15rem', marginLeft: '1rem' }}
              options={allBrand}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />
            <Autocomplete
              disablePortal
              sx={{ width: '15rem', marginLeft: '1rem' }}
              options={allBodyType}
              renderInput={(params) => <TextField {...params} label="Bodytype" />}
            />
          </div>
          <div className="brand-short-description p-4">
            {SHORT_DESCRIPTION.map((item, index) => (
              <Grid container key={index} spacing={4}>
                <Grid item xs={4}>
                  <img src={item.img} alt="" />
                  {/* <button onClick={executeScroll}> Click to scroll </button> */}
                </Grid>
                <Grid item xs={8}>
                  <div
                    className="mb-4 text-justify leading-6"
                    dangerouslySetInnerHTML={{ __html: shortcutDescription(item.des) }}
                  ></div>
                  <TransparentBrandButton className="see-more" href="#brand-detail" variant="outlined">
                    See more
                  </TransparentBrandButton>
                </Grid>
              </Grid>
            ))}
          </div>
        </div>
      </SecondContainerWhite>

      <ContainerGrey maxWidth={false}>
        <div className="brand_item-main">
          <Typography
            variant="h3"
            sx={{ textAlign: 'left', color: ColorSchema.Black, marginBottom: '2rem', marginTop: '3rem' }}
            fontFamily="ui-serif"
          >
            {handleBrandName()}
          </Typography>

          <Grid container>
            <Grid sm={12} lg={3}>
              <Autocomplete
                disablePortal
                sx={{ paddingRight: '2rem', maxWidth: '17rem', marginBottom: '1rem' }}
                options={allPrice}
                renderInput={(params) => <TextField {...params} label="Price" />}
              />
              <Autocomplete
                disablePortal
                sx={{ paddingRight: '2rem', maxWidth: '17rem', marginBottom: '2rem' }}
                options={allSeat}
                renderInput={(params) => <TextField {...params} label="Seat" />}
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Order by</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="ASC" />
                  <Stack direction="row" spacing={1}>
                    <Chip label="Brand name" variant="outlined" />
                    <Chip label="Price" variant="outlined" onDelete={handleDelete} />
                  </Stack>
                  <FormControlLabel value="male" control={<Radio />} label="DESC" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid container xs={12} lg={9}>
              {CAR_OF_BRAND.map((item, index) => (
                <Grid xs={12} md={6} xl={4} sx={{ padding: '0.5rem' }} key={index}>
                  <Card>
                    <CardActionArea>
                      <CardMedia className="h-36 object-fill" component="img" image={item.img} alt="green iguana" />
                      <CardContent sx={{ paddingInline: '1.5rem', minHeight: '9rem' }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography fontSize="0.875rem" color="text.secondary">
                          {`From: ${item.price}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      </ContainerGrey>

      <SecondContainerWhite>
        <div className="brand_item-detail  mt-12" id="brand-detail">
          <div className="brand-detail-description p-4">
            {SHORT_DESCRIPTION.map((item, index) => (
              <div
                key={index}
                className="render-detail mb-4 text-justify leading-7"
                dangerouslySetInnerHTML={{ __html: item.des }}
              ></div>
            ))}
          </div>
        </div>

        {/* <>
          <div ref={myRef as any}>Element to scroll to</div>
        </> */}
      </SecondContainerWhite>
    </Container>
  );
};
