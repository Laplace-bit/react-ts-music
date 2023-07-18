import { useState, useEffect } from 'react';
interface Position {
    x: number,
    y: number,
}

export function usePointerPosition() {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    useEffect(() => {
        function handleMove(e: PointerEvent) {
            e.preventDefault();
            setPosition({ x: e.clientX, y: e.clientY });
        }
        window.addEventListener('pointermove', handleMove, false);
        return () => window.removeEventListener('pointermove', handleMove);
    }, []);
    return position;
}
