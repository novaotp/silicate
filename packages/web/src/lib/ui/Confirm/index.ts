import _Confirm from "./Confirm.svelte";
import Title from "./Title.svelte";
import Description from "./Description.svelte";
import Actions from "./Actions.svelte";
import Yes from "./Yes.svelte";
import No from "./No.svelte";

/**
 * Yes and No components are not buttons because there are
 * cases where you want a form instead of a lone button.
 * 
 * That's why they act as wrappers and nothing more.
 * 
 * @author Sajidur Rahman
 * @date 15/07/2024
 */

export const Confirm = {
    Root: _Confirm,
    Title: Title,
    Description: Description,
    Actions: Actions,
    Yes: Yes,
    No: No
}
