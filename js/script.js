// Conteúdo movido para este arquivo. (Mantido idêntico ao original para preservar comportamento.)
// --- ALGORITMOS ---
function metodoCantoNoroeste(oferta, demanda) {
    let ofertaRestante = [...oferta];
    let demandaRestante = [...demanda];
    let numFornecedores = oferta.length;
    let numConsumidores = demanda.length;
    let alocacao = Array.from({ length: numFornecedores }, () => Array(numConsumidores).fill(0));
    let i = 0, j = 0;
    while (i < numFornecedores && j < numConsumidores) {
        let quantidade = Math.min(ofertaRestante[i], demandaRestante[j]);
        alocacao[i][j] = quantidade;
        ofertaRestante[i] -= quantidade;
        demandaRestante[j] -= quantidade;
        if (ofertaRestante[i] === 0) i++; else if (demandaRestante[j] === 0) j++;
    }
    return alocacao;
}

function metodoCustoMinimo(oferta, demanda, custos) {
    let ofertaRestante = [...oferta];
    let demandaRestante = [...demanda];
    let numFornecedores = oferta.length;
    let numConsumidores = demanda.length;
    let alocacao = Array.from({ length: numFornecedores }, () => Array(numConsumidores).fill(0));
    let celulas = [];
    for (let i = 0; i < numFornecedores; i++) for (let j = 0; j < numConsumidores; j++) celulas.push({ linha: i, coluna: j, custo: custos[i][j] });
    celulas.sort((a, b) => a.custo - b.custo);
    for (let k = 0; k < celulas.length; k++) {
        let i = celulas[k].linha, j = celulas[k].coluna;
        if (ofertaRestante[i] > 0 && demandaRestante[j] > 0) {
            let quantidade = Math.min(ofertaRestante[i], demandaRestante[j]);
            alocacao[i][j] = quantidade;
            ofertaRestante[i] -= quantidade;
            demandaRestante[j] -= quantidade;
        }
    }
    return alocacao;
}

function metodoAproximacaoVogel(oferta, demanda, custos) {
    let ofertaRestante = [...oferta];
    let demandaRestante = [...demanda];
    let numFornecedores = oferta.length;
    let numConsumidores = demanda.length;
    let alocacao = Array.from({ length: numFornecedores }, () => Array(numConsumidores).fill(0));
    let linhasAtivas = Array(numFornecedores).fill(true);
    let colunasAtivas = Array(numConsumidores).fill(true);
    let numLinhasAtivas = numFornecedores, numColunasAtivas = numConsumidores;
    while (numLinhasAtivas > 0 && numColunasAtivas > 0) {
        let penalidadesLinha = Array(numFornecedores).fill(-1);
        let penalidadesColuna = Array(numConsumidores).fill(-1);
        for (let i = 0; i < numFornecedores; i++) if (linhasAtivas[i]) {
            let custosLinha = [];
            for (let j = 0; j < numConsumidores; j++) if (colunasAtivas[j]) custosLinha.push(custos[i][j]);
            if (custosLinha.length >= 2) { custosLinha.sort((a,b)=>a-b); penalidadesLinha[i] = custosLinha[1]-custosLinha[0]; }
            else if (custosLinha.length === 1) penalidadesLinha[i] = custosLinha[0];
        }
        for (let j = 0; j < numConsumidores; j++) if (colunasAtivas[j]) {
            let custosColuna = [];
            for (let i = 0; i < numFornecedores; i++) if (linhasAtivas[i]) custosColuna.push(custos[i][j]);
            if (custosColuna.length >= 2) { custosColuna.sort((a,b)=>a-b); penalidadesColuna[j] = custosColuna[1]-custosColuna[0]; }
            else if (custosColuna.length === 1) penalidadesColuna[j] = custosColuna[0];
        }
        let maiorPenalidade=-1, ehLinha=true, indiceMaiorPenalidade=-1;
        for (let i=0;i<numFornecedores;i++) if (penalidadesLinha[i]>maiorPenalidade){maiorPenalidade=penalidadesLinha[i]; ehLinha=true; indiceMaiorPenalidade=i}
        for (let j=0;j<numConsumidores;j++) if (penalidadesColuna[j]>maiorPenalidade){maiorPenalidade=penalidadesColuna[j]; ehLinha=false; indiceMaiorPenalidade=j}
        if (maiorPenalidade===-1) break;
        let linhaEscolhida=-1, colunaEscolhida=-1, menorCusto=Infinity;
        if (ehLinha) { linhaEscolhida=indiceMaiorPenalidade; for (let j=0;j<numConsumidores;j++) if (colunasAtivas[j] && custos[linhaEscolhida][j]<menorCusto){menorCusto=custos[linhaEscolhida][j]; colunaEscolhida=j} }
        else { colunaEscolhida=indiceMaiorPenalidade; for (let i=0;i<numFornecedores;i++) if (linhasAtivas[i] && custos[i][colunaEscolhida]<menorCusto){menorCusto=custos[i][colunaEscolhida]; linhaEscolhida=i} }
        let quantidade = Math.min(ofertaRestante[linhaEscolhida], demandaRestante[colunaEscolhida]);
        alocacao[linhaEscolhida][colunaEscolhida] = quantidade;
        ofertaRestante[linhaEscolhida] -= quantidade; demandaRestante[colunaEscolhida] -= quantidade;
        if (ofertaRestante[linhaEscolhida] === 0) { linhasAtivas[linhaEscolhida] = false; numLinhasAtivas--; }
        else if (demandaRestante[colunaEscolhida] === 0) { colunasAtivas[colunaEscolhida] = false; numColunasAtivas--; }
    }
    return alocacao;
}

