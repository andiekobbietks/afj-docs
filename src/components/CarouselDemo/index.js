import React, { useRef } from 'react';

export default function CarouselDemo() {
  const rowRef = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e) => {
    dragState.current = { dragging: true, startX: e.pageX, scrollLeft: rowRef.current.scrollLeft };
  };
  const onMouseMove = (e) => {
    if (!dragState.current.dragging) return;
    const dx = e.pageX - dragState.current.startX;
    rowRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const stopDrag = () => { dragState.current.dragging = false; };

  return (
    <div
      ref={rowRef}
      className="d-flex overflow-x-auto gap-2 p-3 rounded-3"
      style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', cursor: 'grab' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {['"Best classes in Cardiff."', '"Changed how I move."', '"Community, not just fitness."'].map((quote, i) => (
        <div key={i} className="card flex-shrink-0" style={{ width: 180 }}>
          <div className="card-body">
            <p className="card-text" style={{ fontSize: 12 }}>{quote}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
