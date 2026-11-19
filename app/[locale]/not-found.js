import NotFoundView from "@/components/page/NotFoundView";

export const metadata = {
    title: "Page not found",
    robots: { index: false },
};

/** notFound() inside a page (e.g. unknown event slug). Unmatched URLs → app/global-not-found.js. */
export default function NotFound() {
    return <NotFoundView />;
}
