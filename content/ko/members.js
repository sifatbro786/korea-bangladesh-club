// Korean overrides for content/members.js. DRAFT (and the member data itself is DUMMY). Arrays merge by index.
// Korean members' names are written in Hangul here; Bangladeshi names stay in Latin script.

export const membersKo = {
    meta: {
        title: "회원",
        description: "한국-방글라데시 비즈니스 문화 클럽의 임원, 운영위원회, 회원 명단.",
    },
    hero: {
        label: "회원",
        title: ["테이블에 함께하는", "사람들."],
        intro: "두 나라의 기업인, 투자자, 외교관 가족, 전문가 — 클럽의 무게를 만드는 회원들입니다.",
    },

    leadership: {
        label: "임원진",
        title: "테이블을 준비하도록 선출된 사람들.",
        term: "운영위원회 · 2025–2027",
        president: {
            role: "회장",
            org: "Nilgiri Knit Composite Ltd. 회장",
            message: "두 나라 사이의 모든 파트너십은 한 번의 소개에서 시작되었습니다. 클럽은 그다음 소개를 더 쉽게 만들기 위해 존재합니다.",
        },
        officers: [
            { name: "김재원", role: "수석 부회장", org: "한빛텍스타일 방글라데시 대표이사" },
            { role: "부회장", org: "Bokul Agro Foods 이사" },
            { role: "사무총장", org: "Rupsha Shipping Lines CEO" },
            { name: "박서연", role: "공동 사무총장", org: "서린로지스틱스 지사장" },
            { role: "재무", org: "Hossain & Associates 회계법인 파트너" },
            { name: "최은지", role: "조직 담당 이사", org: "조연코스메틱 소싱 총괄" },
            { role: "문화 담당 이사", org: "Kashful Design Studio 대표" },
        ],
    },

    executive: {
        label: "운영위원회",
        title: "운영위원회 위원.",
        intro: "정회원 총회에서 선출된 운영위원회는 행사 일정을 정하고, 가입 신청을 검토하며, 두 나라 정부에 클럽을 대표합니다.",
        items: [
            { name: "이동현", org: "다온엔지니어링 이사" },
            { org: "Shapla Leather Works 대표이사" },
            { name: "한지수", org: "하늘전자 BD 총괄 매니저" },
            { name: "정현우", org: "미래제약 방글라데시 주재 이사" },
            { name: "강미래", org: "무역 컨설턴트" },
        ],
    },

    directory: {
        label: "회원 명단",
        title: "클럽의 회원들.",
        note: "회원 본인의 동의를 받아 게시합니다. 연락처는 사무국을 통해 회원 간에만 공유됩니다.",
        categories: [
            {
                label: "창립 회원",
                items: [
                    { name: "윤상철", org: "대양기계 BD 회장" },
                    { org: "Arunima Trading 대표이사" },
                    { name: "서영미", org: "굴샨 '하나 한식당' 대표" },
                    { org: "Padmapar Builders 회장" },
                ],
            },
            {
                label: "평생 회원",
                items: [
                    { name: "오진우", org: "한빛텍스타일 방글라데시 공장장" },
                    { org: "방글라데시 대법원 변호사" },
                    { name: "신혜린", org: "한국어 교사" },
                    { org: "Sonarpur Knitwear Ltd. 이사" },
                    { name: "문기태", org: "서린로지스틱스 주재원" },
                ],
            },
            {
                label: "기업 회원",
                items: [
                    { name: "한빛텍스타일 방글라데시", org: "대표: 김재원" },
                    { org: "대표: Mahbubur Rahman Chowdhury" },
                    { name: "하늘전자 BD", org: "대표: 한지수" },
                    { org: "대표: Md. Rafiqul Islam" },
                ],
            },
            {
                label: "일반 회원",
                items: [
                    { name: "백민준", org: "다온엔지니어링 엔지니어" },
                    { org: "Arunima Trading 머천다이징 매니저" },
                    { name: "류승호", org: "방글라데시 공과대학교(BUET) 대학원 연구원" },
                    { org: "Kotha 언어센터 설립자" },
                    { name: "송하은", org: "한국–방글라데시 문화교류 프로그램 담당관" },
                    { org: "Bokul Agro Foods 수입 매니저" },
                ],
            },
        ],
    },

    cta: {
        title: "테이블에 함께하세요.",
        body: "멤버십은 한국 또는 방글라데시와 실질적인 인연이 있는 기업인, 전문가, 가족에게 열려 있습니다.",
        link: { label: "회원 가입 신청" },
    },
};
