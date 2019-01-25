<template>
  <div>
    <div class="countDivComponents"><b>{{day}} 天</b><span>{{ hr }}</span><span>{{ min }}</span><span>{{ sec }}</span></div>
  </div>
</template>

<script>
  export default {
    props: ["o_time"],
    data() {
      return {
        day: "0",
        hr: "00",
        min: "00",
        sec: "00"
      };
    },
    created() {
      setTimeout(() => {
         this.countdown();
      }, 2000);

    },
    updated() {

    },
    methods: {
      countdown: function () {
        const end = parseInt(this.o_time) * 1000;
        const now = Date.parse(new Date());
        if (end == 0) {
          (this.hr = "00"), (this.min = "00"), (this.sec = "00");
        } else {
          const msec = end - now;
          let day = parseInt(msec / 1000 / 60 / 60 / 24);
          let hr = parseInt((msec / 1000 / 60 / 60) % 24);
          let min = parseInt((msec / 1000 / 60) % 60);
          let sec = parseInt((msec / 1000) % 60);
          this.day = day;
          this.hr = hr > 9 ? hr : "0" + hr;
          this.min = min > 9 ? min : "0" + min;
          this.sec = sec > 9 ? sec : "0" + sec;
          const that = this;
          setTimeout(function () {
            that.countdown();
          }, 1000);
        }
      }
    }
  };

</script>

<style lang="scss">
</style>
