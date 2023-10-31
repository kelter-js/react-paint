import {
  createContext,
  PropsWithChildren,
  useRef,
  RefObject,
  useContext,
} from "react";

export const CanvasContext = createContext<RefObject<HTMLCanvasElement>>(
  {} as RefObject<HTMLCanvasElement>
);

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({
  children,
}: PropsWithChildren<{}>): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <CanvasContext.Provider value={canvasRef}>
      {children}
    </CanvasContext.Provider>
  );
};
