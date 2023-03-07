<template>
    <div class="side_block">
        <h4>내 일정</h4>
        <div v-for="(i,index) in data" :key="index">   
            <div id="plan_block">
                <div></div> <!-- space-between 간격을 위한 빈 div -->
                <div><div id="title">{{ i.title }}</div><br>{{ i.address }}{{ i.address }}</div>
                    <div id="btn_block">
                        <div v-if="button_on" id="updown_btn_block">
                            <button id="up_btn">▲</button><button id="down_btn">▼</button>
                        </div>
                    </div>
            </div>
            <div v-if="!button_on">
                <div v-if="index < data.length-1" id="direction_block">
                    <div>▼<br>▼<br>▼</div><div>&nbsp;&nbsp;&nbsp;&nbsp;소요시간: {{ direciton[index].time }}<br>거리: {{ direciton[index].distance }}</div>
                </div>
                <div v-else></div>
            </div>
        </div>
        <div id="navi_btn_block">
            <button id="navi_btn" @click="fnDirectionOff">일정 보기</button><button id="navi_btn" @click="fnDirectionOn">동선 보기</button>
        </div>
    </div>
</template>

<script>
// import EventBus from '../EventBus'

export default {
        data() {
            return {
                data:[  
                    {title:'우진해장국',
                    address:'제주시 서사로'},
                    {title:'성산 일출봉',
                    address:'서귀포시 성산읍'},
                    {title:'섭지코지',
                    address:'서귀포시 성산읍'}
                ],
                direciton:[
                        {time:'50분',
                        distance:'40km'},
                        {time:'30분',
                        distance:'20km'}
                ],
            button_on:true
            }  
        },
        methods: {
            fnDirectionOn() {
                this.button_on = false;
                // EventBus.$emit('btn_off',this.button_on);
            },
            fnDirectionOff() {
                // this.button_on = true;
            },

        },
        mounted() {
            // this.fnDirectionOff()
        }
        }
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

#up_btn:hover, #down_btn:hover, #navi_btn:hover {
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