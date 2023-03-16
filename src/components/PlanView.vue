<template>
    <div class="side_block">
        <h4>내 일정</h4>
        <div v-for="(i,index) in datas" :key="index">
            <div id="plan_block">
                <button v-if="button_on" id="del_btn" v-on:click="fnDelete(i)">x</button>
                <div><div id="title">{{ i.location_name }}</div><br>{{ i.address }}</div>
                    <div id="btn_block">
                        <div v-if="button_on" id="updown_btn_block">
                            <button id="up_btn" @click="fnUp(index)">▲</button><button id="down_btn" @click="fnDown(index)">▼</button>
                        </div>
                    </div>
            </div>
            <div v-if="!button_on">
                <div v-if="index < datas.length-1" id="direction_block">
                    <div>▼<br>▼<br>▼</div><div>&nbsp;&nbsp;&nbsp;&nbsp;소요시간:{{ (direciton.routes[0].sections[index].duration/60)|int }}분<br>거리: {{ (direciton.routes[0].sections[index].distance/1000)|int }}km</div>
                </div>
                <div v-else></div>
            </div>
            
        </div>
        <div id="navi_btn_block">
            <button id="navi_btn" @click="fnDirectionOff()">일정 보기</button><button id="navi_btn" @click="fnDirectionOn()">동선 보기</button>
        </div>
    </div>
</template>

<script>
// import EventBus from '../EventBus'
import axios from 'axios'
export default {
        data() {
            return {
                datas:{},
                direciton:{},
                button_on:true
            }  
        },
        methods: {
            // 동선보기 클릭 시
            fnDirectionOn() {
                //params 변수
                let origin = this.datas[0].mapx + ','+this.datas[0].mpay + ',name=' + this.datas[0].location_name;
                let waypoints = '';
                for ( let i = 1 ; i < this.datas.length-1 ; i++) {
                    if ( i != this.datas.length-2){ // | 로 연결해야 해서 푸쉬할때 |추가하고 마지막순서만 |안넣기
                        waypoints = waypoints + this.datas[i].mapx + ',' + this.datas[i].mpay + ',name=' + this.datas[i].location_name + '|' ;
                    } else {
                        waypoints = waypoints + this.datas[i].mapx + ',' + this.datas[i].mpay + ',name=' + this.datas[i].location_name;
                    }    
                }

                let destination = this.datas[this.datas.length-1].mapx + ',' + this.datas[this.datas.length-1].mpay + ',name=' + this.datas[this.datas.length-1].location_name;

                let config = {
                method: 'get',
                url: 'https://apis-navi.kakaomobility.com/v1/directions',
                params: {
                    origin : origin,
                    destination : destination,
                    waypoints : waypoints
                },
                headers: { 
                    'Authorization': 'KakaoAK api-key'
                }
                };
                axios(config)
                .then((res) => {
                    this.direciton = res.data;
                    console.log(this.direciton);
                    this.button_on = false;
                })
                .catch((error) => {
                    this.direciton = {};
                    console.log(error);
                });
                // EventBus.$emit('btn_off',this.button_on);
                
            },
            // 일정보기 클릭 시
            fnDirectionOff() {
                try {
                    this.button_on = true;
                    this.$axios.get(this.$serverUrl)
                    .then((res) => {
                        this.datas = res.data;
                    })
                } catch(e) {
                    this.datas = {};
                }
            },
            // 삭제 버튼
            fnDelete(i) {
                this.$axios.delete(this.$serverUrl + i.id)
                .then(() => {
                    this.fnDirectionOff();
                }).catch((err)=> {
                    if (err) {
                        console.log('err',err);
                    }
                })
            },
            //순서 바꾸기 위쪽 방향
            fnUp(index) {
                if (index == 0) {
                    console.log('변경불가')
                } else {
                    let fst_form = {
                            turn:index,
                            location_name:this.datas[index].location_name,
                            address:this.datas[index].address,
                            mapx:this.datas[index].mapx,
                            mapy:this.datas[index].mpay,
                            id:this.datas[index-1].id
                        };
                    let snd_form = {
                            turn:index-1,
                            location_name:this.datas[index-1].location_name,
                            address:this.datas[index-1].address,
                            mapx:this.datas[index-1].mapx,
                            mapy:this.datas[index-1].mpay,
                            id:this.datas[index].id
                        };
                    this.$axios.put(this.$serverUrl,fst_form)
                    .then(() => {
                    }).catch((err) => {
                        console.log('err',err);
                    });
                    this.$axios.put(this.$serverUrl,snd_form)
                    .then(() => {
                        this.fnDirectionOff();
                    }).catch((err) => {
                        console.log('err', err);
                    });
                }
                

            },
            // 순서 바꾸기 아래쪽 방향
            fnDown(index) {
                if (index == this.datas.length-1) {
                    console.log('변경불가')
                } else {
                    let fst_form = {
                            turn:index,
                            location_name:this.datas[index].location_name,
                            address:this.datas[index].address,
                            mapx:this.datas[index].mapx,
                            mapy:this.datas[index].mpay,
                            id:this.datas[index+1].id
                        };
                    let snd_form = {
                            turn:index+1,
                            location_name:this.datas[index+1].location_name,
                            address:this.datas[index+1].address,
                            mapx:this.datas[index+1].mapx,
                            mapy:this.datas[index+1].mpay,
                            id:this.datas[index].id
                        };
                    this.$axios.put(this.$serverUrl,fst_form)
                    .then(() => {
                    }).catch((err) => {
                        console.log('err',err);
                    });
                    this.$axios.put(this.$serverUrl,snd_form)
                    .then(() => {
                        this.fnDirectionOff();
                    }).catch((err) => {
                        console.log('err', err);
                    });
                }
            }
}}
</script>

<style>

#plan_block {
    width: 92%;
    height: 80px;
    background-color: rgb(210, 210, 210);
    color: rgb(71, 71, 71);
    margin-top: 20px;
    margin-left: 10px;
    padding-left: 10px;
    box-shadow: 3px 3px 3px gray;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-radius: 10px/10px;
}

#direction_block {
    width: 80%;
    height: 80px;
    background-color: white;
    color: rgb(71, 71, 71);
    margin-top: 20px;
    margin-left: 10px;
    padding-left: 50px;
    align-items: center;
    display: flex;
    justify-content: center;

}

#btn_block {
    display: flex;
    flex-direction: column;
}


#up_btn {
    background-color: rgb(210, 210, 210);
    padding-top: 12px;
    padding-bottom: 10px;
    border-bottom: none;
    border-top: none;
    border-right: none;
    border-left-width: 1px;
    border-radius: 0px 10px 0px 0px;
}

#down_btn {
    background-color: rgb(210, 210, 210);
    padding-top: 10px;
    padding-bottom: 12px;
    border-bottom: none;
    border-right: none;
    border-top-width: 1px;
    border-left-width: 1px;
    border-radius: 0px 0px 10px 0px;
}

#del_btn {
    background-color: rgb(210, 210, 210);
    margin-top: 15px;
    margin-bottom: 60px;
    border-bottom: none;
    border-right: none;
    border-top: none;
    border-left: none;
    border-radius: 10px 10px 10px 10px;
}

#up_btn:hover, #down_btn:hover, #navi_btn:hover, #del_btn:hover {
    cursor: pointer;
}

#navi_btn_block {
    text-align: right;
}

#navi_btn {
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 10px;
    background-color: rgb(210, 210, 210);
    border-top: none;
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-radius: 5px 5px 5px 5px;
    box-shadow: 2px 2px 2px gray;

}

#updown_btn_block {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

</style>