// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';

// const variants = {
//   default: 'bg-medical-primary text-white',
//   outline: 'border border-medical-primary text-medical-primary',
// };

// const Badge = ({ children, variant = 'default', className }) => {
//   return (
//     <span className={clsx('px-2 py-1 rounded-md text-xs font-medium', variants[variant], className)}>
//       {children}
//     </span>
//   );
// };

// Badge.propTypes = {
//   children: PropTypes.node.isRequired,
//   variant: PropTypes.oneOf(['default', 'outline']),
//   className: PropTypes.string,
// };

// export default Badge;


import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
