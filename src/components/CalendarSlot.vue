<template>
    <div class="border-2 border-black w-20 h-20 cursor-pointer hover:border-green-500 active:border-green-600" :style="styles">
        <p class="pl-1">{{ props.date }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

export interface CalendarSlotProps {
    date: number
    color: string
    events: string[]
}
const props = withDefaults(defineProps<CalendarSlotProps>(), {
   
})

const styles = ref();
onMounted(() => {
    styles.value = `background-color: ${props.color}; float: top;`;
    watch(props.events, function(){
        console.log(props.events)
    })
})
</script>