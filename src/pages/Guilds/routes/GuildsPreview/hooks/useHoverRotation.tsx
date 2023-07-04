import { RefObject, useEffect } from 'react';

interface HoverRotationProps {
  targetRef: RefObject<HTMLDivElement>;
  childRef: RefObject<HTMLDivElement>;
}

const constrain: number = 200;

export function useHoverRotation({ targetRef, childRef }: HoverRotationProps): void {
  useEffect(() => {
    const box: HTMLDivElement = targetRef.current!;

    box.addEventListener('mousemove', handleMouseMove);
    box.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      box.addEventListener('mousemove', handleMouseMove);
      box.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [targetRef]);

  const transforms = (x: number, y: number, el: HTMLElement): string => {
    const box: DOMRect = el.getBoundingClientRect();
    const calcX: number = -(y - box.y - box.height / 2) / constrain;
    const calcY: number = (x - box.x - box.width / 2) / constrain;

    return `perspective(500px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
  };

  const transformElement = (el: HTMLElement, mouseX, mouseY) => {
    el.style.transition = 'none';
    el.style.transform = transforms(mouseX, mouseY, el);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    const childrenBox: HTMLDivElement = childRef.current!;
    const mouseX: number = event.clientX;
    const mouseY: number = event.clientY;

    window.requestAnimationFrame(() => {
      transformElement(childrenBox, mouseX, mouseY);
    });
  };

  function handleMouseLeave(): void {
    const childrenBox: HTMLDivElement = childRef.current!;

    childrenBox.style.transition = 'transform 0.3s ease-in-out';
    childrenBox.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
  }
}
