import './CardComponent.styles.css';

type CardComponentProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
};

export function CardComponent(props: CardComponentProps) {
  return (
    <article style={props.style}>
      {props.children}
    </article>
  )
}
