"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { Arrow } from "./ui";

export function EmailContact({ email }: { email: string | null }) {
  const [feedback, setFeedback] = useState("");
  async function copy() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setFeedback("이메일 주소를 복사했습니다.");
    } catch {
      setFeedback("복사하지 못했습니다. 이메일 주소를 선택해 복사해 주세요.");
    }
  }
  return (
    <div className="email-contact">
      <Mail size={25} strokeWidth={1.3} />
      <p className="eyebrow">THE BEST WAY TO REACH ME</p>
      {email ? (
        <>
          <a className="email-address" href={`mailto:${email}`}>
            {email}
            <Arrow diagonal />
          </a>
          <button type="button" className="text-link copy-email" onClick={copy}>
            {feedback.startsWith("이메일") ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}
            Copy email address
          </button>
          <p role="status" className="field-note">
            {feedback}
          </p>
        </>
      ) : (
        <>
          <h2>
            Let’s say hello<span className="accent">.</span>
          </h2>
          <p className="contact-pending">이메일 주소 등록 예정</p>
          <p className="muted">
            확인된 연락처가 등록되면 이메일로 바로 연결됩니다.
            <br />
            현재 공개된 이메일 주소가 없습니다.
          </p>
        </>
      )}
    </div>
  );
}
