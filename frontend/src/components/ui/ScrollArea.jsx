
import React, { forwardRef } from 'react';

const ScrollArea = forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`overflow-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;