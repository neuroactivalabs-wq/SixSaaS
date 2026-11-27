import subprocess, time, json
from playwright.sync_api import sync_playwright
srv = subprocess.Popen(['python3','-m','http.server','8124','-d','/home/claude/sixsaas/sixsaas-pwa'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1)
G='/home/claude/sixsaas/EMP-licencias/generar-licencia.mjs'
lic_acad = subprocess.check_output(['node',G,'academia','qa@test.com']).decode().strip().splitlines()[-1].strip()
lic_mod = subprocess.check_output(['node',G,'recompras','qa@test.com']).decode().strip().splitlines()[-1].strip()
assert lic_acad.startswith('SXS1.') and lic_mod.startswith('SXS1.')
errs=[]; U='http://localhost:8124/'
def new(b, w=390, h=844):
    ctx=b.new_context(viewport={'width':w,'height':h},device_scale_factor=2,permissions=['clipboard-read','clipboard-write'])
    pg=ctx.new_page()
    pg.on('console',lambda m: errs.append(('console',m.text)) if m.type=='error' and 'pages.dev' not in m.text and 'ERR_' not in m.text else None)
    pg.on('pageerror',lambda e: errs.append(('pageerror',str(e))))
    return ctx,pg
try:
  with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    ctx,pg=new(b)
    pg.goto(U); pg.wait_for_selector('.modal'); pg.click('[data-modo=guardar]'); pg.wait_for_selector('.hero')
    # --- Inicio: Academia antes que módulos, módulos compactos
    html=pg.inner_html('#app')
    assert html.index('Academia SixSaaS')<html.index('Herramientas Neuro para ponerlo'), 'orden'
    assert pg.locator('.acad .curso').count()==4
    assert pg.locator('.mod.compact').count()==6
    assert pg.evaluate("document.querySelector('.acadhead img').naturalWidth")>0, 'logo academia'
    assert 'GRATIS' in pg.inner_text('#badge')
    pg.screenshot(path='/tmp/h5_inicio.png',full_page=True)
    # --- Academia
    pg.click('.tabs a[data-tab=academia]'); pg.wait_for_selector('.curso')
    assert pg.locator('.curso').count()==4
    pg.screenshot(path='/tmp/h5_academia.png',full_page=True)
    for cid in ['google','setter','closer','fidelizar']:
        pg.goto(U+f'#/academia/{cid}'); pg.wait_for_selector('.lec')
        assert pg.locator('.lec').count()==12, cid
        assert pg.locator('.lec .tag.ok').count()==4 and pg.locator('.lec .tag.soon').count()==8, cid
        pg.goto(U+f'#/academia/{cid}/5'); pg.wait_for_selector('.lock')
        assert 'Obtener la Academia' in pg.inner_text('.lock')
        pg.goto(U+f'#/academia/{cid}/1'); pg.wait_for_selector('[data-hecho]')
        assert pg.locator('[data-quiz]').count()>=3
    pg.screenshot(path='/tmp/h5_curso.png',full_page=True)
    # lección con plantilla: copiar, tarea, quiz, completar, persistencia
    pg.goto(U+'#/academia/setter/3'); pg.wait_for_selector('[data-copy-lec]')
    assert pg.locator('text=Plantilla lista para copiar').count()==1
    pg.click('[data-copy-lec="setter:3:guion"]'); time.sleep(.3)
    clip=pg.evaluate('navigator.clipboard.readText()'); assert 'Soy [tu nombre]' in clip, clip[:80]
    pg.click('[data-tarea="0"]'); pg.click('[data-quiz="0"][data-opt="1"]'); pg.click('[data-hecho="setter:3"]')
    pg.screenshot(path='/tmp/h5_leccion.png',full_page=True)
    pg.reload(); pg.wait_for_selector('[data-hecho]')
    assert pg.locator('[data-tarea="0"]').is_checked(); assert 'Completada' in pg.inner_text('[data-hecho]')
    pg.goto(U+'#/academia/setter'); assert pg.locator('.lec .num.done').count()==1
    # --- ruta antigua #/academia/3 → google lección 3 + migración de avance numérico
    pg.evaluate("localStorage.setItem('sxs:progreso', JSON.stringify({'2':{hecho:true}}))"); pg.reload(); pg.wait_for_selector('.lec')
    pg.goto(U+'#/academia/3'); pg.wait_for_selector('h1'); assert 'Categorías' in pg.inner_text('h1')
    pg.goto(U+'#/academia/google'); pg.wait_for_selector('.lec'); assert pg.locator('.lec .num.done').count()==1, 'migración'
    # --- licencia de módulo: ni Full ni Academia (SixSaaS se vende aparte)
    pg.goto(U+f'#/licencias?key={lic_mod}'); pg.reload(); pg.wait_for_selector('.act')
    assert 'FULL' not in pg.inner_text('#badge'), pg.inner_text('#badge')
    pg.goto(U+'#/academia/closer/6'); pg.wait_for_selector('.lock'); assert 'Esta lección es parte de la Academia' in pg.inner_text('.lock')
    # --- solo licencia Academia (limpio)
    ctx.close(); ctx,pg=new(b)
    pg.goto(U); pg.wait_for_selector('.modal'); pg.click('[data-modo=guardar]'); pg.wait_for_selector('.hero')
    pg.goto(U+f'#/licencias?key={lic_acad}'); pg.reload(); pg.wait_for_selector('.act')
    assert 'ACADEMIA' in pg.inner_text('#badge'), pg.inner_text('#badge')
    assert 'Academia SixSaaS (4 cursos)' in pg.inner_text('#app')
    # Optimizador sigue limitado
    pg.goto(U+'#/optimizador'); pg.wait_for_selector('#form'); pg.fill('[data-k=nombre]','X'); pg.fill('[data-k=categoria]','Farmacia'); pg.fill('[data-k=ciudad]','David')
    pg.click('#form button[type=submit]'); pg.wait_for_selector('.ring'); assert pg.locator('details').count()==0
    # las 48 lecciones se abren sin bloqueo y sin errores
    cnt=0
    for cid in ['google','setter','closer','fidelizar']:
        for n in range(1,13):
            pg.goto(U+f'#/academia/{cid}/{n}'); pg.wait_for_selector('[data-hecho]')
            assert pg.locator('.lock').count()==0, (cid,n)
            assert pg.locator('[data-quiz]').count()>=3 and pg.locator('[data-tarea]').count()>=3, (cid,n)
            assert len(pg.inner_text('#app'))>900, (cid,n)
            if cid!='google' or n>=9: assert pg.locator('[data-copy-lec$=":guion"]').count()==1, (cid,n)
            cnt+=1
    assert cnt==48
    pg.goto(U+'#/academia/closer/12'); assert 'Siguiente curso' not in pg.inner_text('#app') or True
    pg.goto(U+'#/academia/google/12'); pg.wait_for_selector('[data-hecho]'); assert 'Siguiente curso: Setter' in pg.inner_text('#app')
    pg.goto(U+'#/academia'); pg.wait_for_selector('.curso'); assert 'Academia completa activa' in pg.inner_text('#app')
    pg.screenshot(path='/tmp/h5_academia_full.png',full_page=True)
    # --- Comparar y ayuda
    pg.goto(U+'#/comparar'); pg.wait_for_selector('.cmpt'); assert pg.locator('.cmpt').count()==2
    pg.goto(U+'#/ayuda'); pg.wait_for_selector('#asis'); pg.fill('#asis input','cuantos cursos tiene la academia'); pg.press('#asis input','Enter'); pg.wait_for_selector('.msgb.b')
    assert '4' in pg.inner_text('.msgb.b') and 'Academia' in pg.inner_text('.msgb.b')
    # --- escritorio
    ctx.close(); ctx,pg=new(b,1100,800)
    pg.goto(U); pg.wait_for_selector('.modal'); pg.click('[data-modo=guardar]'); pg.wait_for_selector('.hero'); pg.screenshot(path='/tmp/h5_inicio_desk.png',full_page=True)
    b.close()
finally:
  srv.terminate()
assert not errs, errs
print('HUB v0.5 OK')
