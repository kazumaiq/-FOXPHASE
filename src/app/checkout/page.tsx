"use client";

import React from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { PageFrame } from "@/components/page-frame";
import { useFoxphase } from "@/components/providers/foxphase-provider";

export default function CheckoutPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "ОФОРМЛЕНИЕ ЗАКАЗА" : "SECURE CHECKOUT"}
      title={
        isRu
          ? "ПОДТВЕРДИТЕ ДАННЫЕ ЗАКАЗА."
          : "CONFIRM THE DETAILS, NOT THE PAYMENT."
      }
      subtitle={
        isRu
          ? "Система не использует фейковые экраны успешной оплаты. До подключения платёжного провайдера оформляется защищённая заявка с ручным подтверждением."
          : "FOXPHASE does not use a fake payment success screen. A production provider must verify its signed webhook on the server before an order is marked paid."
      }
    >
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-28 sm:px-6 md:grid-cols-2 md:px-10">
        <div className="surface-card rounded-3xl p-6 sm:p-8 h-fit">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-red-400">
            {isRu ? "БЕЗОПАСНАЯ ВЫДАЧА ФАЙЛОВ" : "DIGITAL DELIVERY SECURITY"}
          </span>
          <p className="mt-4 text-base leading-7 text-[#E8E8E8]">
            {isRu
              ? "FOXPHASE не подтверждает оплату просто по переходу на страницу успеха. Платёжный шлюз обязан прислать подписанный серверный webhook, прежде чем откроется доступ к оригинальным WAV-файлам и стемам."
              : "FOXPHASE does not use a fake payment success screen. A production provider must verify its signed webhook on the server before an order can become paid or files can be delivered."}
          </p>
          <p className="mt-4 text-sm leading-6 text-[#85878D]">
            {isRu
              ? "В текущем режиме заказ проходит серверную проверку цен и регистрируется как заявка на покупку для прямого подтверждения с продюсером."
              : "Until then, checkout creates a reviewed purchase request only. A server validates product availability and licensing terms before a response."}
          </p>
        </div>
        <CheckoutForm />
      </section>
    </PageFrame>
  );
}
