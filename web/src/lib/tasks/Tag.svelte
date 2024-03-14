<script lang="ts">
    export let type: "priority" | "status" | "category";
    export let value: string;

    let color: string;

    $: {
        switch (type) {
            case "priority":
                color = "bg-red-500"
                break;
            
            case "status":
                color = "bg-green-600"
                break;
        
            default:
                color = "bg-blue-500"
                break;
        }
    }
</script>

<div class="relative px-3 py-1 text-sm {color} rounded-full text-white">
    {value}
</div>
