<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div
      class="flex justify-center relative z-20 px-4 pt-8 pb-32 bg-hero-pattern bg-cover"
    >
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
        <div class="flex">
          <input
            v-model="ipAddQuery"
            class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none border-2 text-white"
            type="text"
            placeholder="Enter to search any IP address"
            v-on:keyup.enter="getIpAddressDetails"
          />
          <i
            @click="getIpAddressDetails"
            class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center fas fa-chevron-right"
          ></i>
        </div>
        <p class="text-gray-400" v-if="ipAddQuery === ''">
          Note : - if you not enter IP address and you directly click enter it
          will give default IP address data.
        </p>
      </div>
      <IPAddressDetails
        v-if="ipAddressDetails"
        v-bind:ipAddressDetails="ipAddressDetails"
      />
    </div>

    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
import IPAddressDetails from "./IPAddressDetails.vue";
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  components: { IPAddressDetails },
  setup() {
    let myMap;
    const ipAddQuery = ref("");
    const ipAddressDetails = ref(null);

    onMounted(() => {
      myMap = leaflet.map("mapid").setView([42.5145, -83.0147], 9);

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
          foo: "bar",
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(myMap);
    });

    const getIpAddressDetails = async () => {
      try {
        const data = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=at_uCLLaBx6P8XEpBkv6vWClwgVkkbmK&ipAddress=${ipAddQuery.value}`
        );
        const result = data.data;
        console.log(result);
        ipAddressDetails.value = {
          address: result.ip,
          state: result.location.region,
          timezone: result.location.timezone,
          isp: result.isp,
          lat: result.location.lat,
          lng: result.location.lng,
        };
        leaflet
          .marker([ipAddressDetails.value.lat, ipAddressDetails.value.lng])
          .addTo(myMap);
        myMap.setView(
          [ipAddressDetails.value.lat, ipAddressDetails.value.lng],
          13
        );
      } catch (err) {
        alert(err.message);
      }
    };

    return { ipAddQuery, ipAddressDetails, getIpAddressDetails };
  },
};
</script>



