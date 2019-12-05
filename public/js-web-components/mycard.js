class MyCard extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  get title() {
    return this._title;
  }
  get unit() {
    return this._unit;
  }
  get color() {
    return this._color;
  }
  get max() {
    return Number(this._max);
  }
  get step() {
    return Number(this._step);
  }
  get current() {
    return Number(this._current);
  }

  set title(val) {
    this.setAttribute('title', val);
  }
  set unit(val) {
    this.setAttribute('unit', val);
  }
  set color(val) {
    this.setAttribute('color', val);
  }
  set max(val) {
    this.setAttribute('max', val);
  }
  set step(val) {
    this.setAttribute('step', val);
  }
  set current(val) {
    this.setAttribute('current', val);
  }

  static get observedAttributes() {
    return [ 'title', 'unit', 'color', 'max', 'step', 'current'];
  }
  increase() {
    this.current += this.step;
    updateProgressBar();
    updateFirebase();
  }
  decrease() {
    this.current = Math.max(this.current - this.step, 0);
    updateProgressBar();
    updateFirebase();
  }
  reached() {
    return this.current >= this.max;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'title':
        this._title = newVal;
        this.shadow.querySelector(".inject-title").innerText = newVal;
        break;
      case 'unit':
        this._unit = newVal;
        this.shadow.querySelector(".inject-unit").innerText = newVal;
        break;
      case 'color':
        this._color = newVal;
        this.shadow.getElementById("doughnut-fill").setAttribute("stroke",newVal);
        break;
      case 'max':
        this._max = newVal;
        break;
      case 'step':
        this._step = newVal;
        break;
      case 'current':
        this._current = newVal;
        this.shadow.querySelector(".inject-current").innerText = newVal;
        let perc = Math.min(1, (this.current / this.max));
        let target = `${perc*100} ${100 - (perc*100)}`;
        this.shadow.getElementById("doughnut-fill").setAttribute("stroke-dasharray", target);
        break;
    }
  }

  connectedCallback() {
    var template = `
      <style>
        .card {
          background-color: white;
          box-shadow: 0 0 14px rgba(0,0,0,0.1);
          border-radius: 14px;
          text-align: center;
          font-size: 30px;
          height: 50vh;
          max-height: 168px;
          width: 50vw;
          max-width: 156px;
        }
        p {
          margin: 0;
          font-size: 14px;
        }
        h1 {
          margin: 0;
          padding-top: 15px;
          padding-bottom: 5px;
          font-size: 12px;
          font-weight: bold;
        }
        .doughnut {
          position: relative;
          width: 123px;
          height: 123px;
          margin: 0 auto;
        }
        h2.inject-current,
        p.inject-unit {
          margin: 0;
          position: absolute;
          width: 100%;
          text-align: center;
          font-family: 'Roboto', sans-serif;
        }
        h2.inject-current {
          top: 40px;
          font-size: 27px;
        }
        p.inject-unit {
          top: 69px;
          font-size: 14px;
          letter-spacing: 5%;
        }
        circle {
          transition: all 0.2s ease;
        }
      </style>
      <div class="card">
        <h1 class="inject-title"></h1>
        <div class="doughnut">
          <h2 class="inject-current"></h2>
          <p class="inject-unit"></p>
          <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
            <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
            <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#efefef" stroke-width="3"></circle>
            <circle id="doughnut-fill" class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="${this._color}" stroke-width="5" stroke-dasharray="0 100" stroke-dashoffset="25"></circle>
          </svg>
        </div>
      </div>
    `;
    this.shadow.innerHTML = template;

    // add click events
    this.shadow.querySelector(".inject-title").addEventListener("click", () => {
      this.decrease();
    });
    this.shadow.querySelector(".doughnut").addEventListener("click", () => {
      this.increase();
    });
  }
}

window.customElements.define('my-card', MyCard);
