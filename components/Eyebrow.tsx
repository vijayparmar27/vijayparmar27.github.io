type Props = {
  num: string;
  text: string;
};

/** The numbered "01 —— Selected work" label that opens every section. */
export function Eyebrow({ num, text }: Props) {
  return (
    <div className="eyebrow">
      <span className="eyebrow__num">{num}</span>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span className="eyebrow__text">{text}</span>
    </div>
  );
}
