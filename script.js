
let locauxProblemes = {};

function afficherEtage(nom) {
    document.getElementById('planEtage').style.display = 'block';
    document.getElementById('titreEtage').innerText = 'Plan de ' + nom;
}

function afficherLocal(id) {
    document.getElementById('detailsLocal').style.display = 'block';
    document.getElementById('titreLocal').innerText = 'Vérification du ' + id;
    document.getElementById('pointsVerification').dataset.localId = id;
}

function signalerProbleme(nomPoint) {
    const localId = document.getElementById('pointsVerification').dataset.localId;
    locauxProblemes[localId] = locauxProblemes[localId] || [];
    if (!locauxProblemes[localId].includes(nomPoint)) {
        locauxProblemes[localId].push(nomPoint);
    }
    const locaux = document.querySelectorAll('.local');
    locaux.forEach(local => {
        if (local.textContent.includes(localId)) {
            local.classList.add('probleme');
        }
    });
}

function telechargerRapport() {
    let csvContent = "Numéro du local,Nom du local,Problèmes\n";
    for (let local in locauxProblemes) {
        csvContent += `${local},${local},${locauxProblemes[local].join('; ')}\n`;
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "rapport_problemes.csv";
    link.click();
}
