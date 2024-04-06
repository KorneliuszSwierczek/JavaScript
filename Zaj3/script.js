const clap = document.querySelector('#clap')
const boom = document.querySelector('#boom')
const hihat = document. querySelector('#hihat')

document.addEventListener('keypress', ev =>{
    console.log(ev)

const sounds = {
    'a': boom,
    'b': clap,
    'c': hihat,
}

document.addEventListener('keypress', ev =>{
    console.log(ev)
})
//const sound = document.querySelector('[data-key=${ev.key}]')
const sound = sounds[ev.key]
sound.currentTime = 0
sound.play()
})