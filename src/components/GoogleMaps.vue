<template>
    <div>
        <gmap-map
            :center="mapCenter"
            ref="mapRef"
            :options="mapStyle"
            :zoom="16"
            style="width:100%;  height: 400px;"
        >
            <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :draggable="editable"
                :ref="`marker${index}`"
                @drag="setMarkerPosition"
                :animation="editable ? 1 : 0"
                :icon="{ url: require('@/assets/MapMarker.png')}"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
export default {
    name: 'GoogleMap',
    props: {
        editable: {
            type: Boolean,
            default: false,
        },
        mapCenter: {
            type: Object,
            default: () => ({
                lat: 8.965975885948076,
                lng: -79.53750488336794,
            }),
        },
        markers: {
            type: Array,
        },
        markers: {
            type: Array,
        },
    },
    data() {
        return {
            center: {},
            animation: 1,
            mapStyle: {
                // other properties...
                fullscreenControl: false,
                disableDefaultUi: false,
                rotateControl: false,
                streetViewControl: false,
                mapTypeControl: false,

                // styles: [
                //     {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                //     {
                //         elementType: 'labels.text.stroke',
                //         stylers: [{color: '#242f3e'}],
                //     },
                //     {
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#746855'}],
                //     },
                //     {
                //         featureType: 'administrative.locality',
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#d59563'}],
                //     },
                //     {
                //         featureType: 'poi',
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#d59563'}],
                //     },
                //     {
                //         featureType: 'poi.park',
                //         elementType: 'geometry',
                //         stylers: [{color: '#263c3f'}],
                //     },
                //     {
                //         featureType: 'poi.park',
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#6b9a76'}],
                //     },
                //     {
                //         featureType: 'road',
                //         elementType: 'geometry',
                //         stylers: [{color: '#38414e'}],
                //     },
                //     {
                //         featureType: 'road',
                //         elementType: 'geometry.stroke',
                //         stylers: [{color: '#212a37'}],
                //     },
                //     {
                //         featureType: 'road',
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#9ca5b3'}],
                //     },
                //     {
                //         featureType: 'road.highway',
                //         elementType: 'geometry',
                //         stylers: [{color: '#746855'}],
                //     },
                //     {
                //         featureType: 'road.highway',
                //         elementType: 'geometry.stroke',
                //         stylers: [{color: '#1f2835'}],
                //     },
                //     {
                //         featureType: 'road.highway',
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#f3d19c'}],
                //     },
                //     {
                //         featureType: 'transit',
                //         elementType: 'geometry',
                //         stylers: [{color: '#2f3948'}],
                //     },
                //     {
                //         featureType: 'transit.station',
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#d59563'}],
                //     },
                //     {
                //         featureType: 'water',
                //         elementType: 'geometry',
                //         stylers: [{color: '#17263c'}],
                //     },
                //     {
                //         featureType: 'water',
                //         elementType: 'labels.text.fill',
                //         stylers: [{color: '#515c6d'}],
                //     },
                //     {
                //         featureType: 'water',
                //         elementType: 'labels.text.stroke',
                //         stylers: [{color: '#17263c'}],
                //     },
                // ],
            },
            markerPosition: null,
        }
    },

    methods: {
        setMarkerPosition(location) {
            this.markerPosition = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            }
            this.$emit('markerPosition', this.markerPosition)
        },
    },
}
</script>