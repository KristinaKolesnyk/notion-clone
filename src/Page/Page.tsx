import {useFocusedNodeIndex} from "./useFocusedNodeIndex";
import {useNavigate, useParams} from "react-router-dom";
import {Cover} from "./Cover";
import {Spacer} from "./Spacer";
import {NodeContainer} from "../Node/NodeContainer";
import {Title} from "./Title";
import {nanoid} from "nanoid";
import {useAppState} from "../state/AppStateContext";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import styles from "./Page.module.css";

export const Page = () => {
    const navigate = useNavigate();
    const {slug} = useParams<{ slug?: string }>(); // slug есть только у внутренних страниц
    const isRootPage = !slug;

    const {title, nodes, addNode, cover, setCoverImage, reorderNodes, setTitle} = useAppState();

    const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
        nodes,
    });

    const handleDragEvent = (event: DragEndEvent) => {
        const {active, over} = event;
        if (over?.id && active.id !== over?.id) {
            reorderNodes(active.id as string, over.id as string);
        }
    };

    return (
        <div className={styles.notePage}>
            {!isRootPage && (
                <div className={styles.backLink} onClick={() => navigate("/")}>
                    ← Back to main page
                </div>
            )}
            <Cover filePath={cover} changePageCover={setCoverImage}/>
            <div className={styles.body}>
                <Title addNode={addNode} title={title} changePageTitle={setTitle}/>
                <DndContext onDragEnd={handleDragEvent}>
                    <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
                        {nodes.map((node, index) => (
                            <NodeContainer
                                key={node.id}
                                node={node}
                                isFocused={focusedNodeIndex === index}
                                updateFocusedIndex={setFocusedNodeIndex}
                                index={index}
                            />
                        ))}
                    </SortableContext>
                    <DragOverlay/>
                </DndContext>
                <Spacer
                    handleClick={() => {
                        addNode({type: "text", value: "", id: nanoid()}, nodes.length);
                    }}
                    showHint={!nodes.length}
                />
            </div>
        </div>
    );
};