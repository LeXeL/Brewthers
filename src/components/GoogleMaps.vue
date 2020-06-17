<template>
    <div>
        {{markers}}
        {{markerPosition}}
        <gmap-map :center="center" ref="mapRef" :zoom="16" style="width:100%;  height: 400px;">
            <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :draggable="true"
                :ref="`marker${index}`"
                @drag="setMarkerPosition"
                :icon="{ url: require('@/assets/MapMarker.png')}"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
export default {
    name: 'GoogleMap',
    data() {
        return {
            // default to Montreal to keep it simple
            // change this to whatever makes sense
            center: {lat: 45.508, lng: -73.587},
            markers: [],
            currentPlace: null,
            markerPosition: null,
        }
    },

    mounted() {
        this.geolocate()
    },

    methods: {
        setMarkerPosition(location) {
            this.markerPosition = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            }
            this.$emit('markerPosition', this.markerPosition)
        },
        geolocate() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                this.markers.push({position: this.center})
            })
        },
    },
}
</script>