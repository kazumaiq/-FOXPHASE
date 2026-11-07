"use client";

import React from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageFrame } from "@/components/page-frame";
import { socials } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock } from "@/components/motion/reveal-text";

export default function ContactPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "КОНТАКТЫ И СОТРУДНИЧЕСТВО" : "DIRECT CONTACT & INQUIRIES"}
      title={isRu ? "LET'S MAKE IT MOVE." : "LET'S MAKE IT MOVE."}
      subtitle={
        isRu
          ? "Для индивидуальных заказов (Custom Beat), сведения, мастеринга, совместных работ и выкупа эксклюзивных прав (Exclusive Rights)."
          : "For custom production, mixing, mastering, artist collaborations, and exclusive-rights acquisitions."
      }
    >
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 md:grid-cols-[0.95fr_1.05fr] md:px-10">
        {/* Direct Channels */}
        <FadeUpBlock className="space-y-6">
          <div className="surface-card rounded-3xl p-8">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#85878D]">
              [01 // {isRu ? "ОФИЦИАЛЬНЫЕ ССЫЛКИ" : "OFFICIAL NETWORKS"}]
            </span>
            <p className="mt-4 text-sm leading-7 text-[#85878D]">
              {isRu
                ? "Самый быстрый способ прямой связи с FOXPHASE — Telegram. Все ссылки ниже ведут на подтверждённые аккаунты продюсера."
                : "Telegram is the fastest direct channel to FOXPHASE studio. All links below connect to verified official profiles."}
            </p>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {socials.map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 font-display text-lg font-bold text-white transition hover:text-[#E8E8E8]"
                >
                  <span>{name}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#85878D] group-hover:text-white">
                    <span>{isRu ? "Открыть" : "Connect"}</span>
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="surface-glass rounded-3xl p-7">
            <div className="flex items-center gap-3">
              <Send size={17} className="text-white" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white">
                TELEGRAM DIRECT
              </span>
            </div>
            <p className="mt-2 text-xs leading-6 text-[#85878D]">
              {isRu
                ? "Приоритетная линия для согласования договоров Exclusive Rights и кастомных проектов: https://t.me/FOXPHASE"
                : "Priority line for Exclusive Rights contracts and custom production briefs: https://t.me/FOXPHASE"}
            </p>
          </div>
        </FadeUpBlock>

        {/* Studio Inquiry Form */}
        <FadeUpBlock delay={0.1}>
          <div className="surface-card rounded-3xl p-8 md:p-10">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#85878D]">
              [02 // {isRu ? "ФОРМА ЗАЯВКИ" : "PROJECT & RIGHTS BRIEF"}]
            </span>
            <h2 className="mt-3 font-display text-2xl font-black uppercase text-white md:text-3xl">
              {isRu ? "ОТПРАВИТЬ ЗАПРОС В СТУДИЮ" : "SUBMIT STUDIO INQUIRY"}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </FadeUpBlock>
      </section>
    </PageFrame>
  );
}
