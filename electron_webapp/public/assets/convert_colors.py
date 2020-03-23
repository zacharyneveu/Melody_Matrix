import json
from PIL import ImageColor

# with open('colors_hex.json', 'r') as f:
#     colors = json.load(f)
#     for genre in colors:
#         colors[genre] = [ImageColor.getrgb(color) for color in colors[genre]]

# with open('colors_rgb.json', 'w') as f:
#     json.dump(colors, f)

with open('data.json', 'r') as f:
    data = json.load(f)
with open('data_new.json', 'w') as f:
    for x in data:
        for y in data[x]:
            for z in range(6):
                data[x][y][z] = (0,0,0)
    json.dump(data,f)