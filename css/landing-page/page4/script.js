document.querySelector('.nav-toggle').addEventListener('click', e => {
    document.querySelector('.nav-links').classList.toggle('show');
})
const headerContent = document.querySelector('.header-content');
const headerCue = document.querySelector('.header-cue');
const meetSection = document.querySelector('#meet');
const nav = document.querySelector('nav');
const navHeight = nav.clientHeight;
const friendSection = document.querySelector('.friend-section');
const friendSectionImg = document.querySelector('.friend-section-img');
const friendSectionText = document.querySelector('.friend-section-text');
const allTypeMonster = document.querySelectorAll('.type-monster');

const allMonster = document.querySelectorAll('.monster')
allMonster.forEach(ele => ele.style.animationDelay = `${Math.random() * 0.5 + 0.2}s`);


function moveHeader() {

    const dyNav = meetSection.getBoundingClientRect().top - navHeight;
    if (dyNav > 0) {
        if (nav.classList.contains('in-body')) {
            nav.classList.remove('in-body');
        }
    } else {
        if (!nav.classList.contains('in-body')) {
            nav.classList.add('in-body');
        }
    }

    const dyHeader = headerContent.getBoundingClientRect().top;
    if (dyHeader < 0) {
        if (!headerCue.classList.contains('hidden')) {
            headerCue.classList.add('hidden');
        }
    } else {
        if (headerCue.classList.contains('hidden')) {
            headerCue.classList.remove('hidden');
        }
    }

    if (isInViewport(headerContent)) {
        const top = window.scrollY;
        headerContent.style.transform = `translateY(-${top / 1.5}px)`;
        let opacity = 1 - top / headerContent.clientHeight * 3;
        opacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
        headerContent.style.opacity = opacity;
    }


    allMonster
        .forEach(monster => isInViewport(monster)
            ? monster.classList.add('appear')
            : monster.classList.remove('appear'));

    if (isInViewport(friendSection)) {
        const friendSectionTop = friendSection.getBoundingClientRect().top;
        const dyFriendImg = -friendSectionImg.scrollHeight - friendSectionTop + window.innerHeight;
        friendSectionImg.style.transform = `translateY(${dyFriendImg * 1}px) rotate(${calDegree(dyFriendImg / 3, -45, 45)}deg)`;


        friendSectionText.style.transform = `translateY(${friendSectionTop / 1}px)`;

        let opacity = 1 - friendSectionTop / friendSection.clientHeight * 0.5;
        opacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
        friendSectionText.style.opacity = opacity;
    }

    allTypeMonster
        .forEach(ele => isInViewport(ele)
            ? ele.classList.add('appear')
            : ele.classList.remove('appear'));

    requestAnimationFrame(moveHeader);
}
function isInViewport(ele) {
    const rect = ele.getBoundingClientRect();
    return (
        (rect.top > 0 && rect.top < window.innerHeight) ||
        (rect.top < 0 && rect.bottom > 0)
    )
}
moveHeader()

function calDegree(n, min, max) {
    n = parseInt(n);
    let divide = n / (max - min);
    let remain = n % (max - min);
    if (parseInt(divide) % 2 == 0) {
        return max - Math.abs(remain)
    }
    return Math.abs(remain) + min;

}