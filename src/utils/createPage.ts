import {nanoid} from "nanoid";

export const createPage = () => {
    const slug = nanoid();
    const id: string = nanoid();

    const page = {
        title: "Untitled",
        id,
        slug,
        nodes: [],
        cover: "ztm-notes.png"
    }
    return page
}