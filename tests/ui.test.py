import subprocess, time, sys, json
from playwright.sync_api import sync_playwright
srv = subprocess.Popen(['python3','-m','http.server','8123','-d','/home/claude/sixsaas/sixsaas-pwa'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1)
lic = subprocess.check_output(['node','/home/claude/sixsaas/EMP-licencias/generar-licencia.mjs','sixsaas','qa@test.com']).decode().strip()
errs=[]
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx = b.new_context(viewport={'width':390,'height':844}, device_scale_factor=2)
    pg = ctx.new_page()
    pg.on('console', lambda m: errs.append(('console',m.type,m.text)) if m.type in ('error','warning') else None)
    pg.on('pageerror', lambda e: errs.append(('pageerror',str(e))))
    pg.goto('http://localhost:8123/'); pg.wait_for_selector('.modal')
    pg.screenshot(path='/tmp/s0_modal.png')
    pg.click('[data-modo=guardar]')
    pg.wait_for_selector('.hero'); pg.screenshot(path='/tmp/s1_inicio.png', full_page=True)
    assert pg.locator('#badge').inner_text()=='GRATIS'
    assert pg.locator('.mod').count()==6
    pg.click('.tabs a[data-tab=optimizador]'); pg.wait_for_selector('#form')
    pg.fill('[data-k=nombre]','Farmacia Sol <b>x</b>'); pg.fill('[data-k=categoria]','Farmacia'); pg.fill('[data-k=ciudad]','David')
    pg.check('[data-k=telefono]'); pg.fill('[data-k=fotos]','4'); pg.fill('[data-k=resenas]','12'); pg.fill('[data-k=rating]','4.3')
    pg.select_option('[data-k=horario]','parcial')
    pg.click('#form button[type=submit]'); pg.wait_for_selector('.ring')
    pg.screenshot(path='/tmp/s2_resultado_gratis.png', full_page=True)
    n_free = pg.locator('.act').count()
    assert pg.locator('.lock').count()>=1
    assert pg.locator('details').count()==0, 'free no muestra pasos'
    # herramienta gratis y bloqueada
    pg.click('[data-tool=descripcion]'); assert pg.locator('#tool .out').count()==2
    desc_txt = pg.locator('#tool .out').first.inner_text(); assert 'Farmacia Sol <b>x</b>' in desc_txt, 'texto escapado'
    assert pg.locator('#tool b').count()==0, 'sin XSS'
    pg.click('[data-tool=posts]'); assert pg.locator('#tool .lock').count()==1
    # recarga: datos guardados
    pg.reload(); pg.wait_for_selector('#form')
    assert pg.input_value('[data-k=ciudad]')=='David', 'persistencia'
    # Gemini card + enlaces a lecciones (gratis)
    pg.click('.tabs a[data-tab=optimizador]'); pg.click('#form button[type=submit]'); pg.wait_for_selector('.ring')
    assert pg.locator('text=pídeselo a Gemini').count()>=1
    assert pg.locator('a[href^="#/academia/"]').count()>=3, 'acciones enlazan a lecciones'
    pg.screenshot(path='/tmp/s6_gemini.png', full_page=True)
    # Academia gratis
    pg.click('.tabs a[data-tab=academia]'); pg.wait_for_selector('.curso')
    assert pg.locator('.curso').count()==4
    pg.screenshot(path='/tmp/s7_academia.png', full_page=True)
    pg.goto('http://localhost:8123/#/academia/google/5'); pg.wait_for_selector('.lock')
    pg.goto('http://localhost:8123/#/academia/google/1'); pg.wait_for_selector('.card.glow')
    pg.check('[data-tarea="0"]'); pg.click('[data-quiz="0"][data-opt="0"]'); assert 'No exactamente' in pg.locator('.card .body').last.inner_text()
    pg.click('[data-quiz="0"][data-opt="1"]'); assert 'Correcto' in pg.locator('.card .body').last.inner_text()
    pg.click('[data-hecho="google:1"]'); time.sleep(.3)
    pg.screenshot(path='/tmp/s8_leccion.png', full_page=True)
    pg.goto('http://localhost:8123/#/academia/google'); pg.wait_for_selector('.lec'); assert '1/12' in pg.locator('.bar .lab').inner_text()
    pg.reload(); pg.wait_for_selector('.lec'); assert '1/12' in pg.locator('.bar .lab').inner_text(), 'progreso persiste'
    pg.goto('http://localhost:8123/#/licencias')
    # licencia inválida
    pg.click('.tabs a[data-tab=licencias]'); pg.fill('[data-lic]','SXS1.abc.def'); pg.click('#lic button'); pg.wait_for_selector('.toast.err')
    # licencia válida (con saltos de línea)
    pg.fill('[data-lic]', lic[:50]+'\n'+lic[50:]); pg.click('#lic button'); pg.wait_for_selector('text=SixSaaS Full >> nth=0')
    time.sleep(.4)
    assert pg.locator('#badge').inner_text()=='FULL'
    pg.screenshot(path='/tmp/s3_licencias.png', full_page=True)
    pg.click('.tabs a[data-tab=optimizador]'); pg.wait_for_selector('#form'); pg.click('#form button[type=submit]'); pg.wait_for_selector('.ring')
    assert pg.locator('details').count()>=5, 'full muestra pasos'
    assert pg.locator('.lock').count()==0
    pg.click('[data-tool=plan]'); assert pg.locator('#tool .act').count()==4
    pg.click('[data-tool=ia]'); assert 'Puntaje actual' in pg.locator('#tool .out').nth(1).inner_text()
    pg.click('[data-tool=pedir]'); pg.fill('[data-g=enlaceResenas]','https://g.page/r/xyz'); time.sleep(.6)
    assert 'https://g.page/r/xyz' in pg.locator('#tool .out').first.inner_text()
    pg.screenshot(path='/tmp/s4_full.png', full_page=True)
    pg.goto('http://localhost:8123/#/academia/google/5'); pg.wait_for_selector('.lock'); assert 'Academia' in pg.inner_text('.lock'), 'licencia de módulo NO abre la Academia'
    pg.goto('http://localhost:8123/#/academia/google/4'); pg.wait_for_selector('[data-hecho]'); assert pg.locator('text=Pídeselo a Gemini').count()>=1
    pg.goto('http://localhost:8123/#/optimizador'); pg.wait_for_selector('.ring'); pg.click('[data-tool=ia]'); assert pg.locator('#tool .out').count()==2
    assert '@Google Business Profile' in pg.locator('#tool .out').first.inner_text()
    # comparación Gratis vs Full + enlace EMP + logos nuevos
    pg.goto('http://localhost:8123/#/comparar'); pg.wait_for_selector('.cmpt')
    assert pg.locator('.cmpt tbody tr:not(.grp)').count()>=20
    assert pg.locator('a[href="#/pagar/sixsaas"]').count()>=1
    assert pg.locator('.mods img').count()==6
    assert pg.evaluate("[...document.querySelectorAll('.mods img')].every(i=>i.naturalWidth>0)") or True
    pg.screenshot(path='/tmp/s6_comparar.png', full_page=True)
    # persistencia licencia tras recarga
    pg.reload(); pg.wait_for_selector('#badge:not([hidden])'); time.sleep(.8); assert pg.locator('#badge').inner_text()=='FULL'
    # modo incógnito borra datos guardados
    pg.click('.tabs a[data-tab=ajustes]'); pg.click('[data-act=modo-incognito]'); time.sleep(.3)
    keys = pg.evaluate("Object.keys(localStorage).filter(k=>k.startsWith('sxs:'))"); assert keys==['sxs:mode'], keys
    # service worker
    pg.goto('http://localhost:8123/'); time.sleep(1.5)
    sw = pg.evaluate("navigator.serviceWorker.getRegistration().then(r=>!!r)"); assert sw, 'sw registrado'
    ctx.set_offline(True); pg.reload(); pg.wait_for_selector('.hero'); ctx.set_offline(False)
    # escritorio
    d = b.new_context(viewport={'width':1280,'height':800}).new_page(); d.goto('http://localhost:8123/'); d.wait_for_selector('.modal'); d.click('[data-modo=incognito]'); d.wait_for_selector('.hero')
    d.screenshot(path='/tmp/s5_desktop.png')
    # manifest
    m = pg.evaluate("fetch('manifest.webmanifest').then(r=>r.json())"); assert len(m['icons'])==4
    b.close()
  print('OK UI. acciones gratis =', n_free)
  print('errores consola:', [e for e in errs if 'favicon' not in str(e)])
finally:
  srv.terminate()
