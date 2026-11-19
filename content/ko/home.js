// Korean overrides for content/home.js. DRAFT — proofread by a native speaker before launch.
// Arrays merge by INDEX: keep the same order as the English file. Media ids and hrefs come from English.

export const homeKo = {
    hero: {
        title: ["두 나라,", "하나의 테이블."],
        body: "한국-방글라데시 비즈니스 문화 클럽은 대한민국과 방글라데시 사이의 무역, 투자, 우정을 만들어 가는 사람들을 한자리에, 한 테이블에 모읍니다.",
        cta: { label: "클럽 알아보기" },
        panes: [
            { city: "대한민국", coords: "서울 · 37.57° N 126.98° E" },
            { city: "방글라데시", coords: "다카 · 23.81° N 90.41° E" },
        ],
    },

    intro: {
        label: "클럽 소개",
        title: "한국과 방글라데시를 앞으로 나아가게 하는 사람들의 만남의 장.",
        body: [
            "KBBCC에는 두 나라의 기업인, 투자자, 전문가와 그 가족들이 모입니다. 파트너를 찾는 사람도, 공장을 세우려는 사람도, 그저 먼 타국에서 고향 같은 곳을 찾는 사람도 있습니다.",
            "어떤 이유로 오셨든, 클럽은 그 일을 위한 공간과 일정, 그리고 이미 그 길을 걸어 본 공동체를 제공합니다.",
        ],
        address: "우타르 바다, 루파얀 밀레니엄 스퀘어 10층",
    },

    pillars: {
        label: "클럽의 활동",
        title: "두 나라를 더 가깝게 잇는 세 가지 방법.",
        items: [
            {
                title: "무역",
                body: "소개가 공급망이 됩니다. 회원들은 클럽을 신뢰할 수 있는 첫 창구로 삼아 두 시장의 바이어, 소싱 파트너, 물류 전문가를 만납니다.",
            },
            {
                title: "투자",
                body: "첫 방문에서 계약 체결까지. 비즈니스 교류회는 한국 투자자와 방글라데시 기업이 필요한 정보를 갖추고 한 테이블에 앉도록 돕습니다.",
            },
            {
                title: "문화",
                body: "숫자 너머의 우정. 한국과 벵골의 전통을 함께 기념하는 명절 행사, 만찬, 가족 모임 — 오래가는 파트너십은 사람 사이에서 만들어지기 때문입니다.",
            },
        ],
    },

    clubhouse: {
        label: "클럽하우스",
        title: "10층에 마련한 우리만의 공간.",
        inset: { caption: "우타르 바다, 클럽 회의실" },
        spaces: [
            { name: "회의실", body: "비즈니스 교류회, 방문 대표단 접견, 운영위원회 회의." },
            { name: "회원 만찬", body: "클럽과 다카 곳곳의 제휴 장소에서 열리는 만찬과 리셉션." },
            { name: "문화의 밤", body: "추석, 포헬라 보이샤크 등 두 공동체가 함께 기념하는 날들." },
        ],
    },

    events: {
        label: "클럽 생활",
        title: "행사 일정",
        link: { label: "전체 행사" },
    },

    membership: {
        label: "멤버십",
        title: "멤버십은 거래가 아니라 소개입니다.",
        body: "멤버십은 한국 또는 방글라데시와 실질적인 인연이 있는 기업인, 전문가, 가족에게 열려 있습니다. 모든 신청서는 클럽 운영위원회가 검토합니다.",
        tiers: [
            { name: "기업 회원", body: "기업 대상 — 최대 3명의 대표를 지정할 수 있습니다." },
            { name: "개인 회원", body: "창업자, 임원, 전문가 대상." },
            { name: "가족 회원", body: "가족과 함께 클럽 활동에 참여하는 회원 대상." },
        ],
        cta: { label: "가입 신청 시작하기" },
    },

    leadership: {
        label: "회장 인사말",
        quote: "한국 투자자와 방글라데시 기업인이 한 테이블에 앉을 때, 두 나라 모두 앞으로 나아갑니다. 우리 클럽은 그 테이블을 마련하고, 그 자리에 앉는 모든 분이 환영받는다고 느끼도록 하기 위해 존재합니다.",
        role: "KBBCC 회장",
        link: { label: "운영위원회 소개" },
    },

    moments: {
        label: "순간들",
        title: "기억에 남는 저녁들.",
        link: { label: "갤러리 보기" },
    },

    visit: {
        label: "오시는 길",
        title: "우타르 바다에서 만나요.",
        mapLabel: "Google 지도에서 보기",
        enquiry: {
            title: "대표단 및 비즈니스 방문",
            body: "무역 대표단, 투자자 방문, 문화 프로그램을 계획하고 계신가요? 사무국이 클럽에서의 소개 자리와 브리핑을 준비해 드립니다.",
            cta: { label: "문의 보내기" },
        },
    },
};
