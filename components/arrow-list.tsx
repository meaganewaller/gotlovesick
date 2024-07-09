import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode
} from 'react';
import { HiMiniArrowRight } from 'react-icons/hi2';

let incrementor = 0;

export default function ArrowList({ children }: { children?: ReactNode }) {
  incrementor++;
  return (
    <ul className="list-none">
      {(
        Children.toArray(children).filter((child) =>
          isValidElement(child)
        ) as ReactElement<{ children?: ReactNode }>[]
      ).map((child, index) => (
        <li key={`arrowlist.${incrementor}.${index}`}>
          <HiMiniArrowRight className="-ml-7 mb-0.5 mr-2 mt-0 inline-block h-5 w-5 text-[var(--tw-prose-counters)]" />
          {child.props.children}
        </li>
      ))}
    </ul>
  );
}
