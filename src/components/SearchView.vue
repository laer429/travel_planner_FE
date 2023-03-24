<template>
    <div class="side_block">
            <input id="search_input" v-model="keyword"> <button id="search_button" v-on:click="fnSearch()">검색</button>
        <div v-for="(i,index) in datas" :key="index">
            <div id="block">
                <div></div> <!-- space-between 간격을 위한 빈 div -->
                <div>
                    <div id="title">{{ i.place_name }}</div>
                    <br>{{ i.address_name }}
                </div>
                <div v-if="!button_on"></div> 
                <button v-if="button_on" id="add_btn" v-on:click="fnAdd(index)">+</button>
                <div v-else id="btnoff"></div> <!-- 버튼 없어졌을때 박스 크기가 너무 작아지는 것을 방지 -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                datas:[],
                keyword: "",
                button_on: true,
            }
        },
        methods: {
            fnSearch() {
                let config = {
                    method: 'get',
                    url: 'https://dapi.kakao.com/v2/local/search/keyword?size=5&query='+this.keyword,
                    headers: { 
                        'Authorization': import.meta.env.VITE_JAVASCRIPT_KEY
                    }};
                    axios(config).then((res) => {
                    this.datas = res.data.documents;
                }).catch((err) => {
                    if (err.message.indexOf('Network Error') >-1) {
                        alert('네트워크 오류');
                    }
                });
            },
            fnAdd(index) {
                this.form = {
                            turn:index,
                            location_name:this.datas[index].place_name,
                            address:this.datas[index].address_name,
                            mapx:this.datas[index].x,
                            mapy:this.datas[index].y
                        }
                this.$axios.post(this.$serverUrl + 'add', this.form).then(() => {
                    alert('장소가 일정에 추가되었습니다.');
                    this.$router.go(this.$router.currentRoute);
                }).catch((err) => {
                    console.log('err', err);
                });
            }
        },
        mounted() {
            this.emitter.on('btnOn', (a) => {
                this.button_on = a;
            }),
            this.emitter.on('btnOff', (a) => {
                this.button_on = a;
            })
        }

        }
</script>

<style>
#search_input {
    background-color: rgb(223, 223, 223);
    width: 160px;
}
.side_block {
    text-align: center;
    margin-top: 20px;
}

#block {
    width: 95%;
    height: 100%;
    background-color: rgb(210, 210, 210);
    color: rgb(71, 71, 71);
    margin-top: 20px;
    padding-left: 10px;
    box-shadow: 3px 3px 3px gray;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-radius: 10px/10px;
    flex-wrap: nowrap;
}
#add_btn {
    height: 100px;
    background-color: rgb(210, 210, 210);
    border-top: none;
    border-right: none;
    border-bottom: none;
    border-left-width: 1px;
    padding-top: 30px;
    padding-bottom: 30px;
    color: grey;
    border-radius: 0px 10px 10px 0px
}
#add_btn:hover,#search_button:hover {
    cursor: pointer;
}

#btnoff {
    height: 100px;
}

#title {
    font-weight: bold;
}

/* #button {
    background: url(../assets/base_img/button_img.png);
    background-position:  0px 0px;
    background-repeat: no-repeat;
    width: 30px;
    height: 22px;
    border: 0px;
    cursor:pointer;
    outline: 0;
} */
</style>