/**
 * Structured data. `<` is escaped (<) so content can never close the script tag
 * (Next.js JSON-LD guide). Server component only.
 */
export default function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}
