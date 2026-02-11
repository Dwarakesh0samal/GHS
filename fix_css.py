import sys

path = 'g:/Study/7th sem/GHS/style.css'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

output = []
skip_until = None

for i, line in enumerate(lines):
    line_num = i + 1
    if line_num == 504:
        skip_until = 520
        continue
    if skip_until and line_num <= skip_until:
        continue
    output.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(output)
