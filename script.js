const record = document.querySelector('#record');
const shot = document.querySelector('#shot');
const hit = document.querySelector('#hit');
const dead = document.querySelector('#dead');
const enemy = document.querySelector('#enemy');
const again = document.querySelector('#again');
const header = document.querySelector('.header')

const game ={
    ships: [
        {
            location: ['26', '36', '46', '56'],
            hit: ['', '', '', '']
        },
        {
            location: ['11', '12', '13'],
            hit: ['', '', '']
        },
        {
            location: ['69', '79'],
            hit: ['', '']
        },
        {
            location: ['32'],
            hit: ['']
        },
    ],
    shipCount: 4,
}

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
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
    hit(elem) {
        this.changeClass(elem, 'hit');
    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    dead(elem) {
        this.changeClass(elem, 'dead');
    },
    changeClass(elem, value) {
        elem.className = value;
    }
}

const fire = (e) => {
    const target = e.target;
    if(target.classList.length!==0 || target.tagName!=='TD' || game.shipCount<1)return;
    play.updateData = 'shot';
    show.miss(target);

    for(let i=0;i<game.ships.length;i++){
        const ship = game.ships[i];
        const index = ship.location.indexOf(target.id);
        if(index>=0){
            show.hit(target);
            play.updateData = 'hit';
            ship.hit[index] = 'xxx';
            const life = ship.hit.indexOf('');
            if(life==-1){
                play.updateData = 'dead';
                for(const id of ship.location){
                    show.dead(document.getElementById(id))
                };
                game.shipCount--;
                if(game.shipCount<1){
                    header.textContent='GAME OVER';
                    header.style.color = 'red';
                    target.classList.remove('shot')
                    if(play.shot<play.record || play.record===0){
                        localStorage.setItem('seaBattleRecord', play.shot);
                        play.record=play.shot;
                        play.render();
                    }

                }
            }
        }
    }

}

const init = () => {
    enemy.addEventListener('click', fire);
    play.render();

    again.addEventListener('click',()=>{
        location.reload();
    })
}
init();