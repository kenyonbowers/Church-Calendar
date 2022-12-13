<template>
    <div class="absolute bottom-0 left-0 w-full h-64 bg-zinc-500 text-hwhite p-4">
        <span class="text-white">{{ props.y }}-{{ props.m }}-{{ props.d }}</span>
        <AppSelect placeholder="Choose..." @update:model-value="setEventsForDay($event)">
            <option v-for="index in records" :key="index" :value="index.value">{{ index.name }}</option>
        </AppSelect>
    </div>
</template>

<script setup lang="ts">
import AppSelect from './AppSelect.vue';
import { onMounted, ref } from 'vue';
import { getAvailableEvents } from '../calendar/services/CalendarService';
import { Event } from '../calendar/Event';

export interface EventEditorProps {
    d: number
    m: number
    y: number
    modelValue?: string
}
const props = withDefaults(defineProps<EventEditorProps>(), {
   
})

const records = ref<any>([]);
onMounted(async() => {
    records.value = await convertToText(await getAvailableEvents("nnnnzpxkul7wvh4"));
})

function convertToText(recordItems:any[]){
    var recordsReturn:Object[] = [];
    recordItems.forEach((r:Event) => {
        recordsReturn.push({ name: r.name, value: r.id })
    })
    return recordsReturn;
}

const emit = defineEmits([
  'update:modelValue'
])

function setEventsForDay(value: string){
    emit('update:modelValue', value + " | " + props.d.toString())
}
</script>