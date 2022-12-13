<template>
    <p class="font-title font-bold">{{ ChurchTitle }}</p>
    {{ Events }}
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getChurchEvents } from '../../calendar/services/CalendarService'
import { getChurch } from '../../church/services/ChurchService'

const ChurchTitle = ref<string>();
const Events = ref<string>();

onMounted(async() => {
    var church = await getChurch("nnnnzpxkul7wvh4");
    ChurchTitle.value = church.name;
    var records = await getChurchEvents(new Date('2022-12-02 00:00:00'), new Date('2022-12-04 24:00:00'), church.id);
    records.forEach((r, i) => {
        if(i == 0){
            Events.value = r.expand.event?.name + " - ";
        }
        else if(i != 0 && i < records.length-1){
            Events.value += r.expand.event?.name + " - ";
        }
        else{
            Events.value += r.expand.event?.name || "";
        }
    })
})
</script>