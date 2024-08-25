import React from "react";

const Input2 = React.forwardRef(({ ...props }, ref) => {
  return <input {...props} ref={ref} />;
});

export default Input2;
