import axios from "axios";
import Vue from "vue";

// tslint:disable-next-line: no-unused-expression
new Vue({
  computed: {
    hasActions(): boolean {
      return this.isLoading === false && this.actions.length > 0;
    },
  },
  data() {
    return {
      current: 0,
      actions: [],
      isLoading: true,
    };
  },
  el: "#calculator",
  methods: {
    add() {
      const action = "add";
      axios
        .post("/api/actions", { action })
        .then((res: any) => {
          this.current = this.current + 5;
          this.loadActions();
        })
        .catch((err: any) => {
          // tslint:disable-next-line: no-console
          console.log(err);
        });
    },
    subtract() {
      const action = "subtract";
      axios
        .post("/api/actions", { action })
        .then((res: any) => {
          this.current = this.current - 5;
          this.loadActions();
        })
        .catch((err: any) => {
          // tslint:disable-next-line: no-console
          console.log(err);
        });
    },
    loadActions() {
      axios
        .get("/api/actions")
        .then((res: any) => {
          this.isLoading = false;
          this.actions = res.data;
        })
        .catch((err: any) => {
          // tslint:disable-next-line: no-console
          console.log(err);
        });
    },
  },
  mounted() {
    return this.loadActions();
  },
});
