<template>
    <div class="side_block">
        <h4>내 일정</h4>
        <div v-for="(i,index) in datas" :key="index">
            <div id="plan_block">
                <div id = "x_index_btn">
                    <button v-if="button_on" id="del_btn" v-on:click="fnDelete(i)">x</button>
                    <div id="index"></div>
                </div>
                <div><div id="title">{{ index+1 }}.&nbsp;{{ i.location_name }}</div><br>{{ i.address }}</div>
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

import axios from 'axios'

export default {
        mounted() {
            axios.get('http://127.0.0.1:3000/location')
            .then((res) => {
                this.datas = res.data;
            }).catch((error) => {
                console.log(error);
            })
        },
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
                //params 변수 (출발지, 경유지, 도착지)
                let origin = this.datas[0].mapx + ','+this.datas[0].mapy + ',name=' + this.datas[0].location_name;
                let waypoints = '';
                for ( let i = 1 ; i < this.datas.length-1 ; i++) {
                    if ( i != this.datas.length-2){ // | 로 연결해야 해서 푸쉬할때 |추가하고 마지막순서만 |안넣기
                        waypoints = waypoints + this.datas[i].mapx + ',' + this.datas[i].mapy + ',name=' + this.datas[i].location_name + '|' ;
                    } else {
                        waypoints = waypoints + this.datas[i].mapx + ',' + this.datas[i].mapy + ',name=' + this.datas[i].location_name;
                    }    
                }

                let destination = this.datas[this.datas.length-1].mapx + ',' + this.datas[this.datas.length-1].mapy + ',name=' + this.datas[this.datas.length-1].location_name;

                let config = {
                method: 'get',
                url: 'https://apis-navi.kakaomobility.com/v1/directions',
                params: {
                    origin : origin,
                    destination : destination,
                    waypoints : waypoints
                },
                headers: { 
                    'Authorization': import.meta.env.VITE_JAVASCRIPT_KEY
                }
                };
                axios(config)
                .then((res) => {
                    this.direciton = res.data;
                    this.button_on = false;
                    this.fnBtnoff();
                })
                .catch((error) => {
                    this.direciton = {};
                    console.log('test',error);
                });

                
            },

            // 일정보기 클릭 시
            fnDirectionOff() {
                try {
                    this.button_on = true;
                    this.fnBtnon();
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
                    this.$router.go(this.$router.currentRoute);
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
                    let form = {
                            fst_turn:this.datas[index].turn,
                            fst_id:this.datas[index-1].id,
                            snd_turn:this.datas[index-1].turn,
                            snd_id:this.datas[index].id
                        };
                    this.$axios.put(this.$serverUrl,form)
                    .then(() => {
                        axios.get(this.$serverUrl)
                        .then((res) => {
                            this.datas = res.data;
                            this.emitter.emit('marker',this.datas);
                        }).catch((error) => {
                            console.log(error);
                        })
                    }).catch((err) => {
                        console.log('err',err);
                    });
                }
            },

            // 순서 바꾸기 아래쪽 방향
            fnDown(index) {
                if (index == this.datas.length-1) {
                    console.log('변경불가')
                } else {
                    let form = {
                            fst_turn:this.datas[index].turn,
                            fst_id:this.datas[index+1].id,
                            snd_turn:this.datas[index+1].turn,
                            snd_id:this.datas[index].id
                        };
                    this.$axios.put(this.$serverUrl,form)
                    .then(() => {
                        axios.get(this.$serverUrl)
                        .then((res) => {
                            this.datas = res.data;
                            this.emitter.emit('marker',this.datas);
                        }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((err) => {
                        console.log('err',err); 
                    });
                }
            },
            //일정보기 클릭시 mitt
            fnBtnon() {
                this.emitter.emit('btnOn',this.button_on); // 일정보기 클릭시 SearchView의 일정추가 버튼을 없애기 위해 (v-if (button_on=ture)) button_on의 데이터를 넘겨준다. 
                this.emitter.emit('marker',this.datas); // 지도마커 생성을 위해 필요한 일정data의 주소,x,y좌표를 보내기 위해 datas 전송
            },
            //동선보기 클릭시 mitt
            fnBtnoff() {
                this.emitter.emit('btnOff',this.button_on); //동선보기 클릭시 SearchView의 일정추가 버튼을 없애기 위해 (v-if (button_on=ture)) button_on의 데이터를 넘겨준다.
                this.emitter.emit('marker',this.datas); // 지도마커 생성을 위해 필요한 일정data의 주소,x,y좌표를 보내기 위해 datas 전송

            }
        }

    }
</script>

<style>

#plan_block {
    width: 92%;
    height: 100%;
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

#x_index_btn {
    display: flex;
    flex-direction: column;
}

#up_btn {
    background-color: rgb(210, 210, 210);
    height: 50px;
    padding-top: 12px;
    padding-bottom: 10px;
    border-bottom: none;
    border-top: none;
    border-right: none;
    border-left-width: 1px;
    border-radius: 0px 10px 0px 0px;
}

#down_btn {
    height: 50px;
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
    height: 10px;
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