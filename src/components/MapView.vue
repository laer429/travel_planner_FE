<template>
        <div id="map" style="width: 100%;height: 300px;"></div>
</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return {
                map:null,
                data:{}
            };
        },
        methods: {
            loadScript() {
                const script = document.createElement("script");
                script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey="+import.meta.env.VITE_APP_KEY+"&autoload=false"; //api를 로드한 후 맵을 그리는 함수가 실행되도록 구현
                script.onload = () => window.kakao.maps.load(this.loadMap); //스크립트 로드가 끝나고 지도를 실행될 준비가 되어있다면 지도가 실행
                document.head.appendChild(script); //html/head 안에 스크립트 소스를 추가
            },
            loadMap() {
                var container = document.getElementById('map');
                var options = {
                    center: new window.kakao.maps.LatLng(33.2496213, 126.5311884),//지도 중앙 좌표
                    level: 10 //지도 확대레벨
                };
                this.map = new window.kakao.maps.Map(container, options);

                //마커 생성
                var titles = []; //마커의 주소
                let latlngs = []; //마커의 좌표
                for (let i = 0 ; i < this.data.length ; i++) {
                    let title = this.data[i].location_name;
                    let latlng = [this.data[i].mapy,this.data[i].mapx];
                    titles.push(title);
                    latlngs.push(latlng);
                }
                //마커 이미지 배열
                const imageSrc = [ 
                "./src/assets/base_img/마커1.png",
                "./src/assets/base_img/마커2.png",
                "./src/assets/base_img/마커3.png",
                "./src/assets/base_img/마커4.png",
                "./src/assets/base_img/마커5.png",
                "./src/assets/base_img/마커6.png",
                "./src/assets/base_img/마커7.png",
                "./src/assets/base_img/마커8.png",
                "./src/assets/base_img/마커9.png",
                ]

                for (var i = 0; i < titles.length; i ++) {
    
                    // 마커 이미지의 이미지 크기
                    var imageSize = new window.kakao.maps.Size(24, 35); 
                    
                    // 마커 이미지를 생성
                    var markerImage = new window.kakao.maps.MarkerImage(imageSrc[i], imageSize); 
                    
                    // 마커를 생성
                    var marker = new window.kakao.maps.Marker({
                        map: this.map, // 마커를 표시할 지도
                        position: new window.kakao.maps.LatLng(latlngs[i][0],latlngs[i][1]),
                        // position: positions[i].latlng, // 마커를 표시할 위치
                        title : titles[i], // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image : markerImage // 마커 이미지 
                    });
                }
            },
            
        },
        mounted() {
            axios.get('http://127.0.0.1:3000/location')
            .then((res) => {
                this.data = res.data;
                // this.loadMap();
                if (window.kakao && window.kakao.maps) {
                    this.loadMap();
                } else {
                    this.loadScript();
                }
            }).catch((error) => {
                console.log(error);
            })
            this.emitter.on('marker', (a) =>{
                this.data = a;
                this.loadMap();
            })
            
        },

    };
</script>
