<template>
    <div id="map" style="width: 100%;height: 300px;"></div>
</template>

<script>
    export default {
        data() {
            return {
                map:null
            };
        },
        methods: {
            loadScript() {
                const script = document.createElement("script");
                script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=16685f485eb191da4f9f06ef4c319e45&autoload=false"; //api를 로드한 후 맵을 그리는 함수가 실행되도록 구현
                script.onload = () => window.kakao.maps.load(this.loadMap); //스크립트 로드가 끝나고 지도를 실행될 준비가 되어있다면 지도가 실행
                document.head.appendChild(script); //html/head 안에 스크립트 소스를 추가
            },
            loadMap() {
                var container = document.getElementById('map');
                var options = {
                    center: new window.kakao.maps.LatLng(33.2496213, 126.5311884),
                    level: 10
                };
                this.map = new window.kakao.maps.Map(container, options);
            }
        },
        mounted() {
            if (window.kakao && window.kakao.maps) {
                this.loadMap();
            } else {
                this.loadScript();
            }
        },

    };
</script>
