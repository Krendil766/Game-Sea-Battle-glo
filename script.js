const record = document.querySelector('#record');
const shot = document.querySelector('#shot');
const hit = document.querySelector('#hit');
const dead = document.querySelector('#dead');
const enemy = document.querySelector('#enemy');
const again = document.querySelector('#again');

const play = {
    record: 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
};

const show = {
    hit() {

    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    dead() {

    },
    changeClass(elem, value) {
        if (!elem.classList.contains(value)) {
            elem.className = value;
            play.updateData = 'shot';
        }
    }
}

const fire = (e) => {
    const target = e.target;
    show.miss(target);
}

const init = () => {
    enemy.addEventListener('click', fire);

}
init();