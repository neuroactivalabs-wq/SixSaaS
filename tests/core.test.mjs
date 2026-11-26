import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { analizar, generarDescripcion, generarPlan, generarPosts, generarRespuestas, generarPedirResena, generarPromptIA } from '../sixsaas-pwa/js/optimizer.js';
import { verifyLicense } from '../sixsaas-pwa/js/license.js';

// ---- Optimizador ----
const vacio = analizar({});
assert.equal(vacio.total, 0);
assert.equal(vacio.nivel, 'Crítico');
assert.equal(vacio.grupos.reduce((s, g) => s + g.max, 0), 100, 'los máximos suman 100');

const perfecto = analizar({
  nombre: 'Farmacia Sol', categoria: 'Farmacia', ciudad: 'David', verificado: true, horario: 'completo',
  telefono: true, web: true, categoriasSec: 2, atributos: true, nap: true,
  descripcion: 'Farmacia Sol en David: medicamentos, vitaminas y cuidado personal. '.repeat(5),
  servicios: 12, fotos: 30, logoPortada: true, resenas: 80, rating: 4.7, respondidas: 90,
  ultimaResena: 'semana', posts30: 5, enlaceResenas: true,
});
assert.equal(perfecto.total, 100);
assert.equal(perfecto.acciones.length, 0);

const medio = analizar({ verificado: true, horario: 'parcial', fotos: 3, resenas: 12, rating: 4.2, respondidas: 10, ultimaResena: 'mes' });
assert.ok(medio.total > 0 && medio.total < 100);
assert.ok(medio.acciones[0].perdidos >= medio.acciones.at(-1).perdidos, 'acciones ordenadas por puntos perdidos');
// sin reseñas, rating y respuestas no suman
const sinRes = analizar({ resenas: 0, rating: 5, respondidas: 100, ultimaResena: 'semana' });
assert.equal(sinRes.items.filter((i) => ['rating', 'respuestas', 'recencia'].includes(i.id)).reduce((s, i) => s + i.pts, 0), 0);
// descripción > 750 penaliza
const largo = analizar({ descripcion: 'a'.repeat(800), ciudad: 'x' });
assert.equal(largo.items.find((i) => i.id === 'descripcion').pts, 5);
// entradas basura no rompen
assert.doesNotThrow(() => analizar({ resenas: 'abc', rating: null, fotos: undefined, categoriasSec: '3' }));

// ---- Generadores ----
for (const d of generarDescripcion({ nombre: 'X', categoria: 'Barbería', ciudad: 'Chitré' }, { serviciosTexto: 'cortes, barba', diferencial: 'Atención sin filas', contacto: '6000-0000' })) {
  assert.ok(d.texto.length <= 750 && d.texto.includes('Chitré'));
}
const larga = generarDescripcion({ nombre: 'X', categoria: 'Y', ciudad: 'Z' }, { diferencial: 'palabra '.repeat(200) });
assert.ok(larga.every((d) => d.texto.length <= 750), 'descripción nunca pasa de 750');
assert.equal(generarPosts({}, {}).length, 8);
assert.equal(generarRespuestas({}, {}).length, 3);
assert.ok(generarPedirResena({}, { enlaceResenas: 'https://g.page/r/abc' })[0].texto.includes('https://g.page/r/abc'));
assert.equal(generarPlan(medio).length, 4);
assert.ok(generarPromptIA({ nombre: 'X' }, medio).includes('Puntaje actual'));
// Cumplimiento: el texto para pedir reseñas no filtra por satisfacción ni ofrece incentivos
const pedir = generarPedirResena({ nombre: 'X' }, {}).map((r) => r.texto.toLowerCase()).join(' ');
assert.ok(!/descuento|regalo|premio|gratis|si te gust/.test(pedir));

// ---- Licencias (usa el kit real de EMP) ----
const gen = (...a) => execFileSync('node', ['../EMP-licencias/generar-licencia.mjs', ...a], { cwd: new URL('.', import.meta.url).pathname, encoding: 'utf8' }).trim();
const key = gen('resenas', 'cliente@test.com');
const ok = await verifyLicense(key);
assert.ok(ok.ok && ok.data.m === 'resenas' && ok.data.i === 'cliente@test.com');
assert.ok((await verifyLicense(`  ${key.slice(0, 40)}\n${key.slice(40)} `)).ok, 'tolera espacios y saltos de línea al pegar');
const [v, p, s] = key.split('.');
const manipulado = Buffer.from(JSON.stringify({ m: 'crm', i: 'x', t: '2026-11-20' })).toString('base64url');
assert.equal((await verifyLicense(`${v}.${manipulado}.${s}`)).error, 'firma', 'payload alterado se rechaza');
assert.equal((await verifyLicense(`${v}.${p}.${s.slice(0, -2)}AA`)).ok, false, 'firma alterada se rechaza');
assert.equal((await verifyLicense('hola')).error, 'formato');
assert.equal((await verifyLicense('')).error, 'formato');
const vencida = gen('crm', 'x', '2020-01-01');
assert.equal((await verifyLicense(vencida)).error, 'vencida');
const futura = gen('pedidos', 'x', '2099-01-01');
assert.ok((await verifyLicense(futura)).ok);
assert.equal((await verifyLicense(gen('sixsaas', 'x'))).data.m, 'sixsaas');

console.log('OK: todas las pruebas pasaron');
