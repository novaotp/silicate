<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    export let stretchFirst = false,
        gridGap = '10px',
        colWidth = 'minmax(40%, 1fr)'
    export let items: unknown[] = []; // pass in data if it's dynamically updated
    let grids: Grid[] = [];
    let masonryElement: HTMLDivElement;

    type Grid = { _el: HTMLDivElement; gap: number; items: HTMLElement[]; ncol: number; mod: number };

    export const refreshLayout = async () => {
        // console.log("REFRESHING LAYOUT")
        grids.forEach(async (grid) => {
            /* get the post relayout number of columns */
            let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;

            grid.items.forEach((c) => {
                let new_h = c.getBoundingClientRect().height;

                if (new_h !== +c.dataset.h!) {
                    c.dataset.h = new_h.toString();
                    grid.mod++;
                }
            });

            /* if the number of columns has changed */
            if (grid.ncol !== ncol || grid.mod) {
                /* update number of columns */
                grid.ncol = ncol;
                /* revert to initial positioning, no margin */
                grid.items.forEach((c) => c.style.removeProperty('margin-top'));
                /* if we have more than one column */
                if (grid.ncol > 1) {
                    grid.items.slice(ncol).forEach((c, i) => {
                        let prev_fin = grid.items.at(i)!.getBoundingClientRect().bottom /* bottom edge of item above */,
                            curr_ini = c.getBoundingClientRect().top; /* top edge of current item */

                        c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
                    });
                }

                grid.mod = 0;
            }
        });
    };

    const calcGrid = async (_masonryArr: HTMLDivElement[]) => {
        await tick();
        if (_masonryArr.length && getComputedStyle(_masonryArr[0]!).gridTemplateRows !== 'masonry') {
            grids = _masonryArr.map((grid) => {
                return {
                    _el: grid,
                    gap: parseFloat(getComputedStyle(grid).gridRowGap),
                    items: [...grid.childNodes]
                        .filter((c) => c.nodeType === 1 && +getComputedStyle(c as HTMLElement).gridColumnEnd !== -1)
                        .map((c) => c as HTMLElement),
                    ncol: 0,
                    mod: 0
                };
            });
            refreshLayout(); /* initial load */
        }
    };

    let _window: Window & typeof globalThis;
    onMount(() => {
        _window = window;
        _window.addEventListener('resize', refreshLayout, false); /* on resize */
    });
    onDestroy(() => {
        if (_window) {
            _window.removeEventListener('resize', refreshLayout, false); /* on resize */
        }
    });

    $: if (masonryElement) {
        calcGrid([masonryElement]);
    }

    $: if (items) {
        // update if items are changed
        masonryElement = masonryElement; // refresh masonryElement
    }
</script>

<!-- 
  An almost direct copy and paste of: https://css-tricks.com/a-lightweight-masonry-solution
  
  Usage:
    - stretchFirst stretches the first item across the top

  <Masonry stretchFirst={true} >
    {#each data as o}
      <div class="_card _padding">
        Here's some stuff {o.name}
        <header>
          <h3>{o.name}</h3>
        </header>
        <section>
          <p>{o.text}</p> 
        </section>
      </div>
    {/each}
  </Masonry>
 -->

<div
    bind:this={masonryElement}
    class={`grid--masonry ${stretchFirst ? 'stretch-first' : ''}`}
    style={`--grid-gap: ${gridGap}; --col-width: ${colWidth};`}
>
    <slot />
</div>

<style>
    :global(.grid--masonry) {
        width: min(100%, 800px);
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, var(--col-width));
        grid-template-rows: masonry;
        justify-content: center;
        grid-gap: var(--grid-gap);
    }

    :global(.grid--masonry > *) {
        align-self: start;
        max-height: 300px;
    }

    :global(.grid--masonry.stretch-first > *:first-child) {
        grid-column: 1/ -1;
    }
</style>
