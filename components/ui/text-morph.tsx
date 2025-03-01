'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, Transition, Variants } from 'motion/react';
import { useMemo, useId, useState, useEffect } from 'react';

export type TextMorphUIProps = {
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  transition?: Transition;
  texts: string[];
};

export function TextMorphUI({
  as: Component = 'p',
  className,
  style,
  variants,
  transition,
  texts

}: TextMorphUIProps) {
  const uniqueId = useId();

  const [text, setText] = useState(texts[0]);

  const lastIndex = texts.lastIndexOf(text)

  useEffect(() => {
    const interval = setInterval(() => {
      if (texts.length === lastIndex + 1) {
        setText(texts[0])
      } else {
        setText(texts[lastIndex + 1])
      }

    }, 2000);


    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [lastIndex, text, texts])


  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {};

    return text.split('').map((char) => {
      const lowerChar = char.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: char === ' ' ? '\u00A0' : char,
      };
    });
  }, [text, uniqueId]);

  const defaultVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const defaultTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 18,
    mass: 0.3,
  };

  return (
    <Component className={cn(className, "inline-block")} aria-label={text} style={style}>
      <AnimatePresence mode='popLayout' initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className='inline-block'
            aria-hidden='true'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants || defaultVariants}
            transition={transition || defaultTransition}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
