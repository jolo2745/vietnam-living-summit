"use client";

import Image from "next/image";
import Link from "next/link";
import { LanguageSwitch, useLanguage } from "./i18n";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="gateway">
      <div className="gateway-language"><LanguageSwitch /></div>
      <Link href="/relocate" className="audience-panel people-panel" aria-label={t("For people: plan your move to Vietnam", "Dành cho cá nhân: lên kế hoạch chuyển đến Việt Nam")}>
        <Image
          src="/images/vietnam-relocation-hero.png"
          alt={t("A couple beginning their new life in Ho Chi Minh City", "Một cặp đôi bắt đầu cuộc sống mới tại Thành phố Hồ Chí Minh")}
          fill
          priority
          sizes="(max-width: 800px) 100vw, 50vw"
          className="panel-image"
        />
        <div className="panel-shade" />
        <div className="panel-content">
          <p className="audience-label"><span>{t("For people", "Dành cho cá nhân")}</span> {t("Individuals · Families · Professionals", "Cá nhân · Gia đình · Chuyên gia")}</p>
          <h1>{t("Build your life", "Xây dựng cuộc sống")}<br /><em>{t("in Vietnam.", "tại Việt Nam.")}</em></h1>
          <p>{t("Personal, on-the-ground support from planning your move to feeling properly at home.", "Hỗ trợ trực tiếp và thiết thực, từ lúc lên kế hoạch chuyển đến cho đến khi bạn thực sự ổn định cuộc sống.")}</p>
          <span className="arrow-link">{t("Plan your move", "Lên kế hoạch chuyển đến")} <span>↗</span></span>
        </div>
      </Link>

      <Link href="/partners" className="audience-panel partner-panel" aria-label={t("For businesses: join the Vietnam Living Summit community", "Dành cho doanh nghiệp: tham gia cộng đồng Vietnam Living Summit")}>
        <Image
          src="/images/vietnam-blue-hour.png"
          alt={t("A business professional arriving in Ho Chi Minh City", "Một chuyên gia kinh doanh đến Thành phố Hồ Chí Minh")}
          fill
          priority
          sizes="(max-width: 800px) 100vw, 50vw"
          className="panel-image"
        />
        <div className="panel-shade partner-shade" />
        <div className="grid-lines" aria-hidden="true" />
        <div className="panel-content">
          <p className="audience-label"><span>{t("For business", "Dành cho doanh nghiệp")}</span> {t("Partners · Providers · Employers", "Đối tác · Nhà cung cấp · Nhà tuyển dụng")}</p>
          <h2>{t("Let your business help", "Cùng doanh nghiệp của bạn")}<br /><em>{t("build the community.", "xây dựng cộng đồng.")}</em></h2>
          <p>{t("Join our trusted local network, support people settling in to Vietnam, and be recommended when your service is the right fit.", "Tham gia mạng lưới địa phương đáng tin cậy, hỗ trợ những người đang ổn định cuộc sống tại Việt Nam và được giới thiệu khi dịch vụ của bạn phù hợp.")}</p>
          <span className="arrow-link">{t("Join the community", "Tham gia cộng đồng")} <span>↗</span></span>
        </div>
      </Link>

    </main>
  );
}
