<template>
    <div class="w-full h-full p-4">
        <p class="font-title font-bold text-2xl">{{ ChurchTitle }}</p>
        <div class="w-full flex flex-row flex-wrap">
            <CalendarSlot v-for="i in 31" :index="i" :date="i" color="000000" @click="openEditorWithData($event);" :events="Events[i]"></CalendarSlot>
        </div>
    </div>
    <EventEditorFooter :d="Day || 1" :m="Month || 1" :y="2022" v-if="IsAdmin" :events="Events[Day||1-1]" @update:model-value="setEvents($event)"></EventEditorFooter>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getChurchEvents } from '../../calendar/services/CalendarService'
import CalendarSlot from '../../components/CalendarSlot.vue';
import EventEditorFooter from '../../components/EventEditorFooter.vue';
import { getChurch } from '../../church/services/ChurchService'

const ChurchTitle = ref<string>();
const Events = ref<Array<string>[]>([
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]
]);
const IsAdmin = ref(true);
const Day = ref<number>();
const Month = ref<number>();

setInterval(function(){
    console.log(Day.value)
    console.log(Events.value[Day.value||0])
}, 1000)

onMounted(async() => {
    var church = await getChurch("nnnnzpxkul7wvh4");
    ChurchTitle.value = church.name;
    var records = await getChurchEvents(new Date('2022-12-02 00:00:00'), new Date('2022-12-04 24:00:00'), church.id);
})

function openEditorWithData(event: any){
    if(IsAdmin.value == true){
        Day.value = parseInt(event.path[0].innerText.split("\n")[0]);
    }
}

function setEvents(event: any){
    var split = event.split(" | ");
    Events.value[parseInt(split[1])-1].push(split[0]);
    console.log(Events.value)
}
</script>