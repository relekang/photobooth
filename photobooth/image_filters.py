from PIL import Image


def vignette(image):
    width, height = image.size

    overlay = Image.open('photobooth/vignette.png')
    overlay = overlay.convert('RGBA')
    image = image.convert('RGBA')
    image = image.resize((width, height), Image.BILINEAR)
    overlay = overlay.resize((width, height), Image.BILINEAR)
    image.paste(overlay, (0, 0), mask=overlay)

    image = image.convert('RGB')
    r, g, b = image.split()
    b = Image.eval(b, lambda x: x * 0.7)
    image = Image.merge('RGB', (r, g, b))
    image = Image.eval(image, lambda x: min(255, x * 1.5))

    return image


def get(name):
    return {
        'vignette': vignette,
    }[name]
