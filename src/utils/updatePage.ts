import type {Page} from "./types.ts";
import { supabase } from "../supabaseClient";
import { debounce } from "./debounce";

export const updatePage = debounce(
    async (page: Partial<Page> & Pick<Page, "id">) => {
        console.log("UPDATE PAGE PAYLOAD", page);
        const { error } = await supabase.from("pages").update(page).eq("id", page.id);

        if (error) {
            console.error("Failed to update page", error);
        }
    },
    500
);