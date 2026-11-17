import Image from "next/image";

const GRADE_CLASS = {
    club: "photo-grade",
    soft: "photo-grade-soft",
    none: "",
};

/**
 * The only image primitive used on the site. Takes a `Media` record from the
 * content layer, so every image stays admin-replaceable.
 *
 * Fill mode (default): the parent controls size/aspect; pass `sizes`.
 * Intrinsic mode (`fill={false}`): uses the record's width/height.
 *
 * Above-the-fold images: pass `preload` (Next 16 replacement for `priority`).
 */
export default function ClubImage({
    media,
    sizes = "100vw",
    fill = true,
    preload = false,
    quality,
    eager = false,
    fade = false,
    className = "",
    imgClassName = "",
}) {
    const grade = GRADE_CLASS[media.grade] ?? "";
    const wrapper = [
        fill ? "relative h-full w-full" : "relative",
        "overflow-hidden",
        grade,
        fade ? "photo-fade-b" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={wrapper}>
            <Image
                src={media.src}
                alt={media.alt}
                sizes={sizes}
                preload={preload}
                {...(quality ? { quality } : {})}
                {...(eager && !preload ? { loading: "eager" } : {})}
                {...(fill ? { fill: true } : { width: media.width, height: media.height })}
                {...(media.blurDataURL
                    ? { placeholder: "blur", blurDataURL: media.blurDataURL }
                    : {})}
                className={`object-cover ${imgClassName}`}
                style={{ objectPosition: media.objectPosition ?? "center" }}
            />
        </div>
    );
}
