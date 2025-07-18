import { create } from "zustand";

type CountState = {
    count: number;
    increase: () => void;
    decrease: () => void;
    reset?: () => void;
    setCount?: (value: number) => void;
};

const useCountStore = create<CountState>((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set((state) => ({ count: 0 })),
    setCount: (value) => set(() => ({ count: value })),
}));

export const useCount = () => {
    const count = useCountStore((state: CountState) => state.count);
    const increase = useCountStore((state: CountState) => state.increase);
    const decrease = useCountStore((state: CountState) => state.decrease);
    const reset = useCountStore((state: CountState) => state.reset);
    const setCount = useCountStore((state: CountState) => state.setCount);
    return { count, increase, decrease, reset, setCount };
};