// --- INTERAÇÃO COM A INTERFACE ---
let metodoAtualId = 'noroeste';
function selecionarMetodo(id, nome){ metodoAtualId = id; document.getElementById('titulo-principal').innerText = nome; document.getElementById('subtitulo-principal').innerText = 'Preencha as dimensões para continuar'; document.getElementById('step-0').classList.add('hidden'); document.getElementById('step-1').classList.remove('hidden'); }
function voltarMenu(){ document.getElementById('titulo-principal').innerText = 'Problema do Transporte'; document.getElementById('subtitulo-principal').innerText = 'Escolha um método para distribuir o transporte'; document.getElementById('step-0').classList.remove('hidden'); document.getElementById('step-1').classList.add('hidden'); document.getElementById('step-2').classList.add('hidden'); document.getElementById('step-3').classList.add('hidden'); }
function gerarFormularios(){ const numF=parseInt(document.getElementById('numFornecedores').value); const numC=parseInt(document.getElementById('numConsumidores').value); if(isNaN(numF)||isNaN(numC)||numF<1||numC<1){alert('Por favor, insira valores válidos e maiores que zero.');return;} const divFornecedores=document.getElementById('inputs-fornecedores'); const divConsumidores=document.getElementById('inputs-consumidores'); const painelCustos=document.getElementById('painel-custos'); const divCustos=document.getElementById('inputs-custos'); divFornecedores.innerHTML=''; divConsumidores.innerHTML=''; for(let i=0;i<numF;i++){ divFornecedores.innerHTML+=`<div class="flex items-center space-x-3"><label class="w-24 text-sm font-medium text-gray-700">Fornecedor ${i+1}:</label><input type="number" id="oferta_${i}" min="0" placeholder="Cap." class="flex-1 border border-gray-300 rounded px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500 outline-none"></div>` } for(let j=0;j<numC;j++){ divConsumidores.innerHTML+=`<div class="flex items-center space-x-3"><label class="w-24 text-sm font-medium text-gray-700">Consumidor ${j+1}:</label><input type="number" id="demanda_${j}" min="0" placeholder="Dem." class="flex-1 border border-gray-300 rounded px-3 py-1.5 focus:ring-green-500 focus:border-green-500 outline-none"></div>` } painelCustos.classList.remove('hidden'); let htmlCustos='<table class="w-full text-center border-collapse"><thead><tr><th class="p-3 border-b border-yellow-200 font-semibold text-yellow-800">Forn. \\ Cons.</th>'; for(let j=0;j<numC;j++){ htmlCustos+=`<th class="p-3 border-b border-yellow-200 font-semibold text-yellow-800">Cons. ${j+1}</th>` } htmlCustos+='</tr></thead><tbody>'; for(let i=0;i<numF;i++){ htmlCustos+=`<tr class="hover:bg-yellow-50/50 transition-colors"><td class="p-3 font-medium text-yellow-800 border-b border-yellow-100">Fornecedor ${i+1}</td>`; for(let j=0;j<numC;j++){ htmlCustos+=`<td class="p-3 border-b border-yellow-100"><div class="flex justify-center items-center"><span class="text-gray-400 mr-1 text-sm">$</span><input type="number" id="custo_${i}_${j}" min="0" value="0" class="w-24 border border-gray-300 rounded px-2 py-1 text-center focus:ring-yellow-500 focus:border-yellow-500 outline-none"></div></td>` } htmlCustos+='</tr>' } htmlCustos+='</tbody></table>'; divCustos.innerHTML=htmlCustos; document.getElementById('step-1').classList.add('hidden'); document.getElementById('step-2').classList.remove('hidden'); document.getElementById('step-3').classList.add('hidden'); }

