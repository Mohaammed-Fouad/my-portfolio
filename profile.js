// Mobile menu toggle
function clearSVG(){while(svg.firstChild) svg.removeChild(svg.firstChild)}


function drawMolecule(mol){
if(!svg) return;
clearSVG();
mol.bonds.forEach((b,i)=>{
const line = document.createElementNS('http://www.w3.org/2000/svg','line');
line.setAttribute('x1',b.x1);line.setAttribute('y1',b.y1);line.setAttribute('x2',b.x2);line.setAttribute('y2',b.y2);
line.classList.add('mol-line');
svg.appendChild(line);
// draw dash animation
const len = Math.hypot(b.x2-b.x1,b.y2-b.y1);
line.style.strokeDasharray = len;
line.style.strokeDashoffset = len;
setTimeout(()=> line.style.strokeDashoffset = 0, 80 + i*80);
});


mol.atoms.forEach((a,i)=>{
const g = document.createElementNS('http://www.w3.org/2000/svg','g');
const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
c.setAttribute('cx',a.x);c.setAttribute('cy',a.y);c.setAttribute('r',a.r);
c.classList.add('mol-atom');c.style.opacity = 0;
const t = document.createElementNS('http://www.w3.org/2000/svg','text');
t.setAttribute('x',a.x);t.setAttribute('y',a.y);t.setAttribute('dy','.35em');t.setAttribute('text-anchor','middle');
t.style.fontSize = '12px';t.style.fill = '#0b1220';t.style.opacity = 0;t.textContent = a.label;
g.appendChild(c);g.appendChild(t);svg.appendChild(g);
setTimeout(()=>{c.style.opacity = 1; t.style.opacity = 1}, 200 + i*90);
});
}


if(button){
button.addEventListener('click', ()=>{
drawMolecule(molecules[moleculeIndex]);
button.textContent = 'Next Molecule';
moleculeIndex = (moleculeIndex + 1) % molecules.length;
});
}


if(randBtn){
randBtn.addEventListener('click', ()=>{
moleculeIndex = Math.floor(Math.random()*molecules.length);
drawMolecule(molecules[moleculeIndex]);
button.textContent = 'Next Molecule';
moleculeIndex = (moleculeIndex+1)%molecules.length;
});
}


// IntersectionObserver for reveal animations
const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
})
},{threshold:0.18});


document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
