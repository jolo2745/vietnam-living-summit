"use client";

import { useLanguage } from "../../i18n";
import styles from "./PartnerLevels.module.css";

const levels = [
  {
    name: "Media & Community Partner",
    nameVi: "Đối tác Truyền thông & Cộng đồng",
    shortName: "Community",
    shortNameVi: "Cộng đồng",
    benefits: [
      "Logo placement in the “With support from” section",
      "Two complimentary tickets to the main summit and VIP networking event",
      "Access to B2B cross-networking opportunities with alliance members",
      "Exclusive media coverage and interview rights at the event",
    ],
    benefitsVi: [
      "Hiển thị logo trong mục “Với sự hỗ trợ từ”",
      "Hai vé miễn phí tham dự hội nghị chính và sự kiện kết nối VIP",
      "Tiếp cận cơ hội kết nối B2B chéo với các thành viên liên minh",
      "Quyền đưa tin truyền thông và phỏng vấn độc quyền tại sự kiện",
    ],
  },
  {
    name: "Expert Partner",
    nameVi: "Đối tác Chuyên gia",
    shortName: "Expert",
    shortNameVi: "Chuyên gia",
    benefits: [
      "All Media & Community Partner benefits",
      "Exhibition booth and dedicated one-to-one consultation desk",
      "Dedicated social media feature before the summit",
      "VIP invitation to the Alliance Partner Dinner",
      "Access to pre-matched client leads through advisory matchmaking",
      "Participation in the Alliance Cross-Referral Commission Network",
    ],
    benefitsVi: [
      "Toàn bộ quyền lợi của Đối tác Truyền thông & Cộng đồng",
      "Gian hàng triển lãm và bàn tư vấn 1-1 riêng",
      "Bài giới thiệu riêng trên mạng xã hội trước hội nghị",
      "Thư mời VIP tham dự Tiệc tối Đối tác Liên minh",
      "Tiếp cận khách hàng tiềm năng được ghép nối trước qua hoạt động tư vấn",
      "Tham gia Mạng lưới Hoa hồng Giới thiệu chéo của Liên minh",
    ],
  },
  {
    name: "Gold Partner",
    nameVi: "Đối tác Vàng",
    shortName: "Gold",
    shortNameVi: "Vàng",
    benefits: [
      "All Expert Partner benefits",
      "Prime centre-stage booth placement in the exhibition zone",
      "Medium-sized logo on key visuals, backdrops, and marketing collateral",
      "Three-to-five-minute main-stage presentation or keynote slot",
      "Two C-level VIP invitations to the Alliance Partner Dinner",
      "Featured placement in two-to-three PR articles and the digital campaign series",
      "Priority B2B matching with key ecosystem stakeholders",
    ],
    benefitsVi: [
      "Toàn bộ quyền lợi của Đối tác Chuyên gia",
      "Vị trí gian hàng trung tâm nổi bật trong khu triển lãm",
      "Logo cỡ trung trên ấn phẩm chính, phông nền và tài liệu tiếp thị",
      "Phần trình bày hoặc phát biểu chính từ ba đến năm phút trên sân khấu",
      "Hai thư mời VIP cấp lãnh đạo tham dự Tiệc tối Đối tác Liên minh",
      "Vị trí nổi bật trong hai đến ba bài PR và chuỗi chiến dịch kỹ thuật số",
      "Ưu tiên kết nối B2B với các bên liên quan chủ chốt trong hệ sinh thái",
    ],
  },
  {
    name: "Co-organizer Partner",
    nameVi: "Đối tác Đồng tổ chức",
    shortName: "Co-organizer",
    shortNameVi: "Đồng tổ chức",
    benefits: [
      "Exclusive “Co-organized with TUBUDD” status across all platforms",
      "Co-opening speech and an exclusive media or brand activation corner",
      "Largest logo placement across physical and digital collateral",
      "Attendee database access, subject to privacy consent",
      "Co-developed feature stories across major media and e-magazine channels",
      "Tailored long-term commercial rights and referral revenue sharing",
    ],
    benefitsVi: [
      "Danh vị độc quyền “Đồng tổ chức cùng TUBUDD” trên mọi nền tảng",
      "Phát biểu khai mạc chung và khu kích hoạt truyền thông hoặc thương hiệu độc quyền",
      "Vị trí logo lớn nhất trên các ấn phẩm trực tiếp và kỹ thuật số",
      "Tiếp cận dữ liệu người tham dự, tùy thuộc vào sự đồng ý về quyền riêng tư",
      "Đồng phát triển các câu chuyện nổi bật trên truyền thông lớn và tạp chí điện tử",
      "Quyền lợi thương mại dài hạn và chia sẻ doanh thu giới thiệu được thiết kế riêng",
    ],
  },
];

export function PartnerLevels() {
  const { language, t } = useLanguage();

  return (
    <section className={`${styles.levels} wrap`} id="partnership-levels">
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>{t("Partnership levels", "Các cấp độ đối tác")}</p>
          <h2>{t("Choose your place", "Chọn vị trí của bạn")}<br />{t("in the ", "trong ")}<em>{t("alliance.", "liên minh.")}</em></h2>
        </div>
        <p className={styles.intro}>
          {t("Four ways to take part, from supporting the community to shaping the summit alongside TUBUDD.", "Bốn cách để tham gia, từ hỗ trợ cộng đồng đến cùng TUBUDD định hình hội nghị.")}
        </p>
      </div>

      <div className={styles.grid}>
        {levels.map(({ name, nameVi, shortName, shortNameVi, benefits, benefitsVi }, index) => (
          <article className={styles.card} key={name}>
            <div className={styles.cardHeader}>
              <span className={styles.number}>0{index + 1}</span>
              <span className={styles.shortName}>{language === "vi" ? shortNameVi : shortName}</span>
            </div>
            <h3>{language === "vi" ? nameVi : name}</h3>
            <ul>
              {(language === "vi" ? benefitsVi : benefits).map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
