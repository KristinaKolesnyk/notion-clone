import type {NodeData} from "../utils/types.ts";
import {useEffect, useState} from "react";
import type {Dispatch, SetStateAction} from "react";

type UseFocusedNodeIndex = {
    nodes: NodeData[];
}

export const useFocusedNodeIndex = ({nodes}: UseFocusedNodeIndex): [number, Dispatch<SetStateAction<number>>] => {
    const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                setFocusedNodeIndex(index => Math.max(index - 1, 0));
            }
            if (event.key === "ArrowDown") {
                setFocusedNodeIndex(index => Math.min(index + 1, nodes.length - 1));
            }
        }
        document.addEventListener("keydown", onKeyDown);

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [nodes]);
    return [focusedNodeIndex, setFocusedNodeIndex];
}