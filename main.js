const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

botoes.forEach((botao, index) => {
    botao.onclick = () => {
        console.log(`Botão clicado: ${botao.textContent.trim()}`);
        botoes.forEach((b, i) => {
            b.classList.remove("ativo");
            textos[i].classList.remove("ativo");
            b.setAttribute("aria-selected", "false");
        });

        botao.classList.add("ativo");
        textos[index].classList.add("ativo");
        botao.setAttribute("aria-selected", "true");
        console.log(`Aba ${index + 1} ativada.`);
    };
});

const contadores = document.querySelectorAll(".contador");
const tempoObjetivo1 = new Date("2025-12-05T00:00:00");
const tempoObjetivo2 = new Date("2025-12-05T00:00:00");
const tempoObjetivo3 = new Date("2025-06-30T00:00:00");
const tempoObjetivo4 = new Date("2026-02-01T00:00:00");

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];

function calculaTempo(tempoObjetivo) {
    let tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual;
    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;
    if (tempoFinal > 0) {
        return [dias, horas, minutos, segundos];
    } else {
        return [0, 0, 0, 0];
    }
}

function atualizaCronometro() {
    for (let i = 0; i < contadores.length; i++) {
        const [dias, horas, minutos, segundos] = calculaTempo(tempos[i]);
        document.getElementById("dias" + i).textContent = dias;
        document.getElementById("horas" + i).textContent = horas;
        document.getElementById("min" + i).textContent = minutos;
        document.getElementById("seg" + i).textContent = segundos;
        console.log(`Atualizando contador ${i + 1}: ${dias}d ${horas}h ${minutos}m ${segundos}s`);
    }
}

let intervalo;

function comecaCronometro() {
    atualizaCronometro();
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(atualizaCronometro, 1000);
    console.log("Cronômetro iniciado com sucesso.");
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        console.log("A aba está visível. Reiniciando o cronômetro.");
        comecaCronometro();
    } else {
        console.log("A aba está oculta. Cronômetro pausado.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Bem-vindo ao site de objetivos! Explore as abas e acompanhe seu progresso.");
});

comecaCronometro();
