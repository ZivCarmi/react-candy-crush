import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
  return (
    <div className={cn("w-full md:max-w-[560px] mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
