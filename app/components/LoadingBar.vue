<template>
    <div>
        <div v-if="loading" tabindex="0" class="vld-overlay is-active is-full-page">
            <div class="vld-background">
                <div class="loading-page">
                    <div class="vld-icon">
                        <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height"
                            :stroke="color">
                            <g fill="none" fill-rule="evenodd">
                                <g transform="translate(1 1)" stroke-width="2">
                                    <circle stroke-opacity=".25" cx="18" cy="18" r="18" />
                                    <path d="M36 18c0-9.94-8.06-18-18-18">
                                        <animateTransform attributeName="transform" type="rotate" from="0 18 18"
                                            to="360 18 18" dur="0.8s" repeatCount="indefinite" />
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  <script>
export default {
    name: "LoadingBar",
    data: () => ({
        loading: false,
        color: 'var(--prodv-color)',
        height: 64,
        width: 64
    }),
    methods: {
        show() {
            this.start();
        },
        hidde() {
            this.finish();
        },
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        },
    },
}
</script>
  <style lang="scss" scoped>
  .vld-overlay {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      align-items: center;
      display: none;
      justify-content: center;
      overflow: hidden;
      z-index: 9999;
  
      &.is-active {
          display: flex;
      }
  
      &.is-full-page {
          z-index: 9999;
          position: fixed;
      }
  }
  
  .vld-background {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      background: #fff;
      opacity: 0.5;
  }
  
  .vld-icon {
      position: relative;
  }
  
  .loading-page {
      position: fixed;
      top: 50%;
      right: 50%;
      left: 50%;
      z-index: 1000;
      padding: 1rem;
      text-align: center;
      font-size: 3rem;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  
  .loading {
      display: inline-block;
      width: 2rem;
      height: 1.5rem;
      border: 4px solid var(--first-color);
      border-radius: 50%;
      border-top-color: var(--prodv-color);
      animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
      to {
          -webkit-transform: rotate(360deg);
      }
  }
  </style>
  