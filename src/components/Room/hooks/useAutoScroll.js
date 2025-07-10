import { useEffect } from "react";

const useAutoScroll = (ref, dependency) => {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [dependency]);
};

export default useAutoScroll;
