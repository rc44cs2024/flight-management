import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export const VirtualList = ({ data, Row }: any) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // row height
    overscan: 8, // smoother scroll
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: "600px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const flight = data[virtualRow.index];

          return (
            <div
              key={flight.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Row flight={flight} />
            </div>
          );
        })}
      </div>
    </div>
  );
};