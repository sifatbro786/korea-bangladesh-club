// Korean overrides for content/events.js. DRAFT — proofread before launch.
// `eventsKo` is keyed by SLUG (safer than index for a collection the admin reorders).
// Dates are formatted from `date` per locale (lib/content.js) — no need to translate dateLabel.

export const eventCategoriesKo = {
    business: "비즈니스",
    culture: "문화",
    members: "회원",
};

export const eventsKo = {
    "business-exchange-winter-2026": {
        title: "비즈니스 교류회 — 겨울 세션",
        time: "오후 6:30 – 오후 10:00",
        venue: "KBBCC 회의실",
        summary: "한국 투자자와 방글라데시 제조업체를 잇는 소개의 밤, 이어서 회원과 손님을 위한 만찬이 열립니다.",
        body: [
            "겨울 세션에는 다카를 방문하는 소수의 한국 투자자와 전자, 섬유, 경공업 분야에서 파트너를 찾는 방글라데시 제조업체가 함께합니다.",
            "양측의 짧은 브리핑으로 시작해, 사무국이 사전에 준비한 1:1 소개가 이어집니다. 만찬은 오후 8시 30분부터 클럽에서 제공됩니다.",
            "좌석이 한정되어 있어 회원에게 우선 배정됩니다. 회원은 확인 후 손님 한 분과 동반할 수 있습니다.",
        ],
        rsvp: { label: "참석 예약" },
    },
    "seollal-new-year-evening-2027": {
        title: "설날 — 한국 새해맞이 저녁",
        time: "오후 7:00 – 오후 10:30",
        venue: "KBBCC, 우타르 바다",
        summary: "떡국과 전통 놀이, 그리고 한국 회원 가족들과 함께하는 저녁 — 음력 새해를 맞는 클럽의 환영 인사입니다.",
        body: [
            "설날은 한국에서 가장 중요한 가족 명절입니다. 매년 한국 회원들은 클럽에서 떡국과 윷놀이, 새해 세배로 이 날을 함께 나눕니다.",
            "가족 동반을 환영합니다. 어린이 프로그램은 오후 7시부터 8시 30분까지 진행됩니다.",
        ],
        rsvp: { label: "참석 예약" },
    },
    "pohela-boishakh-1434": {
        title: "포헬라 보이샤크 — 벵골력 1434년 새해",
        time: "오전 11:00 – 오후 3:00",
        venue: "KBBCC, 우타르 바다",
        summary: "판타 일리시, 음악, 그리고 색채: 방글라데시 회원들이 화답하며 클럽 전체와 함께 벵골 새해를 맞이합니다.",
        body: [
            "포헬라 보이샤크는 방글라데시의 대표적인 새해 축제입니다. 클럽은 긴 점심 식사와 민속 음악, 방글라데시 각지의 공예품 전시로 이 날을 기념합니다.",
            "빨간색과 흰색 옷차림을 권장합니다.",
        ],
        rsvp: { label: "참석 예약" },
    },
    "trade-investment-partnership-2026": {
        title: "한국과 방글라데시: 무역, 투자, 파트너십",
        time: "오후 4:00 – 오후 8:00",
        venue: "KBBCC 회의실",
        summary: "두 나라 사이의 무역, 투자, 장기 파트너십을 주제로 한 클럽 비즈니스 교류회가 만석을 이루었습니다.",
        body: [
            "회원과 손님, 그리고 방문 중인 한국 대표단이 클럽 회의실에 모여 브리핑과 소개의 오후를 보냈습니다.",
            "세션은 두 나라 비즈니스 공동체 사이에 새로운 문을 연 회원들에게 감사장을 전달하며 마무리되었습니다.",
        ],
    },
    "members-recognition-evening-2026": {
        title: "새로운 문을 연 회원들을 기리며",
        time: "오후 7:00",
        venue: "KBBCC 회의실",
        summary: "클럽에 새로운 투자와 우정을 가져온 회원과 파트너들에게 감사를 전한 저녁.",
        body: ["회원과 파트너들에게 감사장이 전달되었고, 이어서 회원과 손님을 위한 만찬이 열렸습니다."],
    },
    "autumn-members-dinner-2026": {
        title: "가을 회원 만찬",
        time: "오후 8:00",
        venue: "굴샨 제휴 장소",
        summary: "시즌 첫 회원 만찬 — 원형 테이블, 긴 대화, 그리고 몇 가지 새로운 우정.",
        body: ["회원과 가족들이 굴샨의 클럽 제휴 장소에서 열린 시즌 첫 만찬에 모였습니다."],
    },
};
