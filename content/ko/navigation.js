// Korean overrides for content/navigation.js — only labels; hrefs come from the English document
// (arrays merge by index, so ORDER MUST MATCH). DRAFT: proofread before launch.
export const navigationKo = {
    primary: [
        { label: "클럽 소개" },
        { label: "회원" },
        { label: "행사" },
        { label: "갤러리" },
        { label: "소식" },
        { label: "문의" },
    ],
    cta: { label: "회원 가입 신청", shortLabel: "가입 신청" },
    footer: {
        club: [{ label: "클럽 소개" }, { label: "회원 명단" }, { label: "멤버십" }, { label: "가입 신청" }],
        explore: [{ label: "행사" }, { label: "갤러리" }, { label: "소식 및 공지" }, { label: "문의" }],
        legal: [{ label: "개인정보 처리방침" }, { label: "이용 약관" }],
    },
};
