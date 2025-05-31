import { cva } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type Props =
  | ({ href: string } & AnchorProps & { variant?: string })
  | ({ onClick?: () => void } & ButtonProps & { variant?: string });

export function MyButton(props: Props) {
  const { variant = 'default', ...rest } = props as any;
  const className = buttonStyles({ variant });

  if ('href' in props) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  return (
    <button {...rest} className={className}>
      {props.children}
    </button>
  );
}
