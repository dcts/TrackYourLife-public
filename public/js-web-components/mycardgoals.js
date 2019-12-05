class MyCardGoals extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  get vegan() {
    return this._vegan === "true";
  }
  get nocoke() {
    return this._nocoke === "true";
  }
  get fasting() {
    return this._fasting === "true";
  }

  // switch handling
  turnSwitchOn(switchEl) {
    switchEl.querySelector(".trigger-grey").classList.add("activated");
    switchEl.querySelector(".trigger-grey").classList.add("invisible");
    switchEl.querySelector(".trigger-green").classList.add("activated");
    switchEl.querySelector(".trigger-green").classList.remove("invisible");
    switchEl.querySelector(".trigger-checkmark").classList.add("activated");
    switchEl.querySelector(".trigger-checkmark").classList.remove("invisible");
    switchEl.dataset.status = "on";
  };
  turnSwitchOff(switchEl) {
    switchEl.querySelector(".trigger-grey").classList.remove("activated");
    switchEl.querySelector(".trigger-grey").classList.remove("invisible");
    switchEl.querySelector(".trigger-green").classList.remove("activated");
    switchEl.querySelector(".trigger-green").classList.add("invisible");
    switchEl.querySelector(".trigger-checkmark").classList.remove("activated");
    switchEl.querySelector(".trigger-checkmark").classList.add("invisible");
    switchEl.dataset.status = "off";
  };

  set vegan(val) {
    this.setAttribute('vegan', val);
    if (val) {
      this.turnSwitchOn(goals.shadow.querySelector(".switch.vegan"));
    } else {
      this.turnSwitchOff(goals.shadow.querySelector(".switch.vegan"));
    }
  }
  set nocoke(val) {
    this.setAttribute('nocoke', val);
    if (val) {
      this.turnSwitchOn(goals.shadow.querySelector(".switch.nocoke"));
    } else {
      this.turnSwitchOff(goals.shadow.querySelector(".switch.nocoke"));
    }
  }
  set fasting(val) {
    this.setAttribute('fasting', val);
    if (val) {
      this.turnSwitchOn(goals.shadow.querySelector(".switch.fasting"));
    } else {
      this.turnSwitchOff(goals.shadow.querySelector(".switch.fasting"));
    }
  }

  current() {
    return {
      vegan: this.vegan,
      nocoke: this.nocoke,
      fasting: this.fasting,
    }
  }

  reached() {
    return this.vegan && this.nocoke && this.fasting;
  }

  static get observedAttributes() {
    return [ 'vegan', 'nocoke', 'fasting'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'vegan':
        this._vegan = newVal;
        break;
      case 'nocoke':
        this._nocoke = newVal;
        break;
      case 'fasting':
        this._fasting = newVal;
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
          font-weight: 300;
        }
        h1 {
          margin: 0;
          padding-top: 15px;
          padding-bottom: 15px;
          font-size: 12px;
          font-weight: bold;
        }
        .switch {
          width: 40px;
          height: 21px;
          border-radius: 5px;
          box-shadow: 0 0 4px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
        }
        .trigger {
          width: 17px;
          height: 17px;
          border-radius: 3px;
          margin-left: 2px;
          margin-right: 2px;
          transition: all 0.2s ease;
          position: absolute;
          left: 0;
        }
        .trigger-grey {
          background-color: #E5E5E5;
        }
        .trigger-green {
          background-color: #77C44C;
        }
        .invisible {
          opacity: 0;
        }
        .activated {
          left: 19px;
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 10px;
        }
      </style>
      <div class="card">
        <h1>GOALS</h1>
        <div class="row">
          <p>Vegan</p>
          <div class="switch vegan" data-status="off" data-item="vegan">
            <div class="trigger trigger-grey"></div>
            <div class="trigger trigger-green invisible"></div>
            <img class="trigger trigger-checkmark invisible" src="img/icons/checkmark-white.svg">
          </div>
        </div>
        <div class="row">
          <p>No Coke</p>
          <div class="switch nocoke" data-status="off" data-item="nocoke">
            <div class="trigger trigger-grey"></div>
            <div class="trigger trigger-green invisible"></div>
            <img class="trigger trigger-checkmark invisible" src="img/icons/checkmark-white.svg">
          </div>
        </div>
        <div class="row">
          <p>Fasting</p>
          <div class="switch fasting" data-status="off" data-item="fasting">
            <div class="trigger trigger-grey"></div>
            <div class="trigger trigger-green invisible"></div>
            <img class="trigger trigger-checkmark invisible" src="img/icons/checkmark-white.svg">
          </div>
        </div>
      </div>
    `;
    this.shadow.innerHTML = template;

    let switchElements = this.shadow.querySelectorAll(".switch");
    switchElements.forEach(switchEl => {
      switchEl.addEventListener("click", (el) => {
        let targetVal;
        if (switchEl.dataset.status === "off") {
          targetVal = true; // set to true
        } else if (switchEl.dataset.status === "on") {
          targetVal = false; // set to false
        }
        switch(switchEl.dataset.item) {
          case 'vegan':
            this.vegan = targetVal;
            break;
          case 'nocoke':
            this.nocoke = targetVal;
            break;
          case 'fasting':
            this.fasting = targetVal;
            break;
        }
        // @ TODO -> maybe i should call thes functions on change trigger instead of onclick
        // would be nicer? Not sure...
        updateProgressBar();
        updateFirebase();
      })
    });
  }
}

window.customElements.define('my-card-goals', MyCardGoals);
