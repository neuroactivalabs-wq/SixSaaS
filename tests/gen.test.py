import subprocess, json, time
from playwright.sync_api import sync_playwright
priv=open('/home/claude/sixsaas/EMP-licencias/clave-privada.jwk.json').read()
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/sixsaas/EMP-licencias/generador.html')
    pg.fill('#jwk',priv); pg.wait_for_selector('#keystatus.ok')
    pg.fill('#site','https://demo.netlify.app'); pg.click('#gen'); pg.wait_for_selector('#results .out')
    keys=pg.locator('#results .k').all_inner_texts(); assert len(keys)==7, len(keys)
    pg.screenshot(path='/tmp/s9_gen.png',full_page=True)
    pg.fill('#chk',keys[2]); pg.click('#verify'); pg.wait_for_selector('#vstatus.ok')
    pg.fill('#chk',keys[2][:-3]+'AAA'); pg.click('#verify'); pg.wait_for_selector('#vstatus.bad')
    pg.select_option('#mod','crm'); pg.fill('#exp','2020-01-01'); pg.click('#gen'); time.sleep(.3)
    vencida=pg.locator('#results .k').first.inner_text()
    b.close()
assert not errs, errs
open('/tmp/keys_from_html.json','w').write(json.dumps({'keys':keys,'vencida':vencida}))
print('HTML generador OK')
