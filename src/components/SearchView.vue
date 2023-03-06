<template>
    <div class="side_block">
        <form>
            <input id="search_input"><input id="search_button" type="submit" value="검색">
        </form>
        <div v-for="(i,index) in data" :key="index">
            <div id="block">
                <div><div id="title">{{ i.title }}</div><br>{{ i.address }}</div><button class="add_btn">+</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data:[  {title:'우진해장국',
                        address:'제주시 서사로'},
                        {title:'성산 일출봉',
                        address:'서귀포시 성산읍'},
                        {title:'섭지코지',
                        address:'서귀포시 성산읍'}
                    ]
                
            }
        }}
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
    width: 65%;
    height: 80px;
    background-color: rgb(210, 210, 210);
    color: rgb(71, 71, 71);
    margin-top: 20px;
    padding-left: 100px;
    box-shadow: 3px 3px 3px gray;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-radius: 10px/10px;
    flex-wrap: wrap;
}
.add_btn {
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