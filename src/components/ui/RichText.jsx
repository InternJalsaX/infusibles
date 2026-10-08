/**
 * Renders content segments: [text] or [text, true] (bold). A paragraph is an
 * array of segments; pass `paragraphs` for several.
 */
export function Segments({ segments }) {
  return segments.map(([text, bold], i) =>
    bold ? (
      <strong key={i} className="font-bold text-ink/80">
        {text}
      </strong>
    ) : (
      <span key={i}>{text}</span>
    ),
  );
}

export default function RichText({ paragraphs, className = '', paragraphClassName = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((segments, i) => (
        <p key={i} className={paragraphClassName}>
          <Segments segments={segments} />
        </p>
      ))}
    </div>
  );
}
