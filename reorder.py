import sys

with open('app/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the markers
u_start = content.find('{/* ─── UPLOAD COL (Step 1) ─── */}')
c_start = content.find('{/* ─── CENTER PANEL (Preview)')
d_start = content.find('{/* ─── DETAILS COL (Step 3) ─── */}')
f_start = content.find('{/* ─── FORMAT PANEL (Pick Format) ─── */}')
s_start = content.find('{/* ─── SHARE PANEL (Share with X) ─── */}')
grid_end = content.find('      </div>\n\n      {/* ═══ FOOTER ═══ */}') 
if grid_end == -1:
    grid_end = content.find('      </div>\n    </div>\n  );\n}')

upload_col = content[u_start:c_start]
center_panel = content[c_start:d_start]
details_col = content[d_start:f_start]
format_panel = content[f_start:s_start]
share_panel = content[s_start:grid_end]

new_content = content[:u_start] + \
    '        <div className="panel-left">\n  ' + \
    upload_col.replace('\n', '\n  ') + \
    '  ' + details_col.replace('\n', '\n  ') + \
    '      </div>\n\n' + \
    center_panel + \
    '        <div className="panel-right">\n  ' + \
    format_panel.replace('\n', '\n  ') + \
    '  ' + share_panel.replace('\n', '\n  ') + \
    '      </div>\n' + \
    content[grid_end:]

with open('app/page.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done!')
