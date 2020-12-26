<template>
    <div class="box">
        <div class="row" :class="select == index ? 'active' : item.showClass " v-for="(item,index) in list" :key="index">
            {{item.name}}</div>
        <div class="lottery" @click="startDraw()">抽礼物</div>
        <input v-model="giftNum" class="input" type="password" size="large" placeholder="请输入你的礼物编号" clearable/>
    </div>
</template>

<script>
export default {
name: "LotteryDrawer",
  data() {
    return {
      giftNum: '',
      hasSelected: [],
      list: [
        {
          name: "1号",
          showClass: ''
        },
        {
          name: "2号",
          showClass: ''
        },
        {
          name: "3号",
          showClass: ''
        },
        {
          name: "4号",
          showClass: ''
        },
        {
          name: "5号",
          showClass: ''
        },
        {
          name: "6号",
          showClass: ''
        },
        {
          name: "7号",
          showClass: ''
        },
        {
          name: "8号",
          showClass: ''
        },
        {
          name: "9号",
          showClass: ''
        },
        {
          name: "10号",
          showClass: ''
        },
        {
          name: "11号",
          showClass: ''
        },
        {
          name: "12号",
          showClass: ''
        },
        {
          name: "13号",
          showClass: ''
        },
        {
          name: "14号",
          showClass: ''
        },
        {
          name: "15号",
          showClass: ''
        },
      ],
      flag: true,//是否开始抽奖
      select: 0,//页面对应抽奖下标
      timer: "",
      count: 0,
    }
  },
  methods: {
      startDraw() {
          if (this.flag == true) {
              this.flag = false;
              if (this.list.length == this.hasSelected.length){
                  window.alert("抽奖结束，请刷新重新开始！");
                  return;//抽奖结束
              }
              if (this.giftNum == ''){
                  window.alert("请输入属于你的礼物编号...");
                  this.flag = true;
                  return;//抽奖结束
              }
              let mWin = this.getRandomNumber();
              this.timer = setInterval(() => {
                  this.spinPrize(mWin)
              }, 100)
          }
      },

      spinPrize(win) {
          let spin = 3; //旋转圈数
          this.select += 1
          if (this.select > 14 && this.count != spin) {
              this.select = 0
              this.count += 1
          }
          if (this.select == win && this.count == spin) {
              clearInterval(this.timer);
              this.flag = true;
              this.count = 0;
              this.list[this.select].showClass = 'selected';
              this.hasSelected.push(this.select);
              this.giftNum = '';
              console.log("中奖产品为:" + this.list[this.select].name)
          }
      },

      getRandomNumber(){
          let win = Math.floor(Math.random()*15);
          // 这个礼物编号不是我自己的，而且这个编号不能出现过
          console.log(Number(this.giftNum)-1);
          while(win == Number(this.giftNum)-1 || this.hasSelected.includes(win)){
              win = Math.floor(Math.random()*15);
          }
          return win
      }
  },
}
</script>

<style scoped>
    @import "../assets/scss/lottery.scss";

</style>