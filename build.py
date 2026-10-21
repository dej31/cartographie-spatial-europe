import pathlib
src = pathlib.Path("src")
page = (src/"page.html").read_text()
page = page.replace("/*__DATA__*/", (src/"data.js").read_text()).replace("/*__DATA2__*/", (src/"data2.js").read_text()).replace("/*__DATA3__*/", (src/"data3.js").read_text()).replace("/*__DATA4__*/", (src/"data4.js").read_text()).replace("/*__DATA5__*/", (src/"data5.js").read_text()).replace("/*__DATA6__*/", (src/"data6.js").read_text()).replace("/*__DATA7__*/", (src/"data7.js").read_text()).replace("/*__DATA8__*/", (src/"data8.js").read_text()).replace("/*__DATA9__*/", (src/"data9.js").read_text()).replace("/*__DATA10__*/", (src/"data10.js").read_text()).replace("/*__DATA11__*/", (src/"data11.js").read_text()).replace("/*__APP__*/", (src/"app.js").read_text())
dist = pathlib.Path("dist"); dist.mkdir(exist_ok=True)
(dist/"atlas.html").write_text(page)
head, sep, rest = page.partition("<header")
full = ('<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n'
        + head + '</head>\n<body>\n' + sep + rest + '\n</body>\n</html>\n')
(dist/"index.html").write_text(full)
pathlib.Path("index.html").write_text(full)
print(len(page))