function voltarPasso1(){ document.getElementById('step-1').classList.remove('hidden'); document.getElementById('step-2').classList.add('hidden'); document.getElementById('step-3').classList.add('hidden'); }

function calcular(){ const numF=parseInt(document.getElementById('numFornecedores').value); const numC=parseInt(document.getElementById('numConsumidores').value); let oferta=[]; let demanda=[]; let custos=[]; let totalOferta=0; let totalDemanda=0; for(let i=0;i<numF;i++){ let val=parseFloat(document.getElementById(`oferta_${i}`).value); if(isNaN(val)){ alert(`Preencha a capacidade do Fornecedor ${i+1}`); return } oferta.push(val); totalOferta+=val } for(let j=0;j<numC;j++){ let val=parseFloat(document.getElementById(`demanda_${j}`).value); if(isNaN(val)){ alert(`Preencha a demanda do Consumidor ${j+1}`); return } demanda.push(val); totalDemanda+=val } for(let i=0;i<numF;i++){ let linhaCustos=[]; for(let j=0;j<numC;j++){ let val=parseFloat(document.getElementById(`custo_${i}_${j}`).value); if(isNaN(val)){ alert(`Preencha o custo para o Fornecedor ${i+1} -> Consumidor ${j+1}`); return } linhaCustos.push(val) } custos.push(linhaCustos) } if(totalOferta!==totalDemanda) console.warn(`Atenção: A oferta total (${totalOferta}) é diferente da demanda total (${totalDemanda}). O modelo não está balanceado.`); let matrizAlocacao; const painelResultadoCusto=document.getElementById('painel-resultado-custo'); if(metodoAtualId==='noroeste') matrizAlocacao=metodoCantoNoroeste(oferta,demanda); else if(metodoAtualId==='minimo') matrizAlocacao=metodoCustoMinimo(oferta,demanda,custos); else if(metodoAtualId==='vogel') matrizAlocacao=metodoAproximacaoVogel(oferta,demanda,custos); let custoTotal=0; for(let i=0;i<numF;i++) for(let j=0;j<numC;j++) custoTotal+=matrizAlocacao[i][j]*custos[i][j]; document.getElementById('valor-custo').innerText=custoTotal.toLocaleString('pt-BR'); painelResultadoCusto.classList.remove('hidden'); renderizarTabela(matrizAlocacao,numF,numC,oferta,demanda); document.getElementById('step-3').classList.remove('hidden'); }

function renderizarTabela(matriz,numF,numC,oferta,demanda){ const cabecalho=document.getElementById('tabela-cabecalho'); const corpo=document.getElementById('tabela-corpo'); cabecalho.innerHTML=''; corpo.innerHTML=''; let trCabecalho='<tr><th class="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider bg-gray-50">Matriz</th>'; for(let j=0;j<numC;j++) trCabecalho+=`<th class="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider bg-gray-50">Cons. ${j+1}</th>`; trCabecalho+=`<th class="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider bg-blue-100">Oferta</th></tr>`; cabecalho.innerHTML=trCabecalho; for(let i=0;i<numF;i++){ let tr=`<tr><td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 bg-gray-50">Forn. ${i+1}</td>`; for(let j=0;j<numC;j++){ const val=matriz[i][j]; const corClasse=val>0?'text-green-700 font-bold bg-green-50':'text-gray-400'; tr+=`<td class="px-6 py-4 whitespace-nowrap text-lg ${corClasse}">${val>0?val:'-'}</td>` } tr+=`<td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700 bg-blue-50">${oferta[i]}</td></tr>`; corpo.innerHTML+=tr } let trDemanda=`<tr><td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 bg-green-100">Demanda</td>`; for(let j=0;j<numC;j++) trDemanda+=`<td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700 bg-green-100">${demanda[j]}</td>`; trDemanda+=`<td class="px-6 py-4 bg-gray-200"></td></tr>`; corpo.innerHTML+=trDemanda }

function reiniciarMesmoMetodo(){ document.getElementById('step-3').classList.add('hidden'); document.getElementById('step-2').classList.add('hidden'); document.getElementById('step-1').classList.remove('hidden'); }