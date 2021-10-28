<template>
  <vep :progress="getSpendPercentage">
    <span slot="legend-value">/100%</span>
  </vep>
</template>

<script>
export default {
  name: "SidebarCircle",
  components: {},
  props: {
    spend: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({}),
  mounted() {},
  computed: {
    getSpendPercentage() {
      let spendPercentage = (this.spend * 100) / this.profit;
      if (typeof spendPercentage === "bigint") spendPercentage = 0;
      if (Math.floor(spendPercentage) >= 100) spendPercentage = 100;
      if (Math.floor(spendPercentage) <= 0) spendPercentage = 0;
      return this.spend ? spendPercentage : 0;
    },
  },
};
</script>

<style scoped></style>
