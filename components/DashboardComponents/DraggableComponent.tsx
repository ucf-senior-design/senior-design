import React from 'react';
import DraggableCore from 'react-draggable';

//TODO: react-grid-layout

interface Props {
    children: React.ReactNode;
}

const DraggableComponent: React.FC<Props> = (props: Props) => {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const [position, sPosition] = React.useState({x:0, y:0})

    const handleDrag = (e: any, val: any) => {
        sPosition({ x: val.x, y: val.y });
    };

    React.useEffect(() => {
        const node = nodeRef.current;
        if(!node) {
            return;
        }
    }, []);

    return (
        <DraggableCore nodeRef={nodeRef} bounds='parent' position={position} onDrag={handleDrag}>
            <div ref={nodeRef} style={{display:'inline-block'}}>
                {props.children}
            </div>
        </DraggableCore>
    )
}

export default DraggableComponent;