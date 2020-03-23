import json
from PIL import ImageColor

with open('colors_hex.json', 'r') as f:
    colors = json.load(f)
    for genre in colors:
        colors[genre] = [ImageColor.getrgb(color) for color in colors[genre]]

with open('colors_rgb.json', 'w') as f:
    json.dump(colors, f)